import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{

  public myForm!: FormGroup;

  public editMode: boolean = false;

  public tags: any[] = [];

  private baseUrl = 'http://localhost:3000/api/v1/tags';

  private editTag: any;

  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
     private http: HttpClient, 
     private tagS: TagsService
  ) { }


  public formatReadableDate(dateString: any) {

    const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }


  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      header: ['', Validators.required],
      description: ['', Validators.required],
    });


    this.getAllTgas();

  }

  //fetch all tags
  getAllTgas() {
    this.tagS.getAllTags().subscribe(

      (data: any[]) => {
        this.tags = data;
      },

      (error) => {
        console.error(error);
      }

    );
  }


  //update a tag by id
  public update(id: string) {
    this.editMode = true;
    this.tagS.getTagById(id).subscribe(
      (data: any) => {

        this.editTag = data;
        this.myForm.patchValue({
          header: this.editTag.name,
          description: this.editTag.description

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
          description: this.myForm.value.description,
        };

        this.tagS.updateTagById(this.editTag._id, updatedData).subscribe(
          (data) => {
            console.log(data);
            this.editMode = false;
            this.getAllTgas();
            this.myForm.reset();
          },
          (error) => {
            console.error(error);
          }
        );

      } else {

        this.loading = true;
        
        console.log(this.myForm.value);

        const cat = {
          name: this.myForm.value.header,
          description: this.myForm.value.description,
        };

        this.tagS.createTag(cat).subscribe(
          (data) => {

            console.log(data);
            this.loading = false;
            this.getAllTgas();
            this.myForm.reset();

          },
          (error) => {

            console.error(error);
            this.loading = false;

          }
        );
      }
    }
  }


  //delete a tag by id
  public delete(id: string) {

    this.tagS.deleteTagById(id).subscribe(
      (data) => {

        console.log(data);
        this.getAllTgas();

      },
      (error) => {

        console.error(error);
        
      }
    );
  }

}
