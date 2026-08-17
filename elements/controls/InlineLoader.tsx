import styles from '@elements/controls/InlineLoader.module.css';

import * as React from 'react';

const INLINE_LOADER_FRAMES = ['⠋⠉⠙⠚', '⠉⠙⠚⠒', '⠙⠚⠒⠂', '⠚⠒⠂⠂', '⠒⠂⠂⠒', '⠂⠂⠒⠲', '⠂⠒⠲⠴', '⠒⠲⠴⠤', '⠲⠴⠤⠄', '⠴⠤⠄⠋', '⠤⠄⠋⠉', '⠄⠋⠉⠙'];
const INLINE_LOADER_INTERVAL = 80;

export default function InlineLoader(props) {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let accumulator = 0;
    let localFrame = 0;

    const tick = (now: number) => {
      accumulator += now - lastTime;
      lastTime = now;
      if (accumulator >= INLINE_LOADER_INTERVAL) {
        const steps = Math.floor(accumulator / INLINE_LOADER_INTERVAL);
        accumulator -= steps * INLINE_LOADER_INTERVAL;
        localFrame = (localFrame + steps) % INLINE_LOADER_FRAMES.length;
        setFrame(localFrame);
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <span className={styles.root} style={props.style}>
      {INLINE_LOADER_FRAMES[frame]}
    </span>
  );
}
