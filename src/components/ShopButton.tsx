import React from 'react';
import styled from 'styled-components/macro';

import ArrowRight, { Wrapper as _ArrowRight } from '../common/svg/ArrowRight';

export const arrowTranslateX = "5rem";

export const Wrapper = styled.button`
  background: #fff0;
  border-color: #fff0;
  color: #777;

  cursor: pointer;
  transition: .25s color;

  ${_ArrowRight} {
    aspect-ratio: 1/1;
    height: 10rem;
    width: auto;

    margin-left: 2rem;
    transition: .25s transform;
  }

  :hover {
    color: var(--theme-primary);
    ${_ArrowRight} { transform: translateX(${arrowTranslateX}) }
  }
`;

const ShopButton = ({ onClick }: {
  onClick?: () => void
}) => (
  <Wrapper onClick={() => onClick && onClick()}>
    SHOP NOW <ArrowRight color="var(--theme-primary)" />
  </Wrapper>
);

export default ShopButton;