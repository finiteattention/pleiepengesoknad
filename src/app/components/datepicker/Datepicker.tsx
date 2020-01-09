import FormikDatepicker from '../formik-datepicker/FormikDatepicker';
import { AppFormField } from '../../types/PleiepengesøknadFormData';
import { injectIntl } from 'react-intl';

export default injectIntl(FormikDatepicker<AppFormField>());
