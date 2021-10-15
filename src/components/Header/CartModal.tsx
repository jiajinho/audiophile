import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { animated, useSpring, SpringRef } from 'react-spring';
import { useHistory } from 'react-router-dom';

import { priceFormatter, strings, css, viewport } from '../../common/config';
import { CartDataContext, FlattenedProductDataContext } from '../../common/contexts';
import ImageCard, { Wrapper as _ImageCard, Image } from '../ImageCard';
import Counter, { Wrapper as _Counter } from '../Counter';
import Button, { Wrapper as _Button } from '../Button';
import EmptyCart, { Wrapper as _EmptyCart } from '../../common/svg/EmptyCart';

const Wrapper = styled(animated.div)(({ $top }: { $top: string }) => `
  position: absolute;
  top: calc(${$top} + ${css.window.horizontalPadding.xs});
  left: ${css.window.horizontalPadding.xs};
  right: ${css.window.horizontalPadding.xs};

  width: auto;
  padding: 30rem;
  border-radius: 10rem;
  background: white;

  ${_Button} {
    width: 100%;
  }

  @media screen and (min-width: ${viewport.sm}) {
    left: unset;
    right: ${css.window.horizontalPadding.sm};
    width: 450rem;
  }

  @media screen and (min-width: ${viewport.lg}) {
    right: ${css.window.horizontalPadding.lg};
  }
`);

const Title = styled.div`
  margin-bottom: 30rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  #remove-all {
    font-size: 14rem;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ItemContainer = styled.div`
  margin: 20rem 0;

  display: flex;
  align-items: center;

  ${_ImageCard} {
    aspect-ratio: 1/1;
    height: 60rem;
    width: auto;

    background: #eee;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${Image} {
    height: 60%;
    width: auto;
  }

  ${_Counter} {
    padding: 0rem;

    & > p { width: 30rem }

    & > button {
      padding: 10rem;
    }
  }
`;

const MessageContainer = styled.div`
  margin-bottom: 50rem;
  text-align: center;

  ${_EmptyCart} {
    margin: 20rem 0;

    aspect-ratio: 1/1;
    width: 150rem;
    height: auto;
  }

  h3 { margin: 10rem 0 }
`;

const ProductDetail = styled.div`
  flex-grow: 1;
  padding: 0 15rem;

  & > * { line-break: anywhere }
  h4 { margin: 2rem 0 }
  p { font-weight: bold } 
`;

const Total = styled.div`
  margin: 30rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const CartModal = ({ top, expandCart, expandNav, setExpandCart, maskAPI }: {
  top: string,
  expandCart: boolean,
  expandNav: boolean,
  setExpandCart: (expand: boolean) => void,
  maskAPI: SpringRef<{ display: string, opacity: number }>
}) => {
  /**
    * Hooks
    */
  const history = useHistory();

  const flattenedProductData = useContext(FlattenedProductDataContext);
  const [cartData, setCartData] = useContext(CartDataContext);

  const [cartSpring, cartAPI] = useSpring(() => ({ y: "-150%" }));

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (Object.keys(flattenedProductData).length > 0) {
      let totalPrice = 0;

      for (const [productID, itemNumber] of Object.entries(cartData)) {
        totalPrice += flattenedProductData[productID].price * itemNumber;
      }

      setTotalPrice(totalPrice);
    }
  }, [cartData, flattenedProductData]);

  useEffect(() => {
    cartAPI.start({
      y: expandCart ? "0%" : "-150%",
      onStart: () => (expandCart || expandNav) && maskAPI.start({ display: "block", opacity: 1, immediate: true }),
      onRest: () => maskAPI.start({
        opacity: (expandCart || expandNav) ? 1 : 0,
        loop: { display: (expandCart || expandNav) ? "block" : "none" }
      })
    })
  }, [expandCart, expandNav, cartAPI, maskAPI]);

  /**
   * Not hooks
   */
  const handleCounterClick = (updatedValue: number, productID: string) => {
    const cartDataCopy = { ...cartData };

    cartDataCopy[productID] = updatedValue;
    setCartData(cartDataCopy);
  }

  const handleCheckout = () => {
    history.push("/checkout");
    window.scrollTo(0, 0);
    setExpandCart(false);
  }

  const totalItem = Object.keys(cartData).length;

  return (
    <Wrapper
      style={cartSpring}
      onMouseDown={e => e.stopPropagation()}
      $top={top}
    >
      <Title>
        <h3 id="title">CART ({totalItem})</h3>
        <p id="remove-all" onClick={() => setCartData({})}>Remove all</p>
      </Title>

      {totalItem && flattenedProductData && Object.keys(flattenedProductData).length > 0 ?
        <>
          {Object.entries(cartData).map(([productID, itemNumber]) =>
            <ItemContainer key={productID}>
              <ImageCard
                imgSrc={`/static/${flattenedProductData[productID].category}/${productID}/sm.png`}
                imgAlt={productID}
              />

              <ProductDetail>
                <p>{flattenedProductData[productID].shortName}</p>
                <p className="light">$ {priceFormatter.format(flattenedProductData[productID].price)}</p>
              </ProductDetail>

              <Counter
                value={itemNumber}
                onChange={(updatedValue) => handleCounterClick(updatedValue, productID)}
              />
            </ItemContainer>
          )}

          <Total>
            <h5 className="light">TOTAL</h5>
            <h5>$ {priceFormatter.format(totalPrice)}</h5>
          </Total>

          <Button
            text="CHECKOUT"
            theme="primary"
            onClick={handleCheckout}
          />
        </>
        :
        <MessageContainer>
          <EmptyCart />

          <h3>{strings.cart.emptyTitle}</h3>
          <p className="light">{strings.cart.emptyDescription}</p>
        </MessageContainer>
      }
    </Wrapper>
  );
}

export default CartModal;