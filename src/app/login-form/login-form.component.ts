import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators ,FormControl, FormBuilder} from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form:any = FormGroup;
  constructor( private auth : AuthService, private fb:FormBuilder) { 
    
  }
  
  

  ngOnInit(): void {
    this.form= this.fb.group({
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required]),
    })
  }


  loginSubmit(data:any){
    this.auth.postlogin(this.form.value).subscribe((res)=>{
      
      // console.log(res);
      // console.log(data)
      alert("Login successful")
    })
    // if(this.form){
    //  alert("hghgh")
     
    // }
  //  alert("hi")
  
  }
  

}
