import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/product/product.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'product-list-admin',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListAdminComponent implements OnInit {
  @ViewChild('modelId') productModal!: ElementRef;
  @Input() productList: Product[] = [];
  uniqueCategoriesNam: string[] = [];
  uniqueCategoriesNu: string[] = []; // thêm dòng này
  formProduct = new FormGroup({
    name: new FormControl<string>(''),
    price: new FormControl<number>(0),
    imageUrl: new FormControl<string>(''),
    detailImage1: new FormControl<string>(''),
    detailImage2: new FormControl<string>(''),
    detailImage3: new FormControl<string>(''),
    detailImage4: new FormControl<string>(''),
    productType: new FormControl(null, Validators.required),
    des: new FormControl<string>('', Validators.required),
    giagoc: new FormControl(null),
    categories: new FormControl(null, Validators.required),  // Thêm trường 'gender'
    category: new FormControl(null, Validators.required),  // Thêm trường 'category'
  })

  onGenderChange(event: any) {
    let categories = event.target.value;

    if (categories === 'nam') {
      const categoriesNam = this.productList.filter(product => product.categories.toLowerCase() === 'nam').map(product => product.category);
      this.uniqueCategoriesNam = Array.from(new Set(categoriesNam));
    } else if (categories === 'nữ') {
      const categoriesNu = this.productList.filter(product => product.categories.toLowerCase() === 'nữ').map(product => product.category);
      this.uniqueCategoriesNu = Array.from(new Set(categoriesNu));
    }
  
}
  file: string = '';
  file1: string = '';
  file2: string = '';
  file3: string = '';
  file4: string = '';
  IsAdd: number = 1;
  IsUpdate: number = 0
  constructor(private prod: ProductService) {
    prod.getProduct().subscribe(data => {
      this.productList = data
    });
  }
  Update() {
    this.formProduct.controls['imageUrl'].setValue(this.file);
    this.formProduct.controls['detailImage1'].setValue(this.file1);
    this.formProduct.controls['detailImage2'].setValue(this.file2);
    this.formProduct.controls['detailImage3'].setValue(this.file3);
    this.formProduct.controls['detailImage4'].setValue(this.file4);
    this.prod.UpdateProduct(this.id, this.formProduct.value).subscribe(
      res => {
        Swal.fire({
          title: 'Success!',
          text: 'Product updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            const closeButton = document.getElementById('closeModalButton');
            if (closeButton) {
              closeButton.click();  // Safely trigger the hidden close button
            } else {
              console.error('Close button not found');
            }
          }
        });
        this.ngOnInit();  // Reload the product list
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update product',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
}




  ngOnInit(): void {
    this.formProduct.controls['imageUrl'].setValue('./assets/images');
    this.formProduct.controls['detailImage1'].setValue('./assets/images');
    this.formProduct.controls['detailImage2'].setValue('./assets/images');
    this.formProduct.controls['detailImage3'].setValue('./assets/images');
    this.formProduct.controls['detailImage4'].setValue('./assets/images');
    this.prod.getProduct().subscribe((data) => {
      this.productList = data;
    })
  }

  showRating(event: any) {
    alert(`${event}`)
  }
  Add() {
    if (this.formProduct.valid) {
      this.formProduct.controls['imageUrl'].setValue(this.file);
      this.formProduct.controls['detailImage1'].setValue(this.file1);
      this.formProduct.controls['detailImage2'].setValue(this.file2);
      this.formProduct.controls['detailImage3'].setValue(this.file3);
      this.formProduct.controls['detailImage4'].setValue(this.file4);

      this.prod.AddProduct(this.formProduct.value).subscribe(
        res => {
          this.productList.unshift(res);  // Thêm sản phẩm mới vào đầu mảng
          Swal.fire({
            title: 'Success!',
            text: 'Sản phẩm đã được thêm thành công',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              const closeButton = document.getElementById('closeModalButton');
              if (closeButton) {
                closeButton.click();
              }
            }
            this.formProduct.reset();
            this.file = '';
            this.file1 = '';
            this.file2 = '';
            this.file3 = '';
            this.file4 = '';

          });
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Không thể thêm sản phẩm',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      alert('Vui lòng điền đầy đủ các trường.');
    }
  }
  
  
  
 public showModal: boolean = false;
 id: any
 Edit(index: number) {
  this.id = this.productList[index].id
  this.formProduct.controls.name.setValue(this.productList[index].name)
  this.formProduct.controls.price.setValue(this.productList[index].price)
  this.formProduct.controls['imageUrl'].setValue(this.productList[index].imageUrl)
  this.formProduct.controls['detailImage1'].setValue(this.productList[index].detailImage1)
  this.formProduct.controls['detailImage2'].setValue(this.productList[index].detailImage2)
  this.formProduct.controls['detailImage3'].setValue(this.productList[index].detailImage3)
  this.formProduct.controls['detailImage4'].setValue(this.productList[index].detailImage4)

  this.file = this.productList[index].imageUrl
  this.file1 = this.productList[index].detailImage1
  this.file2 = this.productList[index].detailImage2
  this.file3 = this.productList[index].detailImage3
  this.file4 = this.productList[index].detailImage4

}
openModal() {
  if (this.productModal && this.productModal.nativeElement) {
    this.productModal.nativeElement.style.display = 'block';
    this.productModal.nativeElement.classList.add('show');
    document.body.classList.add('modal-open');
  } else {
    console.error('Modal element is not available');
  }
}

deleteProduct(product: Product) {
  this.prod.DeleteProduct(product.id).subscribe(() => {
    // Remove product from local array
    this.productList = this.productList.filter(p => p.id !== product.id);
    alert('Product deleted successfully');
  });
}

// This function should replace the Add function
// ... previous code ...
isValidForm() {
  const productTypeControl = this.formProduct.get('productType');
  const productTypeValid = !!productTypeControl && !!productTypeControl.value;
  const nameControl = this.formProduct.get('name');
  const priceControl = this.formProduct.get('price');
  const desControl = this.formProduct.get('des');
  const nameValid = !!nameControl && !!nameControl.value && nameControl.value.trim() !== '';
  const priceValid = !!priceControl && priceControl.value !== 0;
  const desValid = !!desControl && !!desControl.value && desControl.value.trim() !== '';
  const imageUrlValid = !!this.file;
  const detailImage1Valid = !!this.file1;
  const detailImage2Valid = !!this.file2;
  const detailImage3Valid = !!this.file3;
  const detailImage4Valid = !!this.file4;
  
  return nameValid && priceValid && desValid && imageUrlValid && detailImage1Valid && detailImage2Valid && detailImage3Valid && detailImage4Valid && productTypeControl && productTypeValid;
}


closeModal() {
  if (this.productModal.nativeElement) {
      this.productModal.nativeElement.classList.remove('show');
      this.productModal.nativeElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backDrop = document.getElementsByClassName('modal-backdrop')[0];
      if (backDrop) {
          backDrop.remove();
      }
  }
}


  onChange(event: any) {
    let str = event.target.files[0].name;
    this.file = './assets/images/' + str;
  }
  onChange1(event: any) {
    let str = event.target.files[0].name;
    this.file1 = './assets/images/' + str;
  }
  onChange2(event: any) {
    let str = event.target.files[0].name;
    this.file2 = './assets/images/' + str;
  }
  onChange3(event: any) {
    let str = event.target.files[0].name;
    this.file3 = './assets/images/' + str;
  }
  onChange4(event: any) {
    let str = event.target.files[0].name;
    this.file4 = './assets/images/' + str;
  }
}
