import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import { reduxForm, Field, reset, untouch } from 'redux-form';
import { addQuestion } from '../actions';
import { primaryColor } from '../utils/colors';
import { SCREENS } from '../utils/enums';

class QuestionNew extends Component {
  handleSubmit = values => {
    const { deck } = this.props.navigation.state.params;
    this.props.addQuestion({ ...values, deck });
    this.props.navigation.navigate(SCREENS.DECK_BOARD, { deck });
  };

  renderInput = ({ input, meta: { touched, error }, ...rest }) => {
    const { label, ...inputProps } = rest;
    return (
      <View>
        <FormLabel>
          {label}
        </FormLabel>
        <FormInput
          onChangeText={input.onChange}
          {...input}
          {...inputProps}
          ref={element => {
            this[input.name] = element;
          }}
        />
        <FormValidationMessage>
          {touched && error ? error : null}
        </FormValidationMessage>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Field
          name="statement"
          component={this.renderInput}
          label="Question"
          placeholder="What's .... ?"
        />
        <Field
          name="answer"
          component={this.renderInput}
          label="Answer"
          placeholder="Please write your answer here"
        />
        <Button
          icon={{ name: 'plus', type: 'entypo' }}
          title="Add Question"
          backgroundColor={primaryColor}
          containerViewStyle={{ marginTop: 15 }}
          onPress={this.props.handleSubmit(this.handleSubmit)}
        />
      </View>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.statement) {
    errors.statement = 'This is required field!';
  }

  if (!values.statement) {
    errors.answer = 'This is required field!';
  }
  return errors;
}
export default connect(null, { addQuestion })(
  reduxForm({
    validate,
    form: 'newQuestion'
  })(QuestionNew)
);
