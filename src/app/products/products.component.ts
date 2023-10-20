import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  public AddNew:boolean = false;
  
  public tooglebtn(){
    this.AddNew = !this.AddNew;
  }
}
