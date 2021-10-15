import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';

import { strings, viewport, css } from '../common/config';
import { MediaContext } from '../common/contexts';
import Loading, { Wrapper as _Loading } from '../common/svg/Loading';

export const Wrapper = styled.div`
  margin: 100rem 0;
  padding: 0 ${css.window.horizontalPadding.xs};


  @media screen and (min-width: ${viewport.sm}) {
    padding: 0 ${css.window.horizontalPadding.sm};
  }

  @media screen and (min-width: ${viewport.lg}) {
    padding: 0 ${css.window.horizontalPadding.lg};

    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  @media screen and (min-width: ${viewport.lg}) {
    width: 50%;
  }

  @media screen and (min-width: ${viewport.xl}) {
    width: unset;
  }
`;

const LoadingMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  height: 100%;
  width: 100%;
  background: #f4f4f4;

  display: flex;
  justify-content: center;
  align-items: center;

  ${_Loading} {
    height: 10%;
    width: auto;
  }
`;

const Image = styled.img`
  position: relative;
  z-index: 1;
  border-radius: 10rem;

  aspect-ratio: 109/100;
  width: 100%;
  height: auto;

  @media screen and (min-width: ${viewport.sm}) {
    aspect-ratio: 689/300;
  }

  @media screen and (min-width: ${viewport.lg}) {
    aspect-ratio: 540/588;
    max-width: 500rem;
  }
`;

const TextContainer = styled.div`
  text-align: center;

  @media screen and (min-width: ${viewport.lg}) {
    width: 50%;
    text-align: start;
    padding-right: 40rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (min-width: ${viewport.xl}) {
    flex-grow: 1;
    padding-right: 5%;
  }
`;

const Title = styled.h2`
  margin: 0 10rem;
  margin-top: 40rem;
  margin-bottom: 25rem;

  span {
    color: var(--theme-primary);
  }

  @media screen and (min-width: ${viewport.lg}) {
    margin: 0;
    margin-bottom: 25rem;
  }
`;

const Description = styled.p`
  @media screen and (min-width: ${viewport.md}) {
    margin: 0 40rem;
  }

  @media screen and (min-width: ${viewport.lg}) {
    margin: 0;
  }
`;

const Footnote = () => {

  const { sm, lg } = useContext(MediaContext);
  const [loaded, setLoaded] = useState(false);

  const imageSizeSuffix = lg ? "lg" : sm ? "sm" : "xs";

  return (
    <Wrapper>
      <ImageContainer>
        <Image
          src={`/static/shared/footnote-guy-${imageSizeSuffix}.jpg`}
          alt="Handsome guy wearing our headphones"
          onLoad={() => setLoaded(true)}
        />

        {!loaded &&
          <LoadingMask>
            <Loading />
          </LoadingMask>
        }
      </ImageContainer>

      <TextContainer>
        <Title>BRINGING YOU THE <span>BEST</span> AUDIO GEAR</Title>
        <Description className="light">{strings.footnote.description}</Description>
      </TextContainer>
    </Wrapper>
  );
}

export default Footnote;