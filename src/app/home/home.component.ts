

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
        this.uniqueCategoriesNu = this.getUniqueCategoriesOf('nữ');
    });
}
getUniqueCategoriesOf(gender: string) {
  return Array.from(new Set(this.products.filter(product => product.categories == gender).map(product => product.category)));
}
  uniqueCategories: string[] = [];

  logout() {
    this.userService.logout();
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
} 	
