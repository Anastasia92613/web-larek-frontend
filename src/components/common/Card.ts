import { ICard, IProduct, UUID } from "../../types";
import { notPrice } from "../../utils/constants";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Card extends Component<ICard> {
    protected events: IEvents;
    protected title: HTMLElement;
    protected price: HTMLElement;
    protected _id: UUID;
    

    constructor(template: HTMLTemplateElement, events: IEvents) {
         super(cloneTemplate(template) as HTMLElement);

        this.events = events;

        this.title = ensureElement<HTMLElement>('.card__title', this.container);
        this.price = ensureElement<HTMLElement>('.card__price', this.container);
    };

    get id():UUID {
        return this._id;
    };

    private formatPrice(price: number | null): string {
        return price === null ? notPrice : `${price} синапсов`;
    };

    render (data:  IProduct): HTMLElement {
        this._id = data.id;
        this.setText(this.title, data.title);
        this.setText(this.price, this.formatPrice(data.price));
        return this.container;
    };
};