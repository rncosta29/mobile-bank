export type DataItem = {
  cardId: number;
  id: number;
  name: string;
  date: string;
  price: string;
  creditCardDto: number;
  creditCardId: number;  // A propriedade cardId provavelmente é essa
  isParcel: boolean;
  paymentMonth: number;
  paymentYear: number;
};

  
  export type Card = {
    id: number;
    name: string;
    creditsCardDto: DataItem[];
  };
  
  export type SendNewBills = {
    name: string;
    date: string;
    price: string;
    creditCardId: number;
    isParcel: boolean;
    paymentMonth: number;
    paymentYear: number;
    quantity: number;
  }