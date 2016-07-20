export interface IComponent {
    name: string;
    path: string;
    props: Object;
}

export class Component implements IComponent {

    public name: string;
    public path: string;
    public props: Object;

    constructor(public component: IComponent) {
        Object.assign(this, component);
    }

    public getComponent(resolve: Function) {
        return resolve(this.name);
    }

}
