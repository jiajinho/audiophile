import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import { toast } from 'react-toastify';

import { viewport, css } from '../../common/config';
import { FormData } from '../../common/types';
import { CartDataContext, OrderSuccessModalContext } from '../../common/contexts';
import BackButton, { Wrapper as _BackButton } from '../../components/BackButton';
import Form, { Wrapper as _Form, FormError } from './Form';
import CartConfirmation, { Wrapper as _CartConfirmation } from './CartConfirmation';

const Wrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 100rem;

  ${_BackButton} {
    margin: 20rem ${css.window.horizontalPadding.xs};
    padding-left: 0;

    @media screen and (min-width: ${viewport.sm}) {
      margin: 20rem ${css.window.horizontalPadding.sm};
    }

    @media screen and (min-width: ${viewport.lg}) {
      margin: 20rem ${css.window.horizontalPadding.lg};
    }
  }
`;

const Container = styled.div`
  padding: 0 ${css.window.horizontalPadding.xs};

  @media screen and (min-width: ${viewport.sm}) {
    padding: 0 ${css.window.horizontalPadding.sm};
  }

  @media screen and (min-width: ${viewport.lg}) {
    padding: 0 ${css.window.horizontalPadding.lg};
  }

  @media screen and (min-width: ${viewport.xl}) {
    position: relative;
    display: flex;
    align-items: flex-start;
  }

  ${_Form} { flex-grow: 1 }

  ${_CartConfirmation} { 
    margin: 30rem 0;

    @media screen and (min-width: ${viewport.xl}) {
      margin: 0;
      margin-left: 3%;

      width: 350rem;
      flex-shrink: 0;
    }
  }
`;

const CheckoutPage = () => {
  /**
   * Hooks
   */
  const [cartData, setCartData] = useContext(CartDataContext);
  const [, openOrderSuccessModal] = useContext(OrderSuccessModalContext);

  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "",
    address: "", zip: "", city: "", country: "",
    paymentMethod: "", eMoneyNum: "", eMoneyPIN: ""
  });

  const [formError, setFormError] = useState<FormError>({
    name: false, email: false, phone: false,
    address: false, zip: false, city: false, country: false,
    paymentMethod: false, eMoneyNum: false, eMoneyPIN: false
  });

  useEffect(() => {
    //Remove all product in the cart that has 0 item
    const copyCartData = { ...cartData };

    for (const [productID, itemNumber] of Object.entries(cartData)) {
      if (itemNumber === 0) {
        delete copyCartData[productID];
      }
    }

    setCartData(copyCartData);
  }, []);


  /**
   * Not hook
   */
  const handleSubmit = () => {
    if (
      formData.name === "" || formData.email === "" || formData.phone === "" ||
      formData.address === "" || formData.zip === "" || formData.city === "" || formData.country === "" ||
      (formData.paymentMethod === "emoney" && (formData.eMoneyNum === "" || formData.eMoneyPIN === ""))
    ) {

      toast.info("Please fill in all the fields");

    } else if (formData.paymentMethod === "") {

      toast.info("Please pick your preferred payment method");

    } else if (
      formError.name || formError.email || formError.phone ||
      formError.address || formError.zip || formError.city || formError.country ||
      (formData.paymentMethod === "emoney" && (formError.eMoneyNum || formError.eMoneyPIN))
    ) {

      toast.error("Please resolve all errors first");

    } else { //All conditions passed
      openOrderSuccessModal(formData, setFormData);
    }
  }

  return (
    <Wrapper>
      <BackButton />

      <Container>
        <Form
          formData={formData}
          onChange={setFormData}
          formError={formError}
          setFormError={setFormError}
        />

        <CartConfirmation
          cartData={cartData}
          onSubmit={handleSubmit}
        />
      </Container>
    </Wrapper>
  );
}

export default CheckoutPage;