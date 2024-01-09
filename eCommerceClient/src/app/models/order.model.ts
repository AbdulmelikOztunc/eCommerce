import { OrderDetailModel } from "./order-detail.model";

export class OrderModel{
    id: number = 0;
    number: string = "";
    date: string = "";
    expectedArrival: string = "";
    cargoCompany: string = "";
    cargoTrackingNumber: string = "";
    orderStatus:OrderStatusEnum=OrderStatusEnum.Onaylandi;
    details: OrderDetailModel[] = [];
  }

  export enum OrderStatusEnum{
    Onaylandi = 0,
    KargoyaVerildi = 1,
    DağıtımaCikti = 2,
    TeslimEdildi = 3
  }