import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs/Rx";


@Component({
  selector: 'pips-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  private sub1: Subscription;

@Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const { name, capacity } = form.value;
    if (capacity < 0) {
       // capacity *= -1;
    }

    const category = new Category(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category).subscribe((category) => {
      form.reset();
      form.form.patchValue({capacity: 1});
      this.onCategoryAdd.emit(category);
    });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}