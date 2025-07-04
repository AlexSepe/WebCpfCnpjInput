import { Component, ChangeEvent, ReactNode, CSSProperties, createElement } from "react";
import classNames from "classnames";
// import CpfCnpj from "./CpfCpnjSource";

export interface CpfCnpjCompProps {
    id?: string;
    className?: string;
    value?: string;
    mask?: string;
    style?: CSSProperties;
    placeHolder?: string;
    disabled?: boolean;
    hasError?: boolean;
    required?: boolean;
    readOnly?: boolean;
    saveMask?: boolean;
    onLeave?: (value: string, mask: string, isChanged: boolean) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

interface InputState {
    editedValue?: string;
}

export class CpfCnpjComp extends Component<CpfCnpjCompProps, InputState> {
    TYPES = {
        CPF: "999.999.999-99",
        CNPJ: "99.999.999/9999-99"
    };
    MAX_LENGTH = this.clear(this.TYPES.CNPJ).length;

    readonly state: InputState = { editedValue: undefined };
    private readonly onChangeHandle = this.onLocalChange.bind(this);
    private readonly onBlurHandle = this.onBlur.bind(this);
    private readonly onFocusHandle = this.onFocus.bind(this);

    render(): ReactNode {
        const labelledby = `${this.props.id}-label` + (this.props.hasError ? ` ${this.props.id}-error` : "");
        return (
            <input
                className={classNames("widget-webcpfcnpjinput", this.props.className, "form-control", "mx-textbox")}
                placeholder={this.props.placeHolder}
                style={this.props.style}
                type="tel"
                value={this.getCurrentValue()}
                onChange={this.onChangeHandle}
                onBlur={this.onBlurHandle}
                onFocus={this.onFocusHandle}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                aria-labelledby={labelledby}
                aria-invalid={this.props.hasError}
                aria-required={this.props.required}
            />
        );
    }

    componentDidUpdate(prevProps: CpfCnpjCompProps): void {
        if (this.props.value !== prevProps.value) {
            this.setState({ editedValue: undefined });
        }
    }

    private getCurrentValue(): string {
        const initialvalue = this.state.editedValue !== undefined ? this.state.editedValue : this.props.value || "";
        let value = this.clear(initialvalue);

        if (value) {
            value = this.applyMask(value, this.getMask(value));
        }
        return value;
    }

    private onLocalChange(ev: ChangeEvent<HTMLInputElement>): void {
        let value = this.clear(ev.target.value ?? "");
        const mask = this.getMask(value);

        const nextLength = value.length;

        if (nextLength > this.MAX_LENGTH) {
            return;
        }

        value = this.applyMask(value, mask);

        ev.target.value = value;

        this.setState({ editedValue: value });

        console.log("CfgCnpj onChange " + ev + " mask " + mask);
    }

    private onBlur(): void {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
        const inputValue = this.props.value;
        let currentValue = this.getCurrentValue();

        if (this.props.onLeave) {
            if (!this.props.saveMask) {
                currentValue = this.clear(currentValue);
            }
            const mask = this.getMask(currentValue);
            this.props.onLeave(currentValue, mask, currentValue !== inputValue);
        }

        this.setState({ editedValue: undefined });
    }

    private onFocus(): void {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    private getMask(value: string): string {
        return value.length > 11 ? this.TYPES.CNPJ : this.TYPES.CPF;
    }

    private applyMask(value: string, mask: string): string {
        let result = "";

        let inc = 0;
        Array.from(value).forEach((letter, index) => {
            if (!mask[index + inc].match(/[0-9]/)) {
                result += mask[index + inc];
                inc++;
            }
            result += letter;
        });
        return result;
    }

    private clear(value: string): string {
        const result = value && value.replace(/[^0-9]/g, "");
        return result.substring(0, this.MAX_LENGTH);
    }
}
