import React from 'react';

export default class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    const { name } = this.props;
    // for options need create a global variable like a:
    // window.{name}_options = [value: 'test', label:'test']
    // where {name} its  name of field
    let isInvalidOptions = false;
    const options = window[`${name}_options`];
    // resolve options
    const result = Array.isArray(options) ? options : [];
    result.forEach((item) => {
      if (typeof item === 'object' && item.hasOwnProperty('value') && item.hasOwnProperty('label')
      && typeof item.value === 'string' && typeof item.label === 'string') {
        isInvalidOptions = isInvalidOptions || false
      } else {
        isInvalidOptions = true;
      }
    })
    if (isInvalidOptions) {
      console.warn(`Invalid options for ${name} field`)
    }
    this.setState({ options: !isInvalidOptions ? result : [] });
  }

  render() {
    const { lockId, name, ariaLabel, placeholder, value, isValid, invalidHint } = this.props;
    const { options } = this.state;

    const errorTooltip =
      !isValid && invalidHint ? (
        <div role="alert" id={`auth0-lock-error-msg-${name}`} className="auth0-lock-error-msg">
          <div className="auth0-lock-error-invalid-hint">{invalidHint}</div>
        </div>
      ) : null;

    return (
      <div className="auth0-lock-radio_group" id={`${lockId}-${name}`} aria-label={ariaLabel || name}>
        {placeholder && (
          <p className="auth0-lock-radio_group_title">{placeholder}</p>
        )}
        <div className="auth0-lock-radio_group_options">
          {this.state.options.map(({ value: optionValue, label }) => (
            <label key={optionValue}>
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={value === optionValue}
                onChange={this.handleOnChange}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errorTooltip}
      </div>
    );
  }

  handleOnChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
}
