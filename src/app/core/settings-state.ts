import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


Injectable({
  providedIn: 'root'
})

export class SettingsState {

  private updating$ = new BehaviorSubject<boolean>(false);
  private cashflowCategories$ = new BehaviorSubject<Category[]>(null);

  isUpdating$() {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getCashflowCategories$() {
    return this.cashflowCategories$.asObservable();
  }

  setCashflowCategories(categories: Category[]): void {
    this.cashflowCategories$.next(categories);
  }

  addCashflowCategory(category: Category) {
    const currentValue = this.cashflowCategories$.getValue();
    this.cashflowCategories$.next([...currentValue, category]);
  }

  updateCashflowCategory(updatedCategory: Category): void {
    const categories = this.cashflowCategories$.getValue();
    const indexOfUpdated = categories.findIndex(category => category.id === updatedCategory.id);
    categories[indexOfUpdated] = updatedCategory;
    this.cashflowCategories$.next([...categories]);
  }

  updateCashflowCategoryId(categoryToRemove: Category, addedCategoryWithId: Category): void {
    const categories = this.cashflowCategories$.getValue();
    const updatedCategoryIndex = categories.findIndex(category => category.id === categoryToRemove.id);
    categories[updatedCategoryIndex] = addedCategoryWithId;
    this.cashflowCategories$.next([...categories]);
  }

  removeCashflowCategory(categoryToRemove: Category) {
    const currentValue = this.cashflowCategories$.getValue();
    this.cashflowCategories$.next(currentValue.filter(category => category.id !== categoryToRemove.id));
  }

}

