import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
} from 'react-native-vision-camera';
// import { RNCamera } from 'react-native-camera';
// ---------------------------------------------------------
import Icon from 'react-native-vector-icons/EvilIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RecordVideo = ({navigation}) => {
  const route = useRoute();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.category,
      headerLeft: ({onPress}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Category');
          }}>
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      ),
      contentStyle: {
        backgroundColor: '#FAFAFA',
      },
    });
  }, [navigation, route]);

  const {hasPermission, requestPermission} = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState('back');

  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  if (device == null) {
    Alert.alert('알림', '카메라가 연결되지 않았습니다.');
    return null; // 혹은 다른 처리 로직을 수행할 수 있습니다.
  }

  return (
    <View style={styles.Container}>
      {/* <Video
                source={require('../assets/video/squat.mp4')}
                style={{ width: windowWidth * 0.85, height: windowHeight * 0.4 }}
                controls={true} // 플레이어 컨트롤 보이기
                resizeMode="cover" // 동영상 크기 조절
            /> */}
      <Camera style={StyleSheet.absoluteFill} device={device} devices={devices} isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchContainer: {
    backgroundColor: '#F9F7FE',
    width: windowWidth * 0.85,
    height: windowHeight * 0.39,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  headText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
  },
});

export default RecordVideo;
