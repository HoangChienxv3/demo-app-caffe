export interface Bill {

    id?: string;
    createdAt?: string;
    totalMoney: number;
    discount: number;
    pay: number;
    paymentStatus: string;
    table_name: string;

}