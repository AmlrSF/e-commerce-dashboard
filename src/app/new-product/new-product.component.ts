import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent  {
  public productForm: FormGroup;
  public imageUrl: string = '';
  private apiUrl = 'http://localhost:3000/api/v1/products';


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService // Inject the toastr service
   
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
    
        this.http.post(this.apiUrl,this.productForm.value).subscribe(res=>{
          
         // Show a success toast notification
        this.toastr.success('Product added successfully');
        this.productForm.reset();
      },
      (err)=>{
        this.toastr.success('a problem accours when adding a products');
      });
      
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
