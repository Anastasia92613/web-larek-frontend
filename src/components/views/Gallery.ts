import { IGallery } from "../../types";
import { Component } from "../base/Component";

export class Gallery extends Component<IGallery>{
    protected container: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
    }

    set catalog (items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}
