import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { Observable, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // searchControl = new FormControl();
  // products: any[] = [];

  // constructor(private productService: ProductService) {}

  // ngOnInit() {
  //   this.searchControl.valueChanges.pipe(
  //     debounceTime(300),
  //     switchMap(query => this.productService.searchProducts(query))
  //   ).subscribe(products => {
  //     this.products = products;
  //   });
  // }
  searchField: FormControl;
  coolForm: FormGroup;
  artists$: Observable<any[]>;

  constructor(private productService: ProductService,
              private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.searchField = new FormControl();
    this.coolForm = this.fb.group({search: this.searchField});

    this.searchField.valueChanges.pipe(
      debounceTime(400),
      switchMap(term => this.productService.searchProducts(term))
    )
      .subscribe((products) => {
      this.artists$ = products;
    });
  }
}
