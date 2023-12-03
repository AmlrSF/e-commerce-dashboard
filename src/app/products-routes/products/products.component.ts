import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductServiceService } from '../../product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = [
    '_id',
    'image',
    'name',
    'quantity',
    'price',
    'discount',
    'category',
    'tag',
    'featured',
    'firstDate',
    'updateDate',
  ];

  products: any[] = [];

  currentRoutePath: string = '';

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private productService: ProductServiceService,
    private route: ActivatedRoute
  ) {}

  //routing
  navigateToProduct(productId: string) {
    this.router.navigate(['/products', productId]);
  }

  Filterchange(event: Event) {

    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

  }

  public  formatReadableDate(dateString:any) {

    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);

  }
  compareDates(updatedDate: Date, firstDate: Date): string {

    return updatedDate === firstDate ? 'text-black' : 'font-medium text-green-600';

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



  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {

      const path = urlSegments.map((segment) => segment.path).join('/');
      this.currentRoutePath = path;

    });

    this.productService.getProducts().subscribe(
      (res) => {

        console.log(res);

        this.products = res.data;

        this.dataSource.data = this.products;

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      },
      (err) => {
        console.error(err);
      }
    );
  }
}
