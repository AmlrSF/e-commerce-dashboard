import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { OrdersService } from '../orders.service';
import { CostumersService } from '../costumers.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public product: any[] = [];
  public orders: any;
  public nbCostumer:number = 0;
  public Totalamount:number = 0;
  public nbOrders:number = 0;
  public errorMsg:any[] = [];
  constructor(
    private productService: ProductServiceService,
    private orderS:OrdersService,
    private costumerS:CostumersService
    ){}



  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      
      this.product = res.data;
    
     
    })

    
    this.costumerS.getCostumer().subscribe((res:any)=>{
      this.nbCostumer = res.customers.length;
    },(err:any)=>{
      console.log(err);
      
    })

    
    
    this.orderS.getOrders().subscribe(
      (res) => {
        this.orders = res;
        this.Totalamount = this.calculateTotalAmountWithStatusTrue(this.orders.orders);
        this.nbOrders = this.getOrderLength(this.orders.orders);
        
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  public navigateToProduct(id:string){

  }

  public deleteProductById(id:string){
    this.productService.deleteProductById(id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);

        
      }
    );
    
     
    this.productService.getProducts().subscribe(res=>{
      this.product = res.data;
    })
  }

  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  public getOrderLength(orders: any[]): number {
    return orders.length;
  }
  
  public calculateTotalAmountWithStatusTrue(orders: any[]): number {
    let totalAmount = 0;
    for (const order of orders) {
      if (order.status === true) {
        totalAmount += order.totalAmount;
      }
    }
    return totalAmount;
  }

}
