import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import { viewport } from '../../../common/config';
import { MediaContext } from '../../../common/contexts';
import ImageCard, { Wrapper as _ImageCard, Image } from '../../../components/ImageCard';
import Button from '../../../components/Button';

const Wrapper = styled.div`
  position: relative;
  margin: 30rem 0;

  ${Image} { object-position: 70% center }
  ${_ImageCard} { height: 350rem }

  @media screen and (min-width: ${viewport.md}) {
    ${Image} { object-position: unset }
    ${_ImageCard} { height: 320rem }
  }
`;

const TextContainer = styled.div`
  width: 75%;
  text-align: center;

  position: absolute;
  left: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  #title {
    color: white;
  }

  #desc {
    margin-top: 5rem;
    margin-bottom: 20rem;

    color: white;
  }

  @media screen and (min-width: ${viewport.sm}) {
    width: 50%;
    text-align: start;

    padding-left: 10%;
    left: 0%;

    transform: translate(0, -50%);

    #title {
      color: black;
    }

    #desc {
      color: #777;
    }
  }
`;


const SecondaryHighlight = ({ imgSrc, imgAlt, title, description, linkTo }: {
  imgSrc: string,
  imgAlt: string,
  title: string,
  description: string,
  linkTo: string
}) => {

  const history = useHistory();

  return (
    <Wrapper>
      <ImageCard
        imgSrc={imgSrc}
        imgAlt={imgAlt}
      />

      <TextContainer>
        <h1 id="title">{title}</h1>
        <p id="desc" className="light">{description}</p>

        <Button
          text="SEE PRODUCT"
          theme="neutral-inverted"
          onClick={() => history.push(linkTo)}
        />
      </TextContainer>
    </Wrapper>
  );
}

export default SecondaryHighlight;