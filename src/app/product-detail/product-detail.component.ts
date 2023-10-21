import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for route parameters
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any; // Define a property to hold the product details

  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Extract the product ID from the route parameter
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        // Fetch the product details by ID
        this.productService.getProductById(productId).subscribe(
          (product) => {
            this.product = product;
          },
          (error) => {
            // Handle errors, e.g., show a not-found message
          }
        );
      }
    });
  }
}
