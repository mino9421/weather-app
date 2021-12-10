import React, { useRef } from 'react';
import { StyleSheet,
  View,  
  Text,
  ScrollView, 
  ImageBackground, 
  useWindowDimensions,
  StatusBar,
  Animated

} from 'react-native';

import Locations from './model/locations'


export default function App() {

  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
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
            bgImg = require('./assets/night2.jpg')
          } else if (location.weatherType === "Cloudy") {
            bgImg = require('./assets/cloudy.jpeg')    // pay attention here this img extension is jpeg on jpg it will not work
          } else if (location.weatherType === "Rainy") {
            bgImg = require('./assets/rainy.jpg')
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
                  justifyContent:'center',
                  alignItems:'center'
                }}>
                  <Text style={{color:'white'}}>{location.city}</Text>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>

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


});
