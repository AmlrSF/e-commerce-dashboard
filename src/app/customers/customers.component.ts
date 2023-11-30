import { Component, OnInit } from '@angular/core';
import { CostumersService } from '../costumers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  public result : any[]=[];
    
    constructor(private router: Router,private costumers:CostumersService,){}

  ngOnInit(): void {
    this.costumers.getCostumer().subscribe(
      (res:any)=>{
        console.log(res);
        this.result = res.customers;
      },(err)=>{
        console.log(err);
      }
    )
  }

  public formatPrice(price:any) {
    if (typeof price === 'string') {
      // If the price is a string, check for the presence of '$' symbol.
      if (price.includes('$')) {
        // If '$' is on the left, move it to the right.
        return price.replace('$', '') + '$';
      } else {
        // If '$' is not present, add it to the right.
        return price + '$';
      }
    } else if (typeof price === 'number') {
      // If the price is a number, convert it to a string and add '$' on the right.
      return price.toString() + '$';
    } else {
      // Handle other cases, e.g., when the data is not a string or a number.
      return 'N/A';
    }
  }

  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  public navigateTo(id:string){
    this.router.navigate(['customers',id]);
  }



}
