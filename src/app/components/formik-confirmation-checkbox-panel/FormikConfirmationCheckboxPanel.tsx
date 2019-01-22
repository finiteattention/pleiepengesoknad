import * as React from 'react';
import { BekreftCheckboksPanel as NAVConfirmationCheckboxPanel } from 'nav-frontend-skjema';
import { Field as FormikField, FieldProps as FormikFieldProps } from 'formik';
import { getValidationErrorProps } from '../../utils/navFrontendHelper';

interface FormikConfirmationCheckboxPanelProps<T> {
    label: string;
    name: T;
    validate?: ((value: any) => string | Promise<void> | undefined);
    children?: React.ReactNode | React.ReactChildren;
}

const FormikConfirmationCheckboxPanel = <T extends {}>(): React.FunctionComponent<
    FormikConfirmationCheckboxPanelProps<T>
> => ({ children, label, name, validate }) => (
    <FormikField validate={validate} name={name}>
        {({ field, form: { errors, submitCount, setFieldValue } }: FormikFieldProps) => {
            const errorMsgProps = submitCount > 0 ? getValidationErrorProps(errors, field.name) : {};
            return (
                <NAVConfirmationCheckboxPanel
                    className="skjemaelement"
                    children={children}
                    checked={field.value === true}
                    label={label}
                    {...field}
                    {...errorMsgProps}
                    onChange={() => {
                        setFieldValue(`${name}`, !field.value);
                    }}
                />
            );
        }}
    </FormikField>
);

export default FormikConfirmationCheckboxPanel;