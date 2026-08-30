// buildgraphic.jsx — single concept, done well: a workflow that builds itself and
// then runs on its own. Square 1000x1000 loop, no copy.
const W = 1000, H = 1000;
const C = { bg: '#EFEBE2', paper: '#FFFDF8', line: '#E2DBCB', ink: '#26231E', mute: '#A9A192', soft: '#C6BEAE', body: '#7C7466' };

const cl = (u) => Math.max(0, Math.min(1, u));
const io = (u) => window.Easing.easeInOutCubic(cl(u));
const eo = (u) => window.Easing.easeOutCubic(cl(u));
const ob = (u) => { const t = cl(u); return 1 - Math.pow(1 - t, 3) + 0.1 * Math.sin(t * Math.PI) * (1 - t); };
const lerp = (a, b, u) => a + (b - a) * u;

// graph authored in the window's content box (760 x 520)
const GW = 760, GH = 520;
const NW = 176, NH = 76;
const NODES = [
  { x: 0, y: 62 },
  { x: 0, y: 222 },
  { x: 0, y: 382 },
  { x: 292, y: 142 },
  { x: 292, y: 302 },
  { x: 584, y: 222, w: 176 },
];
const LINKS = [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]];

function path(a, b) {
  const n1 = NODES[a], n2 = NODES[b];
  const x1 = n1.x + NW, y1 = n1.y + NH / 2, x2 = n2.x, y2 = n2.y + NH / 2;
  return `M${x1} ${y1} C${x1 + 62} ${y1} ${x2 - 62} ${y2} ${x2} ${y2}`;
}

// deterministic point-on-path so pulses follow authored time (scrubs and exports)
const _measure = {};
function pointAt(d, u) {
  let el = _measure[d];
  if (!el) {
    el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    el.setAttribute('d', d);
    _measure[d] = el;
  }
  try {
    const L = el.getTotalLength();
    return el.getPointAtLength(L * Math.max(0, Math.min(1, u)));
  } catch (e) {
    return null;
  }
}

function Bar({ w, h, c, o, r }) {
  return <div style={{ width: w, height: h, borderRadius: r == null ? h / 2 : r, background: c, opacity: o == null ? 1 : o, flex: '0 0 auto' }} />;
}

