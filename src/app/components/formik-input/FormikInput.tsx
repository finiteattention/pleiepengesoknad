import * as React from 'react';
import { Field as FormikField, FieldProps as FormikFieldProps } from 'formik';
import { getValidationErrorPropsWithIntl } from '../../utils/navFrontendUtils';
import InputBase from '../input-base/InputBase';
import { NavFrontendInputProps } from 'nav-frontend-skjema';
import { InputType } from '../../types/InputType';
import { FormikValidationProps } from 'app/types/FormikProps';

interface FormikInputProps<T> {
    name: T;
    helperText?: string;
    type?: InputType;
    maxLength?: number;
}

type Props = NavFrontendInputProps & FormikValidationProps;

const FormikInput = <T extends {}>(): React.FunctionComponent<Props & FormikInputProps<T>> => ({
    label,
    name,
    validate,
    intl,
    ...otherInputProps
}) => (
    <FormikField validate={validate} name={name}>
        {({ field, form: { errors, submitCount } }: FormikFieldProps) => {
            const errorMsgProps = submitCount > 0 ? getValidationErrorPropsWithIntl(intl, errors, field.name) : {};
            return <InputBase label={label} {...otherInputProps} {...errorMsgProps} {...field} />;
        }}
    </FormikField>
);

export default FormikInput;
