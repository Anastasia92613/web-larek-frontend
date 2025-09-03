import { typePaymant } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";

export class FormOrder extends Form {
    protected _payment: string;
    protected buttonOnline: HTMLButtonElement;
    protected buttonOffline: HTMLButtonElement;
    
    constructor(container:HTMLTemplateElement, events: IEvents){
        super(container, events);
        
        this.buttonOnline = ensureElement<HTMLButtonElement>(`[name="card"]`, this.container);
        this.buttonOffline = ensureElement<HTMLButtonElement>(`[name="cash"]`, this.container);

        this.buttonOnline.addEventListener('click', (evt) => {
            this.handlePaymentClick(evt);
        });

        this.buttonOffline.addEventListener('click', (evt) => {
            this.handlePaymentClick(evt);
        });

    };

    protected handlePaymentClick(evt: Event): void {
        evt.preventDefault();
        const target = evt.currentTarget as HTMLButtonElement;
        const buttonName = target.name;
        const paymentType = buttonName === typePaymant.online ? typePaymant.online : typePaymant.offline;
        this._payment = paymentType;
        this.events.emit(`formOrder:set${paymentType === typePaymant.online ? typePaymant.online : typePaymant.offline}`);
        this.toggleButton(paymentType);
    };

    protected toggleButton(button: string): void {
        this.toggleClass(this.buttonOnline, 'button_alt-active', false);
        this.toggleClass(this.buttonOffline, 'button_alt-active', false);

        if (button === typePaymant.online) {
            this.toggleClass(this.buttonOnline, 'button_alt-active', true);
        } else if (button === typePaymant.offline) {
            this.toggleClass(this.buttonOffline, 'button_alt-active', true);
        }
    };

    get payment (): string {
        return this._payment;
    };

};