import React from 'react';
import styled from 'styled-components/macro';

import { viewport, strings } from '../../common/config';
import { FormData } from '../../common/types';
import TextField, { Wrapper as _TextField } from '../../components/TextField';
import RadioButton, { Wrapper as _RadioButton } from '../../components/RadioButton';
import CashOption, { Wrapper as _CashOption } from '../../common/svg/CashOption';

export const Wrapper = styled.form`
  padding: 25rem;
  border-radius: 10rem;

  background: white;

  @media screen and (min-width: ${viewport.md}) {
    padding: 50rem 40rem;
  }
`;

const FormSection = styled.div`
  margin: 40rem 0;
  &:first-of-type { margin-top: 20rem }
  &:last-child { margin-bottom: 0 }

  ${_TextField}, ${_RadioButton} { width: 100% }

  ${_TextField}:not(:first-of-type), ${_RadioButton}:not(:first-of-type) {
    margin-top: 15rem;
  }

  @media screen and (min-width: ${viewport.md}) {
    
    ${_TextField} { display: inline-block }

    #name, #email, #phone, #zip, #city, #country, #emoney-num, #emoney-pin {
      width: 50%;
    }

    #name, #phone, #zip, #country, #emoney-num {
      padding-right: 2%;
    }

    #email, #city, #emoney-pin {
      padding-left: 2%;
    }

    #email, #emoney-pin {
      margin-top: 0;
    }
  }
`;

const SectionTitle = styled.h6`
  margin: 10rem 0;

  letter-spacing: 1rem;
  color: var(--theme-primary);
`;

const Label = styled.label`
  font-weight: bold;
`;

const PaymentContainer = styled.div`
  @media screen and (min-width: ${viewport.md}) {
    display: flex;

    & > * { width: 100% }
    & > div { padding-left: 2.75% } 
  }
`;

const ExtraInfoContainer = styled.div`
  margin: 20rem 0;
  margin-bottom: 0;

  #cash {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #cash > p {
    font-size: 14rem;
  }

  ${_CashOption} {
    flex-shrink: 0;
    width: 70rem;
    margin-right: 5%;
  }
`;

export type FormError = {
  [K in keyof FormData]: boolean
}

const Form = ({ formData, onChange, formError, setFormError }: {
  formData: FormData,
  onChange: (updatedValue: FormData) => void,
  formError: FormError,
  setFormError: (prev: FormError) => void
}) => {
  /**
   * Not hooks
   */
  const {
    name, email, phone,
    address, zip, city,
    country, paymentMethod, eMoneyNum, eMoneyPIN
  } = formData;

  const handleChange = (property: keyof FormData, value: string) => {
    const formDataCopy = { ...formData };

    formDataCopy[property] = value;
    onChange(formDataCopy);
  }

  const handleVerfication = (property: keyof FormData, hasError: boolean) => {
    const formErrorCopy = { ...formError };

    formErrorCopy[property] = hasError;
    setFormError(formErrorCopy);
  }

  /**
   * Render
   */
  return (
    <Wrapper>
      <h2>CHECKOUT</h2>

      <FormSection id="billing-details">
        <SectionTitle>BILLING DETAILS</SectionTitle>

        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(v: string) => handleChange("name", v)}
          focusErrorPredicates={[
            { predicate: /^[a-zA-Z\s.]*$/, errorMessage: "Only alphabets and period are allowed" },
            { predicate: /^.{0,20}$/, errorMessage: "Only a maximum of 20 characters are allowed" }
          ]}
          blurErrorPredicates={[
            { predicate: /^.{3,}$/, errorMessage: "Name must have a minimum of 3 characters" }
          ]}
          onVerify={(hasError: boolean) => { handleVerfication("name", hasError) }}
        />

        <TextField
          id="email"
          label="Email Address"
          value={email}
          onChange={(v: string) => handleChange("email", v)}
          blurErrorPredicates={[
            //https://www.w3resource.com/javascript/form/email-validation.php
            { predicate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, errorMessage: "Email format is invalid" }
          ]}
          onVerify={(hasError: boolean) => { handleVerfication("email", hasError) }}
        />

        <TextField
          id="phone"
          label="Phone number"
          value={phone}
          onChange={(v: string) => handleChange("phone", v)}
          focusErrorPredicates={[
            { predicate: /^\d*$/, errorMessage: "Only numerics are allowed" },
            { predicate: /^\d{0,20}$/, errorMessage: "Maximum of 11 characters are allowed" }
          ]}
          onVerify={(hasError: boolean) => { handleVerfication("phone", hasError) }}
        />
      </FormSection>

      <FormSection id="billing-info">
        <SectionTitle>BILLING INFO</SectionTitle>

        <TextField
          id="address"
          label="Your address"
          value={address}
          onChange={(v: string) => handleChange("address", v)}
          onVerify={(hasError: boolean) => { handleVerfication("address", hasError) }}
        />

        <TextField
          id="zip"
          label="ZIP Code"
          value={zip}
          onChange={(v: string) => handleChange("zip", v)}
          focusErrorPredicates={[
            { predicate: /^[\d]+$/, errorMessage: "Only numbers are allowed" }
          ]}
          onVerify={(hasError: boolean) => { handleVerfication("zip", hasError) }}
        />

        <TextField
          id="city"
          label="City"
          value={city}
          onChange={(v: string) => handleChange("city", v)}
        />

        <TextField
          id="country"
          label="Country"
          value={country}
          onChange={(v: string) => handleChange("country", v)}
          focusErrorPredicates={[
            { predicate: /^[a-zA-Z\s]*$/, errorMessage: "Only alphabets are allowed" }
          ]}
          onVerify={(hasError: boolean) => { handleVerfication("country", hasError) }}
        />
      </FormSection>

      <FormSection id="payment-details">
        <SectionTitle>PAYMENT DETAILS</SectionTitle>

        <PaymentContainer>
          <Label>Payment Method</Label>

          <div>
            <RadioButton
              text="e-Money"
              value="emoney"
              activeValue={paymentMethod}
              onChange={(v: string) => handleChange("paymentMethod", v)}
              groupName="payment-method"
            />

            <RadioButton
              text="Cash on Delivery"
              value="cash"
              activeValue={paymentMethod}
              onChange={(v: string) => handleChange("paymentMethod", v)}
              groupName="payment-method"
            />
          </div>
        </PaymentContainer>

        <ExtraInfoContainer>
          {paymentMethod === "emoney" &&
            <div id="emoney">
              <TextField
                id="emoney-num"
                label="e-Money Number"
                value={eMoneyNum}
                onChange={(v: string) => handleChange("eMoneyNum", v)}
                focusErrorPredicates={[
                  { predicate: /^[\d]*$/, errorMessage: "Only numerics are allowed" }
                ]}
                onVerify={(hasError: boolean) => { handleVerfication("eMoneyNum", hasError) }}
              />

              <TextField
                id="emoney-pin"
                label="e-Money PIN"
                value={eMoneyPIN}
                onChange={(v: string) => handleChange("eMoneyPIN", v)}
                type="password"
                focusErrorPredicates={[
                  { predicate: /^[\d]*$/, errorMessage: "Only numerics are allowed" }
                ]}
                onVerify={(hasError: boolean) => { handleVerfication("eMoneyPIN", hasError) }}
              />
            </div>
          }

          {paymentMethod === "cash" &&
            <div id="cash">
              <CashOption />
              <p className="light" >{strings.checkout.cashOption}</p>
            </div>
          }
        </ExtraInfoContainer>
      </FormSection>

    </Wrapper >
  );
}

export default Form;