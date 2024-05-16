import { Component, Input } from '@angular/core';
import { Product } from '../product.module';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductAllComponent {
  @Input() product!: Product;
}