/* eslint-disable no-magic-numbers */

import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import './SeatInput.css';

const propTypes = {
  className: PropTypes.string,
  onValueChange: PropTypes.func,
  value: PropTypes.number,
};
const defaultProps = {
  className: '',
  onValueChange() {},
  value: 0,
};

const TEXT_INPUT_STYLE = {
  borderLeft: 'none',
  borderRadius: 0,
  borderRight: 'none',
  borderTop: 'none',
  fontWeight: 'bold',
  textAlign: 'right',
};
const BUTTON_STYLE = {
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '0.75em',
  marginLeft: 4,
  minWidth: '28px',
};

class SeatInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleTextChange = debounce(this.handleTextChange.bind(this), 100);
  }

  handleTextChange(ev) {
    const newValue = Number(ev.target.value);
    const { onValueChange } = this.props;
    onValueChange(newValue);
  }

  handleButtonClick(diff) {
    const { onValueChange, value } = this.props;
    onValueChange(value + diff);
  }

  render() {
    const { className, value } = this.props;

    return (
      <div className={className}>
        <div className="input-group seat-input">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            value={value}
            style={TEXT_INPUT_STYLE}
          />
          <div className="input-group-append">
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              style={BUTTON_STYLE}
              onClick={() => this.handleButtonClick(-10)}
            >
              -10
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              style={BUTTON_STYLE}
              onClick={() => this.handleButtonClick(-1)}
            >
              -
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              style={BUTTON_STYLE}
              onClick={() => this.handleButtonClick(1)}
            >
              +
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              style={BUTTON_STYLE}
              onClick={() => this.handleButtonClick(10)}
            >
              +10
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SeatInput.propTypes = propTypes;
SeatInput.defaultProps = defaultProps;

export default SeatInput;