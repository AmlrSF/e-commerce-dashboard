import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public myForm!: FormGroup;
  public editMode: boolean = false;
  public categories: any[] = [];
  private baseUrl = 'http://localhost:3000/api/v1/categories';
  private editCat: any;
  public loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private catService: CategoriesService) { }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      header: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.getAllcategories();
  }

  getAllcategories() {
    this.catService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public update(id: string) {
    this.editMode = true;
    this.catService.getCategoryById(id).subscribe(
      (data: any) => {
        this.editCat = data;
        this.myForm.patchValue({
          header: this.editCat.header,
          description: this.editCat.description
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.editMode) {
        const updatedData = {
          name: this.myForm.value.header,
          description: this.myForm.value.description
        };

        this.catService.updateCategoryById(this.editCat._id, updatedData).subscribe(
          (data) => {
            console.log(data);
            this.editMode = false;
            this.getAllcategories();
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.loading = true;
        const newData = {
          header: this.myForm.value.header,
          description: this.myForm.value.description
        };

        this.catService.createCategory(newData).subscribe(
          (data) => {
            console.log(data);
            this.loading = false;
            this.getAllcategories();
          },
          (error) => {
            console.error(error);
            this.loading = false;
          }
        );
      }
    }
  }

  public delete(id: string) {
    this.catService.deleteCategoryById(id).subscribe(
      (data) => {
        console.log(data);
        this.getAllcategories();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
