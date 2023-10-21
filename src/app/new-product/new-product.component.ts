import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent  {
  public productForm: FormGroup;
  public imageUrl: string = '';
  

  constructor(
    private fb: FormBuilder,
    private productService : ProductServiceService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
      description: ['', Validators.required],
      category: ['', Validators.required],
      discount: ['', Validators.required],
      quantity: ['', Validators.required],
      tag: [''],
      featured: [false]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productForm.value['image'] = this.imageUrl;
      console.log(this.productForm.value);
  
      this.productService.postProduct(this.productForm.value).subscribe(
        response => {
          console.log("Post request Successful", response);
        },
        error => {
          console.log("Post request error", error);
          // You can also show a user-friendly error message to the user.
        }
      );
    }
  }
  
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Read the file as a Base64 string or use other methods to handle file uploads
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result as string; // Set the image URL from the file
      };
      reader.readAsDataURL(file);
    }
  }
  

  openImage() {
    const inputElement = document.getElementById('image');
    if (inputElement) {
      inputElement.click();
    }
  }

}
