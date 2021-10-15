import React, { useState } from 'react';
import styled from 'styled-components/macro';

import Loading, { Wrapper as _Loading } from '../common/svg/Loading';

export const Wrapper = styled.div(({ $draggable }: { $draggable: boolean }) => `
  position: relative;
  width: 100%;

  border-radius: 10rem;
  overflow: hidden;
  user-select: ${$draggable ? "auto" : "none"};
`);

export const Image = styled.img`
  height: 100%;
  width: 100%;

  object-fit: cover;
`;

const LoadingMask = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes idle {
    from { background: #ccc }
    to { background: #e7e7e7 }
  }

  animation-name: idle;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  ${_Loading} {
    aspect-ratio: 1/1;
    width: 40rem;
    height: auto;
  }
`;

const ImageCard = ({ imgSrc, imgAlt, draggable = true, onTap }: {
  imgSrc?: string,
  imgAlt?: string,
  draggable?: boolean,
  onTap?: () => void
}) => {
  /**
   * Hooks
   */
  const [loaded, setLoaded] = useState(false);
  const [tap, setTap] = useState(false);

  /**
   * Not hooks
   */
  const handleLoad = () => setLoaded(true);

  const handleMouseDown = () => {
    setTap(true);
    window.setTimeout(() => setTap(false), 100);
  }

  const handleMouseUp = () => {
    if (tap && onTap) onTap();
  }

  return (
    <Wrapper $draggable={draggable}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        draggable={draggable}
        onLoad={handleLoad}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />

      {(!imgSrc || !loaded) &&
        <LoadingMask>
          <Loading />
        </LoadingMask>
      }

    </Wrapper>
  );
}

export default ImageCard;