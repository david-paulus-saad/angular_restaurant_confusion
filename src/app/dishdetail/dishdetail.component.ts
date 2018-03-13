import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { Params , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import  {FormGroup ,FormBuilder ,Validators} from "@angular/forms";
import {Comment} from '../shared/comment';
import { DISHES} from '../shared/dishes';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dishIds: number[];
  prev: number;
  next: number;
  dish : Dish;
  commentForm: FormGroup;
  comment : Comment;
  constructor(private dishservice: DishService 
  , private route: ActivatedRoute,
private location: Location ,private fb: FormBuilder) {
  this.createForm();
 }

  createForm(){
    this.commentForm = this.fb.group({
      "name":["",[Validators.required,Validators.minLength(2)] ],
      "rate":5,
      "comment":["",Validators.required]
  });
  this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged();
  }
  onValueChanged(data?:any){
    if(!this.commentForm){return;}
    const form=this.commentForm;
    for(const field in this.formErrors){
      //clear previous error message (if any)
      this.formErrors[field]='';
      const control = form.get(field);
      if(control && control.dirty && ! control.valid){
        const messages=this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field]+= messages[key]+ ' ';
        }
      }
    }

  }
  onSubmit(){
    
    this.comment=this.commentForm.value;
    var todayDate = new Date();
    this.comment.date=todayDate.toISOString();
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
      name : "",
      rate :5,
      comment :""
    });

  }
  formErrors={
    "name":"",
    "comment":""
  };
  validationMessages={
    "name":{
      "required":"Author Name is required",
      "minlength":"Authon Name Must be longer"
    },
    "comment":{
      "required":"Comment is required"
    }
  };
  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds =dishIds);
    this.route.params.switchMap((params: Params) =>this.dishservice.getDish(+params['id']))
    .subscribe(dish => {this.dish =dish; this.setPrevNext(dish.id)});
  }
  setPrevNext(dishId: number){
    let index =this.dishIds.indexOf(dishId);
    this.prev =this.dishIds[(this.dishIds.length + index-1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }
  goBack(): void{
    this.location.back();
  }

}
