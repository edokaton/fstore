import { Product } from "./product.interface"

export interface AddToCartParams {
  userId: number
  date: string
  products: Product[]
}
