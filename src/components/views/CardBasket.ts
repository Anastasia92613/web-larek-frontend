import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "../common/Card";

export class CardBasket extends Card {
    protected itemIndex: HTMLElement;
    protected productDelete: HTMLButtonElement;
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
    
        this.itemIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.productDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.productDelete.addEventListener('click', () => {
            this.events.emit('cardBasket: delete', {card: this, element: this.container});
        });
    }

    render (data: IProduct, index?: string): HTMLElement {
        super.render(data);
        this.setText(this.itemIndex, index);
        return this.container;
    };

};