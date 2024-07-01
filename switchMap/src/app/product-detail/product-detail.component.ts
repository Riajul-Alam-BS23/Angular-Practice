import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    router:Router
  ) { }
  private readonly id$ = this.route.params.pipe(
    map((params => {
      return params['id'];
    }))
  );
  public readonly productType: Observable<any> = this.id$.pipe(
    switchMap(
      (id) => this.dataService.getProduct(id)
    )
  )
  ngOnInit() {
    this.productType.subscribe(product => this.product = product);
  }
  // ngOnInit(): void {
  //   console.log("Product details is available");
  //   this.route.paramMap.pipe(
  //     switchMap(params => this.dataService.getProduct(+params.get('id'))),
  //   ).subscribe(data => {
  //     this.product = data;
  //   });
  // }
}
