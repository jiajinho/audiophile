import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import { animated, useSpring } from 'react-spring';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';

import { viewport, strings, priceFormatter } from '../common/config';
import { FormData } from '../common/types';
import { CartData, CartDataContext, FlattenedProductDataContext } from '../common/contexts';
import Tick, { Wrapper as _Tick } from '../common/svg/Tick';
import Loading, { Wrapper as _Loading } from '../common/svg/Loading';
import Cancel, { Wrapper as _Cancel } from '../common/svg/Cancel';
import Button, { Wrapper as _Button } from './Button';
import ImageCard, { Wrapper as _ImageCard, Image } from './ImageCard';

const Mask = styled(animated.div)`
  position: absolute;
  z-index: 500;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background: #0007;

  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin: 30rem 0;
  padding: 25rem;
  background: white;
  border-radius: 10rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > p { text-align: center }

  ${_Tick} {
    aspect-ratio: 1/1;
    height: 50rem;
    width: auto;
  }

  ${_Button} {
    width: 100%;
  }

  @media screen and (min-width: ${viewport.sm}) {
    width: 450rem;
  }
`;

const ThankYou = styled.p`
  margin: 10rem 0;
  margin-bottom: 0;

  font-size: 22rem;
  font-weight: bold;
  letter-spacing: 1rem;
  line-height: 32rem;
`;

const Description = styled.p`
  font-size: 14rem;
`;

const Container = styled.div`
  width: 100%;
  margin: 20rem 0;
  padding-bottom: 0;

  border-radius: 7rem;
  overflow: hidden;
  background: #efefef;

  @media screen and (min-width: ${viewport.sm}) {
    display: flex;
  }
`;

const ItemContainer = styled.div`
  padding: 10rem 20rem;

  @media screen and (min-width: ${viewport.sm}) {
    flex-grow: 1;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10rem 0;

  ${_ImageCard} {
    align-self: center;
    width: 35rem;
  }

  ${Image} {
    height: 35rem;
    width: auto;
  }

  #item-number {
    font-weight: bold;
  }
`;

const PriceDetails = styled.div`
  flex-grow: 1;
  margin: 0 15rem;

  font-weight: bold;
`;

const ViewMore = styled.div`
  text-align: center;
  font-size: 14rem;
  font-weight: bold;

  cursor: pointer;
  padding-top: 10rem;
  border-top: 1rem solid #ccc;
`;

const TotalPriceContainer = styled.div`
  padding: 10rem 20rem;

  font-weight: bold;
  background: black;
  color: white;

  display: flex;
  justify-content: space-between;

  & > p { margin: 5rem 0 }

  @media screen and (min-width: ${viewport.sm}) {
    flex-direction: column;
    justify-content: center;
  }
`;

const LoadingContainer = styled.div`
  margin: 20rem 0;
  text-align: center;

  ${_Loading} {
    margin: 20rem;
  }
`;

const ErrorContainer = styled.div`
  margin: 20rem 0;
  text-align: center;

  ${_Cancel} { width: 250rem }
  ${_Button} { width: 50% }
  #title { margin-top: 40rem }

  #desc {
    margin: 20rem 0;
    margin-top: 10rem;
  }
`;

type TransactionState = "loading" | "ok" | "error";

