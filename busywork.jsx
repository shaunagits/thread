// busywork.jsx — "Turn busywork into software" — 8s square loop.
// One continuous tree: 18 task cards scatter -> stack -> become an app UI -> one click -> scatter.

const W = 1000, H = 1000;

const C = {
  bg: '#EFEBE2',
  paper: '#FFFDF8',
  line: '#E2DBCB',
  ink: '#26231E',
  mute: '#C6BEAE',
  soft: '#DED7C7',
};

const CARD_W = 190, CARD_H = 54;

// left, top, rot
const SCATTER = [
  [60, 70, -3], [330, 40, 2], [620, 95, -1.5], [828, 55, 4],
  [-16, 250, 3], [250, 230, -2], [540, 275, 1.5], [790, 220, -3.5],
  [90, 430, 2.5], [380, 470, -1], [660, 440, 3], [20, 640, -2.5],
  [320, 690, 1], [620, 660, -3], [480, 132, 2], [150, 560, -2],
  [700, 566, 1], [430, 832, -1.5],
];

// window box
const WX = 190, WY = 190, WW = 620, WH = 620;

const UI = [
  { role: 'header', r: [206, 206, 588, 44] },
  { role: 'nav', r: [206, 272, 150, 36] },
  { role: 'nav', r: [206, 318, 150, 36] },
  { role: 'nav', r: [206, 364, 150, 36] },
  { role: 'nav', r: [206, 410, 150, 36] },
  { role: 'row', r: [372, 272, 422, 36] },
  { role: 'row', r: [372, 318, 422, 36] },
  { role: 'row', r: [372, 364, 422, 36] },
  { role: 'row', r: [372, 410, 422, 36] },
  { role: 'row', r: [372, 456, 422, 36] },
  { role: 'row', r: [372, 502, 422, 36] },
  { role: 'tile', r: [372, 556, 204, 104] },
  { role: 'tile', r: [590, 556, 204, 104] },
  { role: 'button', r: [372, 700, 200, 52] },
  { role: 'extra', r: [500, 486, 0, 0] },
  { role: 'extra', r: [500, 486, 0, 0] },
  { role: 'extra', r: [500, 486, 0, 0] },
  { role: 'extra', r: [500, 486, 0, 0] },
];

const TAPS = [[5, 0.55], [9, 1.15], [12, 1.75]];

function ease3(u) { return window.Easing.easeInOutCubic(Math.max(0, Math.min(1, u))); }
function easeOut(u) { return window.Easing.easeOutCubic(Math.max(0, Math.min(1, u))); }
function prog(T, start, dur, e) { return (e || ease3)((T - start) / dur); }

function kf(T, pts, e) {
  const f = e || ease3;
  if (T <= pts[0][0]) return pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    if (T <= b[0]) return a[1] + (b[1] - a[1]) * f((T - a[0]) / (b[0] - a[0]));
  }
  return pts[pts.length - 1][1];
}

function lerp(a, b, u) { return a + (b - a) * u; }
function lerpRect(a, b, u) { return [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u), lerp(a[3], b[3], u)]; }
function hex(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function mix(h1, h2, u) {
  const a = hex(h1), b = hex(h2);
  return `rgb(${Math.round(lerp(a[0], b[0], u))},${Math.round(lerp(a[1], b[1], u))},${Math.round(lerp(a[2], b[2], u))})`;
}

function Bar({ w, h, c, o }) {
  return <div style={{ width: w, height: h, borderRadius: h / 2, background: c, opacity: o == null ? 1 : o }} />;
}

function Check({ size, fill, accent, radius }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius || 5, flex: '0 0 auto',
      border: `1.5px solid ${fill > 0.02 ? accent : C.mute}`,
      background: fill > 0.02 ? accent : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: `scale(${1 + 0.18 * Math.sin(Math.min(1, fill) * Math.PI)})`,
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 12 12" style={{ opacity: fill }}>
        <path d="M2.5 6.4 L4.9 8.7 L9.5 3.5" fill="none" stroke="#FFFDF8" strokeWidth="1.9"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="12" strokeDashoffset={12 - 12 * Math.min(1, fill)} />
      </svg>
    </div>
  );
}

function TaskContent({ o, check, accent }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, opacity: o, display: 'flex', alignItems: 'center',
      gap: 14, padding: '0 18px', pointerEvents: 'none',
    }}>
      <Check size={18} fill={check} accent={accent} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <Bar w={104} h={8} c={C.soft} />
        <Bar w={58} h={6} c={C.mute} o={0.55} />
      </div>
    </div>
  );
}

