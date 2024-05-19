import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/product/product.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';




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
    name: new FormControl<string | null>(''),
    price: new FormControl<number | null>(0),
    imageUrl: new FormControl<string | null>(''),
    detailImage1: new FormControl<string | null>(''),
    detailImage2: new FormControl<string | null>(''),
    detailImage3: new FormControl<string | null>(''),
    detailImage4: new FormControl<string | null>(''),
    productType: new FormControl<string | null>(null, Validators.required),
    des: new FormControl<string | null>('', Validators.required),
    giagoc: new FormControl<number | null>(null),
    categories: new FormControl<string | null>(null, Validators.required),
    category: new FormControl<string | null>(null, Validators.required),
    newCategory: new FormControl<string | null>('', []),  // No validators needed here
    
    
  })
  onNewCategoryChange(event: any) {
    let newCategory = event.target.value;
    if (this.formProduct.controls['category'].value === 'Add New') {
      this.formProduct.controls['category'].setValue(newCategory);
    }
  }
  
  onCategoryChange(event: any) {
    let selectedCategory = event.target.value;
    if (selectedCategory !== 'Add New') {
      this.formProduct.controls['newCategory'].reset();
      this.formProduct.controls['category'].setValue(selectedCategory);
    }
  }
onGenderChange(event: any) {
  let gender = event.target.value;
  console.log('Selected gender:', gender); // Debugging output

  if (gender === 'nam') {
    const categoriesNam = this.productList.filter(product => product.categories.toLowerCase() === 'nam').map(product => product.category);
    this.uniqueCategoriesNam = Array.from(new Set(categoriesNam));
    console.log('Categories for Nam:', this.uniqueCategoriesNam); // Debugging output
  } else if (gender === 'nu') {
    const categoriesNu = this.productList.filter(product => product.categories.toLowerCase() === 'nu').map(product => product.category);
    this.uniqueCategoriesNu = Array.from(new Set(categoriesNu));
    console.log('Categories for Nữ:', this.uniqueCategoriesNu); // Debugging output
  }
}
resetForm() {
  this.formProduct.reset({
    name: null,
    price: 0,
    imageUrl: null,
    detailImage1: null,
    detailImage2: null,
    detailImage3: null,
    detailImage4: null,
    productType: null,
    des: '',
    giagoc: null,
    categories: null,
    category: null,
    newCategory: ''
  });
  this.file = '';
  this.file1 = '';
  this.file2 = '';
  this.file3 = '';
  this.file4 = '';
  this.IsAdd = 1;
  this.IsUpdate = 0;
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
            this.resetForm();  // Reset the form on successful update
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
    console.log('Current Product List:', this.productList); // Log the entire productList
    const categoriesNu = this.productList.filter(product => product.categories.toLowerCase() === 'nu').map(product => product.category);
    this.uniqueCategoriesNu = Array.from(new Set(categoriesNu));
    console.log('Categories for Nữ:', this.uniqueCategoriesNu); // Debug output
  });
  const categoriesNam = this.productList.filter(product => product.categories.toLowerCase() === 'nam').map(product => product.category);
    this.uniqueCategoriesNam = Array.from(new Set(categoriesNam));
    fromEvent(this.productModal.nativeElement, 'hidden.bs.modal').subscribe(() => {
      this.resetForm();
    });
}

getRelevantCategories() {
  // This function returns the categories for the selected gender excluding the currently edited category to avoid duplication
  if (this.formProduct.controls['categories'].value === 'nam') {
    return this.uniqueCategoriesNam.filter(c => c !== this.formProduct.controls['category'].value);
  } else {
    return this.uniqueCategoriesNu.filter(c => c !== this.formProduct.controls['category'].value);
  }
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
      alert('Bạn chưa chọn danh mục.');
    }
  }
  
  
  
 public showModal: boolean = false;
 id: any
 Edit(index: number) {
  const product = this.productList[index];
  this.id = product.id;
  // existing values
  this.formProduct.controls['name'].setValue(product.name);
  this.formProduct.controls['price'].setValue(product.price);
  this.formProduct.controls['des'].setValue(product.des);
  this.formProduct.controls['categories'].setValue(product.categories);
  this.formProduct.controls['category'].setValue(product.category);
  // Images
  this.formProduct.controls['imageUrl'].setValue(product.imageUrl);
  this.formProduct.controls['detailImage1'].setValue(product.detailImage1);
  this.formProduct.controls['detailImage2'].setValue(product.detailImage2);
  this.formProduct.controls['detailImage3'].setValue(product.detailImage3);
  this.formProduct.controls['detailImage4'].setValue(product.detailImage4);

  this.file = product.imageUrl;
  this.file1 = product.detailImage1;
  this.file2 = product.detailImage2;
  this.file3 = product.detailImage3;
  this.file4 = product.detailImage4;

  // Product type and original price
  if (product.giagoc == null) {
    this.formProduct.controls['productType'].setValue('new');
  } else {
    this.formProduct.controls['productType'].setValue('discount');
    this.formProduct.controls['giagoc'].setValue(product.giagoc);
  }
  this.IsAdd = 0;
  this.IsUpdate = 1;
  this.openModal();  // Open the modal with the populated data
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
  this.resetForm();
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

onProductTypeChange(event: any) {
  const selectedType = event.target.value;
  if (selectedType === 'new') {
    this.formProduct.controls['giagoc'].reset();
  }
}

openAddModal() {
  this.resetForm();  // Reset the form to ensure it's clean
  this.IsAdd = 1;  // Set to add mode
  this.IsUpdate = 0;  // Ensure it's not in update mode
  this.openModal();  // Now open the modal
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
