import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators ,FormControl, FormBuilder} from '@angular/forms';
import { debounceTime, Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Iregistration } from '../service/interface';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit  {
 
  registerDatas: Iregistration[] = []
  registerForm:any =FormGroup
  constructor( private auth: AuthService, private fb:FormBuilder, private http:HttpClient ){}


  ngOnInit(){
    this.initForm();
    // this.checkEmail();
  }

  initForm(){
    this.registerForm = this.fb.group({
      name : new FormControl('',[Validators.required, Validators.required]),
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.required])
    });
  }

  

  registerProcess() {
    this.getRegister();
  }


  
  getRegister(){
    this.registerDatas = this.registerForm.value;
    const inputElement = document.getElementById("email") as HTMLInputElement;
    const inputValue = inputElement.value;
   
    this.auth.getregister().subscribe(res=>{
      const data = res;

      const final = data.find((data: { _id: number; }) =>data._id == data._id)
      console.log(final);
      if(final.email == inputValue){
        alert("email is already exists");
        this.registerForm.reset();
      }

      else{
        this.auth.postregister(this.registerForm.value).subscribe((result: any)=>{
          
          alert("Data Register Successfull")
          const data = result;
          
          console.log(data);
          this.registerForm.reset();
             })
        console.log(this.registerDatas);
      }
    })
  }






}

        


