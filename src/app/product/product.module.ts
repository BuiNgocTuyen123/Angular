export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  des:string;
  giagoc:number;
  detailImage1: string; 
  detailImage2: string; 
  detailImage3: string; 
  detailImage4: string; 
  categories: string;
  category: string;

}
export interface Cart{
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  price: number;
  giaoac: number; // Ensure the property name is correct. It looks unusual.
  size: number;
  quantity: number;
  type: number;
  initialQuantity?: number;
  initialSize?: number;
  subtotal: number;
}

