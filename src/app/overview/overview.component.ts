import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public product: any;
  constructor(private productService: ProductServiceService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      this.product = res.data.length;
    })
  }

  

}
