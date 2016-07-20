import * as React from "react";
import * as ReactDOM from "react-dom";
import {Template, ITemplate} from "../src/Template";

declare const require: any;

const sampleData: ITemplate = require("./sample.json");

export interface IHelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<IHelloProps, {}> {
    public render() {
        console.log(new Template(sampleData));
        return (
            <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        );
    }
}

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
