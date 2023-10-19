import { Component } from '@angular/core';

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
        },{
          name: 'view site',
          icon: 'fa-solid fa-eye',
        },
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

  public sidebarisOpen : boolean = false;

  public toggleSideBar(){
    this.sidebarisOpen = !this.sidebarisOpen;
    console.log(this.sidebarisOpen);
    
  }
  
}
