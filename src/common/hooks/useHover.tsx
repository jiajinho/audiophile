import React, { useState, useEffect, useRef } from 'react';

function useHover<T extends HTMLElement>(): [boolean, React.RefObject<T>] {
  const ref = useRef<T>(null);
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  useEffect(() => {
    const node = ref.current;

    node?.addEventListener("mouseover", handleMouseOver);
    node?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node?.removeEventListener("mouseover", handleMouseOver);
      node?.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [ref]);

  return [hover, ref];
}


export default useHover;