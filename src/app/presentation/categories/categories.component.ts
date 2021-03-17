// import { Category } from './../../models/category';
import { Observable } from 'rxjs';
import { SettingsFacade } from './../../abstraction/setting-facade';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  newCategory: Category = new Category();
  cashflowCategories$: Observable<Category[]>;
  isUpdating$: Observable<boolean>;

  constructor(private settingsFacade: SettingsFacade) {
    this.cashflowCategories$ = this.settingsFacade.getCashflowCategories$();
    this.isUpdating$ = this.settingsFacade.isUpdating$();
   }

  ngOnInit(): void {
    this.settingsFacade.loadCashflowCategories();
  }

  addCategory(category: Category) {
    this.settingsFacade.addCashflowCategory(category);
  }

  updateCategory(category: Category) {
    this.settingsFacade.updateCashflowCategory(category);
  }

}