const OrderSuccessModal = (): [
  OrderSuccessfulModal: () => JSX.Element,
  open: (formData: FormData, setFormData: (formData: FormData) => void) => void,
  close: () => void
] => {
  /**
   * Hooks
   */
  const history = useHistory();

  const flattenedProductData = useContext(FlattenedProductDataContext);
  const [cartData, setCartData] = useContext(CartDataContext);

  const [_cartData, _setCartData] = useState<CartData>({});
  const [display, setDisplay] = useState(false);
  const [transactionState, setTransactionState] = useState<TransactionState>("error");

  const [viewMore, setViewMore] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [spring, api] = useSpring(() => ({
    opacity: display ? 1 : 0,
    display: display ? "flex" : "none"
  }));

  useEffect(() => {
    api.start({
      opacity: display ? 1 : 0,
      onStart: () => display && api.start({ display: "flex" }),
      onRest: () => api.start({
        display: display ? "flex" : "none"
      })
    });
  }, [display]);

  /**
   * Not hook
   */
  const cartDataKeys = Object.keys(_cartData);

  const calculateTotalPrice = (cartData: CartData) => {
    let totalPrice = 0;
    for (const [productID, itemNumber] of Object.entries(cartData)) {
      totalPrice += flattenedProductData[productID].price * itemNumber;
    }

    return totalPrice;
  }

  const open = (formData: FormData, setFormData: (formData: FormData) => void) => {
    window.scrollTo(0, 0);

    const cartDataCopy = { ...cartData };
    const totalPrice = calculateTotalPrice(cartDataCopy);

    _setCartData(cartDataCopy);
    setCartData({});
    setDisplay(true);
    setTransactionState("loading");
    setTotalPrice(totalPrice);

    //Firebase
    const { name, email, phone, address, zip, city, country, paymentMethod, eMoneyNum, eMoneyPIN } = formData;

    set(ref(getDatabase(), `/orders/${Date.now()}`), {
      name,
      email,
      phone,
      address: {
        address,
        zip,
        city,
        country
      },
      payment: {
        paymentMethod,
        eMoneyNum: paymentMethod === "cash" ? "" : eMoneyNum,
        eMoneyPIN: paymentMethod === "cash" ? "" : eMoneyPIN
      },
      items: { ...cartDataCopy },
      totalPrice: totalPrice + 50
    }).then(() => {
      //Promise fulfilled
      setTransactionState("ok");
      setFormData({
        name: "", email: "", phone: "",
        address: "", zip: "", city: "", country: "",
        paymentMethod: "", eMoneyNum: "", eMoneyPIN: ""
      });
    }, () => {
      //Promise rejected
      setTransactionState("error");
      setCartData(cartDataCopy);
    });
  }

  const close = () => {
    setDisplay(false);
  }

  const handleHomeClick = () => {
    history.push("/");
    close();
  }

  /**
   * Render
   */
  return [() => (
    <Mask style={spring}>
      <Wrapper>
        {transactionState === "ok" &&
          <>
            <Tick />

            <ThankYou>
              {strings.checkout.orderSuccess.thankYou}
            </ThankYou>

            <Description className="light">
              {strings.checkout.orderSuccess.description}
            </Description>

            <Container>
              <ItemContainer>
                {Object.entries(_cartData).map(([productID, itemNumber], i) => {
                  if (i === 0 || viewMore) {
                    return (
                      <Item key={i}>
                        <ImageCard
                          imgSrc={`/static/${flattenedProductData[productID].category}/${productID}/sm.png`}
                          imgAlt={productID}
                        />

                        <PriceDetails>
                          <p>{flattenedProductData[productID].shortName}</p>
                          <p className="light">$ {priceFormatter.format(flattenedProductData[productID].price)}</p>
                        </PriceDetails>

                        <p id="item-number" className="light">x{itemNumber}</p>
                      </Item>
                    );
                  }

                  return "";
                })}

                {cartDataKeys.length > 1 && !viewMore &&
                  <ViewMore onClick={() => setViewMore(true)} className="light">
                    and {cartDataKeys.length - 1} other item(s)
                  </ViewMore>
                }

                {cartDataKeys.length > 1 && viewMore &&
                  <ViewMore onClick={() => setViewMore(false)} className="light">
                    View less
                  </ViewMore>
                }
              </ItemContainer>

              <TotalPriceContainer>
                <p className="light">GRAND TOTAL</p>
                <p>$ {priceFormatter.format(totalPrice + 50)}</p>
              </TotalPriceContainer>
            </Container>

            <Button
              text="BACK TO HOME"
              theme="primary"
              onClick={handleHomeClick}
            />
          </>
        }

        {transactionState === "loading" &&
          <LoadingContainer>
            <Loading />
            <p>{strings.checkout.orderSuccess.loading}</p>
          </LoadingContainer>
        }

        {transactionState === "error" &&
          <ErrorContainer>
            <Cancel />

            <h4 id="title">{strings.checkout.orderSuccess.errorTitle}</h4>
            <p id="desc">{strings.checkout.orderSuccess.errorDescription}</p>

            <Button
              text="CLOSE"
              onClick={close}
              theme="primary"
            />
          </ErrorContainer>
        }
      </Wrapper>
    </Mask >
  ),
    open,
    close
  ];
}

export default OrderSuccessModal;