import { FormikProps } from 'formik';
import { PleiepengesøknadFormData } from './PleiepengesøknadFormData';
import { FieldValidationResult } from 'common/validation/types';

export type CustomFormikProps = FormikProps<PleiepengesøknadFormData> & { submitForm: () => Promise<void> };

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

export interface FormikValidationProps {
    validate?: FormikValidateFunction;
}
export type FormikInputValidationResult = FieldValidationResult | string | Promise<void> | undefined;
export type FormikValidateFunction = (value: any) => FormikInputValidationResult;
