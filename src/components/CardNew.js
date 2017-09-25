import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field, reset, untouch } from 'redux-form';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import Button from './Button';

import withNavOptions from './hoc/withNavOptions';
import { addQuestion } from '../actions';
import { primaryColor } from '../utils/colors';
import { SCREENS, FORMS } from '../utils/enums';

class CardNew extends Component {
  handleSubmit = values => {
    const { deck } = this.props.navigation.state.params;
    this.props.addQuestion({ ...values, deck });
    this.props.navigation.navigate(SCREENS.DECK_BOARD, { deck });
    this.props.dispatch(reset(FORMS.NEW_CARD));
    this.props.dispatch(untouch(FORMS.NEW_CARD));
    this.reset();
  };

  reset = () => {
    this.statement.clearText();
    this.answer.clearText();
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
          title="Add Card"
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

function mapNavOptions({ navigation }) {
  return {
    headerTitle: `NEW ${navigation.state.params.deck.toUpperCase()} CARD`
  };
}

export default withNavOptions(mapNavOptions)(
  connect(null, { addQuestion })(
    reduxForm({
      validate,
      form: FORMS.NEW_CARD
    })(CardNew)
  )
);
