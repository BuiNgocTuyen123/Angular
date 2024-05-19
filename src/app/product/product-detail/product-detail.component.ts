import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/product.module';
import { Cart } from 'src/app/product/product.module';
import { ActivatedRoute, Router } from '@angular/router'; // Import both ActivatedRoute and Router here
import { ProductService } from 'src/app/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/cart.service'; // Hoặc đường dẫn tới cart service
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail!: Product;
  isLoggedIn: boolean = false;
  userEmail: string = "";  // Add this line
  sizes = ['37', '38', '39', '40'];
  selectedSize: string | null = null;
    sizeAndQuantityForm!: FormGroup;     constructor(
    private activatedRoute: ActivatedRoute, // Rename from router to activatedRoute
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private userService: UserService,  
    private router: Router // Leave this as router
  ) {}
  ngOnInit(): void {
    let id = String(this.activatedRoute.snapshot.params['id']); 
    this.productService.getproductId(id).subscribe(data => {
      this.productDetail = data;
      console.log('Current Product ID:', this.productDetail.id);  // Log current product ID
    });
  
    // Log existing cart item IDs
    this.cartService.getCartss().subscribe(cartItems => {
      const cartItemIDs = cartItems.map(item => item.id);
      console.log('Existing Cart Item IDs:', cartItemIDs);
    });
  
    // Existing code to subscribe to email and isLoggedIn
    this.userService.getEmail().subscribe(email => this.userEmail = email);
    this.userService.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
  
    this.sizeAndQuantityForm = this.formBuilder.group({
      size: [this.selectedSize, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }
  
  
    

    openModal(isMainImage: boolean, imageUrl?: string) {
        if (imageUrl) {
            const modal = document.getElementById("myModal");
            const modalImg = document.getElementById("img01");
    
            if (modal && modalImg) {
                modal.style.display = "block";
                modalImg.setAttribute('src', imageUrl);
                if (!isMainImage) {
                modalImg.style.width = "400%";
                modalImg.style.height = "400%";
                }
            }
        }
    }

    closeModal() {
      const modal = document.getElementById("myModal");
      if (modal) {
        modal.style.display = "none";
    }
  }
  selectSize(size: string) {
    this.selectedSize = size;
    this.sizeAndQuantityForm.patchValue({ size: size });
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSize === size;
  }
  addToCart() {
    if (this.isLoggedIn && this.userEmail !== '') {
      if (this.sizeAndQuantityForm.valid && this.productDetail) {
        const cartItem: Cart = {
          name: this.productDetail.name,
          id: this.productDetail.id,
          email: this.userEmail,
          imageUrl: this.productDetail.imageUrl,
          price: this.productDetail.price,
          giaoac: this.productDetail.giagoc,
          size: parseInt(this.sizeAndQuantityForm.value.size),
          quantity: this.sizeAndQuantityForm.value.quantity,
          type: 0,
          subtotal: 0
        };
  
        // Gọi phương thức kiểm tra sản phẩm có trong giỏ hàng chưa
        this.cartService.getCartss().subscribe(cartItems => {
          const cartItemIDs = cartItems.map(item => item.id);
          if (cartItemIDs.includes(this.productDetail.id)) {
            alert('Bạn đã thêm sản phẩm này từ trước đó');
          } else {
            // Nếu sản phẩm không tồn tại trong giỏ hàng, thêm vào giỏ hàng
            this.cartService.addToCart(cartItem).subscribe({
              next: () => {
                alert('Product added to cart');
              },
              error: (error) => {
                console.error(error);
              }
            });
          }
        });
      }
    } else {
      alert('Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng');
      this.router.navigate(['/login']);
    }
  }
  
  
  validateQuantity(event: any) {
    let value = event.target.value;
    let quantity = parseInt(value, 10);

    // Check if the parsed quantity is NaN or less than 1, then default to 1
    if (isNaN(quantity) || quantity < 1) {
        this.sizeAndQuantityForm.controls['quantity'].setValue(1);
    } else if (quantity > 10) {
        // If quantity is greater than 10, default to 10
        this.sizeAndQuantityForm.controls['quantity'].setValue(10);
    } else {
        // If quantity is a valid number within the allowed range, use it as is
        this.sizeAndQuantityForm.controls['quantity'].setValue(quantity);
    }
}


}