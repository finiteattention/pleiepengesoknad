import * as React from 'react';
import Step, { StepProps } from '../step/Step';
import { userHasSubmittedValidForm } from '../../utils/formikUtils';

export interface FormikStepProps {
    isSubmitting: boolean;
    isValid: boolean;
    onValidFormSubmit?: () => void;
}

type Props = FormikStepProps & StepProps;

export default class FormikStep extends React.Component<Props> {
    componentDidUpdate(previousProps: Props) {
        if (userHasSubmittedValidForm(previousProps, this.props)) {
            const { onValidFormSubmit } = this.props;
            if (onValidFormSubmit) {
                onValidFormSubmit();
            }
        }
    }

    render() {
        const { isSubmitting, isValid, ...stepProps } = this.props;
        return <Step {...stepProps} />;
    }
}
