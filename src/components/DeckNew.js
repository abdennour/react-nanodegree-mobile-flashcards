import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import { reduxForm, Field } from 'redux-form';
import { addDeck } from '../actions';
import { SCREENS } from '../utils/enums';

class DeckNew extends Component {
  handleSubmit = values => {
    this.props.addDeck(values.deck);
    this.props.navigation.navigate(SCREENS.HOME);
  };

  renderInput = ({ input, meta: { touched, error }, ...rest }) => {
    return (
      <View>
        <FormLabel>
          {rest.label}
        </FormLabel>
        <FormInput onChangeText={input.onChange} {...input} />
        {touched &&
          error &&
          <FormValidationMessage>
            {error}
          </FormValidationMessage>}
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Field name="deck" component={this.renderInput} label="Deck Name" />
        <Button
          icon={{ name: 'plus', type: 'entypo' }}
          title="Add"
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

export default connect(mapStateToProps, { addDeck })(
  reduxForm({
    validate,
    form: 'newDeck'
  })(DeckNew)
);
