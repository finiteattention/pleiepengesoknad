import { AppFormField } from '../../types/PleiepengesøknadFormData';
import { injectIntl } from 'react-intl';
import FormikTimefield from '../formik-timefield/FormikTimefield';

export default injectIntl(FormikTimefield<AppFormField>());
