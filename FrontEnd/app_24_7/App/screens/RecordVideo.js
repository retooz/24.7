import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  Button,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
} from 'react-native-vision-camera';
// ---------------------------------------------------------
import Icon from 'react-native-vector-icons/EvilIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RecordVideo = ({navigation}) => {
  
  const route = useRoute();
  const {category} = route.params;
  const v = require('../assets/video/squat.mp4');

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
      // 'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  // const device = useCameraDevice('front')
  // console.log('device', device);
  if (device == null) return Alert.alert('알림', '실패');

  const format = useCameraFormat(device, [
    {videoResolution: {width: 1920, height: 1080}},
    // {fps: 60},
  ]);

  // 녹화
  const [isRecording, setIsRecording] = useState(false);
  const [videoPath, setVideoPath] = useState('');
  const camera = useRef();

  /** 녹화 실행 함수 */
  const startRecording = () => {
    console.log('startRecording...')

    setIsRecording(true);
    camera.current.startRecording({
      flash: 'off',
      // 녹화가 완료되었을 때 실행되는 함수 -> 녹화를 중지하는 기능은 없음
      onRecordingFinished: (video) => {
        console.log('RecordVideo_startRecording ------- video path :', video.path);
        setVideoPath(video.path); // videoPath 업데이트
        navigation.navigate('VideoSubmit', {
          category,
          video: `${video.path}`,
        });
      },
      onRecordingError: (error) => {
        console.error(error);
      },
    });
  };

  /** 녹화 중지 함수 */
  const stopRecording = () => {
    console.log('stopRecording...')
    setIsRecording(false);
    camera.current.stopRecording();

    console.log('RecodeVideo_stopRecording ------ video path :', videoPath)
  };

  // ------------------------------------------------------------------------------------------------

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
      // headerRight: ({onPress}) => (
      //     isRecording ? (
      //       <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
      //         <Text style={styles.recordButtonText}>시작</Text>
      //       </TouchableOpacity>

      //     ) : (
      //       <TouchableOpacity style={styles.recordButton} onPress={stopRecording}>
      //         <Text style={styles.recordButtonText}>종료</Text>
      //       </TouchableOpacity>
      //     )
      // ),
      contentStyle: {
        backgroundColor: '#FAFAFA',
      },
    });
  }, [navigation, route, isRecording]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* 시작, 종료 버튼 */}
      <TouchableOpacity
        style={styles.recordButton}
        onPress={isRecording ? stopRecording : startRecording}>
        <Text style={styles.recordButtonText}>
          {isRecording ? '종료' : '시작'}
        </Text>
      </TouchableOpacity>
     
      {/* 제공하는 영상 */}
      <View style={styles.video}>
        <Video source={v} style={styles.videoPlayer} controls={true} />
      </View>
      {/* 사용자 카메라 화면 */}
      <View style={{position: 'absolute', bottom: 0}}>
        <Camera
          style={{
            // 카메라 크기를 화면 너비의 제곱근으로 설정, Math.sqrt() -> 주어진 숫자의 제곱근을 반환
            width: windowWidth / Math.sqrt(1.1),
            height: windowWidth / Math.sqrt(1.1),
          }}
          device={device}
          isActive={true}
          video={true}
          audio={true}
          ref={camera}
          format={format}
          // fps={fps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    position: 'absolute',
    width: 50,
    height: 40,
    backgroundColor: 'red',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  recordButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  video: {
    position: 'absolute',
    top: 0,
  },
  videoPlayer: {
    width: windowWidth / Math.sqrt(1.1),
    height: windowWidth / Math.sqrt(1.1),
  },
});

export default RecordVideo;
