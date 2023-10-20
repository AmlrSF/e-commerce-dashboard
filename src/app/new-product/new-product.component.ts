import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  public productForm: FormGroup;
  public imageUrl:string = "";
  public formSubmitted: boolean = false;
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      tags: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9.]+$')]],
      featured: [false],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.productForm.valid) {
      // Handle form submission here
      console.log(this.productForm.value);
    }
  }

  public   onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Read the selected image and set it as the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // Set the selected image as the form value
      this.productForm.patchValue({
        image: file
      });
    }
  }
}
