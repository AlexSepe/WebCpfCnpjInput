import { Component, ReactNode, createElement } from "react";

import { WebCpfCnpjInputContainerProps } from "../typings/WebCpfCnpjInputProps";
import { CpfCnpjComp } from "./components/CpfCnpjComp";
import "./ui/WebCpfCnpjInput.css";

export class WebCpfCnpjInput extends Component<WebCpfCnpjInputContainerProps> {
    // private readonly onValueChangeHandler = this.onValueChange.bind(this);
    private readonly onLeaveHandle = this.onLeave.bind(this);

    render(): ReactNode {
        const value = this.props.valueAttribute.value || "";
        const validationFeedback = this.props.valueAttribute.validation;
        const required = !!(this.props.requiredMessage && this.props.requiredMessage.value);
        return (
            <CpfCnpjComp
                // className={this.props.class}
                // onValueChange={this.onValueChangeHandler}
                onLeave={this.onLeaveHandle}
                placeHolder={this.props.placeHolder}
                value={value}
                required={required}
                hasError={!!validationFeedback}
                saveMask={this.props.saveMask}
            ></CpfCnpjComp>
        );
    }

    // private onValueChange(value: string, mask: string): void {
    //     // this.props.valueAttribute?.setValue(value);
    //     // this.props.maskAttribute?.setValue(mask);

    //     console.log("WebCpfCnpjInput onValueChange " + value + " mask " + mask);

    //     // if (this.props.onChange && this.props.onChange.canExecute) {
    //     //     this.props.onChange.execute();
    //     // }
    // }

    // private validator(value: string | undefined): string | undefined {
    //     const { requiredMessage } = this.props;

    //     if (requiredMessage && requiredMessage.value && !value) {
    //         return requiredMessage.value;
    //     }
    // }

    private onLeave(value: string, mask: string, isChanged: boolean): void {
        if (!isChanged) {
            return;
        }
        this.props.valueAttribute.setValue(value);
        this.props.maskAttribute?.setValue(mask);
    }
}
