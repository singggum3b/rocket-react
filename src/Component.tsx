

export interface IComponent {
    name: string;
    path: string;
    props: Object;
    getComponent(): Function;
}
