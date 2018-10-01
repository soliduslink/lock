import React from 'react';
import InputWrap from './input_wrap';

export default class TextInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hasFocus() {
    return this.state.focused;
  }

  render() {
    const { name, onChange, value, ...props } = this.props;
    const { focused } = this.state;

    return (
      <p
        name={name}
        className="auth0-lock-input"
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
        aria-label={name}
        {...props}
      >
        {value}
      </p>
    );
  }

  handleFocus() {
    this.setState({ focused: true });
  }

  handleBlur() {
    this.setState({ focused: false });
  }
}
