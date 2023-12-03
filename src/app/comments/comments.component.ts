import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public comments:any[] = [];

  constructor(private http:HttpClient,private comment:CommentsService){}

  ngOnInit(): void {
    
    this.fetechComments();

  }

  public fetechComments(){
    this.comment.getComments().subscribe((res:any)=>{
     
      this.comments = res;

      console.log(res);
      
    },(err:any)=>{
      
        console.log(err);
        

    })
  }

  public delete(id:string){
    this.comment.deleteCommentById(id)
    .subscribe((res:any)=>{
      console.log("deletd succesfully maniga");
      this.fetechComments();
    },(err:any)=>{
      console.log(err);      
    })
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


}
