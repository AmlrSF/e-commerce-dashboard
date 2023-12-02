import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  public myForm!: FormGroup;
  public editMode: boolean = false;
  public categories: any[] = [];
  private baseUrl = 'http://localhost:3000/api/v1/categories';
  private editCat: any;

  public loading:boolean = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }


  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }



  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      header: ['', Validators.required],
      description : ['', Validators.required]
    });

    this.getAllcategories();
  }

  getAllcategories() {
    
  }

  public update(id: string) {
    this.editMode = true;
    
    
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.editMode) {
        
        const updatedData = {
          header: this.myForm.value.header, 
          description : this.myForm.value.description         
        };

        console.log(updatedData)
      } else {
        this.loading = true;
        console.log(this.myForm.value);
        
        
      }
    }
  }

  public delete(id: string) {
    
  }
}
