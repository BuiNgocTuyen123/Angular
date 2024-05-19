import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000/products'; 
  protected products: Product[] = []


  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
  }

  AddProduct(frmProduct: any): Observable<Product> {
    return this.http.post<Product>(`${this.url}`, frmProduct);
  }
  
  EditProduct(id: number) {
    return this.products[id]
  }
  DeleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  UpdateProduct(id: number, frmProduct: any): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.url}/${id}`, frmProduct)
  }
  getproductId(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
