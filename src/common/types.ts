import { ErrorPredicate } from "../components/TextField";

type Product = {
  new: boolean,
  name: string,
  shortName: string,
  description: string,
  price: number,
  features: string[],
  inTheBox: {
    number: number,
    name: string
  }[]
}

type FormData = {
  name: string,
  email: string,
  phone: string,
  address: string,
  zip: string,
  city: string,
  country: string,
  paymentMethod: string,
  eMoneyNum: string,
  eMoneyPIN: string
}

export type {
  Product,
  FormData
}