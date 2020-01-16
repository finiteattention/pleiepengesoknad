import React from 'react';
import Box from 'common/components/box/Box';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import Input from '../input/Input';
import { Arbeidsforhold, ArbeidsforholdField, AppFormField } from '../../types/PleiepengesøknadFormData';
import intlHelper from 'common/utils/intlUtils';
import { validateReduserteArbeidProsent } from '../../validation/fieldValidations';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface Props {
    arbeidsforhold: Arbeidsforhold;
    getFieldName: (name: ArbeidsforholdField) => AppFormField;
}

const VetIkkeArbeidsforholdPart: React.FunctionComponent<Props & InjectedIntlProps> = ({
    arbeidsforhold: { navn, jobberNormaltTimer },
    getFieldName,
    intl
}) => {
    return (
        <>
            <Box margin="xl">
                <SkjemaGruppe
                    title={intlHelper(intl, 'arbeidsforhold.iDag.spm', {
                        arbeidsforhold: navn
                    })}>
                    <Input
                        name={getFieldName(ArbeidsforholdField.jobberNormaltTimer)}
                        type="number"
                        label={intlHelper(intl, 'arbeidsforhold.iDag.utledet')}
                        inputClassName="input--timer"
                        validate={(value) => validateReduserteArbeidProsent(value, true)}
                        value={jobberNormaltTimer || ''}
                        labelRight={true}
                        min={0}
                        max={100}
                        maxLength={2}
                    />
                </SkjemaGruppe>
            </Box>
        </>
    );
};

export default injectIntl(VetIkkeArbeidsforholdPart);