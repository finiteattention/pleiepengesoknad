import * as React from 'react';
import Step from '../../step/Step';
import { StepID } from '../../../config/stepConfig';
import { HistoryProps } from '../../../types/History';
import { getNextStepRoute } from '../../../utils/stepConfigHelper';
import { navigateTo } from '../../../utils/navigationHelper';
import Input from '../../input/Input';
import { validateAdresse, validateFnr, validateNavn, validateRelasjonTilBarnet } from '../../../utils/validationHelper';
import { SøkerdataContextConsumer } from '../../../context/SøkerdataContext';
import { Søkerdata } from '../../../types/Søkerdata';
import RadioPanelGroup from '../../radio-panel-group/RadioPanelGroup';

interface OpplysningerOmBarnetStepProps {
    isValid: boolean;
    onSubmit: () => Promise<void>;
}

type Props = OpplysningerOmBarnetStepProps & HistoryProps;

const nextStepRoute = getNextStepRoute(StepID.OPPLYSNINGER_OM_BARNET);
const OpplysningerOmBarnetStep: React.FunctionComponent<Props> = ({ isValid, onSubmit, history }) => {
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit();
        if (isValid) {
            navigateTo(nextStepRoute!, history);
        }
    }

    return (
        <Step id={StepID.OPPLYSNINGER_OM_BARNET} onSubmit={handleSubmit}>
            <SøkerdataContextConsumer>
                {(søkerdata: Søkerdata) =>
                    søkerdata.barn && (
                        <RadioPanelGroup
                            legend="Hvilket barn gjelder søknaden?"
                            name="barnetSøknadenGjelder"
                            radios={søkerdata.barn.map((barn) => ({
                                value: barn.fodselsnummer,
                                label: `${barn.fornavn} ${barn.etternavn}`
                            }))}
                        />
                    )
                }
            </SøkerdataContextConsumer>
            <Input label="Hva er barnets etternavn?" name="barnetsEtternavn" validate={validateNavn} />
            <Input label="Hva er barnets fornavn?" name="barnetsFornavn" validate={validateNavn} />
            <Input label="Hva er barnets fødselsnummer?" name="barnetsFnr" validate={validateFnr} />
            <Input label="Hva er barnets adresse?" name="barnetsAdresse" validate={validateAdresse} />
            <Input
                label="Hva er din relasjon til barnet?"
                name="søkersRelasjonTilBarnet"
                validate={validateRelasjonTilBarnet}
            />
        </Step>
    );
};

export default OpplysningerOmBarnetStep;
