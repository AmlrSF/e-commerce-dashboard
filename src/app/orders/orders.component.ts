import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { ProductServiceService } from '../product-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders: any;
  statusOrder:boolean = false;
  constructor(private http: HttpClient,private orderS:OrdersService,private productS:ProductServiceService){};

  ngOnInit(): void {
    
      this.orderS.getOrders().subscribe(
      (res) => {
        this.orders = res;
        console.log(this.orders);
        this.statusOrder = true;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  
  selectedOrder: any;

  showProductDetails(index: number): void {
    this.selectedOrder = this.orders.orders[index];
  }

  closeProductModal(): void {
    this.selectedOrder = null;
  }

  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  public deleteAllOrders() {
    this.orderS.deleteAllOrders().subscribe(
      (res) => {
        console.log(res);
        
        
        // this.updateProductQuantitiesV2(res.deletedOrders,false);
        this.orders.orders = [];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private updateProductQuantitiesV2(orders: any[], status?: boolean) {
  orders.forEach((order: any) => {
    order.products.forEach((updatedProduct: any) => {
      const productId = updatedProduct.product;
      const allQte = parseInt(updatedProduct.product.quantity, 10);
      const subQuantity = parseInt(updatedProduct.quantity, 10);

      const newQuantity = status ? allQte - subQuantity : allQte + subQuantity;

      const updateUrl = `http://localhost:3000/api/v1/products/product/${productId}`;

      this.http.put(updateUrl, { quantity: newQuantity })
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            if (error.status === 404) {
              console.log('Product not found.');
            } else {
              console.error(error);
            }
          }
        );
    });
  });
  }
  

  
  public toggleOrderStatusById(id: string) {
    const orderToUpdate = this.orders.orders.find((order: any) => order._id === id);
  
    if (orderToUpdate) {
      const currentStatus = orderToUpdate.status;
      const newStatus = !currentStatus;
  
      this.orderS?.updateOrderStatusById(id, newStatus).subscribe(
        (res) => {
          console.log(res);
          orderToUpdate.status = newStatus;
          
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  
  public deleteOrderById(id: string) {
    this.orderS.deleteOrderById(id).subscribe(
      (res) => {
        console.log(res);
        
        this.orders.orders = this.orders.orders.filter((order: any) => order._id !== id);
        this.updateProductQuantities(res,false)
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //it works fine
  private updateProductQuantities(result: any, status?:boolean) {
    for (const updatedProduct of result.order.products) {
      const productId = updatedProduct.product._id;
      const allQuantity = parseInt(updatedProduct.product.quantity, 10);
      const subQuantity = parseInt(updatedProduct.quantity, 10);
      
     

      const newQuantity = status ? allQuantity - subQuantity : allQuantity + subQuantity;
      const updateUrl = `http://localhost:3000/api/v1/products/product/${productId}`;

      console.log(updatedProduct, newQuantity);
      
      
      this.http.put(updateUrl, { quantity: newQuantity })
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            if (error.status === 404) {
              console.log('Product not found.');
            } else {
              console.error(error);
            }
          }
        );
    }
  }



}
