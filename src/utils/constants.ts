import { IBuyer } from "../types";
import { ensureElement, ensureElementById, ensureTemplateElement } from "./utils";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek/`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;
export const notPrice = 'Бесценно';


export const settings = {
    headers: {
        authorization:`${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
    },
};

export const errorsForm: {[K in keyof IBuyer]: string} = {
    payment: 'Необходимо выбрать способ оплаты',
    email: "Необходимо указать электронную почту",
    phone: 'Необходимо указать номер телефона',
    address: 'Необходимо указать адрес'
};

export const stateBuyButton = {
    buy: 'Купить',
    delete: 'Удалить из корзины',
    unavailable: 'Недоступно'
};

export const typePaymant = {
    online: 'card',
    offline: 'cash'
};


export const template = {
    catalog: ensureTemplateElement('card-catalog'),
    cardFull: ensureTemplateElement('card-preview'),
    modal: ensureElementById<HTMLElement>('modal-container'),
    basketList: ensureElementById<HTMLElement>('modal-basket'),
    basketItem: ensureTemplateElement('card-basket'),
    formOrder: ensureTemplateElement('order'),
    formContact: ensureTemplateElement('contacts'),
    successForm: ensureElementById<HTMLElement>('modal-success'),
};

export const bodyApp = ensureElement<HTMLElement>('.page');

export const elementHTML = {
    basketEmpty: ensureElement<HTMLElement>('.basket__empty', bodyApp),
    gallery: ensureElement<HTMLElement>('.gallery',  bodyApp),
    header:ensureElement<HTMLElement>('.header', bodyApp),
}