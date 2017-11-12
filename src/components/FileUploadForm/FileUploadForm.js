/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import autobind from 'core-decorators/lib/autobind';
import selectn from 'selectn';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

/* Internal dependencies */
import styles from './styles.scss';
import TextArea from '../../elements/TextArea';
import Button from '../../elements/Button';
import Link from '../../elements/Link';
import questionActions from '../../redux/actions/question';
import * as errorParser from '../../utils/errorParser';

@connect()
class FileUploadForm extends React.Component {

  constructor() {
    super();
    this._refs = {};
    this.state = {
      submitting: false,
    }
  }

  @autobind
  handleCreateQuestion(files) {
    return this.props.dispatch(questionActions.upsertAnswer({ id: this.props.question.id }))
      .promise
      .then((action) => {
        this.handleUploadFile(action.payload.answer.id, files);
      })
      .catch((action) => {
        this.setState({ submitting: false });
        console.log(action.payload.body.error);
      });
  }

  @autobind
  handleUploadFile(answerId, files) {
    const payload = {
      id: this.props.question.id,
      answerId,
      blob: files[0],
    }
    return this.props.dispatch(questionActions.uploadFile(payload))
      .promise
      .then((action) => {
        this.setState({ submitting: false });
      })
      .catch((action) => {
        this.setState({ submitting: false });
        console.log(action.payload.body.error);
      })
  }

  renderDropzone() {
    const handleDrop = (() => {
      if (this.props.question.answer.id) {
        return (files) => {
          this.setState({ submitting: true });
          this.handleUploadFile(this.props.question.answer.id, files);
        }
      }
      return (files) => {
        this.setState({ submitting: true });
        this.handleCreateQuestion(files);
      }
    })();

    return (
      <Dropzone
        className={classNames(styles.dropzone, { [styles.disabled]: this.state.submitting })}
        disabled={this.state.submitting}
        onDrop={handleDrop}
        multiple={false}>
        {this.state.submitting ? <div className={styles.spinner} /> : null}
        파일을 업로드 하려면 클릭하세요.
      </Dropzone>
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.gutter}>
          {`${this.props.index + 1}.`}
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            {this.props.question.title}
          </div>
          <div className={styles.body}>
            {this.renderDropzone()}
          </div>
        </div>
      </div>
    )
  }
}

FileUploadForm.propTypes = {
  index: PropTypes.number,
}

FileUploadForm.defaultProps = {
  index: 0,
}

export default FileUploadForm;