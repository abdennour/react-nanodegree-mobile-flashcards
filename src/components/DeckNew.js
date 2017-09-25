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
import { addDeck } from '../actions';
import { primaryColor } from '../utils/colors';
import { SCREENS, FORMS } from '../utils/enums';
import withNavOptions from './hoc/withNavOptions';

class DeckNew extends Component {
  componentDidMount() {
    this.deck.focus();
  }

  handleSubmit = values => {
    this.props.addDeck(values.deck);
    this.props.navigation.navigate(SCREENS.HOME);
    this.props.dispatch(reset(FORMS.NEW_DECK));
    this.props.dispatch(untouch(FORMS.NEW_DECK));
    this.deck.clearText();
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
          name="deck"
          component={this.renderInput}
          label="Deck Name"
          placeholder="Please enter a new deck name"
        />
        <Button
          icon={{ name: 'plus', type: 'entypo' }}
          title="Add"
          backgroundColor={primaryColor}
          containerViewStyle={{ marginTop: 15 }}
          onPress={this.props.handleSubmit(this.handleSubmit)}
        />
      </View>
    );
  }
}

function validate(values, ownProps) {
  const errors = {};
  if (!values.deck) errors.deck = 'Deck name cannot be empty!';
  else if (ownProps.decks.find(d => d === values.deck)) {
    errors.deck = `"${values.deck}" already exists! Add another`;
  }
  return errors;
}

function mapStateToProps({ decks }) {
  return { decks };
}

export default withNavOptions({ headerTitle: 'NEW DECK' })(
  connect(mapStateToProps, { addDeck })(
    reduxForm({
      validate,
      form: FORMS.NEW_DECK
    })(DeckNew)
  )
);
