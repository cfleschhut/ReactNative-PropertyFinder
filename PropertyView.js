'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  image: {
    width: 400,
    height: 300
  },
  heading: {
    backgroundColor: '#F8F8F8'
  },
  price: {
    margin: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    margin: 5,
    fontSize: 20,
    color: '#656565'
  },
  description: {
    margin: 5,
    fontSize: 18,
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd'
  }
});

export default class PropertyView extends Component {
  render() {
    let property = this.props.property;
    let stats = `${property.bedroom_number} bed ${property.property_type}`;
    if (property.bathroom_number) {
      stats += `, ${property.bathroom_number} ${(property.bathroom_number > 1 ? 'bathrooms' : 'bathroom')}`;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: property.img_url}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{property.price_formatted}</Text>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.separator} />
        </View>
        <Text style={styles.description}>{stats}</Text>
        <Text style={styles.description}>{property.summary}</Text>
      </View>
    );
  }
}
