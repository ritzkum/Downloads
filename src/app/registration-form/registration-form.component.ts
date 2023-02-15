import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators ,FormControl, FormBuilder} from '@angular/forms';
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
  constructor( private auth: AuthService, private fb:FormBuilder ){}


  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.registerForm = this.fb.group({
      name : new FormControl('',[Validators.required, Validators.required]),
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.required])
    });
  }


  registerProcess() {
    this.registerDatas = this.registerForm.value;
    this.auth.postregister(this.registerForm.value).subscribe((result: any)=>{
      alert("Data Register Successfull")
        console.log(result)
         })
    console.log(this.registerDatas);
  }



  
  
}

        


