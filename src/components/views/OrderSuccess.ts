import { IOrderSuccess } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Modal } from "../common/Modal";



export class OrderSuccess extends Modal<IOrderSuccess> {
    protected successDescription: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events:IEvents) {
        super(container, events);

        this.successDescription = ensureElement<HTMLElement>('.film__description', this.container);
        const buttonSuccessClose = ensureElement<HTMLElement>('.order-success__close', this.container);

        buttonSuccessClose.addEventListener('click', () => {
            super.close();
        })
    };

    setDescription(sum: string) {
        this.setText(this.successDescription, `Списано ${sum} синапсов`);
        super.open();
    };
};