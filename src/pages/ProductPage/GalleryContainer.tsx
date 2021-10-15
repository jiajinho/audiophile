import React from 'react';
import styled from 'styled-components/macro';

import { viewport } from '../../common/config';
import { Product } from '../../common/types';
import ImageCard, { Wrapper as _ImageCard } from '../../components/ImageCard';

export const Wrapper = styled.div`
  margin: 100rem 0;
  width: 100%;

  @media screen and (min-width: ${viewport.md}) {
    display: flex;
    height: 400rem;
  }

  @media screen and (min-width: ${viewport.lg}) {
    height: 500rem;
  }
`;

const SmallerImages = styled.div`
  ${_ImageCard} {
    margin: 20rem 0;
  }

  @media screen and (min-width: ${viewport.sm}) {
    ${_ImageCard} { height: 250rem }
  }

  @media screen and (min-width: ${viewport.md}) {
    width: 50%;
    margin-right: 20rem;

    display: flex;
    flex-direction: column;

    ${_ImageCard} {
      margin: 0;
      height: 100%;
    }

    ${_ImageCard}:first-child {
      margin-bottom: 20rem;
    }
  }

  @media screen and (min-width: ${viewport.lg}) {
    width: 40%;
  }
`;

const LargeImage = styled.div`
  ${_ImageCard} {
    height: 100%;
  }

  @media screen and (min-width: ${viewport.md}) {
    width: 1%;
    flex-grow: 1;

    ${_ImageCard} {
      height: 100%;
    }
  }
`;

const GalleryContainer = ({ category, productID, item }: {
  category: string,
  productID?: string,
  item?: Product
}) => (
  <Wrapper>
    <SmallerImages>
      <ImageCard
        imgSrc={item ? `/static/${category}/${productID}/image-gallery-1.jpg` : ""}
        imgAlt={"Image gallery 1"}
      />

      <ImageCard
        imgSrc={item ? `/static/${category}/${productID}/image-gallery-2.jpg` : ""}
        imgAlt={"Image gallery 2"}
      />
    </SmallerImages>

    <LargeImage>
      <ImageCard
        imgSrc={item ? `/static/${category}/${productID}/image-gallery-3.jpg` : ""}
        imgAlt={"Image gallery 3"}
      />
    </LargeImage>
  </Wrapper>
);

export default GalleryContainer;