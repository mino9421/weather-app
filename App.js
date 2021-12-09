import React from 'react';
import { StyleSheet,
  Text,
  View, 
  Button, 
  ScrollView, 
  ImageBackground, 
  useWindowDimensions ,

} from 'react-native';

export default function App() {

  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  return (
    <ScrollView>
      <View style={{width: windowHeight, height: windowHeight}}>
        <ImageBackground source={require('./assets/night2.jpg')} style={{flex:1}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
