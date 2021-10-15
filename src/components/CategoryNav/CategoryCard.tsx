import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

import useHover from '../../common/hooks/useHover';
import ShopButton, { Wrapper as _ShopButton, arrowTranslateX } from '../ShopButton';
import { Wrapper as _ArrowRight } from '../../common/svg/ArrowRight';
import Loading, { Wrapper as _Loading } from '../../common/svg/Loading';

export const Wrapper = styled.div`
  position: relative;

  width: 100%;
  max-width: 400rem;
  height: 300rem;
`;

const ImageContainer = styled.div`
  position: absolute;
  z-index: 1;

  height: 55%;
  cursor: pointer;

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 25%);

  :hover + div ${_ShopButton} {
    color: var(--theme-primary);
  }

  :hover + div ${_ArrowRight} {
    transform: translateX(${arrowTranslateX});
  }

  ${_Loading} {
    position: absolute;
    z-index: 3;

    aspect-ratio: 1/1;
    height: 25%;
    width: auto;
  }
`;

const Image = styled(animated.img)`
  height: 100%;
  position: relative;
  z-index: 2;

  font-size: 16rem;
`;

const Shadow = styled(animated.div)`
  width: 60%;
  position: relative;
  z-index: 1;

  box-shadow: 0 0 30px 5px black;
`;

const Background = styled.div`
  position: absolute;
  bottom: 0;

  height: 70%;
  width: 100%;

  background: #eaeaea;
  border-radius: 10rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  ${_ShopButton} {
    margin-bottom: 5rem;
  }

  :hover ${_ShopButton} {
    color: var(--theme-primary);
  }

  :hover ${_ShopButton} > ${_ArrowRight} {
    transform: translateX(${arrowTranslateX});
  }
`;

const getSpringProps = (hover: boolean, loaded: boolean) => ({
  y: hover ? "0rem" : "-10rem",
  boxShadow: hover ? "0 0 20px 5px black" : "0 0 30px 5px black",
  opacity: loaded ? 1 : 0,
  immediate: (k: string) => k === "opacity"
});

const CategoryCard = ({ category, imgSrc, imgAlt, linkTo, additionalOnClick }: {
  category: string,
  imgSrc: string,
  imgAlt: string,
  linkTo: string,
  additionalOnClick?: () => void
}) => {
  /**
   * Hooks
   */
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [imgHover, imgRef] = useHover<HTMLDivElement>();
  const [bgHover, bgRef] = useHover<HTMLDivElement>();
  const [spring, api] = useSpring(() => getSpringProps(false, loaded));

  useEffect(() => {
    if (imgRef.current && bgRef.current) {
      api.start(getSpringProps(imgHover || bgHover, loaded));
    }
  }, [imgHover, bgHover, loaded, api, bgRef, imgRef]);

  /**
   * Not hook
   */
  const handleLinkTo = () => {
    history.push(linkTo);
    additionalOnClick && additionalOnClick();
  }

  /**
   * Render
   */
  return (
    <Wrapper>
      <ImageContainer ref={imgRef} onClick={handleLinkTo}>
        {!loaded && <Loading />}

        <Image
          src={imgSrc}
          alt={imgAlt}
          style={{ y: spring.y, opacity: spring.opacity }}

          onLoad={() => setLoaded(true)}
        />
        <Shadow style={{ boxShadow: spring.boxShadow, opacity: spring.opacity }} />
      </ImageContainer>

      <Background ref={bgRef} onClick={handleLinkTo}>
        <h3>{category}</h3>
        <ShopButton />
      </Background>
    </Wrapper>
  );
}

export default CategoryCard;