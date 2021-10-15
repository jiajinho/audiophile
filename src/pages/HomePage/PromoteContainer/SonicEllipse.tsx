import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { animated, useSpring } from 'react-spring';

export const Wrapper = styled(animated.div)(({ $radius }: { $radius: number }) => `
  aspect-ratio: 1/1;
  width: ${$radius * 2}rem;
  height: auto;

  border-radius: 50%;
  border: 2rem solid;
  border-color: #ccc;
`);

const SonicEllipse = ({ radius, delay }: {
  radius: number,
  delay: number, //in millisecond
}) => {
  /**
   * Not hook
   */
  const pulseInterval = 2000;

  /**
   * Hooks
   */
  const [spring, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: .5 },
    delay,
    loop: {
      from: { opacity: .5 },
      to: { opacity: 0 },
      delay: pulseInterval,
      loop: { reverse: true }
    }
  }));

  useEffect(() => {
    const onTabChange = () => document.hidden ? api.pause() : api.resume();

    document.addEventListener("visibilitychange", onTabChange);
    return () => document.removeEventListener("visibilitychange", onTabChange);
  }, []);

  /**
   * Render
   */
  return (
    <Wrapper style={spring} $radius={radius} />
  )
}

export default SonicEllipse;