import { Component, ReactNode, Fragment, createElement } from "react";

import { WebCpfCnpjInputContainerProps } from "../typings/WebCpfCnpjInputProps";
import { CpfCnpjComp } from "./components/CpfCnpjComp";
import { Alert } from "./components/Alert";
import "./ui/WebCpfCnpjInput.css";

export class WebCpfCnpjInput extends Component<WebCpfCnpjInputContainerProps> {
    // private readonly onValueChangeHandler = this.onValueChange.bind(this);
    private readonly onLeaveHandle = this.onLeave.bind(this);
    private readonly onFocusHandle = this.onFocus.bind(this);
    private readonly onBlurHandle = this.onBlur.bind(this);

    render(): ReactNode {
        const value = this.props.valueAttribute.value || "";
        const validationFeedback = this.props.valueAttribute.validation;
        const required = !!(this.props.requiredMessage && this.props.requiredMessage.value);
        return (
            <Fragment>
                <CpfCnpjComp
                    // className={this.props.class}
                    // onValueChange={this.onValueChangeHandler}
                    onLeave={this.onLeaveHandle}
                    onFocus={this.onFocusHandle}
                    onBlur={this.onBlurHandle}
                    placeHolder={this.props.placeHolder}
                    value={value}
                    required={required}
                    readOnly={this.props.valueAttribute.readOnly}
                    hasError={!!validationFeedback}
                    saveMask={this.props.saveMask}
                ></CpfCnpjComp>
                <Alert>{validationFeedback}</Alert>
            </Fragment>
        );
    }

    // componentDidMount(): void {
    //     this.props.valueAttribute.setValidator(this.validator.bind(this));
    // }

    // private validator(value: string | undefined): string | undefined {
    //     const { requiredMessage } = this.props;
    //     if (requiredMessage && requiredMessage.value && !value) {
    //         return requiredMessage.value;
    //     }
    //     return;
    // }

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
        // this.props.maskAttribute?.setValue(mask);
        console.log("WebCpfCnpjInput onValueChange " + value + " mask " + mask);
    }

    private onFocus(): void {
        if (this.props.onFocus && this.props.onFocus.canExecute) {
            this.props.onFocus.execute();
        }
    }

    private onBlur(): void {
        if (this.props.onBlur && this.props.onBlur.canExecute) {
            this.props.onBlur.execute();
        }
    }
}
