/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for, no-magic-numbers */

import React from 'react';
import PropTypes from 'prop-types';
import ElectionResult from '../models/ElectionResult';
import SeatInput from './SeatInput';
import { TOTAL_SENATOR } from '../models/rules';
import Party from '../models/Party';
import PartyColorMark from './PartyColorMark';

const propTypes = {
  className: PropTypes.string,
  electionResult: PropTypes.instanceOf(ElectionResult).isRequired,
  governmentConfig: PropTypes.shape({
    allyParties: PropTypes.instanceOf(Set),
    mainParty: PropTypes.instanceOf(Party),
    senatorVotes: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func,
};
const defaultProps = {
  className: '',
  onChange() {},
};

const ALLY_PARTY_BADGE_STYLE = { marginBottom: 4, marginRight: 4 };

class GovernmentPanel extends React.PureComponent {
  update(newValue) {
    const { governmentConfig, onChange } = this.props;
    onChange({ ...governmentConfig, ...newValue });
  }

  render() {
    const { className, electionResult, governmentConfig } = this.props;
    const { mainParty, allyParties, senatorVotes } = governmentConfig;

    if (!electionResult) {
      return null;
    }

    return (
      <div className={className}>
        <div className="form-group">
          <div>
            <label htmlFor="">เลือกพรรคหลัก</label>
          </div>
          <div className="btn-group">
            {electionResult.getTopNParties().map(p => (
              <button
                type="button"
                key={p.party.name}
                className={`btn btn-sm btn-hard-light party-name ${
                  p.party === mainParty ? 'active' : ''
                }`}
                onClick={() => {
                  this.update({
                    mainParty: p.party,
                  });
                }}
              >
                <PartyColorMark radius={5} color={p.party.color} />
                &nbsp;
                {p.party.name}
                &nbsp;
                <span className="badge badge-light">{p.seats}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <div>
            <label>เลือกพรรคร่วมรัฐบาล</label>
          </div>
          {electionResult.getPotentialAllies(mainParty && mainParty.name).map(p => (
            <button
              type="button"
              key={p.party.name}
              className={`btn btn-sm btn-outline-tertiary badge-pill party-name ${
                allyParties.has(p.party) ? 'active' : ''
              }`}
              style={ALLY_PARTY_BADGE_STYLE}
              onClick={() => {
                const newSet = new Set(allyParties.values());
                if (allyParties.has(p.party)) {
                  newSet.delete(p.party);
                } else {
                  newSet.add(p.party);
                }
                this.update({
                  allyParties: newSet,
                });
              }}
            >
              <PartyColorMark radius={5} color={p.party.color} />
              &nbsp;
              {p.party.name}&nbsp;
              <span className="badge badge-light">{p.seats}</span>
            </button>
          ))}
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="">จำนวนเสียงสนับสนุนจากส.ว.</label>
          </div>
          <SeatInput
            value={senatorVotes}
            maxValue={TOTAL_SENATOR}
            steppers={[250]}
            onValueChange={newValue => {
              this.update({
                senatorVotes: newValue,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

GovernmentPanel.propTypes = propTypes;
GovernmentPanel.defaultProps = defaultProps;

export default GovernmentPanel;
