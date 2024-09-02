export interface Product {
  id: string;
  name: string;
  seller: string;
  integrationType: string;
  quantity: number;
  image?: string;
  [key: string]: any;
}
