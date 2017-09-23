import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

class Swiper extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };

  state = { index: 0 };

  componentWillReceiveProps(nextPorps) {
    if (nextPorps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.spring();
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight } = this.props;
    this.position.setValue({ x: 0, y: 0 });
    this.setState(({ index }) => ({ index: index + 1 }));
    return direction === 'right' ? onSwipeRight() : onSwipeLeft();
  }

  forceSwipe(direction = 'right') {
    const x = SCREEN_WIDTH * (direction === 'right' ? 1 : -1);
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: 250
    }).start(() => this.onSwipeComplete(direction));
  }
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true, // when put finger on the screen
    onPanResponderMove: (event, gesture) => {
      this.position.setValue({ x: gesture.dx, y: gesture.dy });
    }, // when moving finger around screen
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        this.forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        this.forceSwipe('left');
      } else {
        this.resetPosition();
      }
    } // When finger release the screen
  });

  position = new Animated.ValueXY();

  cardStyle() {
    // interpolation between dx & rotation degree
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }],
      zIndex: 2
    };
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  renderCards() {
    return this.props.data
      .map((r, index) => {
        if (index < this.state.index) return null;
        if (index === this.state.index) {
          return (
            <Animated.View
              key={JSON.stringify(r)}
              style={[this.cardStyle(), styles.card, { zIndex: 2 }]}
              {...this.panResponder.panHandlers}
            >
              {this.props.renderCard(r, index)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={JSON.stringify(r)}
            style={[styles.card, { top: (index - this.state.index) * 10 }]}
          >
            {this.props.renderCard(r, index)}
          </Animated.View>
        );
      })
      .reverse();
  }

  render() {
    return (
      <View>
        {this.state.index >= this.props.data.length
          ? this.props.renderNoCards()
          : this.renderCards()}
      </View>
    );
  }
}

const styles = {
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};
export default Swiper;
