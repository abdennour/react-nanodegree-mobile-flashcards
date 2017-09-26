import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { primaryColor, lightColor, neutreDarkColor } from '../utils/colors';
import { SCREENS } from '../utils/enums';
/**
 * All commented code is keeped here for reason .
 * Indeed, We worked with ListView . Then, a big issue appeared because of Expo client RN incompatiblity .
 * For more info :Check please
 * @type {Object}
 */
class DecksList extends Component {
  static propTypes = {
    decks: PropTypes.array.isRequired
  };

  componentWillMount() {
    //
    // Tell ListView which dataSource
    //    this.ds = new ListView.DataSource({
    //    rowHasChanged: (r1, r2) => r1 !== r2
    //  });
    // Delegate dataSource to render only visibile items, and for other items,
    //  will be visibile on scrolling.
    //  this.dataSource = this.ds.cloneWithRows(this.props.decks);
  }

  renderRow = (deck, sectionId) => {
    const badge = {
      value: deck.questions.length,
      textStyle: { color: lightColor },
      containerStyle: { backgroundColor: primaryColor }
    };

    return (
      <ListItem
        key={sectionId + deck.name}
        title={deck.name}
        titleStyle={{ fontWeight: 'bold', color: neutreDarkColor }}
        badge={badge}
        onPress={() =>
          this.props.navigate(SCREENS.DECK_BOARD, { deck: deck.name })}
      />
    );
  };

  render() {
    //  this.dataSource = this.ds.cloneWithRows(this.props.decks);
    return (
      <List style={{ flex: 1, backgroundColor: lightColor }}>
        {this.props.decks.map(this.renderRow)}
      </List>
    );
  }
}

function mapStateToProps({ decks, questions }) {
  return {
    decks: decks.map(name => ({
      name,
      questions: questions.filter(question => question.deck === name)
    }))
  };
}

export default connect(mapStateToProps)(DecksList);
