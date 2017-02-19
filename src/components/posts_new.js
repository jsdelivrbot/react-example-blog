import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Push } from 'react-router';

// http://redux-form.com/6.5.0/examples/fieldLevelValidation/

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined


const renderField = ({ input, name, label, type, meta: { touched, error, warning } }) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} name={name} placeholder={label} type={type}/>
      <div className="text-help">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
);

const renderTextarea = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <div>
      <textarea className="form-control" {...input} placeholder={label} type={type}/>
      <div className="text-help">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
);


class PostNew extends Component {

  // need more information how this works to help the form to redirect after
  // submitting data to the server
  //https://www.udemy.com/react-redux/learn/v4/t/lecture/4419896
  //PropTypes are used with the context system - it tells the React component to expect an object to be available over context.
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {

    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Form</h3>

        <Field name="title"
               label="Title"
               type="text"
               component={renderField}
               validate={[ required ]} />

        <Field name="categories"
               type="text"
               label="Categories"
               component={renderField}
               validate={[ required ]} />

        <Field name="content"
               label="Content"
               component={renderTextarea}
               className="form-control"
               validate={[ required ]} />

        <div>
          <button type="submit"
                  className="btn btn-primary"
                  disabled={submitting}>
            Submit
          </button>
          <button type="button"
                  className="btn btn-primary"
                  disabled={pristine || submitting}
                  onClick={reset}>
            Clear Values
          </button>

          <Link to="/" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    );
  }
}

export default connect(null, {createPost})(reduxForm({
  form:'PostNew'
})(PostNew));
