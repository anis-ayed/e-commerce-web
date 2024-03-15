import { Product } from './Product';
import { Review } from './Review';
import { FAQ } from './FAQ';

export interface ProductDetails {
  productDto: Product;
  reviewDtoList: Review[];
  faqDtoList: FAQ[];
}
