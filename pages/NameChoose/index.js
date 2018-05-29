import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import OnboardingWrapper from '../components/OnboardingWrapper';


class NameChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <OnboardingWrapper
        showBreadcrumbs={true}
        currentScreen='NameChoose'
        navigateEnabled={this.state.name}
        navigate={() => {
          AsyncStorage.mergeItem('@HoroApp:user', JSON.stringify(this.state), (err) => {
            navigate('HoroscopePage');
          });
        }}
      >
        <Text
          style={styles.onboardingName}
        >
          Введите ваше имя
        </Text>
        <View
          style={styles.onboardingNameWrap}
        >
          <TextInput
            value={this.state.name}
            style={styles.onboardingName}
            placeholder={'введите имя тут'}
            onChangeText={(name) => this.setState({ name })}
          />
        </View>
      </OnboardingWrapper>
    );
  }
}

const styles = StyleSheet.create({
  onboardingNameWrap: {
    width: 340,
    padding: 10,
    backgroundColor: '#eeaacc77',
  },
  onboardingName: {
    width: 320,
    fontSize: 24,
    color: '#ccc',
    textAlign: 'center',
    borderBottomColor: '#eee',
    backgroundColor: 'transparent',
  },
});

export default NameChoose;
