import React from 'react';
import { changeField, startOptionSelection } from './actions';
import {
  getFieldInvalidHint,
  getFieldLabel,
  getFieldValue,
  getFieldPlaceholder,
  isFieldVisiblyInvalid
} from './index';
import TextInput from '../ui/input/text_input';
import TextInfo from '../ui/input/text_info';
import SelectInput from '../ui/input/select_input';
import CheckboxInput from '../ui/input/checkbox_input';
import TelInput from '../ui/input/tel_input';
import RadioGroup from '../ui/input/radio_group';
import * as l from '../core/index';

const CustomInput = ({
  iconUrl,
  model,
  name,
  ariaLabel,
  placeholder,
  placeholderHTML,
  type,
  validator,
  value
}) => {
  const props = {
    iconUrl,
    isValid: !isFieldVisiblyInvalid(model, name),
    name,
    ariaLabel,
    placeholder
  };

  switch (type) {
    case 'select':
      return (
        <SelectInput
          {...props}
          lockId={l.id(model)}
          label={getFieldLabel(model, name)}
          onClick={() => startOptionSelection(l.id(model), name, iconUrl)}
        />
      );
    case 'checkbox':
      return (
        <CheckboxInput
          lockId={l.id(model)}
          onChange={e => changeField(l.id(model), name, `${e.target.checked}`, validator)}
          checked={getFieldValue(model, name)}
          placeholderHTML={placeholderHTML}
          {...props}
        />
      );
    case 'textinfo':
      return (
        <TextInfo
          invalidHint={getFieldInvalidHint(model, name)}
          onChange={e => changeField(l.id(model), name, e.target.value, validator)}
          value={placeholder}
          {...props}
        />
      );
    case 'tel':
      return (
        <TelInput
          lockId={l.id(model)}
          invalidHint={getFieldInvalidHint(model, name)}
          onChange={value => changeField(l.id(model), name, value, validator)}
          value={getFieldValue(model, name)}
          {...props}
        />
      );
    case 'radio_group':
      return (
        <RadioGroup
          lockId={l.id(model)}
          invalidHint={getFieldInvalidHint(model, name)}
          onChange={e => changeField(l.id(model), name, e.target.value, validator)}
          value={getFieldValue(model, name)}
          {...props}
        />
      );
    case 'hidden':
      return <input id={l.id(model)} type="hidden" value={value} name={name} />;
    default:
      return (
        <TextInput
          lockId={l.id(model)}
          invalidHint={getFieldInvalidHint(model, name)}
          onChange={e => changeField(l.id(model), name, e.target.value, validator)}
          value={getFieldValue(model, name)}
          {...props}
        />
      );
  }
};

export default CustomInput;
