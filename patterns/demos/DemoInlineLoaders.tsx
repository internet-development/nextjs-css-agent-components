import styles from '@patterns/demos/DemoInlineLoaders.module.css';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import InlineLoader from '@elements/controls/InlineLoader';
import MonospacePreview from '@components/MonospacePreview';

import { FormHeading } from '@elements/type/forms';

const SPINNERS = [
  { frames: ['⠋⠋⠋⠋', '⠙⠙⠙⠙', '⠹⠹⠹⠹', '⠸⠸⠸⠸', '⠼⠼⠼⠼', '⠴⠴⠴⠴', '⠦⠦⠦⠦', '⠧⠧⠧⠧', '⠇⠇⠇⠇', '⠏⠏⠏⠏'], interval: 80 },
  { frames: ['⠁⠂⠄⡀', '⠂⠄⡀⢀', '⠄⡀⢀⠠', '⡀⢀⠠⠐', '⢀⠠⠐⠈', '⠠⠐⠈⠁', '⠐⠈⠁⠂', '⠈⠁⠂⠄'], interval: 100 },
  { frames: ['⠋⠉⠙⠚', '⠉⠙⠚⠒', '⠙⠚⠒⠂', '⠚⠒⠂⠂', '⠒⠂⠂⠒', '⠂⠂⠒⠲', '⠂⠒⠲⠴', '⠒⠲⠴⠤', '⠲⠴⠤⠄', '⠴⠤⠄⠋', '⠤⠄⠋⠉', '⠄⠋⠉⠙'], interval: 80 },
  { frames: ['⠀⠀⠀⠀', '⡇⠀⠀⠀', '⣿⠀⠀⠀', '⢸⡇⠀⠀', '⠀⣿⠀⠀', '⠀⢸⡇⠀', '⠀⠀⣿⠀', '⠀⠀⢸⡇', '⠀⠀⠀⣿', '⠀⠀⠀⢸'], interval: 70 },
  { frames: ['⢁⠂⠔⠈', '⠂⠌⡠⠐', '⠄⡐⢀⠡', '⡈⠠⠀⢂', '⠐⢀⠁⠄', '⠠⠁⠊⡀', '⢁⠂⠔⠈', '⠂⠌⡠⠐', '⠄⡐⢀⠡', '⡈⠠⠀⢂', '⠐⢀⠁⠄', '⠠⠁⠊⡀'], interval: 100 },
  { frames: ['⠉⠉⠉⠉', '⠓⠓⠓⠓', '⠦⠦⠦⠦', '⣄⣄⣄⣄', '⠦⠦⠦⠦', '⠓⠓⠓⠓'], interval: 120 },
  { frames: ['⠀⠰⠆⠀', '⠀⢾⡷⠀', '⠰⣿⣿⠆', '⢾⣉⣉⡷', '⡁⠀⠀⢈'], interval: 180 },
  { frames: ['⠉⠉⠀⠀', '⠈⠉⠁⠀', '⠀⠉⠉⠀', '⠀⠈⠉⠁', '⠀⠀⠉⠉', '⠀⠀⠈⠙', '⠀⠀⠀⠹', '⠀⠀⠀⢸', '⠀⠀⠀⣰', '⠀⠀⢀⣠', '⠀⠀⣀⣀', '⠀⢀⣀⡀', '⠀⣀⣀⠀', '⢀⣀⡀⠀', '⣀⣀⠀⠀', '⣄⡀⠀⠀', '⣆⠀⠀⠀', '⡇⠀⠀⠀', '⠏⠀⠀⠀', '⠋⠁⠀⠀'], interval: 80 },
  { frames: ['⡡⠊⢔⠡', '⠊⡰⡡⡘', '⢔⢅⠈⢢', '⡁⢂⠆⡍', '⢔⠨⢑⢐', '⠨⡑⡠⠊'], interval: 150 },
  { frames: ['⠀⠀⠀⠀', '⠀⠀⠀⠀', '⠁⠀⠀⠀', '⠋⠀⠀⠀', '⠞⠁⠀⠀', '⡴⠋⠀⠀', '⣠⠞⠁⠀', '⢀⡴⠋⠀', '⠀⣠⠞⠁', '⠀⢀⡴⠋', '⠀⠀⣠⠞', '⠀⠀⢀⡴', '⠀⠀⠀⣠', '⠀⠀⠀⢀'], interval: 60 },
  {
    frames: ['⡀⠀⠀⠀', '⡄⠀⠀⠀', '⡆⠀⠀⠀', '⡇⠀⠀⠀', '⣇⠀⠀⠀', '⣧⠀⠀⠀', '⣷⠀⠀⠀', '⣿⠀⠀⠀', '⣿⡀⠀⠀', '⣿⡄⠀⠀', '⣿⡆⠀⠀', '⣿⡇⠀⠀', '⣿⣇⠀⠀', '⣿⣧⠀⠀', '⣿⣷⠀⠀', '⣿⣿⠀⠀', '⣿⣿⡀⠀', '⣿⣿⡄⠀', '⣿⣿⡆⠀', '⣿⣿⡇⠀', '⣿⣿⣇⠀', '⣿⣿⣧⠀', '⣿⣿⣷⠀', '⣿⣿⣿⠀', '⣿⣿⣿⡀', '⣿⣿⣿⡄', '⣿⣿⣿⡆', '⣿⣿⣿⡇', '⣿⣿⣿⣇', '⣿⣿⣿⣧', '⣿⣿⣿⣷', '⣿⣿⣿⣿', '⣿⣿⣿⣿', '⠀⠀⠀⠀'],
    interval: 60,
  },
  { frames: ['⠃⠃⠃⠃', '⠉⠉⠉⠉', '⠘⠘⠘⠘', '⠰⠰⠰⠰', '⢠⢠⢠⢠', '⣀⣀⣀⣀', '⡄⡄⡄⡄', '⠆⠆⠆⠆'], interval: 100 },
  { frames: ['⠀⠀⠀⠀', '⠂⠂⠂⠂', '⠌⠌⠌⠌', '⡑⡑⡑⡑', '⢕⢕⢕⢕', '⢝⢝⢝⢝', '⣫⣫⣫⣫', '⣟⣟⣟⣟', '⣿⣿⣿⣿', '⣟⣟⣟⣟', '⣫⣫⣫⣫', '⢝⢝⢝⢝', '⢕⢕⢕⢕', '⡑⡑⡑⡑', '⠌⠌⠌⠌', '⠂⠂⠂⠂', '⠀⠀⠀⠀'], interval: 100 },
  { frames: ['⠖⠉⠉⠑', '⡠⠖⠉⠉', '⣠⡠⠖⠉', '⣄⣠⡠⠖', '⠢⣄⣠⡠', '⠙⠢⣄⣠', '⠉⠙⠢⣄', '⠊⠉⠙⠢', '⠜⠊⠉⠙', '⡤⠜⠊⠉', '⣀⡤⠜⠊', '⢤⣀⡤⠜', '⠣⢤⣀⡤', '⠑⠣⢤⣀', '⠉⠑⠣⢤', '⠋⠉⠑⠣'], interval: 90 },
  { frames: ['⢕⢕⢕⢕', '⡪⡪⡪⡪', '⢊⠔⡡⢊', '⡡⢊⠔⡡'], interval: 250 },
  { frames: ['⢌⣉⢎⣉', '⣉⡱⣉⡱', '⣉⢎⣉⢎', '⡱⣉⡱⣉', '⢎⣉⢎⣉', '⣉⡱⣉⡱', '⣉⢎⣉⢎', '⡱⣉⡱⣉', '⢎⣉⢎⣉', '⣉⡱⣉⡱', '⣉⢎⣉⢎', '⡱⣉⡱⣉', '⢎⣉⢎⣉', '⣉⡱⣉⡱', '⣉⢎⣉⢎', '⡱⣉⡱⣉'], interval: 80 },
  { frames: ['⣀⣀⣀⣀', '⣤⣤⣤⣤', '⣶⣶⣶⣶', '⣿⣿⣿⣿', '⣿⣿⣿⣿', '⣿⣿⣿⣿', '⣶⣶⣶⣶', '⣤⣤⣤⣤', '⣀⣀⣀⣀', '⠀⠀⠀⠀', '⠀⠀⠀⠀'], interval: 100 },
  {
    frames: ['⠁⠀⠀⠀', '⠋⠀⠀⠀', '⠟⠁⠀⠀', '⡿⠋⠀⠀', '⣿⠟⠁⠀', '⣿⡿⠋⠀', '⣿⣿⠟⠁', '⣿⣿⡿⠋', '⣿⣿⣿⠟', '⣿⣿⣿⡿', '⣿⣿⣿⣿', '⣿⣿⣿⣿', '⣾⣿⣿⣿', '⣴⣿⣿⣿', '⣠⣾⣿⣿', '⢀⣴⣿⣿', '⠀⣠⣾⣿', '⠀⢀⣴⣿', '⠀⠀⣠⣾', '⠀⠀⢀⣴', '⠀⠀⠀⣠', '⠀⠀⠀⢀', '⠀⠀⠀⠀', '⠀⠀⠀⠀'],
    interval: 60,
  },
];

