/* Volte-face / Turnabout — mini-jeu original de Goodturn Studio.
   Chaque coup : la flèche d'une case se retourne (change de sens), la case devient la vôtre,
   puis sa flèche capture en chaîne les cases visées. */
(function () {
  const SIZE = 5;
  const CELLS = SIZE * SIZE;
  const TURNS_EACH = 8;
  const TOTAL_MOVES = TURNS_EACH * 2;
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // haut, droite, bas, gauche
  const AI_DEPTH = 2; // assez joueur pour être un vrai adversaire, sans être imbattable

  const boardEl = document.getElementById('game-board');
  if (!boardEl) return;

  const { t } = window.GT;
  const statusEl = document.getElementById('game-status');
  const roundEl = document.getElementById('game-round');
  const scoreEls = [null, document.getElementById('score-p1'), document.getElementById('score-p2')];
  const nameEls = [null, document.getElementById('name-p1'), document.getElementById('name-p2')];
  const valueEls = [null, document.getElementById('value-p1'), document.getElementById('value-p2')];

  let game;          // état logique de la partie
  let baseDir;       // orientation de départ de chaque flèche
  let flips;         // nombre de retournements de chaque flèche (l'animation ne revient jamais en arrière)
  let cells = [];
  let busy = false;
  let selected = -1;
  let pointerType = 'mouse';
  let gameId = 0;
  let status = { key: '', vars: null };

  /* ---------- Règles ---------- */

  function play(state, idx) {
    const p = state.player;
    const dir = state.dir.slice();
    const owner = state.owner.slice();
    dir[idx] = (dir[idx] + 2) % 4;
    owner[idx] = p;
    const chain = [idx];
    let cur = idx;
    for (;;) {
      const [dx, dy] = DIRS[dir[cur]];
      const x = (cur % SIZE) + dx;
      const y = Math.floor(cur / SIZE) + dy;
      if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) break;
      const next = y * SIZE + x;
      if (owner[next] === p) break;
      owner[next] = p;
      chain.push(next);
      cur = next;
    }
    return { dir, owner, player: 3 - p, moves: state.moves + 1, chain };
  }

  function pass(state) {
    return { dir: state.dir, owner: state.owner, player: 3 - state.player, moves: state.moves + 1, chain: [] };
  }

  function legalMoves(state) {
    const opponent = 3 - state.player;
    const moves = [];
    for (let i = 0; i < CELLS; i++) if (state.owner[i] !== opponent) moves.push(i);
    return moves;
  }

  function score(state, p) {
    let n = 0;
    for (let i = 0; i < CELLS; i++) if (state.owner[i] === p) n++;
    return n;
  }

  const isOver = state => state.moves >= TOTAL_MOVES;

  /* ---------- IA (minimax avec élagage alpha-bêta) ---------- */

  function evaluate(state, me) {
    const diff = score(state, me) - score(state, 3 - me);
    return isOver(state) ? diff * 100 : diff;
  }

  function search(state, depth, alpha, beta, me) {
    if (depth === 0 || isOver(state)) return evaluate(state, me);
    const moves = legalMoves(state);
    if (!moves.length) return search(pass(state), depth - 1, alpha, beta, me);
    const maximizing = state.player === me;
    let best = maximizing ? -Infinity : Infinity;
    for (const m of moves) {
      const v = search(play(state, m), depth - 1, alpha, beta, me);
      if (maximizing) { best = Math.max(best, v); alpha = Math.max(alpha, v); }
      else { best = Math.min(best, v); beta = Math.min(beta, v); }
      if (alpha >= beta) break;
    }
    return best;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function chooseAiMove(state) {
    const moves = shuffle(legalMoves(state));
    const me = state.player;
    let best = moves[0];
    let bestValue = -Infinity;
    for (const m of moves) {
      const v = search(play(state, m), AI_DEPTH - 1, -Infinity, Infinity, me);
      if (v > bestValue) { bestValue = v; best = m; }
    }
    return best;
  }

  /* ---------- Affichage ---------- */

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const isAiTurn = () => game.player === 2;
  const playerName = p => t(p === 1 ? 'game.you' : 'game.ai');

  function setStatus(key, vars) {
    status = { key, vars };
    statusEl.textContent = key ? t(key, vars) : '';
  }

  function buildBoard() {
    boardEl.replaceChildren();
    cells = [];
    for (let i = 0; i < CELLS; i++) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cell';
      cell.setAttribute('role', 'gridcell');
      cell.appendChild(Object.assign(document.createElement('span'), { className: 'arrow' }));
      cell.addEventListener('pointerdown', e => { pointerType = e.pointerType; });
      cell.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') showPreview(i); });
      cell.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') clearPreview(); });
      cell.addEventListener('focus', () => { if (pointerType !== 'touch') showPreview(i); });
      cell.addEventListener('blur', () => { selected = -1; clearPreview(); });
      cell.addEventListener('click', () => onCellClick(i));
      boardEl.appendChild(cell);
      cells.push(cell);
    }
  }

  function canHumanPlay() {
    return !busy && !isOver(game) && !isAiTurn();
  }

  function render() {
    const humanCanPlay = canHumanPlay();
    const opponent = 3 - game.player;
    boardEl.classList.toggle('turn-1', game.player === 1);
    boardEl.classList.toggle('turn-2', game.player === 2);
    cells.forEach((cell, i) => {
      cell.classList.remove('owner-0', 'owner-1', 'owner-2');
      cell.classList.add('owner-' + game.owner[i]);
      cell.classList.toggle('legal', humanCanPlay && game.owner[i] !== opponent);
      cell.disabled = !(humanCanPlay && game.owner[i] !== opponent);
      const arrow = cell.querySelector('.arrow');
      arrow.style.setProperty('--dir', baseDir[i]);
      arrow.style.setProperty('--flip', flips[i]);
      cell.setAttribute('aria-label', t('game.cell', { r: Math.floor(i / SIZE) + 1, c: (i % SIZE) + 1 }));
    });
    renderHud();
  }

  function renderHud() {
    for (const p of [1, 2]) {
      nameEls[p].textContent = playerName(p);
      valueEls[p].textContent = score(game, p);
      scoreEls[p].classList.toggle('active', !isOver(game) && game.player === p);
    }
    roundEl.textContent = isOver(game)
      ? t('game.over')
      : t('game.round', { n: Math.floor(game.moves / 2) + 1, total: TURNS_EACH });
  }

  function clearPreview() {
    cells.forEach(c => { c.classList.remove('preview', 'selected'); delete c.dataset.step; });
  }

  function showPreview(idx) {
    clearPreview();
    if (!canHumanPlay() || game.owner[idx] === 3 - game.player) return;
    play(game, idx).chain.forEach((c, n) => {
      cells[c].classList.add('preview');
      cells[c].dataset.step = n + 1;
    });
  }

  /* ---------- Déroulement ---------- */

  function onCellClick(idx) {
    if (!canHumanPlay() || game.owner[idx] === 3 - game.player) return;
    // Sur écran tactile : 1er toucher = aperçu, 2e toucher = on joue
    if (pointerType === 'touch' && selected !== idx) {
      selected = idx;
      showPreview(idx);
      cells[idx].classList.add('selected');
      setStatus('game.tapAgain');
      return;
    }
    doMove(idx);
  }

  async function doMove(idx) {
    const id = gameId;
    busy = true;
    selected = -1;
    clearPreview();
    render();

    const p = game.player;
    const next = play(game, idx);

    flips[idx]++;
    cells[idx].querySelector('.arrow').style.setProperty('--flip', flips[idx]);
    await wait(330);

    for (const c of next.chain) {
      if (id !== gameId) return;
      const cell = cells[c];
      cell.classList.remove('owner-0', 'owner-1', 'owner-2', 'pop');
      void cell.offsetWidth; // relance l'animation
      cell.classList.add('owner-' + p, 'pop');
      await wait(120);
    }
    if (id !== gameId) return;

    game = { dir: next.dir, owner: next.owner, player: next.player, moves: next.moves };
    busy = false;
    nextTurn();
  }

  async function nextTurn() {
    const id = gameId;
    render();

    if (isOver(game)) return finish();

    if (!legalMoves(game).length) {
      busy = true;
      setStatus('game.pass', { p: playerName(game.player) });
      await wait(1200);
      if (id !== gameId) return;
      game = pass(game);
      busy = false;
      return nextTurn();
    }

    if (isAiTurn()) {
      busy = true;
      render();
      setStatus('game.aiThinking');
      await wait(450 + Math.random() * 350);
      if (id !== gameId) return;
      const move = chooseAiMove(game);
      busy = false;
      return doMove(move);
    }

    setStatus('game.yourTurn');
  }

  function finish() {
    const s1 = score(game, 1);
    const s2 = score(game, 2);
    if (s1 === s2) setStatus('game.draw');
    else setStatus(s1 > s2 ? 'game.win' : 'game.lose');
    render();
  }

  function newGame() {
    gameId++;
    busy = false;
    selected = -1;
    const dir = Array.from({ length: CELLS }, () => Math.floor(Math.random() * 4));
    game = { dir, owner: new Array(CELLS).fill(0), player: 1, moves: 0 };
    baseDir = dir.slice();
    flips = new Array(CELLS).fill(0);
    buildBoard();
    nextTurn();
  }

  document.getElementById('game-new').addEventListener('click', newGame);
  window.GT.onChange(() => {
    render();
    if (status.key) statusEl.textContent = t(status.key, status.vars);
  });

  newGame();
})();
