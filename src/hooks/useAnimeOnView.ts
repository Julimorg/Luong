import { useEffect, useRef } from "react";

/**
 * Chạy một hiệu ứng anime.js đúng một lần, khi phần tử cuộn vào khung nhìn.
 *
 * `run` nhận phần tử gốc và tự quyết định animate cái gì bên trong.
 * Hàm trả về (nếu có) sẽ được gọi khi component unmount để dọn animation.
 */
export function useAnimeOnView<T extends HTMLElement = HTMLDivElement>(
  run: (el: T) => (() => void) | void,
  { threshold = 0.25, rootMargin = "0px 0px -80px 0px" } = {},
) {
  const ref = useRef<T>(null);
  const runRef = useRef(run);

  // Giữ callback mới nhất mà không khởi động lại observer.
  useEffect(() => {
    runRef.current = run;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Tôn trọng thiết lập "giảm chuyển động" của hệ điều hành.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | void;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.unobserve(el);
          cleanup = runRef.current(el);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [threshold, rootMargin]);

  return ref;
}
