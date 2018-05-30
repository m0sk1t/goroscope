import React from "react";
import {
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";

import BGImage from '../components/BGImage';

const Tab = ({ day, navigation }) => {
  const { horo } = navigation.state.params;
  return (
    <BGImage style={styles.tabContent}>
      <Text style={styles.horoscopeText}>
        { horo ? horo[day][0] : 'формируется...' }
      </Text>
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
  tabContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  horoscopeText: {
    flex: 1,
    fontSize: 20,
    color: '#eee',
  },
});

export default HoroTabs;
