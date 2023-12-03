import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../../product-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/categories.service';
import { TagsService } from 'src/app/tags.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent  implements OnInit{

  public productForm: FormGroup;

  public imageUrl: string = '';

  private apiUrl = 'http://localhost:3000/api/v1/products';

  public categories:any[] = [];

  public tags:any[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private catS:CategoriesService,
    private tagS:TagsService,
    
   
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

  ngOnInit(): void {

    this.getAllTgas();

    this.getAllcategories();

  }


  //get all categories
  getAllcategories() {
    this.catS.getAllCategories().subscribe(
      (data: any[]) => {

        this.categories = data;

      },
      (error) => {

        console.error(error);

      }
    );
  }

  //get all tags
  getAllTgas() {
    this.tagS.getAllTags().subscribe(
      (data: any[]) => { 

        this.tags = data;

      },
      (error) => {

        console.error(error);

      }
    );
  }


  onSubmit() {
    if (this.productForm.valid) {
      this.productForm.value['image'] = this.imageUrl;
    
        this.http.post(this.apiUrl,this.productForm.value).subscribe(res=>{
        
        
        this.toastr.success('Product added successfully');
        this.productForm.reset();
        this.imageUrl = "";

        
      },
      (err)=>{
        this.toastr.success('a problem accours when adding a products');
      });
      
    }
  }
  
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      

      const reader = new FileReader();
      reader.onload = (e) => {

        this.imageUrl = reader.result as string; 

      };

      reader.readAsDataURL(file);
    }
  }
  

  //function where i click on image it clicks on the image
  openImage() {
    const inputElement = document.getElementById('image');
    if (inputElement) {
      inputElement.click();
    }
  }

}
