import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product/product.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' 
})
export class AppComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProduct().subscribe(data => {
      this.products = data;
    });
  }
}
