import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { parseString } from "react-native-xml2js";

import OnboardingWrapper from '../components/OnboardingWrapper';


interface Props {
  navigation?: { navigate: () => void };
}

interface State {
  name?: string | undefined;
  user?: object | undefined;
  horo?: object | undefined;
}


class NameChoose extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      horo: undefined,
      name: undefined,
      user: undefined,
    };
    AsyncStorage.getItem('@HoroApp:user', (err, user?: string) => {
      if (err) return console.error(err.message);
      this.setState({ user: JSON.parse(user || '') });
      this._fetchData();
    });
  }

  _fetchData() {
    const HORO_URL = 'http://ignio.com/r/export/utf/xml/daily/com.xml';
    fetch(HORO_URL)
      .then(res => {
        if (res.ok) {
          return res.text();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(res =>
        parseString(
          res,
          (err: Error, data: { horo: object }) => {
            if (err) return console.error(err.message);
            this.setState({ ...data.horo });
          }
        )
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <OnboardingWrapper
        showBreadcrumbs={true}
        currentScreen='NameChoose'
        navigateEnabled={Boolean(this.state.name && this.state.user && this.state.horo)}
        navigate={() => {
          AsyncStorage.mergeItem('@HoroApp:user', JSON.stringify(this.state), (err) => {
            navigate({
              routeName: 'HoroscopePage',
              params: {
                sign: this.state.user.sign,
                horo: this.state.horo[this.state.user.sign][0],
              },
            });
          });
        }}
      >
        <Text
          style={styles.onboardingName}
        >
          Введите ваше имя
        </Text>
        <View
          style={styles.onboardingNameWrap}
        >
          <TextInput
            value={this.state.name}
            style={styles.onboardingName}
            placeholder={'введите имя тут'}
            onChangeText={(name) => this.setState({ name })}
          />
        </View>
      </OnboardingWrapper>
    );
  }
}

const styles = StyleSheet.create({
  onboardingNameWrap: {
    width: 340,
    padding: 10,
    backgroundColor: '#eeaacc77',
  },
  onboardingName: {
    width: 320,
    fontSize: 24,
    color: '#ccc',
    textAlign: 'center',
    borderBottomColor: '#eee',
    backgroundColor: 'transparent',
  },
});

export default NameChoose;
