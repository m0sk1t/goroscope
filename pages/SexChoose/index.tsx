import React, {  Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';


import { tracker } from "../AppNavigator";
import OnboardingWrapper from '../components/OnboardingWrapper';


class SexChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: null,
    };
    tracker.trackScreenView('SexChoose');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <OnboardingWrapper
        showBreadcrumbs={true}
        currentScreen='SexChoose'
        navigateEnabled={this.state.sex}
        navigate={() => {
          tracker.trackEvent("openscreen", "NameChoose");
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
          <TouchableOpacity
            style={styles.onboardingChooseBtn}
            onPress={() => {
              this.setState({ sex: 'm' });
            }}
          >
            <Image
              source={require('../img/male-thin.png')}
              style={[
                styles.onboardingSexIcon,
                this.state.sex === 'm' ? {} : styles.onboardingSexIconDis
              ]}
            />
            <Text style={{ color: '#eee'}}>М</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.onboardingChooseBtn}
            onPress={() => {
              this.setState({ sex: 'f' });
            }}
          >
            <Image
              source={require('../img/female-thin.png')}
              style={[
                styles.onboardingSexIcon,
                this.state.sex === 'f' ? {} : styles.onboardingSexIconDis
              ]}
            />
            <Text style={{ color: '#eee'}}>Ж</Text>
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
  onboardingChooseBtn: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  onboardingSexIcon: {
    margin: 10,
    width: 100,
    height: 100,
    tintColor: '#eee',
    alignSelf: 'center',
  },
  onboardingSexIconDis: {
    tintColor: '#eeeeee99',
  },
});

export default SexChoose;
