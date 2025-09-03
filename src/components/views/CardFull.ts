import { IProduct } from "../../types";
import { CDN_URL, stateBuyButton } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "../common/Card";

export class CardFull extends Card {
    protected image: HTMLImageElement;
    protected description: HTMLElement;
    protected template: HTMLTemplateElement;
    protected cardButton: HTMLButtonElement;
    protected events: IEvents;
    protected category: HTMLElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);

        this.image = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.description = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.category = ensureElement<HTMLElement>('.card__category', this.container);

        this.cardButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit('cardFull: updateBascketProduct', {card: this});
        });
    };

    toggleButtonView(value: boolean, price: number | null): void {
        this.setDisabled(this.cardButton, false);

        if (value) {
            this.setText(this.cardButton, stateBuyButton.delete);
            return;
        }; 
        
        if (price === null) {
            this.setDisabled(this.cardButton, true);
            this.setText(this.cardButton, stateBuyButton.unavailable);
        } else {
            this.setText(this.cardButton, stateBuyButton.buy);
        };
    };

    render (data: IProduct, stateButton?: boolean): HTMLElement {
        super.render(data);
        this.setImage(this.image, (CDN_URL + data.image.slice(0, -3) + 'png'));
        this.setText(this.description, data.description);
        this.toggleButtonView(stateButton, data.price);
        return this.container;
    };
};