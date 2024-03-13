import { Product } from './Product';

export interface OrderedProduct {
  productDtoList: Product[];
  orderAmount: number;
}
