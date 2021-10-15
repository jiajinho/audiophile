import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { animated, useSpring } from 'react-spring';
import useMeasure from 'react-use-measure';

import Loading, { Wrapper as _Loading } from '../common/svg/Loading';
import useHover from '../common/hooks/useHover';

export const Wrapper = styled.div`
  aspect-ratio: 1/1;  
  height: 400rem;
  width: auto;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #eaeaea;
  border-radius: 10rem;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled(animated.img)`
  position: relative;
  z-index: 2;

  height: 70%;
`

const Shadow = styled(animated.div)(({ $width }: { $width: number }) => `
  position: relative;
  z-index: 1;

  width: ${$width * .6}rem;
`);

const LoadingMask = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;

  background: #eaeaea;

  display: flex;
  align-items: center;
  justify-content: center;

  ${_Loading} {
    aspect-ratio: 1/1;
    height: auto;
    width: 40rem;
  }
`;

const getSpringProps = (hover: boolean) => ({
  y: hover ? "0rem" : "-10rem",
  boxShadow: hover ? "0 0 30rem 5rem black" : "0 0 40rem 5rem black"
});

const ProductCard = ({ imgSrc, imgAlt = "", onClick }: {
  imgSrc?: string,
  imgAlt?: string,
  onClick?: () => void
}) => {

  const [boundRef, bound] = useMeasure();
  const [loaded, setLoaded] = useState(false);
  const [hover, hoverRef] = useHover<HTMLDivElement>();

  const [spring, api] = useSpring(() => getSpringProps(false));

  useEffect(() => {
    if (hoverRef.current) {
      api.start(getSpringProps(hover));
    }
  }, [hover, hoverRef, api]);

  return (
    <Wrapper ref={hoverRef} onClick={() => onClick && onClick()}>
      <Image
        ref={boundRef}
        src={imgSrc}
        alt={imgAlt}
        onLoad={() => setLoaded(true)}
        style={{ y: spring.y }}
      />

      <Shadow style={{ boxShadow: spring.boxShadow }} $width={bound.width} />

      {(!loaded || !imgSrc) &&
        <LoadingMask>
          <Loading />
        </LoadingMask>
      }
    </Wrapper>
  );
}


export default ProductCard;