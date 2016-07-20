import { IComponent } from "./Component";

export interface ISection {
    name: string;
    components: IComponent[];
}

export class Section implements ISection{

    public name: string;
    public components: IComponent[];

    constructor(public section: ISection) {
        Object.assign(this, section);
    }

    public getComponentWithPath() {
        return this.components.filter((com) => (com.path));
    }
}
