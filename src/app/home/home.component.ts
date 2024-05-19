

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Product } from '../product/product.module';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private userService: UserService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getProduct().subscribe(products => {
        this.products = products;
    });
}
} 	
