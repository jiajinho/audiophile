import React from 'react';
import styled from 'styled-components/macro';

import { viewport, css } from '../../common/config';
import CategoryCard, { Wrapper as _CategoryCard } from './CategoryCard';

export const Wrapper = styled.nav`
  width: 100%;
  padding: 0 ${css.window.horizontalPadding.xs};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: ${viewport.sm}) {
    padding: 0 ${css.window.horizontalPadding.sm};
  }

  @media screen and (min-width: ${viewport.md}) {
    flex-direction: row;
  }

  @media screen and (min-width: ${viewport.lg}) {
    padding: 0 ${css.window.horizontalPadding.lg};
  }

  ${_CategoryCard} {
    max-width: 100%;

    @media screen and (min-width: ${viewport.md}) {
      max-width: 400rem;
    }
  }

  ${_CategoryCard}:not(:first-child) {
    margin-top: 20rem;

    @media screen and (min-width: ${viewport.md}) {
      margin-top: 0;
      margin-left: 20rem;
    }
  } 
`;

const CategoryNav = ({ onClick }: {
  onClick?: () => void
}) => (
  <Wrapper>
    <CategoryCard
      category="HEADPHONES"
      imgSrc="/static/shared/category-headphones.png"
      imgAlt="Category earphone"
      linkTo="/headphones"
      additionalOnClick={onClick}
    />

    <CategoryCard
      category="SPEAKERS"
      imgSrc="/static/shared/category-speakers.png"
      imgAlt="Category earphone"
      linkTo="/speakers"
      additionalOnClick={onClick}
    />

    <CategoryCard
      category="EARPHONES"
      imgSrc="/static/shared/category-earphones.png"
      imgAlt="Category earphone"
      linkTo="/earphones"
      additionalOnClick={onClick}
    />
  </Wrapper>
);

export default CategoryNav;