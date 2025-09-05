import { IBuyer, IBuyerData, IContactBuyer, IDeliveryDetails, PaymentMethod } from "../types";
import { IEvents } from "./base/events";

export class BuyerData implements IBuyerData {
   protected payment: PaymentMethod;
   protected email: string;
   protected phone: string;
   protected address: string;
   protected events: IEvents;

	constructor (events: IEvents) {
		this.events = events;
	};

    getBuyer (): IBuyer {
        return {payment: this.payment, email: this.email, phone: this.phone, address: this.address};
    };

    setDeliveryDetails (details: IDeliveryDetails): void {
        this.payment = details.payment;
        this.address = details.address;
        this.events.emit('buyer: changed');
    };

    setContact (contact: IContactBuyer): void {
        this.phone = contact.phone;
        this.email = contact.email;
        this.events.emit('buyer: changed');
    };

    resetBuyer (): void {
        this.payment = '';
        this.address = '';
        this.phone = '';
        this.email = '';
    };

};

