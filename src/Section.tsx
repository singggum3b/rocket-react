import { IComponent } from "./Component";

export interface ISection {
    name: string;
    components: IComponent[];
}

export class Section implements ISection {
    public name: string;
    public components: IComponent[];
    constructor({ name, components }: ISection) {
        this.name = name;
        this.components = components;
    }
}
