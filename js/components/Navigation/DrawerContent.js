import React from 'react';
import { View, StyleSheet } from 'react-native';


export default DrawerContent = props => (
    <View style={styles.container}>
      <DrawerItems
        {...props}
        items={props.items}
        labelStyle={styles.labelStyle}
        style={styles.items}
        touchableViewStyle={styles.touchableViewStyle}
      />
  </View>);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  items: {
    flex: 5,
    justifyContent: 'space-around',
  },
  touchableViewStyle: {
    paddingLeft: 16,
  },
  labelStyle: {
    ...ifIphoneX({
      fontSize: 14,
    }, {
      fontSize: 12,
    }),
    color: 'blue',
    marginHorizontal: 6,
  },
});
