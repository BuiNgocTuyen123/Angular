import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { ProductAllComponent } from './product/product-all/product-list.component'; // Đường dẫn có thể thay đổi tùy cấu trúc thư mục của bạn
import { LoginComponent } from './login/login.component'; 
import { RegisterComponent } from './sign-up/register.component'; 
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ProductListAdminComponent } from './admin/product-list/product-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { OrderComponent } from './admin/order/order.component'; 
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import {UserService } from 'src/app/user.service';
import { OrderrComponent } from './order/order.component';
const routes: Routes = [
  { path: '',
  component: HomeComponent,
  },
  { path: 'app-order', component: OrderrComponent, canActivate: [UserService] },
  { path: 'cart', component: CartComponent, canActivate: [UserService] },
  { path: 'all-products', component: ProductAllComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }, // Component mới cho dashboard.
  {
    path: '', 
    component: AdminComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: 'dashboard-admin', component: DashboardComponent },
      { path: 'products-list-admin', component: ProductListAdminComponent },
      { path: 'user-list-admin', component: UserListComponent },
      { path: 'order', component: OrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserService]  // Đảm bảo UserService nằm trong providers

})
export class AppRoutingModule { }
