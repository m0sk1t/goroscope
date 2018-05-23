import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { parseString } from "react-native-xml2js";


class HoroscopePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      horo: null,
    };
    AsyncStorage.getItem('@HoroApp:user', (err, user) => {
      this.setState({ user });
    });
    this._fetchData();
  }

  _fetchData() {
    fetch('http://ignio.com/r/export/utf/xml/daily/com.xml')
      .then(res =>
        res.ok
          ? res.text()
          : console.error(res.statusText))
      .then(res =>
        parseString(
          res,
          (err, data) => {
            console.log(data);
            this.setState({
              horo: data.horo
            });
          }
        )
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.onboardingText}>horo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  onboardingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  onboardingText: {
    fontSize: 24,
    color: '#eee',
  },
});

export default HoroscopePage;
