import { IHeader } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Header extends Component<IHeader> {
    protected countElement: HTMLElement;
    protected container: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.container = container;
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.countElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basketButton: open');
        });
    }

    set count (count: string) {
        this.setText(this.countElement, count);
    }
}