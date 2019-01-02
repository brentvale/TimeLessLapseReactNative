import React, { Component } from 'react'; // eslint-disable-line
import {
  View,
  StyleSheet,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Upload from './upload';
import Camera from './camera';

class PhotoMain extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'upload', title: 'Upload' },
        { key: 'camera', title: 'Camera' },
      ],
    };
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'upload':
        return (
          <View style={{ flex: 1 }}>
            <Upload />
          </View>
        );
      case 'camera':
        return (
          <View style={{ flex: 1 }}>
            <Camera />
          </View>
        );
      default:
        return null;
    }
  };

  renderTabBar = props => (
      <TabBar
        {...props}
        labelStyle={styles.tabLabel}
        tabStyle={styles.tab}
        indicatorStyle={styles.tabIndicator}
        style={styles.tabBar}
      />
  );

  handleIndexChange = index => this.setState({ index });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          style={styles.container}
          renderTabBar={this.renderTabBar}
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tabLabel: {
    color: 'black',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  tab: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  tabIndicator: {
    backgroundColor: 'blue',
  },
  tabBar: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    ...ifIphoneX({
      paddingTop: 40,
    }, {
      paddingTop: 10,
    }),
  },
});

export default PhotoMain;
