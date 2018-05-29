import React from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";

const Tab = ({ day, screenProps }) => {
  const { horo } = screenProps;
  return (
    <View style={styles.tabContent}>
      <Text style={styles.horoscopeText}>
        { horo ? horo[day][0] : 'формируется...' }
      </Text>
    </View>
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
      backgroundColor: 'transparent',
    },
  },
};

const HoroTabs = Platform.OS === 'ios'
  ? createBottomTabNavigator(routeConfig, tabNavigatorConfig)
  : createMaterialTopTabNavigator(routeConfig, tabNavigatorConfig);

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horoscopeText: {
    flex: 1,
    fontSize: 24,
    color: '#eee',
  },
});

export default HoroTabs;
