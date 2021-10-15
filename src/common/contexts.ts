import { createContext } from 'react';
import { Product, FormData } from './types';

/**
 * MediaContext
 */
type Media = {
  sm: boolean,
  md: boolean,
  lg: boolean,
  xl: boolean
}

const MediaContext = createContext<Media>({} as Media);
MediaContext.displayName = "MediaContext";

/**
 * ProductDataContext
 */
type ProductData = {
  [category: string]: {
    [product: string]: Product
  }
}

const ProductDataContext = createContext<ProductData | undefined>(undefined);
ProductDataContext.displayName = "ProductDataContext";

/**
 * FlattenedProductDataContext
 */
interface FlattenedProduct extends Product {
  category: string
}

type FlattenedProductData = {
  [productID: string]: FlattenedProduct
};

const FlattenedProductDataContext = createContext<FlattenedProductData>({});
FlattenedProductDataContext.displayName = "FlattenedProductDataContext";

/**
 * CartContext
 */
type CartData = {
  [productID: string]: number
};

type CartContext = [CartData, (newState: CartData) => void];

const CartDataContext = createContext<CartContext>({} as CartContext);
CartDataContext.displayName = "CartDataContext";

/**
 * CartNotifyContext
 */
type CartNotify = [boolean, (notify: boolean) => void];

const CartNotifyContext = createContext<CartNotify>({} as CartNotify);
CartNotifyContext.displayName = "CartNotifyContext";

/**
 * Modals
 */
type OrderSuccessModal = [
  modal: () => JSX.Element,
  open: (formData: FormData, setFormData: (formData: FormData) => void) => void,
  close: () => void
]

const OrderSuccessModalContext = createContext<OrderSuccessModal>({} as OrderSuccessModal);
OrderSuccessModalContext.displayName = "OrderSuccessModalContext";

/**
 * Exports
 */
export {
  MediaContext,
  ProductDataContext,
  FlattenedProductDataContext,
  CartDataContext,
  CartNotifyContext,
  OrderSuccessModalContext
}

export type {
  ProductData,
  FlattenedProductData,
  FlattenedProduct,
  CartData,
  CartContext
}