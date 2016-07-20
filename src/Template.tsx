import { ISection } from "./Section";

export interface ITemplate {
    name: string;
    section: ISection[];
}

export class Template implements ITemplate {

    public name: string;
    public section: ISection[];

    constructor(public template: ITemplate) {
        Object.assign(this, template);
    }

    public getLayout() {
        return [];
    }
}
