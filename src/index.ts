import { AppApi } from './components/AppApi';
import { BasketData } from './components/BacketData';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BuyerData } from './components/BuyerData';
import { CatalogData } from './components/CatalogData';
import { Form } from './components/common/Form';
import { Modal } from './components/common/Modal';
import { CardBasket } from './components/views/CardBasket';
import { CardCatalog } from './components/views/CardCatalog';
import { CardFull } from './components/views/CardFull';
import { FormOrder } from './components/views/FormOrder';
import { Gallery } from './components/views/Gallery';
import { Header } from './components/views/Header';
import { ModalBasket } from './components/views/ModalBasket';
import { OrderSuccess } from './components/views/OrderSuccess';
import './scss/styles.scss';
import { IApi, IContactBuyer, IDeliveryDetails, IOrder, IProduct, PaymentMethod, UUID } from './types';
import { API_URL, elementHTML, settings, template } from './utils/constants';

const events = new EventEmitter();
const catalogData = new CatalogData(events);
const basketData = new BasketData(events);
const buyerData = new BuyerData(events);
const cardsContainer = new Gallery(elementHTML.gallery);
const header = new Header(elementHTML.header, events);
const cardView = new CardFull(template.cardFull, events);
const modalView = new Modal(template.modal, events);
const modalBasket = new ModalBasket(template.basketList, events);
const formOrderView = new FormOrder(template.formOrder, events);
const formContactView = new Form(template.formContact, events);
const successFormView = new OrderSuccess(template.successForm, events);


const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

//Получение от сервера товаров
api.getCards()
.then((initialCards) => {
    catalogData.setCards(initialCards);
    events.emit('initialData: loaded');
})
.catch((err) => {
    console.log(err);
});

//Рендер товара в каталоге
events.on('initialData: loaded', () => {
    const cardArray = catalogData.cards.map(item => {
        const card = new CardCatalog(template.catalog, events);
        const countProduct = basketData.getCountProductsInBascket();
        basketData.getCountProductsInBascket();
        header.render({count: `${countProduct}`});

       return card.render(item);
    });

   cardsContainer.render({catalog: cardArray});
});

//Открытие карточки товара
events.on('card: open', (data: { card: CardCatalog } ) => {
    const { card } = data;
    api.getCard(card.id)
    .then((card) =>{
        const stateButton = basketData.isProductInBasket(card.id);
        const renderCard = cardView.render(card, stateButton);
        modalView.setContent(renderCard);
    })
    .catch((err) => {
        console.log(err);
    });
});

//Добавление товара в корзину
events.on('cardFull: updateBascketProduct',(data: {card: CardFull}) => {
    const { card } = data;
    const cardData = catalogData.getCard(card.id);
    const productInBasket = basketData.isProductInBasket(cardData.id);

    productInBasket ? basketData.deleteProduct(cardData.id) : basketData.setProduct(cardData);

    const countProduct = basketData.getCountProductsInBascket();
    cardView.toggleButtonView(!productInBasket, cardData.price);
    header.render({count: `${countProduct}`});
    
});

//Рендер товаров в корзине
const renderBasketItems = (products: IProduct[]): { elements: HTMLElement[], total: number } => {
    let total = 0;
   const elements = products.map((product, index) => {
        const basketItemiView = new CardBasket(template.basketItem, events);
        const itemIndex = (index + 1).toString();
        const produstBasket = basketItemiView.render(product, itemIndex);
        product.price === null ? total += 0 : total += product.price;
        return produstBasket;
    });
    return {elements, total}
};

//Открытие корзины
events.on('basketButton: open', () => {
    const productBasket = basketData.products;
    if(!productBasket || productBasket.length === 0){
        modalView.setContent(elementHTML.basketEmpty);
   } else {
        const itemsProduct = renderBasketItems(productBasket);
        modalBasket.setList(itemsProduct.elements, `${itemsProduct.total}`);
    }
});

//Удаление товара из корзины
events.on('cardBasket: delete', (data: {card: CardBasket, element: HTMLElement}) => {
    const { card, element } = data;
    basketData.deleteProduct(card.id);
    const productBasket = basketData.products;
    element.remove();
    header.render({count: `${productBasket.length}`});

    if(productBasket.length === 0){
        modalBasket.close();
        modalView.setContent(elementHTML.basketEmpty);
    } else {
        const itemsProduct = renderBasketItems(productBasket);
        modalBasket.setList(itemsProduct.elements, `${itemsProduct.total}`);
    };
});

//Открытие модального окна выбора оплаты и адреса
events.on('basket: order', () => {
    modalBasket.close();
    const form = formOrderView.form;
    modalView.setContent(form);
});

//Валидатор формы заказа
const isValidOrder = () => {
    const values = formOrderView.getInputValues();
    
    if (!values.address || values.address.trim() === '') {
        formOrderView.setError('address');
        formOrderView.toggleActiveSubmit(true);
        return;
    };

    if (!formOrderView.payment) {
        formOrderView.setError('payment');
        formOrderView.toggleActiveSubmit(true);
        return;
    };

    formOrderView.toggleActiveSubmit(false);
    formOrderView.clearError();
};

//Проверка валидности формы заказа
events.on('formOrder:setcard', isValidOrder);
events.on('formOrder:setcash', isValidOrder);
events.on('order: input', isValidOrder);

//Сохранение данных заказа и открытие формы для контактов
events.on('order: submit', () => {
    const payment: PaymentMethod = formOrderView.payment === 'card' ? 'online' : 'cash';
    const address: string = formOrderView.getInputValues().address;
    const details: IDeliveryDetails = {
        address: address,
        payment: payment
    };
   buyerData.setDeliveryDetails(details);
    modalView.close();
    const form = formContactView.form;
    modalView.setContent(form);
});

//Валидатор введенных контактов
const isValidContacts = () => {
    const values = formContactView.getInputValues();

    if(!values.email || values.email.trim() === '') {
        formContactView.setError('email');
        formContactView.toggleActiveSubmit(true);
        return;
    }

    if(!values.phone || values.phone.trim() === '') {
        formContactView.setError('phone');
        formContactView.toggleActiveSubmit(true);
        return;
    }

    formContactView.toggleActiveSubmit(false);
    formContactView.clearError();
}; 

//Проверка валидности формы с контактами
events.on('contacts: input', isValidContacts);

//Сохранение данных по заказу
events.on('contacts: submit', () => {
    const phone: string = formContactView.getInputValues().phone;
    const email: string = formContactView.getInputValues().email;
    const contact: IContactBuyer = {
        phone: phone,
        email: email
    }
    buyerData.setContact(contact);
    events.emit('fullOrder: loaded');
});

//Отравка заказа на сервер и отображение окна успешной покупки
events.on('fullOrder: loaded', () => {
    const buyer = buyerData.getBuyer();
    const products: UUID[] = basketData.products.map(product => product.id);
    const total = basketData.getTotalSumProducts();
    const order: IOrder = {
        payment: buyer.payment,
        email: buyer.email,
        phone: buyer.phone,
        address: buyer.address,
        total: total,
        items: products
    }

    api.postOrder(order)
    .then((response) => {
        modalView.close();
        successFormView.setDescription(`${response.total}`);
    })
    .catch((err) => {
        console.log(err);
    });
});
