import { Section, ISection } from "./Section";

export interface ITemplate {
    name: string;
    section: ISection[];
}

export class Template implements ITemplate {

    public name: string;
    public section: Section[];

    constructor(public template: ITemplate) {
        Object.assign(this, template);
    }

    public getLayout(): any {
        return [];
    }
}
