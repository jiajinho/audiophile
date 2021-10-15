import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import { viewport } from '../../../common/config';
import ImageCard, { Wrapper as _ImageCard } from '../../../components/ImageCard';
import SonicEllipse, { Wrapper as _SonicEllipse } from './SonicEllipse';
import Button from '../../../components/Button';

export const Wrapper = styled.div`
  padding: 60rem 10rem;
  border-radius: 10rem;
  background: var(--theme-primary);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: ${viewport.md}) {
    padding: 20rem 10rem;
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  z-index: 1;

  ${_ImageCard} {
    height: 300rem;
    width: auto;

    position: relative;
    z-index: 2;
  }

  ${_SonicEllipse} {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  @media screen and (min-width: ${viewport.md}) {
    width: 100%;
    transform: translateY(12%);

    ${_ImageCard} {
      margin: 0 auto;
      height: auto;
      width: 325rem;
    }
  }
`;


const TextContainer = styled.div`
  position: relative;
  z-index: 2;
  margin-top: 40rem;
  padding: 0 10%;

  text-align: center;
  color: white;

  #title { font-size: 45rem }
  #description { margin: 20rem 0 }

  @media screen and (min-width: ${viewport.md}) {
    width: 100%;
    margin-top: 0;
    padding: 0 5%;

    text-align: left;
  }
`;

const PrimaryHighlight = ({ imgSrc, imgAlt, title, description, linkTo }: {
  imgSrc: string,
  imgAlt: string,
  title: string,
  description: string,
  linkTo: string
}) => {
  /**
   * Hook
   */
  const history = useHistory();

  /**
   * Not hook
   */
  const handleButtonClick = () => {
    window.scrollTo(0, 0);
    history.push(linkTo);
  }

  /**
   * Render
   */
  return (
    <Wrapper>
      <ImageContainer>
        <ImageCard
          imgSrc={imgSrc}
          imgAlt={imgAlt}
        />

        <SonicEllipse radius={150} delay={0} />
        <SonicEllipse radius={250} delay={300} />
        <SonicEllipse radius={275} delay={600} />
        <SonicEllipse radius={400} delay={900} />
        <SonicEllipse radius={650} delay={1200} />
      </ImageContainer>

      <TextContainer>
        <h1 id="title">{title}</h1>
        <p id="description">{description}</p>

        <Button
          text="SEE PRODUCT"
          theme="neutral-inverted"
          onClick={handleButtonClick}
        />
      </TextContainer>

    </Wrapper>
  );
}

export default PrimaryHighlight;