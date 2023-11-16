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
  useCameraDevice,
  useCameraPermission,
  requestCameraPermission,
  requestMicrophonePermission,
  CameraRoll,
} from 'react-native-vision-camera';
// import RNFS from "react-native-fs";
// import { RNCamera } from 'react-native-camera';
// ---------------------------------------------------------
import Icon from 'react-native-vector-icons/EvilIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RecordVideo = ({navigation}) => {
  // 뒤로가기 (RecordVideo -> Category)
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
      // headerRight: () => (
      //   isRecording ? (
      //     <TouchableOpacity style={styles.recordButton} onPress={stopRecording}>
      //       <Text style={styles.recordButtonText}>종료</Text>
      //     </TouchableOpacity>
      //   ) : (
      //     <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
      //       <Text style={styles.recordButtonText}>시작</Text>
      //     </TouchableOpacity>
      //   )
      // ),
      contentStyle: {
        backgroundColor: '#FAFAFA',
      },
    });
  }, [navigation, route, isRecording]);

  // ------------------------------------------------------------------------------------------------
  console.log('---------------- device 크기 : ', windowWidth, windowHeight);
  const route = useRoute();

  const {hasPermission, requestPermission} = useCameraPermission();
  // 카메라 권한 설정
  const checkCameraPermissionState = async () => {
    // 권한 요청
    const newCameraPermission = await Camera.requestCameraPermission();
    // 권한 가져오기
    const cameraPermission = await Camera.getCameraPermissionStatus();
    console.log(cameraPermission, 'camera');
  };

  // 마이크 권한 설정
  const checkAudioPermissionState = async () => {
    // 권한 요청
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    // 권한 가져오기
    const micPermission = await Camera.getMicrophonePermissionStatus();
    console.log(micPermission, 'microphone');
  };

  useEffect(() => {
    checkCameraPermissionState();
    checkAudioPermissionState();
  }, []);

  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  // const device = useCameraDevice('front')
  // console.log('device', device);
  if (device == null) return Alert.alert('알림', '실패');

  // 녹화
  const [isRecording, setIsRecording] = useState(false);
  const [videoPath, setVideoPath] = useState('');
  const camera = useRef();
  // const camera = useRef < Camera > null;

  const startRecording = async () => {
    // const hasPermission = await requestCameraPermission();
    // if (!hasPermission) return;

    setIsRecording(true);

    camera.current.startRecording({
      // videoBitRate: 'low',
      flash: 'off',
      // savePath: '/Users/seojuwon/desktop',
      // onRecordingFinished: video => {
      //   setVideoPath(video.path);
      // },
      onRecordingFinished: video => {
        console.log('---------- video ', video.path);
        setVideoPath(video.path);
      },
      onRecordingError: error => console.error(error),
    });
  };

  const stopRecording = async () => {
    setIsRecording(false);
    const video = camera.current.stopRecording();

    // 동영상 경로 찾기
    // const path = await fs.realpathSync(video.path);
    // console.log('동영상 경로', path);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isRecording ? (
        <TouchableOpacity style={styles.recordButton} onPress={stopRecording}>
          <Text style={styles.recordButtonText}>종료</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
          <Text style={styles.recordButtonText}>시작</Text>
        </TouchableOpacity>
      )}
      {/* <Video
        source={{uri: 'file:///data/user/0/com.app_24_7/cache/mrousavy3447176662132122093.mp4'}}
        style={styles.videoPlayer}
        controls={true}
      />  */}
      <View style={{position: 'absolute', bottom: 0}}>
        <Camera
          style={{
            // 카메라 크기를 화면 너비의 제곱근으로 설정, Math.sqrt() -> 주어진 숫자의 제곱근을 반환
            width: windowWidth / Math.sqrt(1),
            height: windowWidth / Math.sqrt(1),
          }}
          device={device}
          isActive={true}
          video={true}
          audio={false}
          ref={camera}
          // format={format}
          // fps={fps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#7254F5',
    padding: 20,
    alignItems: 'center',
    // marginRight: 10,
    // padding: 10,
    // backgroundColor: '#7254F5',
    // zIndex: 1,
  },
  recordButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  videoPlayer: {
    flex: 1,
    marginTop: 50,
    height: 50,
    width: windowWidth,
    // backgroundColor: 'red',
  },
});

export default RecordVideo;
