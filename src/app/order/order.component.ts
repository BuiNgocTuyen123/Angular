import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../product/product.module';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { UserService } from 'src/app/user.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderrComponent implements OnInit {
      // Declare a new variable to hold the carts
  userEmail: string = "";
  carts: Cart[] = []; 
  customer = {
    name: '',
    phoneNumber: '',
    address: '',
    email: ''
  }

  constructor(
    private cartService: CartService,  
    private userService: UserService,  
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.userService.email.subscribe(email => {
      this.userEmail = email;
      this.customer.email = email; // Cập nhật email vào customer object
  
      // Fetch all carts when userEmail change
      this.cartService.getCarts(email).subscribe(carts => {
        this.carts = carts.map((cart: Cart) => ({
            ...cart,
            initialQuantity: cart.quantity,
            initialSize: cart.size,
            subtotal: cart.quantity * cart.price
        }));
      });
    });
  }
  

  onFormSubmit() {
    // send this.carts and this.customer to your server
    // Handle success and error responses
  }
}