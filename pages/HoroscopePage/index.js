import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { parseString } from "react-native-xml2js";

import HoroTabs from './HoroTabs';
import BGImage from '../components/BGImage';


const HORO_URL = 'http://ignio.com/r/export/utf/xml/daily/com.xml';

class HoroscopePage extends Component {
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
      <BGImage>
        <Text style={styles.welcomeText}>Ваш гороскоп</Text>
        {
          this.state.horo && this.state.user
            ? <HoroTabs screenProps={{
                horo: this.state.horo[this.state.user.sign][0],
              }} />
            : <ActivityIndicator size="large" color="#eee" />
        }
      </BGImage>
    );
  }
}

const styles = StyleSheet.create({
  welcomeText: {
    padding: 12,
    fontSize: 32,
    color: '#eee',
    textAlign: 'center',
  },
});

export default HoroscopePage;
