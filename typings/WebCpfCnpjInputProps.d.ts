/**
 * This file was generated from WebCpfCnpjInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, EditableValue } from "mendix";

export interface WebCpfCnpjInputContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    valueAttribute: EditableValue<string>;
    saveMask: boolean;
    placeHolder: string;
    requiredMessage?: DynamicValue<string>;
}

export interface WebCpfCnpjInputPreviewProps {
    readOnly: boolean;
    valueAttribute: string;
    saveMask: boolean;
    placeHolder: string;
    requiredMessage: string;
    onChange: {} | null;
}
