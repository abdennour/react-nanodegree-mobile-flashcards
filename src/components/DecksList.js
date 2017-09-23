import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { primaryColor, lightColor, nearDarkColor } from '../utils/colors';
import { SCREENS } from '../utils/enums';

class DecksList extends Component {
  static propTypes = {
    decks: PropTypes.array.isRequired
  };

  componentWillMount() {
    // Tell ListView which dataSource
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    // Delegate dataSource to render only visibile items, and for other items,
    //  will be visibile on scrolling.
    this.dataSource = this.ds.cloneWithRows(this.props.decks);
  }

  renderRow = (deck, sectionId) => {
    const badge = {
      value: deck.questions.length,
      textStyle: { color: lightColor },
      containerStyle: { backgroundColor: primaryColor }
    };

    return (
      <ListItem
        key={sectionId}
        title={deck.name}
        titleStyle={{ fontWeight: 'bold', color: nearDarkColor }}
        badge={badge}
        onPress={() =>
          this.props.navigate(SCREENS.DECK_BOARD, { deck: deck.name })}
      />
    );
  };

  render() {
    this.dataSource = this.ds.cloneWithRows(this.props.decks);
    return (
      <List style={{ flex: 1, backgroundColor: lightColor }}>
        <ListView renderRow={this.renderRow} dataSource={this.dataSource} />
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
