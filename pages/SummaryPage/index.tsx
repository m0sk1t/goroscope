import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import BGImage from '../components/BGImage';


class SummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    AsyncStorage.getItem('@HoroApp:user', (err, user) => {
      console.log(user);
      this.setState({ user });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <BGImage>
        {this.state.user && <Text style={styles.onboardingText}>{this.state.user.sex}</Text>}
        {this.state.user && <Text style={styles.onboardingText}>{this.state.user.time}</Text>}
        {this.state.user && <Text style={styles.onboardingText}>{this.state.user.name}</Text>}
        {this.state.user && <Text style={styles.onboardingText}>{this.state.user.sign}</Text>}
      </BGImage>
    );
  }
}

const styles = StyleSheet.create({
  onboardingRow: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingText: {
    flex: 1,
    fontSize: 16,
    color: '#eee',
  },
});

export default SummaryPage;
