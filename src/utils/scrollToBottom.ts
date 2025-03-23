export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
  
    requestAnimationFrame(() => {
      setTimeout(() => {
        ref.current?.scrollTo({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50); 
    });
  };