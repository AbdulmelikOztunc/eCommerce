import { Component, OnInit } from '@angular/core';
import { TrCurrencyPipe } from 'tr-currency';
import { ShoppingCartModel } from '../../models/shopping-cart.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';
import { api } from '../../constants/api';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SwalService } from '../../services/swal.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [TrCurrencyPipe,ToastModule, ButtonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    public _cart: ShoppingCartService,
    private swal: SwalService,
    private primeng:MessageService,
    private error:ErrorService
  ) {} 

  ngOnInit(): void {}

  decrement(cart: ShoppingCartModel) {
    if (cart.quantity === 1) {
      const response = confirm('Ürünü sepetten kaldırmak istiyor musunuz?');
      if (response) {
        this._cart.decrement(cart.productId);
      }
    } else {
      this._cart.decrement(cart.productId);
    }
  }

  remove(id: number) {
    //this.primeng.add({ key: 'confirm', sticky: true, severity: 'warn', summary: 'Ürünü sepetten kaldırmak istiyor musunuz?' });  

    this.swal.fire("Sil","Ürünü sepetten kaldırmak istiyor musunuz?","Onaylıyorum","question",()=>{
      this.http
      .get(`${api}/ShoppingCarts/RemoveById?id=${id}`, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
        },
      })
      .subscribe({
        next: () => {
          this._cart.getAll();
        },
        error: (err: HttpErrorResponse)=> this.error.errorHandler(err),
      });
    })
   
    
  }

  pay() {  
    this.swal.fire("Ödeme Yap","Ödeme işemini onaylıyor musunuz?","Onaylıyorum",'question',()=>{
      this.http.get(`${api}/ShoppingCarts/Pay`, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
        },
      })

      .subscribe({
        next: () => {
          this._cart.getAll();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    })
   
   }
}
