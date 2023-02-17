import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Iregistration } from '../service/interface';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  registerDatas: Iregistration[] = []
  registerForm: any = FormGroup
  constructor(private auth: AuthService, private fb: FormBuilder, private http: HttpClient,private router: Router) { }


  ngOnInit() {
    this.initForm();
    // this.checkEmail();
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });


  }



  registerProcess() {
    if(this.registerForm.invalid){
      alert('Data should not be empty');
    return;
    }
    this.getRegister();
  }



  getRegister() {
    this.registerDatas = this.registerForm.value;
    const inputElement = document.getElementById("email") as HTMLInputElement;
    const inputValue = inputElement.value;

    this.auth.getregister().subscribe(res => {
      const data = res;

      const final = data.find((data: { _id: number; }) => data._id == data._id)
      if (data.length == 0) {
        this.postData();
      }
      else if (final.email == inputValue) {
        alert("email is already exists");
        this.registerForm.reset();
      }

      else {
        this.auth.postregister(this.registerForm.value).subscribe((result: any) => {

          alert("Data Register Successfull");
          this.registerForm.reset();
          this.router.navigate(['/']);
        })
        console.log(this.registerDatas);
      }
    })
  
  }



  postData() {
    this.auth.postregister(this.registerForm.value).subscribe((result: any) => {
      alert("Data Register Successfull")
      const data = result;
      this.registerForm.reset();
      this.router.navigate(['/']);
    })
    console.log(this.registerDatas);
    
  }



}




