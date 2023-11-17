import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import {Camera} from 'react-native-vision-camera';
// ---------------------------------------------------------
import Icon from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VideoSubmit = ({navigation}) => {
  const route = useRoute();
  const {category, video} = route.params;
  const [comment, setComment] = useState('');
  const commentRef = useRef({})
  console.log('videosubmit ------ video path :', video);

  const formData = new FormData();
  formData.append('video', {
    uri: video,
    name: 'video.mov',
    type: 'video/mov'
  });
  formData.append('comment', comment);

  const handleSubmit = () => {
    console.log('제출 버튼 누르기')
    axios
      .post('https://121.66.158.210/user/sandTrainer', formData)
      .then((res) => {
        console.log('handleSubmit =>', res.data.result);

        if (res.data.result === 0) {
          navigation.navigate('Main')
        }
      })
      .catch((error) => {
        console.error('submit error --->',error);
    });
  }

  // 뒤로가기 (VideoSubmit -> RecordVideo)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.category,
      headerLeft: ({onPress}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RecordVideo', {
              category,
            });
          }}>
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      ),
      contentStyle: {
        backgroundColor: '#FAFAFA',
      },
    });
  }, [navigation, route]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {/* 사용자가 녹화한 영상 확인 */}
        <View style={styles.videoContainer}>
          <Video
            source={{uri: video}}
            style={styles.videoPlayer}
            controls={true}
          />
        </View>
        {/* 피드백 작성칸 */}

        <View style={styles.textContainer}>
          <Text style={styles.text1}>트레이너에게 궁금한 점을 적어주세요!</Text>
          <Text style={styles.text2}>
            트레이너가 회원의 영상을 분석하고 직접 피드백을 제공합니다.
          </Text>

          <TextInput
            multiline={true}
            style={{...styles.input, lineHeight: 30,}}
            ref={ref => (this.commentRef = ref)} onChangeText={(text) => setComment(text)}
          />
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>제출</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  videoContainer: {
    // flex: 1,
    // position: 'absolute',
    // top: 0,
  },
  videoPlayer: {
    width: windowWidth / Math.sqrt(1.1),
    height: windowWidth / Math.sqrt(1.1),
    backgroundColor: 'darkorange',
  },
  textContainer: {
    flex: 0,
    justifyContent: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  text1: {
    fontSize: 16,
    color: '#060320',
    marginHorizontal: 15,
    marginTop: 10,
  },
  text2: {
    fontSize: 13,
    color: '#828282',
    marginHorizontal: 15,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#F9F7FE',
    borderColor: '#AB9EF4', 
    borderWidth: 1,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: windowWidth * 0.95,
    height: windowHeight * 0.25,
    textAlignVertical: 'top',
    borderRadius: 5,
    fontSize: 18,
  },
  btn: {
    width: '80%',
    marginVertical: 20,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#7254F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default VideoSubmit;
