import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], label, .chip, .tilt';
const TEXT = 'input, textarea, select';

/**
 * Custom cursor: a dot locked to the pointer tip and a ring that trails it.
 * The ring grows over links/buttons/cards and shrinks while pressed.
 * Only active on devices with a precise pointer (mouse / trackpad).
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('has-custom-cursor');

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      document.body.dataset.cursor = 'visible';

      const target = e.target as Element | null;
      const onText = !!target?.closest(TEXT);
      const onLink = !onText && !!target?.closest('a, button, [role="button"], label');
      const onCard = !onText && !onLink && !!target?.closest(INTERACTIVE);
      ring.dataset.state = onText ? 'text' : onLink ? 'link' : onCard ? 'card' : '';
      dot.dataset.state = onText ? 'text' : onLink ? 'link' : '';
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');
    const onLeave = () => (document.body.dataset.cursor = 'hidden');

    const loop = () => {
      const k = reduce ? 1 : 0.18;
      ringPos.x += (pos.x - ringPos.x) * k;
      ringPos.y += (pos.y - ringPos.y) * k;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <span />
      </div>
    </>
  );
}
