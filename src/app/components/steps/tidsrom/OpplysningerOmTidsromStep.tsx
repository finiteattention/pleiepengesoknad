import * as React from 'react';
import { HistoryProps } from '../../../types/History';
import Step from '../../step/Step';
import { StepID } from '../../../config/stepConfig';
import { navigateTo } from '../../../utils/navigationHelper';
import { getNextStepRoute } from '../../../utils/stepConfigHelper';
import { Field } from '../../../types/PleiepengesøknadFormData';
import Datepicker from '../../datepicker/Datepicker';
import { validateFradato, validateTildato } from '../../../utils/validationHelper';

interface OpplysningerOmTidsromStepProps {
    isValid: boolean;
    onSubmit: () => Promise<void>;
}

type Props = OpplysningerOmTidsromStepProps & HistoryProps;

const nextStepRoute = getNextStepRoute(StepID.TIDSROM);
const OpplysningerOmTidsromStep: React.FunctionComponent<Props> = ({ isValid, onSubmit, history }) => {
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit();
        if (isValid) {
            navigateTo(nextStepRoute!, history);
        }
    }

    return (
        <Step id={StepID.TIDSROM} onSubmit={handleSubmit}>
            <Datepicker
                label="Hvilken dato ønsker du å ha pleiepenger fra?"
                validate={validateFradato}
                name={Field.periodeFra}
            />
            <Datepicker
                label="Hvilken dato ønsker du å ha pleiepenger til?"
                validate={validateTildato}
                name={Field.periodeTil}
            />
        </Step>
    );
};

export default OpplysningerOmTidsromStep;
