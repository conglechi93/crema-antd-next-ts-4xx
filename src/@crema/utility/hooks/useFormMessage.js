import IntlMessages from '@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';

const requiredSourceId = 'validator.required';
const selectRequiredSourceId = 'validator.selectRequired';

export default function useFormMessage() {
  const intl = useIntl();

  const formatRequiredMessageId = (labelId) => {
    const label = intl.messages[labelId];
    return intl.formatMessage({id: requiredSourceId}, {label}).toString();
  };

  const formatSelectRequiredMessageId = (labelId) => {
    const label = intl.messages[labelId];
    return intl.formatMessage({id: selectRequiredSourceId}, {label}).toString();
  };

  const formatRequiredPlaceholderId = (labelId) => {
    return intl.formatMessage({id: labelId}).toString() + ' *';
  };

  const formatRequiredLabelId = (labelId) => {
    return (
      <span>
        <IntlMessages id={labelId} />
        <span className='text-red'> *</span>
      </span>
    );
  };

  return {
    formatRequiredMessageId,
    formatRequiredPlaceholderId,
    formatRequiredLabelId,
    formatSelectRequiredMessageId,
  };
}
