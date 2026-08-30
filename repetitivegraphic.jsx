// repetitivegraphic.jsx — standalone graphic, no copy. Plays once and holds:
// six abstract rows build, fan into repeat-stacks, tick off, then the open
// slot 07 keeps getting different things written into it.
const W = 1000, H = 1000;
const C = { bg: '#EFEBE2', paper: '#FFFDF8', line: '#E2DBCB', ink: '#26231E', mute: '#A9A192', soft: '#C6BEAE' };

const PHRASES = [
  'Entering the same information in multiple places',
  'Managing an important process through spreadsheets',
  'Copying data between systems',
  'Chasing approvals, updates, or paperwork',
  'Building reports by hand',
  'Working around software that doesn’t quite fit',
  'Whatever your team keeps redoing',
];

const BARS = [[300, 168], [244, 132], [330, 150], [268, 176], [212, 140], [318, 158]];

const cl = (u) => Math.max(0, Math.min(1, u));
const io = (u) => window.Easing.easeInOutCubic(cl(u));
const eo = (u) => window.Easing.easeOutCubic(cl(u));
const ob = (u) => { const t = cl(u); return 1 - Math.pow(1 - t, 3) + 0.1 * Math.sin(t * Math.PI) * (1 - t); };
const lerp = (a, b, u) => a + (b - a) * u;

function Row({ i, y, opacity, lift, ghost, tick, accent }) {
  const shell = { position: 'absolute', left: 0, right: 0, height: 84, borderRadius: 13, background: C.paper, border: `1px solid ${C.line}` };
  const ghostLayer = (k) => ({
    ...shell, borderColor: C.soft,
    transform: `translate(${-34 * k * ghost}px, ${-10 * k * ghost}px) rotate(${-1.2 * k * ghost}deg)`,
    opacity: (k === 2 ? 0.5 : 0.78) * ghost,
    boxShadow: `0 6px 16px rgba(38,35,30,${0.05 * ghost})`,
  });
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: y, height: 84, opacity, transform: `translateY(${lift}px)` }}>
      <div style={ghostLayer(2)} />
      <div style={ghostLayer(1)} />
      <div style={{
        ...shell, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxSizing: 'border-box',
        boxShadow: `0 ${8 + 6 * ghost}px ${20 + 10 * ghost}px rgba(38,35,30,${0.05 + 0.03 * ghost})`,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', color: accent, fontVariantNumeric: 'tabular-nums', width: 28, flex: '0 0 auto' }}>
          {String(i + 1).padStart(2, '0')}
        </div>
        <div style={{ width: 1, height: 30, background: C.line, flex: '0 0 auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          <div style={{ width: BARS[i][0], height: 9, borderRadius: 5, background: C.soft }} />
          <div style={{ width: BARS[i][1], height: 7, borderRadius: 4, background: C.soft, opacity: 0.55 }} />
        </div>
        <div style={{
          width: 22, height: 22, borderRadius: 7, flex: '0 0 auto',
          border: `1.5px solid ${tick > 0.02 ? accent : C.soft}`, background: tick > 0.02 ? accent : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${1 + 0.16 * Math.sin(cl(tick) * Math.PI)})`,
        }}>
          <svg width="13" height="13" viewBox="0 0 12 12" style={{ opacity: tick }}>
            <path d="M2.5 6.4 L4.9 8.7 L9.5 3.5" fill="none" stroke={C.paper} strokeWidth="1.9" strokeLinecap="round"
              strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - cl(tick)} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Graphic({ accent = '#3F6B5C', grid = true }) {
  const { T, CUES, authoredTotal } = window.useComposition();
  const total = authoredTotal || 17.6;
  const Build = CUES.Build ?? 0, Repeat = CUES.Repeat ?? 2.2, Ticks = CUES.Ticks ?? 4.6, Write = CUES.Write ?? 6.2;

  const rows = BARS.map((_, i) => {
    const app = ob((T - (Build + 0.2 + i * 0.15)) / 0.7);
    const g0 = ob((T - (Repeat + i * 0.09)) / 0.5);
    const g1 = io((T - (Repeat + 1.35 + i * 0.09)) / 0.6);
    return {
      i, y: i * 100, opacity: app, lift: lerp(26, 0, app),
      ghost: g0 * (1 - g1), tick: eo((T - (Ticks + i * 0.11)) / 0.3),
    };
  });

  // slot 07: each phrase types in, holds, clears; the last one stays
  const PER = (total - Write - 0.2) / PHRASES.length;
  const idx = Math.min(PHRASES.length - 1, Math.floor((T - Write) / PER));
  const local = T - Write - idx * PER;
  const last = idx === PHRASES.length - 1;
  const phrase = PHRASES[Math.max(0, idx)];
  const typeU = cl(local / (PER * 0.42));
  const eraseU = last ? 0 : cl((local - PER * 0.78) / (PER * 0.2));
  const chars = T < Write ? 0 : Math.round(phrase.length * (typeU - eraseU * typeU));
  const slotIn = ob((T - (Write - 0.35)) / 0.6);
  const typing = T >= Write && chars < phrase.length && eraseU === 0;
  const caret = typing || Math.floor(T * 1.9) % 2 === 0 ? 1 : 0.12;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: C.bg, overflow: 'hidden',
      fontFamily: "'Instrument Sans', system-ui, sans-serif", color: C.ink,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 96, boxSizing: 'border-box',
    }}>
      <div style={{
        position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${C.soft} 1.1px, transparent 1.2px)`,
        backgroundSize: '26px 26px', opacity: grid ? 0.3 : 0,
      }} />
      <div style={{ position: 'relative', width: 760, height: 684 }}>
        {rows.map((r) => <Row key={r.i} {...r} accent={accent} />)}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 600, height: 84, borderRadius: 13,
          border: `1.5px dashed ${slotIn > 0.5 ? accent : '#D2C9B7'}`, display: 'flex', alignItems: 'center',
          gap: 26, padding: '0 30px', boxSizing: 'border-box',
          opacity: slotIn, transform: `translateY(${lerp(22, 0, slotIn)}px)`,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', color: '#C0B7A6', fontVariantNumeric: 'tabular-nums', width: 28, flex: '0 0 auto' }}>07</div>
          <div style={{ width: 1, height: 30, background: C.line, flex: '0 0 auto' }} />
          <div style={{ fontSize: 19, lineHeight: 1.3, color: C.mute, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span>{phrase.slice(0, chars)}</span>
            <span style={{ display: 'inline-block', width: 2, height: 22, background: accent, opacity: 0.65 * caret, marginLeft: 6, flex: '0 0 auto' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RepetitiveGraphic() {
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
        <Graphic accent={t.accent} grid={t.grid} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Look" />
        <TweakColor label="Accent" value={t.accent} options={['#3F6B5C', '#2F4E7A', '#C4623F', '#26231E']} onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Dot grid" value={t.grid} onChange={(v) => setTweak('grid', v)} />
        <TweakSection label="Editing" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  );
}

window.RepetitiveGraphic = RepetitiveGraphic;
