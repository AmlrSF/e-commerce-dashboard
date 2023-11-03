import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../product-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
  private apiUrl = 'http://localhost:3000/api/v1/products/product';
  public isToastVisible: boolean = false;
  public isloading:boolean = false;
  public editstatus:string = this.isloading ? 'editing.../' : 'edit'; 
  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
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


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe(
          (product) => {
            this.product = product.data;
  
            // Update form values with the current product data
            this.productForm.patchValue({
              name: this.product.name,
              price: this.product.price,
              image: this.product.image,
              description: this.product.description,
              category: this.product.category,
              discount: this.product.discount,
              quantity: this.product.quantity,
              tag: this.product.tag,
              featured: this.product.featured
            });
  
            this.imageUrl = this.product.image;
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

  public deleteProduct(id: string) {
    this.productService.deleteProductById(id).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/products']);

        // Show a success toast notification
        this.toastr.success('Product deleted successfully');
      },
      (err) => {
        console.log(err);

        // Show an error toast notification
        this.toastr.error('Product deletion failed');
      }
    );
    
  }


  onSubmit() {
    this.isloading = true;
    if (this.productForm.valid) {
      this.productForm.value['image'] = this.imageUrl;

      // Make the HTTP request to update the product
      this.http.put(`${this.apiUrl}/${this.product._id}`, this.productForm.value).subscribe(
        (res) => {
          console.log(res);

          // Show a success toast notification
          this.toastr.success('Product updated successfully');
          this.isloading = false;
          this.productForm.reset();
          this.router.navigate(['/products']);
        },
        (err) => {
          console.log(err);

          // Show an error toast notification
          this.toastr.error('Product update failed');
        }
      );
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
