import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import { viewport } from '../../../common/config';
import Button from '../../../components/Button';
import ImageCard from '../../../components/ImageCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 350rem;

  & > * { width: 100% }

  @media screen and (min-width: ${viewport.sm}) {
    flex-direction: row;
  }

  @media screen and (min-width: ${viewport.md}) {
    height: 320rem;
  }
`;

const TextContainer = styled.div`
  margin-top: 3%;
  padding: 20rem 5%;

  border-radius: 10rem;
  text-align: center;
  background: #eaeaea;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #desc { 
    margin-top: 5rem;
    margin-bottom: 20rem;
  }

  @media screen and (min-width: ${viewport.sm}) {
    padding: 0 5%;
    margin-top: 0%;
    margin-left: 3%;
    text-align: start;

    align-items: flex-start;
  }
`;

const TertiaryHighlight = ({ imgSrc, imgAlt, title, description, linkTo }: {
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

export default TertiaryHighlight;