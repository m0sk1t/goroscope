import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { parseString } from "react-native-xml2js";

import OnboardingWrapper from '../components/OnboardingWrapper';


export default class Welcome extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      horo: null,
    };
    AsyncStorage.getItem('@HoroApp:user', (err, user) => {
      this.setState({ user: JSON.parse(user) });
      this._fetchData();
    });
  }

  _fetchData() {
    const HORO_URL = 'http://ignio.com/r/export/utf/xml/daily/com.xml';
    fetch(HORO_URL)
      .then(res =>
        res.ok
          ? res.text()
          : console.error(res.statusText))
      .then(res =>
        parseString(
          res,
          (err, data) => {
            this.setState({ horo: data.horo });
          }
        )
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      this.state.user
        ? this.state.horo
          ? (<OnboardingWrapper
            showBreadcrumbs={false}
            currentScreen='Welcome'
            navigateEnabled={this.state.horo}
            navigate={() => navigate({
              routeName: 'HoroscopePage',
              params: { horo: this.state.horo[this.state.user.sign][0] },
            })}
          >
            <Text style={styles.onboardingWelcome}>
              Привет, {this.state.user.name}!
            </Text>
            <Text style={styles.onboardingHelping}>
              Гороскоп на сегодня готов!
            </Text>
          </OnboardingWrapper>)
          : <ActivityIndicator size="large" color="#eee" />
        : (<OnboardingWrapper
          navigateEnabled={true}
          showBreadcrumbs={true}
          currentScreen='Welcome'
          navigate={() => navigate('AgeChoose')}
        >
          <Text style={styles.onboardingHoroType}>
            Персональный любовный гороскоп
          </Text>
          <Text style={styles.onboardingWelcome}>
            Всего пара шагов отделяют вас от получения персонального астрологического совета по поиску или укреплению ваших отношений
            </Text>
          <Text style={styles.onboardingHelping}>
            Мы поможем вам разобраться с трудностями!
          </Text>
        </OnboardingWrapper>)

    );
  }
}

const styles = StyleSheet.create({
  onboardingHelping: {
    fontSize: 24,
    color: '#eee',
    textAlign: 'center',
    fontWeight: 'normal',
  },
  onboardingHoroType: {
    fontSize: 16,
    color: '#eee',
  },
  onboardingWelcome: {
    fontSize: 24,
    color: '#eee',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
