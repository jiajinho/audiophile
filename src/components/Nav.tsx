import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { viewport } from '../common/config';

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${viewport.sm}) {
    flex-direction: row;
  }
`;

const ForwardLink = styled(Link)`
  margin: 0 16rem;

  color: white;
  text-decoration: none;

  font-size: 16rem;
  letter-spacing: 1rem;
  font-weight: bold;

  :not(:first-child) {
    margin-top: 30rem;
  }

  @media screen and (min-width: ${viewport.sm}) {
    margin: 0;

    :not(:first-child) {
      margin-top: 0;
      margin-left: 32px;
    }
  }
`;

const Nav = () => {

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <Wrapper>
      <ForwardLink to="/" onClick={handleScrollTop}>HOME</ForwardLink>
      <ForwardLink to="/headphones" onClick={handleScrollTop}>HEADPHONES</ForwardLink>
      <ForwardLink to="/speakers" onClick={handleScrollTop}>SPEAKERS</ForwardLink>
      <ForwardLink to="/earphones" onClick={handleScrollTop}>EARPHONES</ForwardLink>
    </Wrapper>
  );
}

export default Nav;