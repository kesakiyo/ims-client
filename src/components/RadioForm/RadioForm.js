/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import autobind from 'core-decorators/lib/autobind';
import selectn from 'selectn';
import PropTypes from 'prop-types';

/* Internal dependencies */
import styles from './styles.scss';
import Radio from '../../elements/Radio';
import questionActions from '../../redux/actions/question';
import * as errorParser from '../../utils/errorParser';
import notification from '../../services/notification';

@connect()
class RadioForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: (selectn('question.answer.values', props) || []).pop(),
    }
  }

  @autobind
  handleClick(value) {
    this.setState({
      selected: value,
    })
    const payload = {
      id: this.props.question.id,
      answer: {
        values: [value],
      }
    }
    this.props.dispatch(questionActions.upsertAnswer(payload))
      .promise
      .then((action) => {
        notification.success('성공적으로 저장했습니다.');
      }, (action) => {
        errorParser.showError(selectn('payload.body.error', action));
      })
  }

  @autobind
  renderRadioButton(value, index) {
    return (
      <Radio
        disabled={this.props.disabled}
        onClick={this.handleClick}
        key={index}
        className={styles.radio}
        selected={value === this.state.selected}
        label={value} />
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.gutter}>
          {`${this.props.index + 1}.`}
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            {this.props.question.title}
          </div>
          <div className={styles.answer}>
            {this.props.question.values.map(this.renderRadioButton)}
          </div>
        </div>
      </div>
    )
  }
}

RadioForm.propTypes = {
  index: PropTypes.number,
  disabled: PropTypes.bool,
}

RadioForm.defaultProps = {
  index: 0,
  disabled: false,
}

export default RadioForm;
