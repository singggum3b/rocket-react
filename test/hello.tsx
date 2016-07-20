import * as React from "react";
import * as ReactDOM from "react-dom";
import { Section } from "../src/Section";

export interface IHelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<IHelloProps, {}> {
    public render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
