import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory } from 'react-router-dom';

import { viewport, css } from '../common/config';
import { ProductDataContext, MediaContext } from '../common/contexts';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import Footnote from '../components/Footnote';
import SkeletonParagraphs, { Wrapper as _SkeletonParagraphs } from '../components/SkeletonParagraphs';
import ProductCard, { Wrapper as _ProductCard } from '../components/ProductCard';
import Button from '../components/Button';

const Title = styled.h1`
  padding-top: 40rem;
  padding-bottom: 40rem;

  text-align: center;
  background: black;
  color: white;
`;

const Container = styled.div(({ $order }: { $order: number }) => `
  margin: 80rem 0;
  :first-child { margin-top: 40rem }

  padding: 0 ${css.window.horizontalPadding.xs};

  @media screen and (min-width: ${viewport.sm}) {
    padding: 0 ${css.window.horizontalPadding.sm};
  }

  @media screen and (min-width: ${viewport.lg}) {
    padding: 0 ${css.window.horizontalPadding.lg};

    display: flex;
    flex-direction: ${$order % 2 === 0 ? "row-reverse" : "row"};

    & > * { width: 100% }
  }

  ${_ProductCard} {
    width: 100%;
    height: auto;

    @media screen and (min-width: ${viewport.sm}) {
      aspect-ratio: unset;
      height: 350rem;
    }

    @media screen and (min-width: ${viewport.lg}) {
      height: 450rem;
      max-width: 500rem;

      margin-left: ${$order % 2 === 0 ? "5%" : "0"};
      margin-right: ${$order % 2 === 0 ? "0" : "5%"};
    }
  }
`);

const TextContainer = styled.div`
  text-align: center;
  margin: 20rem 0;

  & > #description {
    margin: 20rem 0;
  }

  ${_SkeletonParagraphs}:first-child {
    margin: 25rem 0;
  }

  @media screen and (min-width: ${viewport.lg}) {
    margin: 0;
    text-align: left;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const CategoryPage = () => {
  /**
   * Hooks
   */
  const history = useHistory();
  const { category } = useParams<{ category: string }>();

  //Check params
  if (category !== "headphones" && category !== "speakers" && category !== "earphones") {
    history.push("/404");
  }

  const productData = useContext(ProductDataContext);
  const { lg } = useContext(MediaContext);

  /**
   * Not hooks
   */
  const handleProductLink = (product: string) => {
    history.push(`${category}/${product}`);
    window.scrollTo(0, 0);
  }

  /**
   * Render
   */
  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <div>

        {productData ? Object.entries(productData[category]).map(([id, product], i) =>
          //Fully loaded product container
          <Container key={i} $order={i}>
            <ProductCard
              imgSrc={`/static/${category}/${id}/lg.png`}
              imgAlt={id}
              onClick={() => handleProductLink(id)}
            />

            <TextContainer>
              <div>
                {product.new && <p className="overline">NEW PRODUCT</p>}

                <h1>{`${product.name} ${category}`.toUpperCase()}</h1>
              </div>

              <p id="description" className="light">{product.description}</p>

              <Button
                text="SEE PRODUCT"
                theme="primary"
                onClick={() => { handleProductLink(id) }}
              />
            </TextContainer>
          </Container>
        ) :
          //Skeleton placeholder container for when the data is still loading
          <Container $order={0}>
            <ProductCard />

            <TextContainer>
              <SkeletonParagraphs
                as="h1"
                paragraphs={2}
                lastLineWidth="30%"
                textAlign={lg ? "left" : "center"}
              />

              <SkeletonParagraphs
                paragraphs={5}
                lastLineWidth="70%"
                textAlign={lg ? "left" : "center"}
              />
            </TextContainer>
          </Container>
        }

        <CategoryNav />

        <Footnote />

      </div>
    </>
  );
}

export default CategoryPage;