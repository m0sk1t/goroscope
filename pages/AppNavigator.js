import React from "react";
import { View } from 'react-native';
import { createStackNavigator } from "react-navigation";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";

import Welcome from "./Welcome";
import AgeChoose from "./AgeChoose";
import SexChoose from "./SexChoose";
import NameChoose from "./NameChoose";
import TimeChoose from "./TimeChoose";
import SummaryPage from "./SummaryPage";
import HoroscopePage from "./HoroscopePage";

export const tracker = new GoogleAnalyticsTracker('UA-120712289-1');

const AppNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
    },
    AgeChoose: {
      screen: AgeChoose,
    },
    SexChoose: {
      screen: SexChoose,
    },
    NameChoose: {
      screen: NameChoose,
    },
    TimeChoose: {
      screen: TimeChoose,
    },
    SummaryPage: {
      screen: SummaryPage,
    },
    HoroscopePage: {
      screen: HoroscopePage,
    },
  }, {
    navigationOptions: {
      header: <View style={{ height: 24, backgroundColor: '#333' }} />,
    }
  }
);

export default AppNavigator;
