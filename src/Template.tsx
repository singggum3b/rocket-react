import { Section, ISection } from "./Section";

export interface ITemplate {
    name: string;
    sections: Map<string, ISection>;
}

export class Template implements ITemplate {

    public name: string;
    public sections: Map<string, Section>;

    constructor(public template: ITemplate) {
        Object.assign(this, template);
        this.sections = Reflect.ownKeys(template.sections)
            .reduce((result: Map<string, Section>, sectName: string) => {
                const s: Section = new Section(template.sections.get(sectName));
                return result.set(
                    sectName,
                    s
                );
            }, new Map() as Map<string, Section>);
    }

    public getLayout(): any {
        return [];
    }
}
