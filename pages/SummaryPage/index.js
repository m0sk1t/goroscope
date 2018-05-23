import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import OnboardingWrapper from '../components/OnboardingWrapper';


class SummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    AsyncStorage.getItem('@HoroApp:user', (err, user) => {
      this.setState({ user });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <OnboardingWrapper
        showBreadcrumbs={true}
        currentScreen='SummaryPage'
        navigateEnabled={this.state.user}
        navigate={() => navigate('HoroscopePage')}
      >
        <View style={styles.onboardingRow}>
          <View>
            <Text style={styles.onboardingText}>{this.state.user? this.state.user.name: ''}</Text>
          </View>
          <View>
            <Text style={styles.onboardingText}>{this.state.user? this.state.user.sex: ''}</Text>
          </View>
        </View>
        <View style={styles.onboardingRow}>
          <View>
            <Text style={styles.onboardingText}>{this.state.user? this.state.user.sign: ''}</Text>
          </View>
          <View>
            <Text style={styles.onboardingText}>{this.state.user? this.state.user.time: ''}</Text>
          </View>
        </View>
      </OnboardingWrapper>  
    );
  }
}

const styles = StyleSheet.create({
  onboardingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingText: {
    fontSize: 24,
    color: '#eee',
  },
});

export default SummaryPage;
