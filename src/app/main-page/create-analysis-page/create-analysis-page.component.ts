import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-analysis-page',
  templateUrl: './create-analysis-page.component.html',
  styleUrls: ['./create-analysis-page.component.css']
})
export class CreateAnalysisPageComponent implements OnInit {
  name2 = 'Angular';  
    
  productForm: FormGroup;  

  app = environment.application
  user : any;
  mongo : any;
  collection : any;
  models : any;
  Selected :string;
  nom_analyse : string;
  Question_Type : string;
  constructor(private fb:FormBuilder) {
    this.user = this.app.allUsers[sessionStorage.getItem("userId")]
      
    this.mongo =this.user.mongoClient('Cluster0');
    this.collection = this.mongo.db('Data').collection("models");
  
      this.productForm = this.fb.group({  
        name: this.nom_analyse,  
        quantities: this.fb.array(["1"]) ,  
      });  
      
  }

  question_types = [
    {
      name : "Texte",
    },
    {
      name : "Case à cocher",
    }
  ]

  createForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.collection.find({}).then((value)=>{
    
    this.models = value
    this.models.push({name : "Personnalisé"})
    })
  }
  show() {
    console.log(this.nom_analyse)
  }
quantities() : FormArray {  
  return this.productForm.get("quantities") as FormArray  
}  
   
newQuantity(): FormGroup {  
  return this.fb.group({  
    qty: '',  
    price: '',  
  })  
}  
   
addQuantity() {  
  this.quantities().push(this.newQuantity());  
}  
   
removeQuantity(i:number) {  
  this.quantities().removeAt(i);  
}  
   
onSubmit() {  
  console.log(this.productForm.value);  }

}