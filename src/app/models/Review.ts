export interface Review {
  id?: number;

  rating: number;

  description: string;

  img: string;

  returnedImg: string;

  userId: number;

  productId: number;

  username: string;
}
