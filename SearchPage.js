'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';
import SearchResults from './SearchResults';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 3,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  image: {
    width: 217,
    height: 138
  }
});

let urlForQueryAndPage = (key, value, pageNumber) => {
  let data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    list_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };
  data[key] = value;

  let queryString = Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + queryString;
}

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'London',
      isLoading: false,
      message: ''
    };
  }

  onSearchTextChanged = (ev) => {
    this.setState({
      searchString: ev.nativeEvent.text
    });
  };

  _executeQuery(query) {
    console.log(query);
    this.setState({
      isLoading: true
    });

    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error => {
        this.setState({
          isLoading: false,
          message: error
        });
      });
  }

  _handleResponse(response) {
    // console.log(response);
    this.props.navigator.push({
      title: 'Results',
      component: SearchResults,
      passProps: {
        listings: response.listings
      }
    });

    this.setState({
      isLoading: false,
      message: ''
    });

    if (response.application_response_code.substr(0, 1) === '1') {
      console.log(`Properties found: ${response.listings.length}`);
    } else {
      this.setState({message: 'Unknown location, please try again.'});
    }
  }

  onSearchPressed = (ev) => {
    let query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  };

  render() {
    let spinner = this.state.isLoading ?
      (<ActivityIndicatorIOS size='large' />) :
      (<View />)

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput style={styles.searchInput}
            placeholder='Search via name or postcode'
            value={this.state.searchString}
            onChange={this.onSearchTextChanged} />
          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onSearchPressed}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image source={require('./Resources/house.png')} style={styles.image} />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}
