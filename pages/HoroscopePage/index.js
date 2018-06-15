import React from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";
import { AdMobBanner } from "react-native-admob";

import signs from "../constants/signs";
import { tracker } from "../AppNavigator";
import BGImage from '../components/BGImage';
import signImages from "../constants/signImages";

const Tab = ({ day, navigation }) => {
  tracker.trackEvent("openscreen", `HoroscopePage:${day}`);
  const { horo, sign } = navigation.state.params;
  const info = signs.filter(_ => _[1] === sign)[0];
  return (
    <BGImage style={styles.tabContent}>
      <View style={styles.view}>
        <Image
          source={signImages[sign]}
          style={styles.onboardingSign}
        />
        <Text style={[styles.horoscopeText, {textAlign: 'center'}]}>
          {info[2]}
        </Text>
        <Text style={styles.horoscopeText}>
          Стихия: {info[3]}
        </Text>
        <Text style={styles.horoscopeText}>
          Планета: {info[4]}
        </Text>
      </View>
      <Text style={styles.horoscopeText}>
        { horo ? horo[day][0] : 'формируется...' }
      </Text>
      <View>
        <AdMobBanner
          adSize="banner"
          adUnitID="ca-app-blablabla"
          testDevices={['123']}
          onAdFailedToLoad={() => console.warn('AaAAAaAA')}
        />
      </View>
    </BGImage>
  )
};

const routeConfig = {
  Yesterday: {
    navigationOptions: { title: 'Вчера' },
    screen: props => <Tab {...props} day='yesterday' />
  },
  Today: {
    navigationOptions: { title: 'Сегодня' },
    screen: props => <Tab {...props} day='today' />
  },
  Tomorrow: {
    navigationOptions: { title: 'Завтра' },
    screen: props => <Tab {...props} day='tomorrow' />
  },
};

const tabNavigatorConfig = {
  swipeEnabled: true,
  animationEnabled: true,
  initialRouteName: 'Today',
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: '#eeaacc',
    },
    style: {
      backgroundColor: '#333',
    },
  },
};

const HoroTabs = Platform.OS === 'ios'
  ? createBottomTabNavigator(routeConfig, tabNavigatorConfig)
  : createMaterialTopTabNavigator(routeConfig, tabNavigatorConfig);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 10,
  },
  tabContent: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  horoscopeText: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#eee',
  },
  onboardingSign: {
    margin: 10,
    width: 64,
    height: 64,
    tintColor: '#eee',
    alignSelf: 'center',
  },
});

export default HoroTabs;
