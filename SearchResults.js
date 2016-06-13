'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ListView
} from 'react-native';
import PropertyView from './PropertyView';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd'
  }
});

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        r1.guid !== r2.guid;
      }
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }

  rowPressed(rowIndex) {
    let property = this.props.listings[rowIndex];

    this.props.navigator.push({
      title: 'Property',
      component: PropertyView,
      passProps: {
        property: property
      }
    });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowID)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{uri: rowData.img_url}} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>
                {rowData.price_formatted}
              </Text>
              <Text style={styles.title}
                numberOfLines={1}>
                {rowData.title}
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
    );
  }
}