function Graphic({ accent = '#2F4E7A', grid = true, pulses = true }) {
  const { T, CUES, authoredTotal } = window.useComposition();
  const total = authoredTotal || 9.4;
  const Draw = CUES.Draw ?? 0, Connect = CUES.Connect ?? 2.2, Run = CUES.Run ?? 4.2, Settle = CUES.Settle ?? 7.0;

  const s = 0.96;
  const done = eo((T - (Settle + 0.1)) / 0.5);
  const ring = eo((T - (Run + 0.15)) / 0.2) * (1 - eo((T - (Run + 0.55)) / 0.5));
  const counter = Math.round(lerp(0, 24, io((T - (Run + 0.2)) / 2.6)));

  return (
    <div style={{
      position: 'absolute', inset: 0, background: C.bg, overflow: 'hidden',
      fontFamily: "'Instrument Sans', system-ui, sans-serif", color: C.ink,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${C.soft} 1.1px, transparent 1.2px)`,
        backgroundSize: '26px 26px', opacity: grid ? 0.3 : 0,
      }} />

      <div style={{
        position: 'relative', width: 872, height: 700, borderRadius: 26, background: C.paper,
        border: `1px solid ${C.line}`, overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(38,35,30,0.13), 0 4px 14px rgba(38,35,30,0.05)',
      }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 66, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 26px', gap: 10 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: i === 0 ? accent : C.line, opacity: i === 0 ? 0.55 : 1 }} />)}
          <div style={{ marginLeft: 20, display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <div style={{ width: 16, height: 16, borderRadius: 5, background: accent, opacity: 0.75 }} />
            <Bar w={132} h={8} c={C.soft} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 9, height: 9, borderRadius: 5, background: accent, opacity: 0.35 + 0.55 * Math.abs(Math.sin(T * 2.1)) }} />
            <div style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent, opacity: 0.9, width: 26, textAlign: 'right' }}>{counter}</div>
            <Bar w={54} h={7} c={C.soft} o={0.5} />
          </div>
        </div>

        <div style={{ position: 'absolute', left: 56, top: 90, width: GW, height: GH, transform: `scale(${s})`, transformOrigin: '50% 50%' }}>
          <svg viewBox={`0 0 ${GW} ${GH}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            {LINKS.map(([a, b], i) => {
              const u = eo((T - (Connect + i * 0.11)) / 0.5);
              const d = path(a, b);
              const live = pulses && T > Run - 0.1;
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke={C.soft} strokeWidth="2.2" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - u} />
                  <path d={d} fill="none" stroke={accent} strokeWidth="2.2" opacity={0.45 * eo((T - (Run - 0.1 + i * 0.08)) / 0.6)} />
                  {live ? (() => {
                    const u = (((T - Run) / 1.5 + i * 0.16) % 1 + 1) % 1;
                    const pt = pointAt(d, u);
                    if (!pt) return null;
                    const fade = Math.min(1, Math.sin(u * Math.PI) * 3.2);
                    return <circle cx={pt.x} cy={pt.y} r="5" fill={accent} opacity={0.95 * fade} />;
                  })() : null}
                </g>
              );
            })}
          </svg>

          {NODES.map((n, i) => {
            const u = ob((T - (Draw + 0.15 + i * 0.14)) / 0.6);
            const last = i === NODES.length - 1;
            const tick = last ? done : eo((T - (Settle - 0.5 + i * 0.09)) / 0.35);
            const w = n.w || NW;
            return (
              <div key={i} style={{
                position: 'absolute', left: n.x, top: n.y, width: w, height: NH,
                borderRadius: 13, background: last ? `rgba(47,78,122,${0.06 + 0.94 * done})` : C.paper,
                border: `1px solid ${last && done > 0.4 ? accent : C.line}`,
                boxShadow: `0 8px 20px rgba(38,35,30,${0.05 + 0.06 * (last ? done : 0)})`,
                opacity: u, transform: `scale(${lerp(0.9, 1, u)})`,
                display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', boxSizing: 'border-box',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 7, flex: '0 0 auto',
                  border: `1.5px solid ${tick > 0.02 ? (last ? C.paper : accent) : C.soft}`,
                  background: tick > 0.02 ? (last ? C.paper : accent) : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `scale(${1 + 0.16 * Math.sin(cl(tick) * Math.PI)})`,
                }}>
                  <svg width="13" height="13" viewBox="0 0 12 12" style={{ opacity: tick }}>
                    <path d="M2.5 6.4 L4.9 8.7 L9.5 3.5" fill="none" stroke={last ? accent : C.paper} strokeWidth="1.9"
                      strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - cl(tick)} />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Bar w={[86, 70, 94, 78, 88, 96][i]} h={8} c={last && done > 0.4 ? C.paper : C.soft} o={last && done > 0.4 ? 0.92 : 1} />
                  <Bar w={[48, 56, 42, 50, 44, 58][i]} h={6} c={last && done > 0.4 ? C.paper : C.soft} o={last && done > 0.4 ? 0.5 : 0.55} />
                </div>
              </div>
            );
          })}

          <div style={{
            position: 'absolute', left: NODES[5].x - 14, top: NODES[5].y - 14, width: NW + 28, height: NH + 28,
            borderRadius: 20, border: `2px solid ${accent}`, opacity: 0.4 * ring, transform: `scale(${lerp(0.94, 1.04, ring)})`,
          }} />
        </div>

        <div style={{ position: 'absolute', left: 26, right: 26, bottom: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: C.line, overflow: 'hidden' }}>
            <div style={{ width: `${100 * io((T - Run) / (total - Run - 0.4))}%`, height: '100%', borderRadius: 3, background: accent, opacity: 0.75 }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2, 3].map((i) => {
              const on = T > [Draw, Connect, Run, Settle][i];
              return <div key={i} style={{ width: on ? 22 : 7, height: 7, borderRadius: 4, background: on ? accent : C.line, opacity: on ? 0.8 : 1 }} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildGraphic() {
  const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle, CompositionStage } = window;
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  React.useEffect(() => {
    const ping = () => window.dispatchEvent(new Event('resize'));
    const ids = [0, 60, 200, 500, 1200].map((ms) => setTimeout(ping, ms));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ping);
    return () => ids.forEach(clearTimeout);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C.bg}>
        <Graphic accent={t.accent} grid={t.grid} pulses={t.pulses} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Look" />
        <TweakColor label="Accent" value={t.accent} options={['#2F4E7A', '#3F6B5C', '#C4623F', '#26231E']} onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Dot grid" value={t.grid} onChange={(v) => setTweak('grid', v)} />
        <TweakToggle label="Flowing pulses" value={t.pulses} onChange={(v) => setTweak('pulses', v)} />
        <TweakSection label="Editing" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  );
}

window.BuildGraphic = BuildGraphic;
