import { createStackNavigator } from "react-navigation";

import Welcome from "./Welcome";
import AgeChoose from "./AgeChoose";
import SexChoose from "./SexChoose";
import NameChoose from "./NameChoose";
import TimeChoose from "./TimeChoose";
import SummaryPage from "./SummaryPage";
import HoroscopePage from "./HoroscopePage";


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
      header: null,
    }
  }
);

export default AppNavigator;
