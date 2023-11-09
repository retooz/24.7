import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';

// ---------------------------------------------------------
import Icon from 'react-native-vector-icons/Feather';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Category = ({navigation}) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ' ',
      headerLeft: ({onPress}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      ),
      contentStyle: {
        backgroundColor: '#FAFAFA',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.Container}>
      <TouchableOpacity style = {styles.touchContainer} onPress={()=>{navigation.navigate('CategoryAi')}}>
        <Text style = {styles.headText}>AI 코치와 함께!</Text>
        <Text style = {styles.text}>AI운동분석결과{"\n"}+{"\n"}트레이너 피드백 제공</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.touchContainer} onPress={()=>{navigation.navigate('CategoryNoAi')}}>
      <Text style = {styles.headText}>부위별 운동</Text>
        <Text style = {styles.text}>트레이너 피드백 제공</Text>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    flex: 1,
    alignItems : "center",
    justifyContent : "center"
  },
  touchContainer : {
    backgroundColor : "#F9F7FE",
    width : windowWidth*0.85,
    height : windowHeight*0.39,
    borderRadius : 10,
    alignItems : "center",
    justifyContent : "center",
    marginVertical : 20,
  },
  headText : { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color : "black",
    marginVertical : 10,
  },
  text : {
    textAlign : "center",
    fontWeight : "bold",
    color : "black",
    marginVertical : 20,
  }, 
});

export default Category;
