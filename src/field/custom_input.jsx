import React from 'react';
import { changeField, startOptionSelection } from './actions';
import { getFieldInvalidHint, getFieldLabel, getFieldValue, getFieldPlaceholderHint, isFieldVisiblyInvalid } from './index';
import TextInput from '../ui/input/text_input';
import TextInfo from '../ui/input/text_info';
import SelectInput from '../ui/input/select_input';
import CheckboxInput from '../ui/input/checkbox_input';
import * as l from '../core/index';

const CustomInput = ({
  iconUrl,
  model,
  name,
  placeholder,
  type,
  validator,
  value,
  placeholderFromFieldName
}) => {
  const props = {
    iconUrl,
    isValid: !isFieldVisiblyInvalid(model, name),
    name,
    placeholder
  };

  switch (type) {
    case 'select':
      return (
        <SelectInput
          {...props}
          label={getFieldLabel(model, name)}
          onClick={() => startOptionSelection(l.id(model), name, iconUrl)}
        />
      );
    case 'checkbox':
      return (
        <CheckboxInput
          onChange={e => changeField(l.id(model), name, `${e.target.checked}`, validator)}
          checked={getFieldValue(model, name)}
          {...props}
        />
      );
    case 'info':
      return (
        <TextInfo
          invalidHint={getFieldInvalidHint(model, name)}
          onChange={e => changeField(l.id(model), name, e.target.value, validator)}
          value={placeholder}
          {...props}
        />
      );
    case 'hidden':
      return <input type="hidden" value={value} name={name} />;
    default:
      if (null != placeholderFromFieldName) {
        props['placeholder'] = getFieldPlaceholderHint(model, placeholderFromFieldName);
      }
      return (
        <TextInput
          invalidHint={getFieldInvalidHint(model, name)}
          onChange={e => changeField(l.id(model), name, e.target.value, validator)}
          value={getFieldValue(model, name)}
          {...props}
        />
      );
  }
};

export default CustomInput;
