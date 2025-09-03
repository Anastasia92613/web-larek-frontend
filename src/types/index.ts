export type UUID = string;
export type PaymentMethod = 'online' | 'cash' | '';
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IProduct {
    id: UUID;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
};

export interface ICatalogData {
    cards: IProduct[];
    preview: string | null;
    getCard (id: UUID): IProduct;
};

export interface IGallery {
    catalog: HTMLElement[];
};

export type ICard = Pick<IProduct, 'id' | 'title' | 'price'>

export interface IBuyer {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
};

export interface IForm {
    valid: boolean;
    inputValues: Record<string, string>;
    getInputValues(): Record<string, string>;
    setError(fieldName: keyof IBuyer): void;
    clearError(): void;
    toggleActiveSubmit(disabled: boolean): void;
    reset(): void;
};

export interface IBasket {
    products: IProduct[];
};

export interface IHeader {
    count: string;
};

export type IDeliveryDetails = Pick<IBuyer, 'payment'| 'address'>;
export type IContactBuyer = Pick<IBuyer, 'phone'| 'email'>;

export interface IBuyerData {
    getBuyer(): IBuyer;
    setDeliveryDetails(details: IDeliveryDetails): void;
    setContact(contact: IContactBuyer): void;
};

export interface IOrder {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: UUID[];
};

export interface IOrderSuccess {
    modalContent: HTMLElement;
    successDescription: HTMLElement;
};

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method: ApiPostMethods): Promise<T>;
};

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};