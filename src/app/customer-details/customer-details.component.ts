import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostumersService } from '../costumers.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{
  public costumer: any;

  constructor(private route: ActivatedRoute,private costumerS:CostumersService){};
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const costumerID = params.get('id');
      if (costumerID) {
       this.costumerS.getOrdersByID(costumerID).subscribe(
        (res:any)=>{
          console.log(res);
          this.costumer = res.customer;
        },(err:any)=>{
          console.log(err)
        }
       )
        
      }
    });
  }

}
