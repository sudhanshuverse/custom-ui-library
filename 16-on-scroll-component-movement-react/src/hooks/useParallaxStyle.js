import { useEffect, useRef, useState } from "react";

/**
 * useParallaxStyle
 * Smooth, reusable scroll parallax hook
 *
 * Usage:
 * const parallax = useParallaxStyle();
 * <img style={parallax({ speed: 0.1 })} />
 */
export function useParallaxStyle() {
  const scrollY = useRef(0);
  const current = useRef(0);
  const rafId = useRef(null);

  const [, forceRender] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    const animate = () => {
      // Smooth interpolation (lerp)
      current.current += (scrollY.current - current.current) * 0.08;

      // trigger re-render
      forceRender(v => v + 1);

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return ({
    speed = 0.1,
    min = -100,
    max = 100
  } = {}) => {
    const value = Math.min(
      Math.max(current.current * speed, min),
      max
    );

    return {
      transform: `translateY(${value}px)`,
      willChange: "transform"
    };
  };
}
