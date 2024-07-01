import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: any[] = [];
  product: any;
  selectedId: any;
  constructor(private dataService: DataService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.dataService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  onClick(id: any): void {
    console.log("Clicked")
    this.selectedId = id;
    this.dataService.getProduct(id).subscribe(data => {
      this.product = data;
    });
    // this.router.navigate(['/product', id]);
    this.router.navigateByUrl(`/productId/${id}`);
  }

}
