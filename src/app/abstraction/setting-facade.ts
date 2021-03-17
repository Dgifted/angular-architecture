import { Observable } from 'rxjs';
import { SettingsState } from './../core/settings-state';
import { CashflowCategoryApi } from './../core/casflow-category-api';
import { Injectable } from "@angular/core";
import { Category } from '../models/category';

Injectable({
  providedIn: 'root'
})

export class SettingsFacade {

  constructor(private cashflowCategoryApi: CashflowCategoryApi, private settingsState: SettingsState) {}

  isUpdating$(): Observable<boolean> {
    return this.settingsState.isUpdating$();
  }

  getCashflowCategories$(): Observable<Category[]> {
    return this.settingsState.getCashflowCategories$();
  }

  loadCashflowCategories(): Observable<Category[]> {
    return this.cashflowCategoryApi.getCashflowCategories()
    .pipe(tap((categories: Category[]) => this.settingsState.setCashflowCategories(categories)));
  }

  addCashflowCategory(category: Category) {
    this.settingsState.addCashflowCategory(category);
    this.cashflowCategoryApi.createCashflowCategory(category)
      .subscribe(
        (addedCategoryWithId: Category) => {
          this.settingsState.updateCashflowCategoryId(category, addedCategoryWithId);

        },
        (error: any) => {
          this.settingsState.removeCashflowCategory(category);
          console.log(error);
        }
      );
  }

  updateCashflowCategory(category: Category) {
    this.settingsState.setUpdating(true);
    this.cashflowCategoryApi.updateCashflowCategory(category)
      .subscribe(
        () => this.settingsState.updateCashflowCategory(category),
        (error: any) => console.log(error),
        () => this.settingsState.setUpdating(false)
      );
  }
}
