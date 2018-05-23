import React from "react";
import {
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import OnboardingWrapper from '../components/OnboardingWrapper';


const Welcome = function ({ navigation }) {
  const { navigate } = navigation;
  let user = null;
  AsyncStorage.getItem('@HoroApp:user', (err, res) => {
    user = res;
  });

  return (
    user === null
      ? (<OnboardingWrapper
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
      : (<OnboardingWrapper
        navigateEnabled={true}
        showBreadcrumbs={false}
        currentScreen='Welcome'
        navigate={() => navigate('Horoscope')}
      >
        <Text style={styles.onboardingWelcome}>
          Привет, {user.name}!
        </Text>
        <Text style={styles.onboardingHelping}>
          Гороскоп на сегодня готов!
        </Text>
      </OnboardingWrapper>)
  );
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

export default Welcome;
