import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public product: any;
  public orders: any;
  public nbCostumer:number = 1;
  public Totalamount:number = 0;
  public nbOrders:number = 0;
  public errorMsg:any[] = [];
  constructor(
    private productService: ProductServiceService,
    private orderS:OrdersService
    ){}



  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      
      this.product = res.data.length;
    
     
    })
    

    
    
    this.orderS.getOrderById("6547ee2d542e6d53e008cef5").subscribe(
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
