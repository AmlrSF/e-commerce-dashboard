import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public links:any = [
    {
      title: 'Dashboard',
      items: [
        {
          name: 'overview',
          icon: 'fa-solid fa-house',
        },{
          name: 'billboards',
          icon:'fa-brands fa-bandcamp',
        }
        // ,{
        //   name: 'website',
        //   icon: 'fa-solid fa-eye',
        // },
      ],
    },
  
    {
      title: 'Pages',
      items: [
        {
          name: 'products',
          icon: 'fa-solid fa-book',
        },{
          name: 'orders',
          icon: 'fa-solid fa-bag-shopping',
        },
        {
          name: 'categories',
          icon: 'fa-solid fa-dumpster-fire',
        },
        {
          name: 'customers',
          icon: 'fa-solid fa-users',
        },{
          name:'tags',
          icon:'fa-solid fa-tag'
        }
      ],
    },
    
  ];
  
  // [routerLink]="['/', item.name]
  public currentPath: string | undefined ;
  
  public navigateTo(item:string){

    this.router.navigate(['/',item]);

  }

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        this.currentPath = event.url.slice(1);
        
      }
    });
  }

  public sidebarisOpen : boolean = true;

  public toggleSideBar(){

    this.sidebarisOpen = false;
    console.log(this.sidebarisOpen);
    
  }
  
}