const WORDS = ['Thinking', 'Pondering', 'Reasoning', 'Analyzing', 'Processing', 'Computing', 'Evaluating', 'Reflecting', 'Deliberating', 'Considering', 'Contemplating', 'Mulling', 'Deducing', 'Inferring', 'Examining', 'Synthesizing', 'Assessing', 'Ruminating'];

const DOT_STRINGS = ['﹒', '﹒﹒', '﹒﹒﹒'];

const CYCLE_MS = 12000;

const METRICS = [
  { key: 'impressions', label: 'Impressions', value: '2,148,391', delay: 1400 },
  { key: 'clicks', label: 'Clicks', value: '84,209', delay: 2600 },
  { key: 'ctr', label: 'Click-through rate', value: '3.92%', delay: 3400 },
  { key: 'spend', label: 'Spend', value: '$12,408.55', delay: 4800 },
  { key: 'conversions', label: 'Conversions', value: '1,932', delay: 6200 },
  { key: 'cpa', label: 'Cost per acquisition', value: '$6.42', delay: 7600 },
];

const TASKS = [
  { name: 'sync-audiences', lines: ['fetching 412 segments', 'diffing against store', 'writing 38 updates'], finishMs: 5200 },
  { name: 'watch-campaigns', lines: ['polling every 30s', 'no drift detected'], finishMs: null },
];

