import { IBuyer, IForm } from "../../types";
import { errorsForm } from "../../utils/constants";
import { ensureAllElements, ensureAttribute, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


export class Form extends Component<IForm> {
    protected formElement: HTMLFormElement;
    protected formName: string;
    protected events: IEvents;
    protected error: HTMLElement;
    protected inputs: HTMLInputElement[];
    protected submitButton: HTMLButtonElement;

    constructor (container:HTMLTemplateElement, events: IEvents) {
        super(container.content.cloneNode(true) as HTMLElement);
        this.events = events;

        this.formElement = ensureElement<HTMLFormElement>('.form', this.container);
        this.inputs = ensureAllElements<HTMLInputElement>('.form__input', this.container);
        this.formName = ensureAttribute('name', this.formElement);
        this.error = ensureElement<HTMLElement>('.form__errors', this.container);
        const containerActions = ensureElement<HTMLElement>('.modal__actions', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button', containerActions);
        

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.events.emit(`${this.formName}: submit`, this.getInputValues());
        });

        this.formElement.addEventListener('input', (event: InputEvent) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`${this.formName}: input`, {field, value});
        });
    };

    setError (fieldName: keyof IBuyer): void {
        this.error.textContent = errorsForm[fieldName];
    };

    clearError (): void {
        this.setText(this.error, '');
    };

    getInputValues (): Record<string, string>  {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.value;
        });

        return valuesObject;
    };

    toggleActiveSubmit (value: boolean): void {
        this.setDisabled(this.submitButton, value);
    };
    
    get form (): HTMLFormElement {
        return this.formElement;
    };

    reset (): void {
        this.formElement.reset();
        this.setText(this.error, '');
        this.setDisabled(this.submitButton, true);
    };

};