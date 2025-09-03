import { IProduct } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "../common/Card";

export class CardCatalog extends Card {
    protected image: HTMLImageElement;
    protected buttonCard: HTMLButtonElement;
    protected category: HTMLElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);

        this.image = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.buttonCard = this.container as HTMLButtonElement;
        this.category = ensureElement<HTMLElement>('.card__category', this.container);

        this.buttonCard.addEventListener('click', () => {
            this.events.emit('card: open', {card: this});
        });
    }

    render (data: IProduct): HTMLElement {
        super.render(data);
        this.setText(this.category, data.category);
        this.setImage(this.image, (CDN_URL + data.image.slice(0, -3) + 'png'));
        return this.container;
    }
}