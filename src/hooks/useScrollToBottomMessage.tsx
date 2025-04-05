import { useEffect, RefObject } from "react";

const useScrollToBottom = (penultimateRef: RefObject<HTMLElement>, dependency: any) => {
  useEffect(() => {
    if (!penultimateRef?.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.parentElement?.scrollTo({
            top: entry.target.parentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(penultimateRef.current);

    return () => observer.disconnect();
  }, [dependency, penultimateRef]);
};

export default useScrollToBottom