import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ProductAllComponent } from './product/product-all/product-list.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './sign-up/register.component';
import { AuthGuard } from './guards/auth.guard'; 
import { AdminComponent } from './admin/admin.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { ProductListAdminComponent} from './admin/product-list/product-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { OrderComponent } from './admin/order/order.component';
import { HeaderComponent } from './view/Header.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { OrderrComponent } from './order/order.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductAllComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    HeaderAdminComponent,
    ProductListAdminComponent,
    DashboardComponent,
    HeaderComponent,
    UserListComponent,
    OrderComponent,
    ProductDetailComponent,
    CartComponent,
    OrderrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
