import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import { FlattenedProductDataContext, FlattenedProduct } from '../../common/contexts';
import Loading from '../../common/svg/Loading';
import ImageCard, { Wrapper as _ImageCard, Image } from '../../components/ImageCard';
import Button from '../../components/Button';


const CSSCardWidth = 250; //rem
const CSSCardMarginRight = 40; //rem
const totalCSSCardWidth = CSSCardWidth + CSSCardMarginRight;

const Wrapper = styled.div`
  position: relative;
  margin: 100rem 0;
  text-align: center;

  & > h3 { margin: 40rem 0 }
`;

const LoadingMask = styled.div`
  padding: 30rem 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div(({ $productDataLength }: { $productDataLength: number }) => `
  display: flex;
  justify-content: center;

  touch-action: pan-y;
  transform: translateX(${$productDataLength % 2 === 0 ? `${(CSSCardWidth + CSSCardMarginRight) / 2}rem` : "0"});

  cursor: grab;
  :active { cursor: grabbing }
`);

const Carousel = styled(animated.div)`
  white-space: nowrap;
  width: fit-content;
`;

const Card = styled(animated.div)`
  display: inline-block;
  user-select: none;

  width: ${CSSCardWidth}rem;
  margin-right: ${CSSCardMarginRight}rem;

  :last-child { margin-right: 0rem }

  ${_ImageCard} {
    background: #eaeaea;
    height: 350rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${Image} {
    height: 60%;
    width: auto;
  }

  h3 { margin: 30rem 0 }
`;

interface FlattenedProductWithID extends FlattenedProduct {
  productID: string;
}

const SuggestContainer = () => {
  /**
   * Hooks
   */
  const flattenedProductData = useContext(FlattenedProductDataContext);
  const history = useHistory();

  const median = useRef(0);
  const position = useRef(0);

  const [shuffledProductList, setShuffledProductList] = useState<FlattenedProductWithID[]>([]);

  const [spring, api] = useSpring(() => ({ x: "0rem" }));

  useEffect(() => {
    //Shuffle list
    const productList: FlattenedProductWithID[] = [];

    for (const [productID, item] of Object.entries(flattenedProductData)) {
      productList.push({
        productID,
        ...item
      });
    }

    const shuffledList: FlattenedProductWithID[] = [];

    for (let i = productList.length; i > 0; i--) {
      shuffledList.push(
        productList.splice(
          Math.floor(Math.random() * productList.length), 1
        )[0]
      );
    }

    setShuffledProductList(shuffledList);

    //Reset carousel to middle item
    position.current = Math.round(shuffledList.length / 2);
    median.current = 0;

    api.start({ x: "0rem" });

  }, [flattenedProductData, api]);

  /**
   * Animation hooks
   */

  const gesture = useDrag(state => {
    if (shuffledProductList.length && state.active) {
      //Move the carousel
      api.start({ x: `${state.movement[0] + median.current}rem` });

    }
    else if (shuffledProductList.length && !state.active) {
      //Update the current position and the current rem(median) in the carousel
      const absMovement = Math.abs(state.movement[0]);
      let offsets = 0;

      if (absMovement > totalCSSCardWidth / 2) {
        offsets += 1 + Math.trunc((absMovement - totalCSSCardWidth / 2) / totalCSSCardWidth);
        offsets *= (state.movement[0] / absMovement); //Apply direction

        median.current += offsets * totalCSSCardWidth;
        position.current -= offsets;
      }

      api.start({ x: `${median.current}rem` });
    }

  }, {
    rubberband: true,
    bounds: () => ({
      left: -(shuffledProductList.length - position.current) * (CSSCardWidth + CSSCardMarginRight),
      right: (position.current - 1) * (CSSCardWidth + CSSCardMarginRight)
    })
  });

  /**
   * Not hook
   */
  const handleProductClick = (category: string, productID: string) => {
    history.push(`/${category}/${productID}`);
    window.scrollTo(0, 0);
  }

  /**
   * Render
   */
  return (
    <Wrapper>
      <h3>YOU MAY ALSO LIKE</h3>

      {shuffledProductList.length &&
        <Container {...gesture()} $productDataLength={shuffledProductList.length}>
          <Carousel style={spring}>

            {shuffledProductList.map((item, i) =>
              <Card key={i}>
                <ImageCard
                  imgSrc={`/static/${item.category}/${item.productID}/lg.png`}
                  imgAlt={item.productID}
                  draggable={false}
                  onTap={() => handleProductClick(item.category, item.productID)}
                />

                <h3>{item.name.toUpperCase()}</h3>

                <Button
                  text="SEE PRODUCT"
                  theme="primary"
                  onClick={() => handleProductClick(item.category, item.productID)}
                />
              </Card>
            )}

          </Carousel>
        </Container>
      }

      {!shuffledProductList.length &&
        <LoadingMask>
          <Loading />
        </LoadingMask>
      }
    </Wrapper>
  );
}

export default SuggestContainer;