import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { viewport, data } from './common/config';
import {
  MediaContext,
  ProductDataContext,
  FlattenedProductDataContext,
  CartDataContext,
  CartNotifyContext,
  ProductData,
  FlattenedProductData,
  CartData
} from './common/contexts';

//Check for environment variables before initializing app
if (!process.env.REACT_APP_JWT_SECRET) throw Error("REACT_APP_JWT_SECRET not defined");

if (!process.env.REACT_APP_FIREBASE_APIKEY) throw Error("REACT_APP_FIREBASE_APIKEY not defined");
if (!process.env.REACT_APP_FIREBASE_AUTHDOMAIN) throw Error("REACT_APP_FIREBASE_AUTHDOMAIN not defined");
if (!process.env.REACT_APP_FIREBASE_DATABASEURL) throw Error("REACT_APP_FIREBASE_DATABASEURL not defined");
if (!process.env.REACT_APP_FIREBASE_PROJECT_ID) throw Error("REACT_APP_FIREBASE_PROJECT_ID not defined");
if (!process.env.REACT_APP_FIREBASE_STORAGEBUCKET) throw Error("REACT_APP_FIREBASE_STORAGEBUCKET not defined");
if (!process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID) throw Error("REACT_APP_FIREBASE_MESSAGING_SENDER_ID not defined");
if (!process.env.REACT_APP_FIREBASE_APP_ID) throw Error("REACT_APP_FIREBASE_APP_ID not defined");
if (!process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) throw Error("REACT_APP_FIREBASE_MEASUREMENT_ID not defined");

initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const Root = () => {
  /**
   * Hooks
   */
  const mediaContext = {
    sm: useMediaPredicate(`(min-width: ${viewport.sm})`),
    md: useMediaPredicate(`(min-width: ${viewport.md})`),
    lg: useMediaPredicate(`(min-width: ${viewport.lg})`),
    xl: useMediaPredicate(`(min-width: ${viewport.xl})`)
  };

  const [productData, setProductData] = useState<ProductData>();
  const [flattenedProductData, setFlattenedProductData] = useState<FlattenedProductData>({});
  const [cart, setCart] = useState<CartData>({} as CartData);
  const [cartNotify, setCartNotify] = useState<boolean>(false);

  useEffect(() => {
    readLocalStorageCart();

    // const firebaseListener = onValue(ref(getDatabase(), "/products"), (snapshot) => {
    //   setProductData(snapshot.val());
    // });

    // //Unsubscribe the listener
    // return () => firebaseListener();

    setProductData(data);
  }, []);

  useEffect(() => {
    const flattenedList: FlattenedProductData = {};

    for (const [category, products] of Object.entries(data)) {
      for (const [productID, product] of Object.entries(products)) {
        flattenedList[productID] = { category, ...product }
      }
    }

    setFlattenedProductData(flattenedList);
  }, [productData]);

  useEffect(() => {
    const cartToken = jwt.sign(cart, process.env.REACT_APP_JWT_SECRET as string, { algorithm: "HS256" });
    localStorage.setItem("cart", cartToken);
  }, [cart]);

  /**
   * Not hook
   */
  const readLocalStorageCart = () => {
    const localCart = localStorage.getItem("cart");

    if (localCart)
      try {
        const payload = jwt.verify(localCart, process.env.REACT_APP_JWT_SECRET as string, { algorithms: ["HS256"] }) as jwt.JwtPayload;
        delete payload.iat;

        for (const [productID, itemNumber] of Object.entries(payload)) {
          if (itemNumber === 0) {
            delete payload[productID];
          }
        }

        /**Add function to sanitize payload, clearing any item name that is not in system */
        if (Object.keys(payload).length > 0) {
          setCart(payload);
          setCartNotify(true);
        }
      } catch (e) {
        toast.error("Error in verifying JWT, the cart has been reset");
        console.log(e);
      }
  }

  /**
   * Render
   */
  return (
    <BrowserRouter>
      <MediaContext.Provider value={mediaContext}>
        <ProductDataContext.Provider value={productData}>
          <FlattenedProductDataContext.Provider value={flattenedProductData}>
            <CartDataContext.Provider value={[cart, setCart]}>
              <CartNotifyContext.Provider value={[cartNotify, setCartNotify]}>

                <App />

              </CartNotifyContext.Provider>
            </CartDataContext.Provider>
          </FlattenedProductDataContext.Provider>
        </ProductDataContext.Provider>
      </MediaContext.Provider>
    </BrowserRouter >
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
