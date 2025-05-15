import { Component, OnInit } from '@angular/core';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Product} from '../../../../components/product/services/product.service';
import {ProductAdminService} from './service/product-admin.service';
import {FormsModule, NgForm} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  imports: [
    FormsModule,
    DecimalPipe,
    NgClass,
    MatIcon,
    MatTableModule
  ],
  styleUrl: './products-admin.component.css'
})

export class ProductsAdminComponent implements OnInit{
  products: Product[] = [];
  product: Product = this.createEmptyProduct();

  allProducts: number = 0;
  productsInStock = 0;
  mostExpensiveProduct: string = 'N/A';

  displayColumns: string[] = ['name', 'color', 'buyPrice', 'salePrice', 'quantity', 'actions'];

  constructor(private productService: ProductAdminService) {}

  ngOnInit(): void {
    this.uploadProducts();
  }

  createEmptyProduct(): Product {
    return {
      id: 0,
      buyPrice: 0,
      color: '',
      expirationDate: '',
      inventory: {
        id: 0,
        nameProduct: '',
        entryDate: '',
        totalQuantity: 0,
      },
      quantity: 0,
      salePrice: 0,
      supplier: {
        id: 0,
        name: '',
        address: '',
        typeEggs: [{ id: 0, type: '' }],
      },
      type: {
        id: 0,
        type: '',
      },
      imagen: '',
      nombre: ''
    };
  }
  uploadProducts(): void{
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.calculateSummary();
      },
      error => {
        console.log('Error al cargar los productos:', error);
      }
    );
  }

  calculateSummary(): void{
    this.allProducts = this.products.length;
    this.productsInStock = this.products.filter(p => p.quantity > 0).length;

    if(this.products.length > 0){
      const expensiveProduct = this.products.reduce((prev, current) =>
        (prev.salePrice > current.salePrice) ? prev : current
      );
      this.mostExpensiveProduct = `${expensiveProduct.nombre} ($${expensiveProduct.salePrice})`;
    }else{
      this.mostExpensiveProduct = 'N/A';
    }
  }

  onSubmit(form: NgForm):void{
    if(form.valid){
      if(this.product.id){
        //Actualizar producto existente
        this.productService.saveProduct(this.product).subscribe(
          (updateProduct: Product) => {
            const index = this.products.findIndex(p => p.id === updateProduct.id);
            if(index !== -1){
              this.products[index] = updateProduct;
            }
            this.resetForm(form);
          },
          error => {
            console.error('Error al actualizar el producto', error);
          }
        );
      }else{
        //Crear producto
        this.productService.saveProduct(this.product).subscribe(
          (newProduct: Product) =>{
            this.products.push(newProduct);
            this.resetForm(form);
            this.calculateSummary();
          },
          error => {
            console.error('Error al crear el producto:', error);
          }
        );
      }
    }
  }

  deleteProduct(id: number): void{
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== id);
        this.calculateSummary();
      },
      error => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }
  resetForm(form?: NgForm): void{
    if(form){
      form.resetForm();
    }
    this.product = this.createEmptyProduct();
  }
}
