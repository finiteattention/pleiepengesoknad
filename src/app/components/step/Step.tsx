import * as React from 'react';
import Page from '../page/Page';
import { stepConfig, StepID } from '../../config/stepConfig';
import bemHelper from '../../utils/bemUtils';
import StepIndicator from '../step-indicator/StepIndicator';
import { Hovedknapp as Button } from 'nav-frontend-knapper';
import Box from '../box/Box';
import StepBanner from '../step-banner/StepBanner';
import { Systemtittel } from 'nav-frontend-typografi';
import BackLink from '../back-link/BackLink';
import FormikValidationErrorSummary from '../formik-validation-error-summary/FormikValidationErrorSummary';
import './step.less';

const bem = bemHelper('step');

export interface StepProps {
    id: StepID;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    showSubmitButton?: boolean;
    showButtonSpinner?: boolean;
}

const Step: React.FunctionComponent<StepProps> = ({
    id,
    handleSubmit,
    showSubmitButton,
    showButtonSpinner,
    children
}) => {
    const conf = stepConfig[id];
    return (
        <Page
            className={bem.className}
            title={conf.pageTitle}
            topContentRenderer={() => (
                <>
                    <StepBanner text="Søknad om pleiepenger" />
                    <FormikValidationErrorSummary className={bem.element('validationErrorSummary')} />
                </>
            )}>
            <BackLink className={bem.element('backLink')} href={conf.backLinkHref!} />
            <StepIndicator stepConfig={stepConfig} activeStep={conf.index} />
            <Box margin="xl">
                <Systemtittel className={bem.element('title')}>{conf.stepTitle}</Systemtittel>
            </Box>
            <Box margin="xl">
                <form onSubmit={handleSubmit}>
                    {children}
                    {showSubmitButton !== false && (
                        <Box margin="xl">
                            <Button className={bem.element('button')} spinner={showButtonSpinner || false}>
                                {conf.buttonLabel}
                            </Button>
                        </Box>
                    )}
                </form>
            </Box>
        </Page>
    );
};

export default Step;
