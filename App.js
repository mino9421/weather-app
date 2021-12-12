import React, { useRef, useState, useEffect } from 'react';
import { 
  StyleSheet,
  View,  
  Text,
  ScrollView, 
  ImageBackground, 
  useWindowDimensions,
  StatusBar,
  Animated,
  TouchableOpacity

} from 'react-native';

import Locations from './model/locations'

import SunIcon from './assets/sun.svg'
import CloudIcon from './assets/cloudy.svg'
import MoonIcon from './assets/moon.svg'
import RainIcon from './assets/moon.svg'
import MenuIcon from './assets/menu.svg'
import SearchIcon from './assets/search.svg'

import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Location from 'expo-location'

const WeatherIcon = (weatherType) => {
  if(weatherType === 'Sunny') {
    return <SunIcon width={34} height={34} fill="#fff" />
  }
  if(weatherType === 'Rainy') {
    return <RainIcon width={34} height={34} fill="#fff" />
  }
  if(weatherType === 'Cloudy') {
    return <CloudIcon width={34} height={34} fill="#fff" />
  }
  if(weatherType === 'Night') {
    return <MoonIcon width={34} height={34} fill="#fff" />
  }
}

export default function App() {

  // grabs the screen dimensions for the device
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  // scrolling mechanic
  const scrollX = useRef( new Animated.Value(0) ).current;
  

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent:{
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={1}
      >
        {Locations.map((location, index) => {
          if( location.weatherType === 'Sunny') {
            bgImg = require('./assets/sunny.jpg')
          } else if (location.weatherType === "Night") {
            bgImg = require('./assets/night.jpg')
          } else if (location.weatherType === "Cloudy") {
            bgImg = require('./assets/cloud3.jpg')    // pay attention here this img extension is jpeg on jpg it will not work
          } else if (location.weatherType === "Rainy") {
            bgImg = require('./assets/rain2.jpg')
          }

          return (
            <View style={{width: windowWidth, height: windowHeight}} key={index}>
              <ImageBackground
                source={bgImg}
                style={{
                  flex:1,
                }} 
              >
                <View style={{ 
                  flex:1,
                  backgroundColor: 'rgba(0,0,0,0.3)', 
                  padding:20,
                }}>
                  <View style={styles.topInfoWrapper}>
                    
                    <View>
                      <Text style={styles.city}>{location.city}</Text>
                      <Text style={styles.time}>{location.dateTime}</Text>
                    </View>

                    <View>
                      <Text style={styles.temperature}>{location.temperature}</Text>
                      
                      <View style={{flexDirection: 'row'}}>
                        {WeatherIcon(location.weatherType)}
                        <Text style={styles.weatherType}>{location.weatherType}</Text>
                      </View>

                    </View>

                    <View style={styles.weeklyInfoBar}>
                        <ScrollView
                          // horizontal={true}
                          showsHorizontalScrollIndicator={false}
                        >
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                          <Text>hello</Text>
                        </ScrollView>
                      </View>

                  </View>
                  <View style={{
                    backgroundColor: 'rgba(255,255,255,0.7',
                    marginTop: 20,
                    borderBottomWidth: 1,
                    }}
                  />
                  <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.info}>Wind</Text>
                      <Text style={[styles.info, {fontSize: 24}]}>{location.wind}</Text>
                      <Text style={styles.info}>km/h</Text>
                      <View style={styles.infoBar}>
                        <View style={{
                          width: location.wind / 2,
                          height: 5,
                          backgroundColor: '#66FFF4'
                          }} 
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.info}>Rain</Text>
                      <Text style={[styles.info, {fontSize: 24}]}>{location.rain}</Text>
                      <Text style={styles.info}>%</Text>
                      <View style={styles.infoBar}>
                        <View style={{
                          width: location.rain / 2,
                          height: 5,
                          backgroundColor: '#F44336'
                          }} 
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.info}>Humidity</Text>
                      <Text style={[styles.info, {fontSize: 24}]}>{location.humidity}</Text>
                      <Text style={styles.info}>%</Text>
                      <View style={styles.infoBar}>
                        <View style={{
                          width: location.humidity / 2,
                          height: 5,
                          backgroundColor: '#F44336'
                          }} 
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.Header}>
        <TouchableOpacity onPress={() => {}}>
          <SearchIcon width={24} height={24} fill='#fff' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MenuIcon width={24} height={24} fill='#fff' />
        </TouchableOpacity>
      </View>

      <View style={styles.indicatorWrapper}>
        {Locations.map((location, index) => {
          const width = scrollX.interpolate(
            {
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1)
              ],
              outputRange: [
                5, 12, 5
              ],
              extrapolate: 'clamp'
            }
          )
          return (
            <Animated.View 
              key={index}
              style={[styles.normalDot, {width}]}
            />
          )
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  normalDot: {
    height:5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4, 
    backgroundColor: '#fff'
    },
  indicatorWrapper: {
    position: 'absolute',
    top: 140,
    left: 20,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'flex-start',
    backgroundColor: 'blue'
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  weeklyInfoBar: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'yellow',  
  },
  city: {
    color: '#fff',
    fontSize: 30,
  },
  time: {
    color: '#fff'
  },
  temperature: {
    color: '#fff',
    fontSize: 85,
    paddingTop: 15,
  },
  weatherType: {
    color: "#fff",
    fontSize: 25,
    lineHeight: 24,
    marginLeft: 10,
  },
  info: {
    color: '#fff', fontSize: 14
  },
  infoBar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  Header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: getStatusBarHeight() + 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20
  }
});
