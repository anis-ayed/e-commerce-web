export interface Wish {
  id?: number;
  productId: number;
  userId: number;
  productName?: string;
  productDescription?: string;
  returnedImg?: string;
  price?: number;
}
