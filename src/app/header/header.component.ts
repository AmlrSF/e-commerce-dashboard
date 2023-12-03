import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  public errorMsg:any[] = [];
  public divTop = '-200px'; 


  constructor(
    private productService: ProductServiceService
  ){}
    
    //date formateur
    public  formatReadableDate(dateString:any) {
      const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  
      const date = new Date(dateString);
  
      return date.toLocaleString('en-US', options);
    }

  togglePosition() {
    this.divTop = this.divTop === '-200px' ? '60px' : '-200px';
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      //console.log(res.data.filter((product:any)=>product.quantity === 0));
      
      this.errorMsg = res.data.filter((product:any) => product.quantity === 0)
      .map((product:any) => ({

        name: product.name,
        id: product._id,
        image:product.image,
        errorMessage: `Error: Quantity for ${product.name} is 0. Please update the quantity.`,
        
      }));
      //console.log(this.errorMsg);
      
    })
  }

      //price formatteur
      public formatPrice(price:any) {
        if (typeof price === 'string') {
          
          if (price.includes('$')) {
           
            return price.replace('$', '') + '$';
          } else {
            
            return price + '$';
          }
        } else if (typeof price === 'number') {
          
          return price.toString() + '$';
        } else {
          
          return 'N/A';
        }
      }

 
  
}
