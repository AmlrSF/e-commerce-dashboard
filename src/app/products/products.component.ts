import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  public AddNew:boolean = false;
  public products: any[] = []; // Initialize an empty array to store products

  public tooglebtn(){
    this.AddNew = !this.AddNew;
  }


  constructor(
    private router: Router ,
    private productService: ProductServiceService
  ) {}


  navigateToProduct(productId: string) {
    this.router.navigate(['/products', productId]); 
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res) => {
        console.log(res); 
        this.products = res.data; 
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
