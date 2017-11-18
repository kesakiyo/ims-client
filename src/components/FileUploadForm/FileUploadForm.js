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
import notification from '../../services/notification';

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
        notification.error('파일 업로드에 실패했습니다.');
        this.setState({ submitting: false });
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
        notification.success('성공적으로 파일을 업로드했습니다.');
        this.setState({ submitting: false });
      })
      .catch((action) => {
        notification.error('파일 업로드에 실패했습니다.');
        this.setState({ submitting: false });
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
        className={styles.dropzone}
        disabledClassName={styles.disabled}
        disabled={this.state.submitting || this.props.disabled}
        onDrop={handleDrop}
        multiple={false}>
        {this.state.submitting ? <div className={styles.spinner} /> : null}
        {
          (() => {
            if (this.props.question.answer.file && this.props.question.answer.file.name) {
              return (
                <div className={styles.file}>
                  <div className={styles.name}>
                    {`${this.props.question.answer.file.name}이 올라가 있습니다.`}
                  </div>
                  <div className={styles.verbose}>
                    파일을 수정하려면 클랙해주세요.
                  </div>
                </div>
              )
            }
            return '파일을 업로드하려면 클릭해주세요.'
          })()
        }
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
  disabled: PropTypes.bool,
}

FileUploadForm.defaultProps = {
  index: 0,
  disabled: false,
}

export default FileUploadForm;