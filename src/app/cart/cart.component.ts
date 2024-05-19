import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../product/product.module';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { UserService } from 'src/app/user.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // Declare a new variable to hold the carts
  userEmail: string = '';
  carts: Cart[] = [];
  total: number = 0; // Biến để lưu tổng giá tiền

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.email.subscribe((email) => {
      this.userEmail = email;
      // Fetch all carts when userEmail change
      this.cartService.getCarts(email).subscribe((carts) => {
        this.carts = carts.map((cart: Cart) => ({
          ...cart,
          initialQuantity: cart.quantity,
          initialSize: cart.size,
          subtotal: cart.quantity * cart.price,
        }));
        this.calculateTotal(); // Tính tổng giá tiền mỗi khi có cập nhật giỏ hàng
      });
    });
  }
  calculateTotal() {
    this.total = this.carts.reduce((sum, cart) => sum + cart.subtotal, 0);
  }
  onDeleteAllCarts(): void {
    const a = this.cartService.deleteAllCarts('admin@gmail.com', () =>
      this.ngOnInit()
    );
    // if (a) this.ngOnInit();
  }

  // Thêm phương thức để kiểm tra nút "Delete all" nên bị vô hiệu hóa hay không
  get isCartEmpty(): boolean {
    return this.carts.length == 0;
  }
  onSizeChange(cart: Cart, event: any) {
    const numericSize = Number(event.target.value);
    cart.size = numericSize;
  }

  onQuantityChange(cart: Cart, event: any) {
    const numericQuantity = Number(event.target.value);
    cart.quantity = numericQuantity;
  }

  isNoChange(cart: Cart): boolean {
    return (
      cart.initialQuantity === cart.quantity && cart.initialSize === cart.size
    );
  }

  onUpdateClick(cart: Cart) {
    if (!this.isNoChange(cart)) {
      this.cartService.updateCart(cart).subscribe(() => {
        alert('Giỏ hàng được cập nhật!');
        this.ngOnInit(); // Gọi lại ngOnInit để cập nhật dữ liệu và tính toán tổng giá tiền mới
      });
    }
  }

  onDeleteClick(id: number) {
    this.cartService.deleteCart(id).subscribe(() => {
      alert('Sản phẩm đã được xóa!');
      this.ngOnInit(); // Gọi lại ngOnInit để cập nhật dữ liệu và tính toán tổng giá tiền mới
    });
  }
}
