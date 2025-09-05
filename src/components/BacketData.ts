import { IBasket, IProduct, UUID } from "../types";
import { IEvents } from "./base/events";

export class BasketData implements IBasket{
    protected _products: IProduct[] | null = [];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    };

    setProduct( product: IProduct): void {
        if (!this._products.some(item => item.id === product.id)){
            this._products.push(product);
            this.events.emit('basket: changet');
        };
    };

    get products (): IProduct[] | null {
        return this._products;
    };

    isProductInBasket (id: UUID): boolean {
       const product =  this._products.some(item => item.id === id);
       return product ? true : false;
    };

    deleteProduct (id: UUID): void {
     this._products = this._products.filter(item => item.id !== id);
     this.events.emit('basket: changet');
    };

    resetBasket(): void {
        this._products = [];
    }

    getCountProductsInBascket (): number {
        return this._products.length;
    };

    getTotalSumProducts (): number {
        let totalSum = 0;
        this._products.forEach(item => totalSum += (item.price || 0));
        return totalSum;
    };
};