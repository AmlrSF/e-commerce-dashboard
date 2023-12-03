import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CostumersService } from '../costumers.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{

  public costumer: any;

  constructor(
    private route: ActivatedRoute,
    private costumerS:CostumersService,
    private router:Router
  ){};
  
  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const costumerID = params.get('id');
      if (costumerID) {
       this.costumerS.getCostumerByID(costumerID).subscribe(
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
  public delete(){
    this.costumerS.deleteCostumerById(this.costumer._id).subscribe(
      (res:any)=>{

        this.router.navigate(['/customers']);

      },(err:any)=>{

        console.log(err);
        
        
      }
    )
  }

}
