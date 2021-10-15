import React from 'react';
import styled from 'styled-components/macro';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { OrderSuccessModalContext } from './common/contexts';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

import _OrderSuccessModal from './components/OrderSuccessModal';

const Wrapper = styled.div`
  position: relative;

  width: 100%;
  margin: auto;
  overflow-y: auto;
  overflow-x: hidden;
  background: black;

  min-height: 100vh;
  max-width: 1920rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

const Body = styled.div`
  position: relative;

  flex-grow: 1;
  background: #f7f7f7;
`;

function App() {

  const [OrderSuccessModal, open, close] = _OrderSuccessModal();


  return (
    <OrderSuccessModalContext.Provider value={[OrderSuccessModal, open, close]}>
      <Wrapper>
        <Header />

        <Body>
          <OrderSuccessModal />

          <Switch>
            <Route exact path="/" children={<HomePage />} />

            <Route path="/404" children={<NotFoundPage />} />

            <Route path="/checkout" children={<CheckoutPage />} />

            <Route path="/:category/:productID" children={<ProductPage />} />

            <Route path="/:category" children={<CategoryPage />} />
          </Switch>
        </Body>

        <Footer />

        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          closeOnClick
        />
      </Wrapper>
    </OrderSuccessModalContext.Provider>
  );
}

export default App;