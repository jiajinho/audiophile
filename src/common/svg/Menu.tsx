import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { animated, useSpring } from 'react-spring';

export const Wrapper = styled.svg`
  height: 100%;
  width: 100%;

  path {
    transform-box: fill-box;
    transform-origin: 50%;
  }
`;

const getSpringProps = (expand: boolean) => ({
  top: expand ? "45deg" : "0deg",
  bottom: expand ? "-45deg" : "0deg",
  offsetY: expand ? "390%" : "0%",
  middle: expand ? 0 : 1
});

const Menu = ({ expand, onClick }: {
  expand: boolean,
  onClick?: () => void
}) => {
  /**
   * Hooks
   */
  const [spring, api] = useSpring(() => getSpringProps(expand));

  useEffect(() => {
    api.start(getSpringProps(expand));
  }, [expand, api]);

  /**
   * Render
   */
  return (
    <Wrapper
      height="384pt"
      viewBox="0 -53 384 384"
      width="384pt"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onClick && onClick()}
    >
      <animated.path
        d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 
          16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        fill="white"
        style={{ opacity: spring.middle }}
      />
      <animated.path
        d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031
          0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        fill="white"
        style={{
          transform: spring.top.to(v => `rotateZ(${v})`),
          y: spring.offsetY
        }}
      />
      <animated.path
        d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 
          0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        fill="white"
        style={{
          transform: spring.bottom.to(v => `rotateZ(${v})`),
          y: spring.offsetY.to(v => `-${v}`)
        }}
      />
    </Wrapper>
  );
}

export default Menu;