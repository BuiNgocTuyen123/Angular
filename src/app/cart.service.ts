import { Injectable } from '@angular/core';
import { Cart } from 'src/app/product/product.module';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { BehaviorSubject,Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart[] = [];
  private url = 'http://localhost:3000/cart'; 

  private cartSubject = new BehaviorSubject<Cart[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }  
  addToCart(cartItem: Cart): Observable<Cart | null> {
    const exists = this.isExistInCart(cartItem);
    return exists.pipe(
        switchMap(exist => {
            if (exist) {
                alert('Sản phẩm này đã tồn tại trong giỏ hàng');
                return of(null);
            } else {
                return this.http.post<Cart>(this.url, cartItem);
            }
        })
    );
}

isExistInCart(cartItem: Cart): Observable<boolean> {
  const exists = this.cart.some(item => item.id === cartItem.id);
  return of(exists);  // Use 'of' to return an Observable
}

  
  getCarts(email: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.url}?email=${email}`);
  }
  getCartss(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url); // Assumes that the cart items are retrieved from this URL
  }
  
  deleteAllCarts(): Observable<{}> {
    return this.http.delete(`${this.url}`); 
  }
  
  deleteCart(id: number): Observable<Cart> {
    // Delete cart item by id
    return this.http.delete<Cart>(`${this.url}/${id}`);
  }

  updateCart(cartItem: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.url}/${cartItem.id}`, cartItem);
  }
}