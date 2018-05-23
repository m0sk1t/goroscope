import React, {  Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import OnboardingWrapper from '../components/OnboardingWrapper';


class SexChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: null,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <OnboardingWrapper
        showBreadcrumbs={true}
        currentScreen='SexChoose'
        navigateEnabled={this.state.sex}
        navigate={() => {
          AsyncStorage.mergeItem('@HoroApp:user', JSON.stringify(this.state), (err) => {
            navigate('NameChoose');
          });
        }}
      >
        <Text
          style={styles.onboardingSexText}
        >
          Выберите свой пол
        </Text>
        <View
          style={styles.onboardingChoose}
        >
          <TouchableOpacity onPress={() => {
            this.setState({ sex: 'm' });
          }}>
            <Image
              source={require('../assets/male-thin.png')}
              style={this.state.sex === 'm' ? styles.onboardingSexIcon : styles.onboardingSexIconDis}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({ sex: 'f' });
          }}>
            <Image
              source={require('../assets/female-thin.png')}
              style={this.state.sex === 'f' ? styles.onboardingSexIcon : styles.onboardingSexIconDis}
            />
          </TouchableOpacity>
        </View>
      </OnboardingWrapper>
    );
  }
}

const styles = StyleSheet.create({
  onboardingSexText: {
    fontSize: 24,
    color: '#FFF',
  },
  onboardingChoose: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  onboardingSexIcon: {
    margin: 10,
    width: 100,
    height: 100,
    tintColor: '#eee',
    alignSelf: 'center',
  },
  onboardingSexIconDis: {
    margin: 10,
    width: 100,
    height: 100,
    tintColor: '#eeeeee99',
    alignSelf: 'center',
  },
});

export default SexChoose;