function UiContent({ card, o, accent, done }) {
  const role = card.role;
  const box = { position: 'absolute', inset: 0, opacity: o, display: 'flex', alignItems: 'center', pointerEvents: 'none' };
  if (role === 'header') {
    return (
      <div style={{ ...box, padding: '0 16px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 16, height: 16, borderRadius: 5, background: accent }} />
          <Bar w={92} h={8} c={C.soft} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bar w={44} h={7} c={C.mute} o={0.5} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: C.soft }} />
        </div>
      </div>
    );
  }
  if (role === 'nav') {
    return (
      <div style={{ ...box, padding: '0 12px', gap: 10 }}>
        <div style={{ width: 13, height: 13, borderRadius: 4, background: card.active ? accent : C.mute, opacity: card.active ? 1 : 0.7 }} />
        <Bar w={card.navW} h={7} c={card.active ? C.ink : C.mute} o={card.active ? 0.75 : 0.6} />
      </div>
    );
  }
  if (role === 'row') {
    return (
      <div style={{ ...box, padding: '0 14px', gap: 12, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Check size={15} fill={done} accent={accent} radius={4} />
          <Bar w={card.rowW} h={7} c={C.soft} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bar w={54} h={7} c={C.mute} o={0.5} />
          <div style={{
            width: 44, height: 16, borderRadius: 8,
            background: done > 0.5 ? accent : C.soft, opacity: done > 0.5 ? 0.16 + 0.1 * done : 0.7,
          }} />
        </div>
      </div>
    );
  }
  if (role === 'tile') {
    return (
      <div style={{ ...box, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 18px', gap: 12 }}>
        <Bar w={46} h={7} c={C.mute} o={0.6} />
        <Bar w={card.tileW} h={17} c={C.ink} o={0.82} />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 18 }}>
          {card.spark.map((v, i) => (
            <div key={i} style={{ width: 7, height: 4 + v * 14, borderRadius: 2, background: accent, opacity: 0.28 + 0.12 * i }} />
          ))}
        </div>
      </div>
    );
  }
  if (role === 'button') {
    return (
      <div style={{ ...box, justifyContent: 'center', gap: 10 }}>
        <div style={{ width: 13, height: 13, borderRadius: 4, border: '1.6px solid #FFFDF8', opacity: 0.9 }} />
        <Bar w={86} h={9} c="#FFFDF8" o={0.95} />
      </div>
    );
  }
  return null;
}

function Cursor({ T, total }) {
  const x = kf(T, [[0, 622], [0.55, 277], [1.15, 407], [1.75, 347], [2.6, 772], [5.5, 772], [6.05, 472], [6.95, 472], [7.35, 600], [total, 622]]);
  const y = kf(T, [[0, 178], [0.55, 257], [1.15, 497], [1.75, 717], [2.6, 892], [5.5, 892], [6.05, 726], [6.95, 726], [7.35, 380], [total, 178]]);
  const clicks = [0.55, 1.15, 1.75, 6.18];
  let press = 0;
  clicks.forEach((c) => { const d = Math.abs(T - c); if (d < 0.16) press = Math.max(press, 1 - d / 0.16); });
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${1 - 0.16 * press})`, transformOrigin: '2px 2px' }}>
      <div style={{
        position: 'absolute', left: -22, top: -22, width: 44, height: 44, borderRadius: 22,
        border: `2px solid ${C.ink}`, opacity: 0.22 * press, transform: `scale(${0.4 + 1.1 * (1 - press)})`,
      }} />
      <svg width="26" height="30" viewBox="0 0 26 30" style={{ filter: 'drop-shadow(0 3px 6px rgba(38,35,30,.22))' }}>
        <path d="M2 1.6 L2 22.6 L7.6 17.4 L11.2 25.6 L15.2 23.8 L11.7 15.9 L19.2 15.4 Z"
          fill={C.ink} stroke="#FFFDF8" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Piece(props) {
  const accent = props.accent || '#C4623F';
  const { T, CUES, authoredTotal } = window.useComposition();
  const total = authoredTotal || 8;

  const gatherAt = CUES.Gather, compileAt = CUES.Compile, clickAt = CUES.OneClick, resetAt = CUES.Reset;

  // camera
  const scale = kf(T, [[0, 1.2], [2.0, 1.12], [gatherAt + 1.3, 1.0], [compileAt + 1.0, 0.99], [clickAt + 0.7, 1.08], [clickAt + 1.75, 1.02], [total, 1.2]]);
  const fx = kf(T, [[0, 430], [1.4, 430], [gatherAt + 1.3, 500], [clickAt + 0.7, 500], [clickAt + 1.75, 500], [total, 430]]);
  const fy = kf(T, [[0, 430], [1.4, 470], [gatherAt + 1.3, 500], [clickAt + 0.7, 560], [clickAt + 1.75, 505], [total, 430]]);

  const winIn = prog(T, compileAt + 0.05, 0.55, easeOut);
  const winOut = prog(T, resetAt + 0.02, 0.5);
  const winO = winIn * (1 - winOut);
  const winS = lerp(0.9, 1, winIn) * lerp(1, 0.93, winOut);

  const clickP = prog(T, clickAt + 0.9, 0.14, easeOut) * (1 - prog(T, clickAt + 1.06, 0.22, easeOut));

  const cards = SCATTER.map((s, i) => {
    const u = UI[i];
    const ph = i * 1.7;
    const dx = Math.sin((T / total) * Math.PI * 2 + ph) * 7;
    const dy = Math.cos((T / total) * Math.PI * 2 * 1 + ph * 0.7) * 6;
    const scat = [s[0] + dx, s[1] + dy, CARD_W, CARD_H];
    const scatRot = s[2] + Math.sin((T / total) * Math.PI * 2 + ph * 1.3) * 0.9;

    const gp = prog(T, gatherAt + i * 0.024, 0.8);
    const cp = prog(T, compileAt + 0.2 + i * 0.024, 0.6, easeOut);
    const rp = prog(T, resetAt + i * 0.012, 0.68);

    const stack = [500 - CARD_W / 2 + (i % 3 - 1) * 4, 500 - CARD_H / 2 + (i - 8.5) * 2.6, CARD_W, CARD_H];
    let r = lerpRect(scat, stack, gp);
    r = lerpRect(r, u.r, cp);
    r = lerpRect(r, scat, rp);

    let rot = lerp(scatRot, (i % 3 - 1) * 1.2, gp);
    rot = lerp(rot, 0, cp);
    rot = lerp(rot, scatRot, rp);

    const uiMix = cp * (1 - rp);
    const radius = lerp(11, u.role === 'button' ? 26 : u.role === 'tile' ? 12 : 9, uiMix);

    // checkbox state during the busywork phase
    const tap = TAPS.find((t) => t[0] === i);
    let check = tap ? Math.min(1, Math.max(0, (T - tap[1] - 0.06) / 0.28)) : 0;
    check *= 1 - prog(T, resetAt + 0.15, 0.45);

    // done cascade after the single click
    const rowIdx = i - 5;
    let done = u.role === 'row' ? Math.min(1, Math.max(0, (T - (clickAt + 1.06 + rowIdx * 0.085)) / 0.26)) : 0;
    done *= 1 - prog(T, resetAt, 0.3);

    return {
      i, role: u.role, r, rot, uiMix, radius, check, done,
      active: u.role === 'nav' && i === 1,
      navW: [78, 62, 88, 70][Math.max(0, i - 1)] || 74,
      rowW: [148, 122, 166, 134, 152, 118][Math.max(0, rowIdx)] || 140,
      tileW: i === 11 ? 74 : 58,
      spark: i === 11 ? [0.35, 0.62, 1] : [0.5, 0.3, 0.85],
      opacity: u.role === 'extra' ? 1 - uiMix : 1,
      shadow: uiMix,
    };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.bg, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${C.mute} 1.1px, transparent 1.2px)`,
        backgroundSize: '26px 26px', opacity: props.grid === false ? 0 : 0.32,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translate(${W / 2 - fx * scale}px, ${H / 2 - fy * scale}px) scale(${scale})`,
        transformOrigin: '0 0',
      }}>
        {/* app window shell */}
        <div style={{
          position: 'absolute', left: WX, top: WY, width: WW, height: WH,
          borderRadius: 26, background: C.paper, border: `1px solid ${C.line}`,
          boxShadow: `0 40px 80px rgba(38,35,30,${0.13 * winO}), 0 4px 14px rgba(38,35,30,${0.06 * winO})`,
          opacity: winO, transform: `scale(${winS})`, transformOrigin: '500px 500px',
        }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 66, height: 1, background: C.line, opacity: 0.8 }} />
          <div style={{ position: 'absolute', left: 176, top: 66, bottom: 0, width: 1, background: C.line, opacity: 0.8 }} />
          <div style={{
            position: 'absolute', left: 182, top: 510, width: 200, height: 52, borderRadius: 26,
            border: `2px solid ${accent}`, opacity: 0.5 * clickP, transform: `scale(${1 + 0.5 * clickP})`,
          }} />
        </div>

        {cards.map((c) => (
          <div key={c.i} style={{
            position: 'absolute', left: c.r[0], top: c.r[1], width: c.r[2], height: c.r[3],
            transform: `rotate(${c.rot}deg) scale(${c.role === 'button' ? 1 - 0.05 * clickP : 1})`,
            opacity: c.opacity,
            borderRadius: c.radius,
            background: c.role === 'button' ? mix(C.paper, accent, c.uiMix)
              : c.active ? mix(C.paper, accent, 0.07 * c.uiMix) : C.paper,
            border: `1px solid ${c.role === 'button' ? mix(C.line, accent, c.uiMix) : C.line}`,
            boxShadow: `0 ${lerp(7, 0, c.shadow)}px ${lerp(18, 0, c.shadow)}px rgba(38,35,30,${lerp(0.09, 0, c.shadow)})`,
          }}>
            <TaskContent o={1 - c.uiMix} check={c.check} accent={accent} />
            <UiContent card={c} o={c.uiMix} accent={accent} done={c.done} />
          </div>
        ))}

        <Cursor T={T} total={total} />
      </div>
    </div>
  );
}

function BusyworkPiece() {
  const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle, CompositionStage } = window;
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C.bg}>
        <Piece accent={t.accent} grid={t.grid} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Look" />
        <TweakColor label="Accent" value={t.accent} options={['#C4623F', '#3F6B5C', '#2F4E7A', '#8A5A9E']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Dot grid" value={t.grid} onChange={(v) => setTweak('grid', v)} />
        <TweakSection label="Editing" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  );
}

window.BusyworkPiece = BusyworkPiece;
