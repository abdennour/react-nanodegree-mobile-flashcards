import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Platform,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

class Swiper extends Component {
  static defaultProps = {
    onCompleteSwipe: () => {},
    onCompleteSwipeRight: () => {},
    onCompleteSwipeLeft: () => {},
    onSwipe: () => {},
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
    const {
      onCompleteSwipeLeft,
      onCompleteSwipeRight,
      onCompleteSwipe
    } = this.props;
    this.position.setValue({ x: 0, y: 0 });
    this.setState(({ index }) => ({ index: index + 1 }));
    onCompleteSwipe(this.state.index);
    if (direction === 'right') {
      onCompleteSwipeRight(this.state.index);
    } else onCompleteSwipeLeft(this.state.index);
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
      if (gesture.dx > 0) {
        this.props.onSwipeRight(gesture.dx);
      }

      if (gesture.dx < 0) {
        this.props.onSwipeLeft(gesture.dx);
      }
      this.props.onSwipe(gesture.dx);
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

  currentCardStyle() {
    // interpolation between dx & rotation degree
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    const style = {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    };
    if (Platform.OS !== 'ios') {
      style.elevation = 100;
    }
    return style;
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
        let style = [styles.card];
        let props = { key: JSON.stringify(r) };
        if (index === this.state.index) {
          style = [...style, this.currentCardStyle()];
          props = { ...props, ...this.panResponder.panHandlers };
        } else {
          style = [...style, { top: (index - this.state.index) * 10 }];
        }
        props = { ...props, style };
        return (
          <Animated.View {...props}>
            {this.props.renderCard(r, index)}
          </Animated.View>
        );
      })
      .reverse();
  }

  render() {
    return this.state.index >= this.props.data.length
      ? this.props.renderNoCards()
      : <View>
          {this.renderCards()}
        </View>;
  }
}

const styles = {
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};
export default Swiper;
