import * as React from 'react';
import { StepID } from '../../../config/stepConfig';
import { HistoryProps } from '../../../types/History';
import { navigateTo } from '../../../utils/navigationUtils';
import {
    validateForeløpigFødselsnummer,
    validateFødselsnummer,
    validateNavn,
    validateRelasjonTilBarnet,
    validateValgtBarn
} from '../../../validation/fieldValidations';
import { SøkerdataContextConsumer } from '../../../context/SøkerdataContext';
import { Søkerdata } from '../../../types/Søkerdata';
import { CustomFormikProps as FormikProps } from '../../../types/FormikProps';
import { formatName } from '../../../utils/personUtils';
import { Field } from '../../../types/PleiepengesøknadFormData';
import Checkbox from '../../checkbox/Checkbox';
import Input from '../../input/Input';
import FormikStep from '../../formik-step/FormikStep';
import { harRegistrerteBarn } from '../../../utils/søkerdataUtils';
import { getNextStepRoute } from '../../../utils/routeUtils';
import { Feature, isFeatureEnabled } from '../../../utils/featureToggleUtils';
import RadioPanelGroup from '../../radio-panel-group/RadioPanelGroup';

interface OpplysningerOmBarnetStepProps {
    formikProps: FormikProps;
}

type Props = OpplysningerOmBarnetStepProps & HistoryProps;
const nextStepRoute = getNextStepRoute(StepID.OPPLYSNINGER_OM_BARNET);

const OpplysningerOmBarnetStep: React.FunctionComponent<Props> = ({
    formikProps: {
        handleSubmit,
        setFieldValue,
        values: { søknadenGjelderEtAnnetBarn, barnetSøknadenGjelder, barnetHarIkkeFåttFødselsnummerEnda }
    },
    history
}: Props) => {
    const navigate = () => navigateTo(nextStepRoute!, history);
    return (
        <FormikStep
            id={StepID.OPPLYSNINGER_OM_BARNET}
            onValidFormSubmit={navigate}
            handleSubmit={handleSubmit}
            history={history}>
            {isFeatureEnabled(Feature.HENT_BARN_FEATURE) && (
                <SøkerdataContextConsumer>
                    {(søkerdata: Søkerdata) =>
                        harRegistrerteBarn(søkerdata) && (
                            <>
                                <RadioPanelGroup
                                    legend="Velg barnet du skal søke pleiepenger for"
                                    name={Field.barnetSøknadenGjelder}
                                    radios={søkerdata.barn.map((barn) => {
                                        const { fornavn, mellomnavn, etternavn } = barn;
                                        return {
                                            value: JSON.stringify(barn),
                                            key: formatName(fornavn, mellomnavn, etternavn),
                                            label: formatName(fornavn, mellomnavn, etternavn),
                                            disabled: søknadenGjelderEtAnnetBarn
                                        };
                                    })}
                                    validate={(value) => {
                                        if (søknadenGjelderEtAnnetBarn) {
                                            return undefined;
                                        }
                                        return validateValgtBarn(value);
                                    }}
                                />
                                <Checkbox
                                    label="Søknaden gjelder et annet barn"
                                    name={Field.søknadenGjelderEtAnnetBarn}
                                    afterOnChange={(newValue) => {
                                        if (newValue) {
                                            setFieldValue(Field.barnetSøknadenGjelder, '');
                                        }
                                    }}
                                />
                            </>
                        )
                    }
                </SøkerdataContextConsumer>
            )}
            <SøkerdataContextConsumer>
                {(søkerdata: Søkerdata) =>
                    (!isFeatureEnabled(Feature.HENT_BARN_FEATURE) ||
                        søknadenGjelderEtAnnetBarn ||
                        !harRegistrerteBarn(søkerdata)) && (
                        <>
                            <Input
                                label="Barnets fødselsnummer"
                                name={Field.barnetsFødselsnummer}
                                validate={(fnr) => {
                                    if (!barnetHarIkkeFåttFødselsnummerEnda) {
                                        return validateFødselsnummer(fnr);
                                    }
                                    return undefined;
                                }}
                                disabled={barnetHarIkkeFåttFødselsnummerEnda}
                                bredde="XL"
                                type="tel"
                                maxLength={11}
                            />
                            <Checkbox
                                label="Barnet har ikke fått fødselsnummer ennå"
                                name={Field.barnetHarIkkeFåttFødselsnummerEnda}
                                afterOnChange={(newValue) => {
                                    if (newValue) {
                                        setFieldValue(Field.barnetsFødselsnummer, '');
                                    }
                                }}
                            />
                            {barnetHarIkkeFåttFødselsnummerEnda && (
                                <Input
                                    label="Barnets foreløpige fødselsnummer eller D-nummer"
                                    name={Field.barnetsForeløpigeFødselsnummerEllerDNummer}
                                    validate={(foreløpigFnr) => {
                                        if (barnetHarIkkeFåttFødselsnummerEnda) {
                                            return validateForeløpigFødselsnummer(foreløpigFnr);
                                        }
                                        return undefined;
                                    }}
                                    bredde="XXL"
                                    type="tel"
                                    maxLength={11}
                                />
                            )}
                            <Input
                                label="Barnets navn"
                                name={Field.barnetsNavn}
                                validate={(navn) => {
                                    if (barnetHarIkkeFåttFødselsnummerEnda) {
                                        return validateNavn(navn, false);
                                    } else {
                                        return validateNavn(navn, true);
                                    }
                                }}
                                bredde="XL"
                            />
                            <Input
                                label="Min relasjon til barnet"
                                name={Field.søkersRelasjonTilBarnet}
                                validate={validateRelasjonTilBarnet}
                                bredde="XL"
                                helperText="Oppgi din relasjon til barnet her, f.eks. om du er barnets mor, far, tante eller onkel"
                            />
                        </>
                    )
                }
            </SøkerdataContextConsumer>
        </FormikStep>
    );
};

export default OpplysningerOmBarnetStep;