function formatElapsed(milliseconds) {
  if (milliseconds < 1000) return `(${milliseconds}ms)`;
  if (milliseconds < 60000) return `(${(milliseconds / 1000).toFixed(1)}s)`;
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `(${minutes}m ${seconds}s)`;
}

function AgentActivity(props) {
  const [state, setState] = React.useState(() => ({
    frames: SPINNERS.map(() => 0),
    dotPhase: 0,
    elapsed: 0,
  }));

  React.useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const spinnerAccumulators = new Float64Array(SPINNERS.length);
    let dotAccumulator = 0;
    let elapsedAccumulator = 0;

    const localFrames = new Int32Array(SPINNERS.length);
    let localDotPhase = 0;
    let localElapsed = 0;

    const tick = (now: number) => {
      const deltaMs = now - lastTime;
      lastTime = now;

      let changed = false;

      for (let index = 0; index < SPINNERS.length; index++) {
        spinnerAccumulators[index] += deltaMs;
        if (spinnerAccumulators[index] >= SPINNERS[index].interval) {
          const steps = (spinnerAccumulators[index] / SPINNERS[index].interval) | 0;
          spinnerAccumulators[index] -= steps * SPINNERS[index].interval;
          localFrames[index] = (localFrames[index] + steps) % SPINNERS[index].frames.length;
          changed = true;
        }
      }

      dotAccumulator += deltaMs;
      if (dotAccumulator >= 500) {
        const steps = (dotAccumulator / 500) | 0;
        dotAccumulator -= steps * 500;
        localDotPhase = (localDotPhase + steps) % 3;
        changed = true;
      }

      elapsedAccumulator += deltaMs;
      if (elapsedAccumulator >= 100) {
        const steps = (elapsedAccumulator / 100) | 0;
        elapsedAccumulator -= steps * 100;
        localElapsed += steps * 100;
        changed = true;
      }

      if (changed) {
        setState({
          frames: Array.from(localFrames),
          dotPhase: localDotPhase,
          elapsed: localElapsed,
        });
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const dots = DOT_STRINGS[state.dotPhase];

  return (
    <div>
      {SPINNERS.map((spinner, index) => (
        <div className={styles.agentLine} key={index}>
          {spinner.frames[state.frames[index]]}
          {'  '}
          {WORDS[index]}
          <span className={styles.subdued}>{dots}</span> <span className={styles.subdued}>{formatElapsed(state.elapsed)}</span>
        </div>
      ))}
    </div>
  );
}

export default function DemoInlineLoaders(props) {
  const [cycle, setCycle] = React.useState(0);
  const [arrived, setArrived] = React.useState({});
  const [finished, setFinished] = React.useState({});

  React.useEffect(() => {
    const timers: number[] = [];

    METRICS.forEach((metric) => {
      timers.push(window.setTimeout(() => setArrived((previous) => ({ ...previous, [metric.key]: true })), metric.delay));
    });

    TASKS.forEach((task) => {
      if (!task.finishMs) return;
      timers.push(window.setTimeout(() => setFinished((previous) => ({ ...previous, [task.name]: true })), task.finishMs));
    });

    timers.push(
      window.setTimeout(() => {
        setArrived({});
        setFinished({});
        setCycle((previous) => previous + 1);
      }, CYCLE_MS)
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [cycle]);

  return (
    <div className={styles.root} style={props.style}>
      <FormHeading>Inline Loaders</FormHeading>
      <div className={styles.grid}>
        <div className={styles.panel}>
          <div className={styles.panelTitle}>01 — Placeholder</div>
          <div className={styles.panelBody}>
            <div className={styles.panelCaption}>A metric that hasn’t arrived renders the loader where the number will go. When the value lands, it replaces the loader in place.</div>
            <div className={styles.metrics}>
              {METRICS.map((metric) => (
                <div key={metric.key}>
                  <div className={styles.metricLabel}>{metric.label}</div>
                  <div className={styles.metricValue}>{arrived[metric.key] ? metric.value : <InlineLoader />}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelTitle}>02 — Running tasks</div>
          <div className={styles.panelBody}>
            <div className={styles.panelCaption}>Each task is a mini terminal window. While it runs, a prompt line animates beneath its output.</div>
            {TASKS.map((task) => {
              const isDone = Boolean(finished[task.name]);

              return (
                <MonospacePreview isActive={!isDone} key={task.name} style={{ marginTop: 16 }} title={task.name}>
                  {task.lines.map((line) => (
                    <div key={line} style={{ opacity: 0.6 }}>
                      {line}
                    </div>
                  ))}
                  <div>$ {isDone ? <span className={styles.success}>exit 0 {formatElapsed(task.finishMs)}</span> : <InlineLoader />}</div>
                </MonospacePreview>
              );
            })}
          </div>
        </div>

        <div className={Utilities.classNames(styles.panel, styles.panelWide)}>
          <div className={styles.panelTitle}>03 — Agent activity</div>
          <div className={styles.panelBody}>
            <div className={styles.panelCaption}>The full spinner set as an agent’s terminal output.</div>
            <AgentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
