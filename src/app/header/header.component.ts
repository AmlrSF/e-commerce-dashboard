import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public errorMsg:any[] = [];
  constructor(
    private productService: ProductServiceService
    ){}
    
  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      console.log(res.data.filter((product:any)=>product.quantity === 0));
      
      this.errorMsg = res.data.filter((product:any) => product.quantity === 0)
      .map((product:any) => ({
        name: product.name,
        id: product._id,
        errorMessage: `Error: Quantity for ${product.name} is 0. Please update the quantity.`,
      }));
      console.log(this.errorMsg);
      
    })
  }

 
  
}
