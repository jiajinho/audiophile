import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/macro';
import { animated, useSpring } from 'react-spring';
import { useHistory } from 'react-router-dom';
import useMeasure from 'react-use-measure';

import { css, viewport } from '../../common/config';
import { MediaContext, CartNotifyContext } from '../../common/contexts';
import Nav, { Wrapper as _Nav } from '../Nav';
import Cart, { Wrapper as _Cart } from '../../common/svg/Cart';
import Menu, { Wrapper as _Menu } from '../../common/svg/Menu';
import CategoryNav from '../CategoryNav/CategoryNav';
import CartModal from './CartModal';
import Exclamation, { Wrapper as _Exclamation } from '../../common/svg/Exclamation';

const Wrapper = styled.header`
  position: relative;
  z-index: 99;

  padding: 40rem ${css.window.horizontalPadding.xs};
  background: black;

  display: flex;
  justify-content: space-between;

  text-align: center;

  ${_Cart}, ${_Menu} {
    aspect-ratio: 1/1;
    height: 25rem;
    width: auto;

    cursor: pointer;
  }

  ${_Nav} {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    display: none;
    visibility: hidden;
  }

  @media screen and (min-width: ${viewport.sm}) {
    padding-left: ${css.window.horizontalPadding.sm};
    padding-right: ${css.window.horizontalPadding.sm};
  }

  @media screen and (min-width: ${viewport.md}) {
    text-align: start;
  }

  @media screen and (min-width: ${viewport.lg}) {
    padding-left: ${css.window.horizontalPadding.lg};
    padding-right: ${css.window.horizontalPadding.lg};

    ${_Menu} {
      display: none;
      visibility: hidden;
    }

    ${_Nav} {
      display: block;
      visibility: visible;
    }
  }
`;

const Audiophile = styled.div`
  margin: 0 30rem;
  flex-grow: 1;

  img {
    cursor: pointer;

    height: 25rem;
    width: auto;
  }

  @media screen and (min-width: ${viewport.lg}) {
    margin: 0;
  }
`;

const GreyLine = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  height: .5rem;
  left: 0;
  right: 0;
  background: #373737;

  @media screen and (min-width: ${viewport.lg}) {
    left: ${css.window.horizontalPadding.lg};
    right: ${css.window.horizontalPadding.lg};
  }
`;

const Mask = styled(animated.div)`
  position: absolute;
  z-index: 98;

  height: 100%;
  width: 100%;

  background: #0007;
`;

const Category = styled(animated.div)(({ $top }: { $top: string }) => `
  position: relative;
  top: ${$top};

  padding: 0 ${css.window.horizontalPadding.xs};
  padding-top: 20rem;
  padding-bottom: 60rem;

  border-bottom-left-radius: 10rem;
  border-bottom-right-radius: 10rem;

  background: white;

  @media screen and (min-width: ${viewport.sm}) {
    padding-left: ${css.window.horizontalPadding.sm};
    padding-right: ${css.window.horizontalPadding.sm};
  }

  @media screen and (min-width: ${viewport.lg}) {
    padding-left: ${css.window.horizontalPadding.lg};
    padding-right: ${css.window.horizontalPadding.lg};
  }
`);

const CartContainer = styled.div`
  position: relative;

  ${_Exclamation} {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(40%, -40%);

    aspect-ratio: 1/1;
    height: 15rem;
    width: auto;
  }
`;

const Header = () => {
  /**
   * Hooks
   */
  const history = useHistory();

  const { lg } = useContext(MediaContext);
  const [cartNotify, setCartNotify] = useContext(CartNotifyContext);

  const [wrapperRef, { height: wrapperHeight }] = useMeasure();

  const [expandNav, setExpandNav] = useState(false);
  const [expandCart, setExpandCart] = useState(false);

  const [maskSpring, maskAPI] = useSpring(() => ({ display: "none", opacity: 0 }));
  const [navSpring, navAPI] = useSpring(() => ({ y: "-100%" }));

  useEffect(() => {
    navAPI.start({
      y: expandNav ? "0%" : "-100%",
      onStart: () => (expandNav || expandCart) && maskAPI.start({ display: "block", opacity: 1, immediate: true }),
      onRest: () => maskAPI.start({
        opacity: (expandNav || expandCart) ? 1 : 0,
        loop: { display: (expandNav || expandCart) ? "block" : "none" }
      })
    });
  }, [expandNav, navAPI]);

  useEffect(() => {
    setExpandNav(false);

    navAPI.start({ y: "-100%", immediate: true });
    !expandCart && maskAPI.start({ display: "none", opacity: 0, immediate: true });
  }, [lg, navAPI]);

  /**
   * Render
   */
  return (
    <>
      <Wrapper ref={wrapperRef}>
        <Menu
          expand={expandNav}
          onClick={() => {
            setExpandNav(!expandNav);
            setExpandCart(false);
          }}
        />

        <Audiophile>
          <img
            src="/static/shared/audiophile.svg"
            alt="Audiophile logo"
            onClick={() => history.push("/")}
          />
        </Audiophile>

        <Nav />

        <CartContainer
          onClick={() => {
            setExpandCart(!expandCart);
            setExpandNav(false);
            setCartNotify(false);
          }}
        >
          {cartNotify && <Exclamation />}
          <Cart />
        </CartContainer>

        <GreyLine />
      </Wrapper>

      <Mask
        style={maskSpring}
        onMouseDown={() => {
          setExpandNav(false);
          setExpandCart(false);
        }}
      >
        <Category
          style={navSpring}
          onMouseDown={e => e.stopPropagation()}
          $top={`${wrapperHeight}rem`}
        >
          <CategoryNav onClick={() => setExpandNav(false)} />
        </Category>

        <CartModal
          top={`${wrapperHeight}rem`}
          expandCart={expandCart}
          expandNav={expandNav}
          setExpandCart={setExpandCart}
          maskAPI={maskAPI}
        />
      </Mask>
    </>
  );
};

export default Header;