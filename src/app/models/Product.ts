import {Category} from "./Category";

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  processedImg: string;
  byteImg: string[];
  categoryName: string;
}
