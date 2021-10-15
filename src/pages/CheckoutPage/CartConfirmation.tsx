import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { priceFormatter, strings } from '../../common/config';

import { CartData, FlattenedProductDataContext } from '../../common/contexts';
import EmptyCart, { Wrapper as _EmptyCart } from '../../common/svg/EmptyCart';
import Button, { Wrapper as _Button } from '../../components/Button';
import ImageCard, { Wrapper as _ImageCard, Image } from '../../components/ImageCard';

export const Wrapper = styled.div`
  position: relative;
  padding: 25rem;
  border-radius: 10rem;

  background: white;

  ${_Button} {
    width: 100%;
  }
`;

const ItemContainer = styled.div`
  margin: 30rem 0;
`;

const Item = styled.div`
  margin: 20rem 0;

  display: flex;
  align-items: center;

  ${_ImageCard} {
    aspect-ratio: 1/1;
    height: 70rem;
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
`;

const ProductDetail = styled.div`
  flex-grow: 1;
  padding-left: 15rem;

  p { font-weight: bold }

  #top {
    display: flex;
    justify-content: space-between;
  }
`;

const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  
  margin: 10rem 0;

  &#grand-total {
    margin: 25rem 0;
  }

  .price {
    font-size: 18rem;
  }

  &#grand-total > .price {
    color: var(--theme-primary);
  }
`;

const EmptyCartContainer = styled.div`
  margin: 40rem 0;
  text-align: center;

  ${_EmptyCart} {
    aspect-ratio: 1/1;
    width: 200rem;
    height: auto;
  }

  h3 {
    margin-top: 30rem;
    margin-bottom: 10rem;
  }

`;

const CartConfirmation = ({ cartData, onSubmit }: {
  cartData: CartData,
  onSubmit: () => void
}) => {
  /**
   * Hooks
   */
  const flattenedProductData = useContext(FlattenedProductDataContext);
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

  /**
   * Render
   */
  return (
    <Wrapper>

      <h4>SUMMARY</h4>

      {totalPrice ?
        <>
          <ItemContainer>
            {Object.entries(cartData).map(([productID, itemNumber], i) =>
              <Item key={i}>
                <ImageCard
                  imgSrc={`/static/${flattenedProductData[productID].category}/${productID}/sm.png`}
                  imgAlt={flattenedProductData[productID].name}
                />

                <ProductDetail>
                  <div id="top">
                    <p>{flattenedProductData[productID].shortName}</p>
                    <p className="light">x{itemNumber}</p>
                  </div>

                  <div id="bottom">
                    <p className="light">$ {priceFormatter.format(flattenedProductData[productID].price)}</p>
                  </div>
                </ProductDetail>
              </Item>
            )}
          </ItemContainer>

          <PriceDetail>
            <p className="light">TOTAL</p>
            <p className="bold price">$ {priceFormatter.format(totalPrice)}</p>
          </PriceDetail>

          <PriceDetail>
            <p className="light">SHIPPING</p>
            <p className="bold price">$ 50</p>
          </PriceDetail>

          <PriceDetail>
            <p className="light">VAT (INCLUDED)</p>
            <p className="bold price">$ {priceFormatter.format(Math.round(totalPrice * .2))}</p>
          </PriceDetail>

          <PriceDetail id="grand-total">
            <p className="light">GRAND TOTAL</p>
            <p className="bold price">$ {priceFormatter.format(totalPrice + 50)}</p>
          </PriceDetail>

          <Button
            text="CONTINUE & PAY"
            theme="primary"
            onClick={() => onSubmit()}
          />
        </>
        :
        <EmptyCartContainer>
          <EmptyCart />

          <h3>{strings.cart.emptyTitle}</h3>
          <p className="light">{strings.cart.emptyDescription}</p>
        </EmptyCartContainer>
      }

    </Wrapper>
  );
}

export default CartConfirmation;