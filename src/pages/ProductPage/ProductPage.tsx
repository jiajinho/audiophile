import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory } from 'react-router-dom';

import { viewport, css } from '../../common/config';
import { Product } from '../../common/types';
import { ProductDataContext } from '../../common/contexts';
import BackButton, { Wrapper as _BackButton } from '../../components/BackButton';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import Footnote from '../../components/Footnote';
import ProductContainer, { Wrapper as _ProductContainer } from './ProductContainer';
import FeatureContainer, { Wrapper as _FeatureContainer } from './FeatureContainer';
import GalleryContainer, { Wrapper as _GalleryContainer } from './GalleryContainer';
import SuggestContainer from './SuggestContainer';

const Wrapper = styled.div`
  ${_BackButton} {
    margin: 20rem ${css.window.horizontalPadding.xs};;
    padding-left: 0;

    @media screen and (min-width: ${viewport.sm}) {
      margin: 20rem ${css.window.horizontalPadding.sm};
    }
    
    @media screen and (min-width: ${viewport.lg}) {
      margin: 20rem ${css.window.horizontalPadding.lg};
    }
  }

  ${_ProductContainer}, ${_FeatureContainer}, ${_GalleryContainer} {
    padding-left: ${css.window.horizontalPadding.xs};
    padding-right: ${css.window.horizontalPadding.xs};

    @media screen and (min-width: ${viewport.sm}) {
      padding-left: ${css.window.horizontalPadding.sm};
      padding-right: ${css.window.horizontalPadding.sm};
    }

    @media screen and (min-width: ${viewport.lg}) {
      padding-left: ${css.window.horizontalPadding.lg};
      padding-right: ${css.window.horizontalPadding.lg};
    }
  }
`;

const ProductPage = () => {
  const history = useHistory();
  const { category, productID } = useParams<{ category: string, productID: string }>();

  if (category !== "headphones" && category !== "speakers" && category !== "earphones") {
    history.push("/404");
  }

  const productData = useContext(ProductDataContext);
  const [item, setItem] = useState<Product>();

  useEffect(() => {
    if (productData && productData[category][productID]) {
      setItem(productData[category][productID]);
    } else if (productData && !productData[category][productID]) {
      history.push("/404");
    }
  }, [productData, category, productID, history]);


  return (
    <Wrapper>

      <BackButton />

      <ProductContainer category={category} productID={productID} item={item} />
      <FeatureContainer item={item} />
      <GalleryContainer category={category} productID={productID} item={item} />
      <SuggestContainer />

      <CategoryNav />

      <Footnote />

    </Wrapper>
  );
}

export default ProductPage;