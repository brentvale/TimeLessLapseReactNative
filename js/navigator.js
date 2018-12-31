import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';

import Photo from './components/screens/photo';
import Profile from './components/screens/profile';
import Home from './components/screens/home';

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Photo: {
      screen: Photo,
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
          case 'Home':
            iconName = 'ios-home';
            break;
          case 'Photo':
            iconName = 'ios-camera';
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
