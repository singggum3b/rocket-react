import * as React from "react";
import * as ReactDOM from "react-dom";
import { Section } from "./Section";

import { Hello } from "./components/hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);