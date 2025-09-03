import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal<T> extends Component<T>  {
    protected events: IEvents;
    protected modalContent: HTMLElement;
    protected closeButton: HTMLButtonElement;
    
    constructor (container:HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        
        this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.closeButton.addEventListener('click', this.close.bind(this));

        this.container.addEventListener('mousedown', (evt) => {
            if(evt.target === evt.currentTarget) {
                this.close();
            };
        });

        this.handleEscUp = this.handleEscUp.bind(this);
    };

    open (): void {
        this.container.classList.add('modal_active');
        document.addEventListener('keyup', this.handleEscUp);
    };

    close (): void {
        this.container.classList.remove('modal_active');
        document.addEventListener('keyup', this.handleEscUp);
    };

    handleEscUp(evt: KeyboardEvent): void {
        if(evt.key === 'Escape') {
            this.close();
        };
    };

    setContent(item: HTMLElement): void {
        this.modalContent.replaceChildren(item);
        this.open();
    };
};