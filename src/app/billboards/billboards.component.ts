import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-billboards',
  templateUrl: './billboards.component.html',
  styleUrls: ['./billboards.component.css']
})
export class BillboardsComponent {
  public myForm!: FormGroup;
  public imageUrl: string = ''; 
  
  constructor(private formBuilder: FormBuilder) { }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Read the file as a Base64 string or use other methods to handle file uploads
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result as string; // Set the image URL from the file
      };
      reader.readAsDataURL(file);
    }
  }
  

  openImage() {
    const inputElement = document.getElementById('image');
    if (inputElement) {
      inputElement.click();
    }
  }


  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      inputControl: [''],
      selectControl: [''],
      textareaControl: ['']
    });
  }

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted!', this.myForm.value);
    // You can send the form data to a server, perform other actions, etc.
  }
}
