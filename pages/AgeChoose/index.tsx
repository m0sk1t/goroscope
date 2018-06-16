import React from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  AsyncStorage,
  DatePickerIOS,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import signs from "../constants/signs";
import signImages from "../constants/signImages";
import { tracker } from "../AppNavigator";
import OnboardingWrapper from '../components/OnboardingWrapper';


interface Props {
  navigation?: object | undefined;
}

interface State {
  sign?: string;
  birthDate?: Date;
  displayDate?: string;
}


export default class AgeChoose extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sign: '',
      displayDate: '',
      birthDate: undefined,
    };
    tracker.trackScreenView('AgeChoose');
  }

  openPicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction && month && year && day) {
        const sign = this.defineSign(month, day);
        this.setState({
          sign,
          birthDate: new Date(year, month, day),
          displayDate: `${day}/${month + 1}/${year}`,
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  defineSign(m: number, d: number): string {
    if (d > signs[m][0]) m += 1;
    if (m > 11) m = 1;
    return signs[m][1];
  }

  render() {
    const { navigate } = this.props.navigation;
    const sign = this.state.sign ? signs.filter(el => el[1] === this.state.sign)[0]: [];
    return (
      <OnboardingWrapper
        showBreadcrumbs={true}
        currentScreen='AgeChoose'
        navigateEnabled={Boolean(this.state.sign)}
        navigate={() => {
          tracker.trackEvent("openscreen", "TimeChoose");
          AsyncStorage.mergeItem('@HoroApp:user', JSON.stringify(this.state), (err) => {
            navigate('TimeChoose');
          });
        }}
      >
        {
          sign
            ? <View>
                <Text
                  style={styles.onboardingAge}
                >{sign[2]}</Text>
                {this.state.sign && <Image
                  source={signImages[this.state.sign]}
                  style={styles.onboardingSign}
                />}
              </View>
            : <Text
                style={styles.onboardingAge}
              >{'Выберите дату рождения'}</Text>
        }
        <TouchableOpacity style={styles.dateLine} onPress={() => this.openPicker()}>
          <Icon
            size={24}
            color="#eee"
            name="edit"
          />
          <Text
            style={styles.onboardingAge}
          >
            {' '}{this.state.displayDate || 'DD/MM/YYYY'}
          </Text>
        </TouchableOpacity>
      </OnboardingWrapper>
    );
  }
}

const styles = StyleSheet.create({
  dateLine: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  onboardingAge: {
    fontSize: 24,
    color: '#eee',
  },
  onboardingSign: {
    margin: 10,
    width: 100,
    height: 100,
    tintColor: '#eee',
    alignSelf: 'center',
  },
});
