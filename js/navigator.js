import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';

import Camera from './components/screens/camera';
import Profile from './components/screens/profile';
import Home from './components/screens/home';

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Camera: {
      screen: Camera,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Camera':
            iconName = 'ios-camera';
            break;
          case 'Home':
            iconName = 'ios-home';
            break;
          case 'Profile':
            iconName = 'ios-contact';
            break;
          default: iconName = 'ios-home';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
  {
    initialRoute: 'Home',
  }
);
