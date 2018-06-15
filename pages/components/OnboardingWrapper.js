import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

import BGImage from './BGImage';

const ActiveBreadcrumb = () => <View style={styles.onboardingBreadcrumbActive}></View>;
const InactiveBreadcrumb = () => <View style={styles.onboardingBreadcrumbInactive}></View>;

const OnboardingWrapper = ({
  children,
  navigate,
  currentScreen,
  showBreadcrumbs,
  navigateEnabled,
}) => {
  return (
    <BGImage>
      <View style={styles.onboardingContainer}>
        <Image
          style={styles.onboardingLogo}
          source={require('../img/ch.png')}
        />
        <Text style={styles.onboardingTitle}>
          HoroSphere
        </Text>
        {children}
        <TouchableHighlight
          disabled={!navigateEnabled}
          activeOpacity={1}
          style={styles.onboardingForwardButton}
          onPress={() => navigate()}
        >
          <Icon
            size={24}
            color='#333'
            name='chevron-with-circle-right'
          />
        </TouchableHighlight>
        {showBreadcrumbs && <View style={styles.onboardingBreadcrumbs}>
          {currentScreen === 'Welcome' ? <ActiveBreadcrumb />: <InactiveBreadcrumb />}
          {currentScreen === 'AgeChoose' ? <ActiveBreadcrumb />: <InactiveBreadcrumb />}
          {currentScreen === 'TimeChoose' ? <ActiveBreadcrumb />: <InactiveBreadcrumb />}
          {currentScreen === 'SexChoose' ? <ActiveBreadcrumb />: <InactiveBreadcrumb />}
          {currentScreen === 'NameChoose' ? <ActiveBreadcrumb />: <InactiveBreadcrumb />}
          {/* {currentScreen === 'SummaryPage' ? <ActiveBreadcrumb />: <InactiveBreadcrumb />} */}
        </View>}
      </View>
    </BGImage>
  );
}

const styles = StyleSheet.create({
  onboardingBreadcrumbInactive: {
    width: 7,
    height: 7,
    margin: 3,
    borderRadius: 7,
    backgroundColor: '#aaaaaa77',
  },
  onboardingBreadcrumbActive: {
    width: 7,
    height: 7,
    margin: 3,
    borderRadius: 7,
    backgroundColor: '#eac',
  },
  onboardingBreadcrumbs: {
    flexDirection: 'row',
  },
  onboardingTitle: {
    fontSize: 42,
    color: '#eee',
  },
  onboardingLogo: {
    width: 128,
    height: 128,
    marginTop: 10,
    tintColor: '#eac',
    borderColor: '#eee',
  },
  onboardingContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000aa',
  },
  onboardingForwardButton: {
    width: 64,
    height: 64,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
})

export default OnboardingWrapper;
