'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#555',
    backgroundColor: '#eee',
    fontSize: 24,
    margin: 40,
    padding: 15
  }
});

class PropertyFinderApp extends Component {
  render() {
    return (
      <Text style={styles.text}>
        Hello World!
      </Text>
    );
  }
}

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinderApp);
