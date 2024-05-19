

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Product } from '../product/product.module';
import { ProductService } from '../product.service';
@Component({
  selector: 'header-product',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string = "";
  selectedCategoryNam: string = "";
  selectedCategoryNu: string = "";
  products: Product[] = [];
  uniqueCategoriesNam: string[] = [];
  uniqueCategoriesNu: string[] = []; // thêm dòng này
  constructor(private userService: UserService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    this.userService.email.subscribe(email => this.email = email);
    this.productService.getProduct().subscribe(products => {
        this.products = products;
        this.uniqueCategoriesNam = this.getUniqueCategoriesOf('nam');
        this.uniqueCategoriesNu = this.getUniqueCategoriesOf('nu');
    });
}
getUniqueCategoriesOf(gender: string) {
  return Array.from(new Set(this.products.filter(product => product.categories == gender).map(product => product.category)));
}
  uniqueCategories: string[] = [];

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
} 	
