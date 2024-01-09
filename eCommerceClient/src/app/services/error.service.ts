import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private primeng:MessageService
  ) { }
  errorHandler(err:HttpErrorResponse){
    switch (err.status) {
      case 400:
        this.primeng.add({
          severity: 'warn',
          detail: err.error.message,
          summary: 'Hata!',
        });
        break;
      case 0:
        this.primeng.add({
          severity: 'error',
          detail: 'Api Çalışmıyor',
          summary: 'Hata!',
        });
        break;
      case 404:
        this.primeng.add({
          severity: 'error',
          detail: 'Api Adresi Bulunamadı',
          summary: 'Hata!',
        });
        break;
        case 422:
          for(const e of err.error){
            this.primeng.add({
              severity: 'error',
              detail: e,
              summary: 'Doğrulama Hatası!',
            });
          }
       
        break;
     
    }

  }
}
