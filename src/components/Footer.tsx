import React from 'react';
import styled from 'styled-components/macro';

import { css, viewport, strings } from '../common/config';
import Nav from './Nav';
import Facebook, { Wrapper as _Facebook } from '../common/svg/Facebook';
import Instagram, { Wrapper as _Instagram } from '../common/svg/Instagram';
import Twitter, { Wrapper as _Twitter } from '../common/svg/Twitter';
import { toast } from 'react-toastify';

const Wrapper = styled.footer`
  position: relative;
  padding: 0 ${css.window.horizontalPadding.xs};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #000;
  color: #fff;

  @media screen and (min-width: ${viewport.sm}) {
    padding: 0 ${css.window.horizontalPadding.sm};
  }

  @media screen and (min-width: ${viewport.lg}) {
    padding: 0 ${css.window.horizontalPadding.lg};
  }
`;

const OrangeLine = styled.div`
  position: absolute;
  top: 0;

  height: 3rem;
  width: 100rem;

  background: var(--theme-primary);

  @media screen and (min-width: ${viewport.lg}) {
    left: ${css.window.horizontalPadding.lg};
  }
`;

const TopContainer = styled.div`
  text-align: center;

  @media screen and (min-width: ${viewport.sm}) {
    width: 100%;
    text-align: start;
  }

  @media screen and (min-width: ${viewport.lg}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Audiophile = styled.img`
  margin: 45rem 0;
`;

const BottomContainer = styled.div`
  text-align: center;

  @media screen and (min-width: ${viewport.sm}) {
    text-align: start;
  }

  @media screen and (min-width: ${viewport.lg}) {
    margin-bottom: 40rem;
    display: flex;
    justify-content: space-between;
  }
`;

const Description = styled.p`
  margin: 40rem 0;

  color: var(--theme-neutral);
  font-size: 14rem;
  line-height: 22rem;

  @media screen and (min-width: ${viewport.sm}) {
    margin-bottom: 0;
  }

  @media screen and (min-width: ${viewport.lg}) {
    margin: 0;
    margin-right: 10%;
    flex-grow: 1;
  }

  @media screen and (min-width: ${viewport.xl}) {
    margin: 0;
    flex-grow: 0;
    width: 50%;
  }
`;

const CopyrightContainer = styled.div`
  @media screen and (min-width: ${viewport.sm}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media screen and (min-width: ${viewport.lg}) {
    flex-direction: column-reverse;
    align-items: flex-end;
    justify-content: flex-start;

    flex-shrink: 0;
  }
`;

const Copyright = styled.p`
  margin: 30rem 0;
  color: var(--theme-neutral);
  font-size: 14rem;

  @media screen and (min-width: ${viewport.lg}) {
    margin: 0;
  }
`;

const SocialMedia = styled.div`
  margin: 40rem 0;

  ${_Facebook}, ${_Instagram}, ${_Twitter} {
    aspect-ratio: 1/1;
    height: 20rem;
    width: auto;

    margin 0 12rem;
  }

  @media screen and (min-width: ${viewport.lg}) {
    margin: 0;
    margin-bottom: 10rem;
  }
`;

const Footer = () => (
  <Wrapper>
    <OrangeLine />

    <TopContainer>
      <Audiophile src="/static/shared/audiophile.svg" alt="Audiophile" />

      <Nav />
    </TopContainer>

    <BottomContainer>
      <Description>
        {strings.footer.description}
      </Description>

      <CopyrightContainer>
        <Copyright>
          {strings.footer.copyright}
        </Copyright>

        <SocialMedia>
          <Facebook onClick={() => toast("🦄 Clicked on Facebook!")} />
          <Instagram onClick={() => toast("🦄 Clicked on Instagram!")} />
          <Twitter onClick={() => toast("🦄 Clicked on Twitter!")} />
        </SocialMedia>
      </CopyrightContainer>
    </BottomContainer>

  </Wrapper>
);


export default Footer;