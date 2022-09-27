import { Component, ReactNode, createElement } from "react";

import { CpfCnpjComp, CpfCnpjCompProps } from "./components/CpfCnpjComp";
import { WebCpfCnpjInputPreviewProps } from "../typings/WebCpfCnpjInputProps";

export class preview extends Component<WebCpfCnpjInputPreviewProps> {
    render(): ReactNode {
        return <CpfCnpjComp {...this.transformProps(this.props)}></CpfCnpjComp>;
    }

    private transformProps(props: WebCpfCnpjInputPreviewProps): CpfCnpjCompProps {
        return {
            // className: props.class,
            // style: parseInlineStyle(props.style),
            value: props.valueAttribute
        };
    }
}

export function getPreviewCss(): string {
    return require("./ui/WebCpfCnpjInput.css");
}
