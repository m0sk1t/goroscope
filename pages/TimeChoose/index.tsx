import React, { Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import { tracker } from "../AppNavigator";
import OnboardingWrapper from '../components/OnboardingWrapper';


class TimeChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
    };
    tracker.trackScreenView('TimeChoose');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <OnboardingWrapper
        showBreadcrumbs={true}
        currentScreen='TimeChoose'
        navigateEnabled={this.state.time}
        navigate={() => {
          tracker.trackEvent("openscreen", "SexChoose");
          AsyncStorage.mergeItem('@HoroApp:user', JSON.stringify(this.state), (err) => {
            navigate('SexChoose');
          });
        }}
      >
        <Text
          style={styles.onboardingTime}
        >
          Выберите время суток
        </Text>
        <View
          style={styles.onboardingChoose}
        >
          <TouchableOpacity onPress={() => {
            this.setState({time: 'day'});
          }}>
            <Icon
              size={100}
              color='#eee'
              name='sun-o'
              style={styles.onboardingIcon}
              color={this.state.time === 'day' ? '#eee' : '#eeeeee99'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({ time: 'night' });
          }}>
            <Icon
              size={100}
              name='moon-o'
              style={styles.onboardingIcon}
              color={this.state.time === 'night'? '#eee': '#eeeeee99'}
            />
          </TouchableOpacity>
        </View>
      </OnboardingWrapper>  
    );
  }
}

const styles = StyleSheet.create({
  onboardingTime: {
    fontSize: 24,
    color: '#eee',
  },
  onboardingIcon: {
    padding: 10,
  },
  onboardingChoose: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TimeChoose;
