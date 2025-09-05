import { ICatalogData, IProduct, UUID } from "../types";
import { IEvents } from "./base/events";

export class CatalogData implements ICatalogData {
   protected _cards: IProduct[] = [];
   protected _preview: UUID | null = null;
   protected events: IEvents;

   constructor(events: IEvents) {
        this.events = events;
    }
    
    setCards (cards: IProduct[]): void {
        this._cards = cards;
        this.events.emit('cards: change');
    }

    get cards (): IProduct[] {
        return this._cards;
    }

    setPreview(id: UUID | null): void {
        if(!id){
           this._preview = null;
           return;
        }

        const card = this.getCard(id);
        if(card) {
            this._preview = id;
            this.events.emit('card: selected');
        }
    }

    get preview (): UUID | null {
        return this._preview;
    }

    getCard (id: UUID): IProduct {
        return this._cards.find(item => item.id === id);
    }

}