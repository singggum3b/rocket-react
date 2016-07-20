import { Component, IComponent } from "./Component";

export interface ISection {
    name: string;
    components: IComponent[];
}

export class Section implements ISection{

    public name: string;
    public components: Component[];

    constructor(public section: ISection) {
        Object.assign(this, section);
        this.components = section.components.map((com) => (new Component(com)));
    }

    public getComponentWithPath() {
        return this.components.filter((com: Component) => (!!com.path));
    }
}
