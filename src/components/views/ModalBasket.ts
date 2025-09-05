import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Modal } from "../common/Modal";

interface IModalBasket {
    basketList: HTMLElement;
}

export class ModalBasket extends Modal<IModalBasket> {
    protected basketList: HTMLElement;
    protected basketTotal: HTMLElement;
    protected buttonOrder: HTMLElement;

    constructor(container:HTMLElement, events: IEvents) {
        super(container, events);

        this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
        this.basketTotal = ensureElement<HTMLElement>('.basket__price', this.container);
        this.buttonOrder = ensureElement<HTMLElement>('.button', this.container);

        this.buttonOrder.addEventListener('click', () => {
            this.events.emit('basket: order');
        });
    };

    setList (items: HTMLElement[], total: string): void {
        this.basketList.replaceChildren(...items);
        this.setText(this.basketTotal, `${total} синапсов`);
        super.open();
    };
    
};