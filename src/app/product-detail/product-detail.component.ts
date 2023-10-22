import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public product: any;
  public productForm: FormGroup;
  public imageUrl: string = '';
  public isopen: boolean = true;
  public loading:boolean = false;
  private apiUrl = 'http://localhost:3000/api/v1/products/product/';

  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe(
          (product) => {
            this.product = product.data;
            console.log(this.product);
          },
          (error) => {
            // Handle errors, e.g., show a not-found message
          }
        );
      }
    });
  }

  public openEditForm() {
    this.isopen = !this.isopen;
  }

  public  deleteProduct(id: string) {
    this.productService.deleteProductById(id).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/products']);
      },
      (err) => console.log(err)
    );
    this.loading = false;
  }



  onSubmit() {
    this.loading = true;
    if (this.productForm.valid) {
      this.productForm.value['image'] = this.imageUrl;
      console.log(this.productForm.value);
      
      this.http.put(`${this.apiUrl}${this.product._id}`, this.productForm.value).subscribe(res=>console.log(res), err=>console.log(err));
      
      
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

  openImage() {
    const inputElement = document.getElementById('image');
    if (inputElement) {
      inputElement.click();
    }
  }

 

}
