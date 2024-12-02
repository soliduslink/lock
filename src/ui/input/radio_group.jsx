import React from 'react';

export default class RadioGroup extends React.Component {
  render() {
    const { lockId, name, ariaLabel, placeholder, value, isValid, invalidHint, options } = this.props;

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
          {options.map(({ value: optionValue, label }) => (
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
