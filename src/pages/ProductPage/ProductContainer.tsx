import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { toast } from 'react-toastify';

import { viewport } from '../../common/config';
import { CartDataContext, CartNotifyContext } from '../../common/contexts';
import { Product } from '../../common/types';
import Button from '../../components/Button';
import Counter from '../../components/Counter';
import ProductCard, { Wrapper as _ProductCard } from '../../components/ProductCard';
import SkeletonParagraphs, { Wrapper as _SkeletonParagraphs } from '../../components/SkeletonParagraphs';

export const Wrapper = styled.div`
  ${_ProductCard} {
    width: 100%;
    height: auto;
    cursor: auto;
  }

  @media screen and (min-width: ${viewport.sm}) {
    ${_ProductCard} {
      aspect-ratio: unset;
      height: 350rem;
    }
  }

  @media screen and (min-width: ${viewport.md}) {
    display: flex;
    & > * { width: 100% }

    ${_ProductCard} {
      height: 450rem;
      max-width: 450rem;
    }
  }
`;

const TextContainer = styled.div`
  margin: 30rem 0;
  text-align: left;

  & > #description, ${_SkeletonParagraphs} { 
    margin: 20rem 0;
  }

  & > #price {
    font-size: 20rem;
    font-weight: bold;
  }

  @media screen and (min-width: ${viewport.md}) {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 5%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Buttons = styled.div`
  margin: 20rem 0;

  & > *:first-child {
    margin-right: 20rem;
  }
`;

const priceFormatter = new Intl.NumberFormat("en-US");

const ProductContainer = ({ category, productID, item }: {
  category: string,
  productID?: string,
  item?: Product
}) => {

  const [cartData, setCartData] = useContext(CartDataContext);
  const [, setCartNotify] = useContext(CartNotifyContext);

  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    if (productID && item && count > 0) {

      const cartDataCopy = { ...cartData };

      cartDataCopy.hasOwnProperty(productID) ?
        cartDataCopy[productID] += count :
        cartDataCopy[productID] = count

      setCartData(cartDataCopy);
      setCount(0);

      //Add visual indicator cnfirming added item
      toast.success(`${item.shortName}(${count}) added to cart`);
      setCartNotify(true);
    }

    //Add error handling toast
  }

  return (
    <Wrapper>
      {item ?
        //Real container
        <>
          <ProductCard
            imgSrc={`/static/${category}/${productID}/lg.png`}
            imgAlt={productID}
          />

          <TextContainer>
            <div>
              {item.new && <p className="overline">NEW PRODUCT</p>}

              <h1>{`${item.name} ${category}`.toUpperCase()}</h1>
            </div>

            <p id="description" className="light">{item.description}</p>

            <p id="price">$ {priceFormatter.format(item.price)}</p>

            <Buttons>
              <Counter
                value={count}
                onChange={setCount}
              />

              <Button
                text="ADD TO CART"
                theme="primary"
                onClick={handleAddToCart}
              />
            </Buttons>
          </TextContainer>
        </>
        :
        //Skeleton container
        <>
          <ProductCard />

          <TextContainer>
            <SkeletonParagraphs
              as="h1"
              paragraphs={2}
              lastLineWidth="50%"
              textAlign="left"
            />

            <SkeletonParagraphs
              paragraphs={5}
              lastLineWidth="50%"
              textAlign="left"
            />
          </TextContainer>
        </>
      }
    </Wrapper>
  );
}

export default ProductContainer;