import { Component } from '@angular/core';
import { ProductService } from "./product.service";
import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query";
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { Observable } from "rxjs";
import { filterBy } from "@progress/kendo-data-query";
import { outlets } from "./data.outlets";
import { Outlet } from "./model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProductService]
})
export class AppComponent {

  public title: string = 'kendo-angular-app';
  public gridItems?: Observable<GridDataResult>;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number = 0;
  public gridData: Outlet[] = [];

  constructor() {
    this.loadData();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadData();
  }

  public handleSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
  }

  public filter: CompositeFilterDescriptor = {
    logic: "and",
    filters: [],
  };

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.loadData();
  }

  public loadData(): void {
    this.gridData = filterBy(outlets, this.filter);
  }

}
