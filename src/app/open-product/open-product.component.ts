import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../servicesDB/data.service';
import { map } from 'rxjs';
import { Router, ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-open-product',
  templateUrl: './open-product.component.html',
  styleUrls: ['./open-product.component.css']
})
export class OpenProductComponent implements OnInit {

  // Opened products
  _opened_product_ !: any;
  product_details: any;
  productId !: string;
  productCat !: string;
  product_attr: any;
  product_size: any;
  main_Image_name!: string;
  main_Image_path!: string;

  // Interested products
  _interested_products_: any[] = [];
  _similar_products_: any[] = [];

  // Similar products


  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {

    // this.getProduct();

    this._route.params.subscribe(path => {
      if (path['pid'] && path['cat']) {
        this.getProduct();
      }
    })

  } //ngOnInit

  clickedProduct(id: number, cat: string) {
    this._router.navigate(['product',id,cat]);
  }

  getProduct() {

    this._route.paramMap.subscribe(params => {
      this.productId = params.get('pid') || '';
      this.productCat = params.get('cat') || '';
      console.log(this.productCat);
    })

    this._opened_product_ = this._dataService.allProducts_.pipe(
      map((items: any) => items
        .filter((oneItem: any) => oneItem.id == this.productId))
    );

    // Opened product
    this._opened_product_.subscribe((res: any) => {
      this.product_details = res[0];
      this.main_Image_name = res[0].url1;
      this.main_Image_path = `../assets/${this.product_details.category}/${this.main_Image_name}`;
    }); // correct this

    // console.log(this.main_Image_path);
    this.product_attr = this.generateNormalText(this.product_details.attibutes);
    this.product_size = this.generateNormalText(this.product_details.size);

    // Interested section
    this._dataService.getInterestedProducts(this.productCat).subscribe({
      next: (response: any) => {
        this._interested_products_ = response;
      },
      complete: () => {
        // console.log(this._interested_products_);
      }
    })

    // Similar section
    this._dataService.getSimilarProducts(this.productCat).subscribe({
      next: (response: any) => {
        this._similar_products_ = response;
      },
      complete: () => {
        // console.log(this._similar_products_);
      }
    })
  }

  generateNormalText(inputString: any) {
    if (inputString.length > 0) {
      inputString = inputString.replaceAll(/\[|\]/g, '').replaceAll(/[']/g, '').split(','); // atttr are stored in object with line break
    }
    return inputString;
  }

  main_Image(img_ele: string, event: any) {
    this.main_Image_name = img_ele;
    this.main_Image_path = `../assets/${this.product_details.category}/${this.main_Image_name}`;

    let thumbImg = document.querySelectorAll('.smallImges'); // add remove img highlighter

    thumbImg.forEach(ele => {
      if (ele.id == event.target.id) {
        ele.classList.add('selected_image_border');
      }
      else {
        ele.classList.remove('selected_image_border');
      }
    })

  }



}
