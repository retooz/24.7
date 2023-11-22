import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
// import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/EvilIcons';
import {Image} from 'react-native-svg';
// import BottomSheet from '@gorhom/bottom-sheet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Feedback = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showVideo, setShowVideo] = useState(false);

  const {selectedDay} = route.params;
  // console.log(selectedDay);

  const v = require('../assets/video/squat.mp4');

  const dots = Array(4).fill(0);
  const boxes = Array(10).fill(0);

  let value = 100; // 사용자 전체 정확도
  let roundValue = [20, 98, 40, 60, 76, 80, 70, 55, 100, 88]; // 사용자 회차별 정확도
  const getResult = value => {
    let color;
    let text;
    if (value == null) {
      color = '#fff';
    } else if (value <= 20) {
      color = '#FF939C';
      text =
        '더 노력하면 더 나은 결과를 얻을 수 있을 거예요. 조금만 더 힘내세요!';
    } else if (value <= 40) {
      color = '#FFC692';
      text =
        '아직은 미숙하지만, 꾸준한 노력으로 더 나아질 수 있어요. 계속해서 발전해 나가세요!';
    } else if (value <= 60) {
      color = '#FFE86D';
      text = '지금처럼 계속 하시면 더욱 더 좋은 결과를 얻을 수 있을 거예요.';
    } else if (value <= 80) {
      color = '#97E79A';
      text =
        '정말 멋진 성과를 이뤄내셨어요! 계속해서 이런 성과를 이어나가세요!';
    } else if (value <= 100) {
      color = '#969AFF';
      text =
        '정말 훌륭한 성과를 거두셨어요! 이런 노력과 역량을 유지하면 놀라운 변화를 경험하실 수 있을 거예요!';
    }
    return {color, text};
  };
  const result = getResult(value);

  // 모달창
  const [modalVisible, setModalVisible] = useState(false);

  // 뒤로가기 ()
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
    <View style={styles.FeedbackContainer}>
      <ScrollView>
        {/* 날짜, 운동 종목 */}
        <View style={styles.dateAndExercise}>
          {/* 날짜 */}
          <View style={styles.date}>
            <Text style={styles.dateText}>
              {selectedDay.month}월 {selectedDay.day}일
            </Text>
          </View>
          {/* 운동 종목 */}
          <View>
            <Text style={styles.exerciseInfo}>스쿼트 피드백</Text>
          </View>
        </View>

        {/* 트레이너 정보 */}
        <View style={styles.trainerInfo}>
          {/* 프로필 사진 */}
          <View style={styles.trainerImg}>
            {/* <Image source={require('../assets/image/user.png')}></Image> */}
          </View>
          <View>
            <Text style={styles.trainerName}>김형진 트레이너</Text>
          </View>
        </View>

        {/* 운동영상 */}
        <View style={styles.exerciseVideo}>
          <Video
            source={v}
            style={styles.videoPlayer}
            controls={true}
            volume={0.0}
          />
        </View>

        {/* 피드백 */}
        <View style={styles.feedback}>
          <Text>
            안녕하세요 김형진 트레이너 입니다. 회원님의 경우, 스쿼트 자세에서
            무릎이 다소 앞으로 나오는 경향이 있어 중심이 앞으로 쏠릴 수 있으니,
            엉덩이 근육에 신경을 써주시면 좋을 거 같습니다.
          </Text>
          <Text>참고할 링크 & 사진</Text>
        </View>

        {/* 분석 결과 */}
        <View style={styles.analysisResult}>
          {/* 모달 */}
          <View style={{flexDirection: 'row'}}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View>
                        <Text style={styles.modalText}>
                          전체 정확도{'\n'}
                          사용자의 회차별 운동 분석 결과를 ...해서.. 보여줍니다.
                          {'\n\n'}
                          회차별 정확도{'\n'}
                          빨간색 : 부족해요{'\n'}
                          주황색 : 조금 노력하면 돼요{'\n'}
                          노란색 : 보통이에요{'\n'}
                          초록색 : 잘해요{'\n'}
                          파란색 : 아주 잘해요{'\n'}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Icon name="close-o" size={40} color='#7254F5' />
                      </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={{fontSize: 23, fontFamily: 'Pretendard-SemiBold'}}>
              분석결과
            </Text>
            <Pressable onPress={() => setModalVisible(true)}>
              <Icon name="question" size={25} style={{marginTop: 2}}color='#939393' />
            </Pressable>
          </View>
          {/* </View> */}

          {/* 전체 정확도 */}
          <View style={styles.allAccuracy}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Pretendard-SemiBold',
                marginBottom: 5,
              }}>
              전체 정확도
            </Text>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              locations={[0.1, 0.2, 0.5, 0.8, 1]}
              colors={['#FF939C', '#FFC692', '#FFE86D', '#97E79A', '#969AFF']}
              style={styles.linearGradient}>
              <View
                style={[styles.innerBar, {width: `${100 - value}%`}]}></View>
              <View style={styles.dotsContainer}>
                {dots.map((_, index) => (
                  <View key={index} style={styles.dot} />
                ))}
              </View>
            </LinearGradient>
            <Text style={styles.resText}>{result.text}</Text>
          </View>
          {/* 회차별 정확도 */}
          <View style={styles.roundAccuracy}>
            <Text style={{fontSize: 15, fontFamily: 'Pretendard-SemiBold'}}>
              회차별 정확도
            </Text>
            <View style={styles.boxContainer}>
              {boxes.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.box}
                  onPress={() => {
                    setShowVideo(!showVideo);
                  }}>
                  <View
                    style={[
                      styles.circle,
                      {backgroundColor: getResult(roundValue[index]).color},
                    ]}
                  />
                  <Text style={styles.roundText}>{index + 1}회</Text>
                </TouchableOpacity>
              ))}
            </View>
            {showVideo && (
              <View>
                <Text>사용자가 볼 회차별 비디오 영상</Text>
                <Video
                  source={v}
                  style={styles.roundVideoPlayer}
                  controls={true}
                  volume={0.0}
                />
              </View>
            )}
          </View>
        </View>

        {/* 메모 */}
        <View style={{flex: 1, backgroundColor: 'darkorange'}}>
          <Text>메모작성칸</Text>
          <Text>저장</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  FeedbackContainer: {
    flex: 1,
    paddingHorizontal: windowHeight * 0.02,
    paddingTop: windowWidth * 0.035,
  },
  dateAndExercise: {
    flex: 0.4,
    alignItems: 'center',
  },
  date: {},
  dateText: {
    fontSize: 25,
    fontFamily: 'Pretendard-Light',
    marginVertical: 5,
  },
  exerciseInfo: {
    fontSize: 18,
    fontFamily: 'Pretendard-Regular',
    marginVertical: 10,
  },
  trainerInfo: {
    flex: 0.2,
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  trainerImg: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  trainerName: {
    marginTop: 10,
    marginHorizontal: 5,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
  },
  exerciseVideo: {
    flex: 1.5,
    backgroundColor: 'orange',
  },
  videoPlayer: {
    alignSelf: 'center',
    width: windowWidth / Math.sqrt(2),
    height: windowWidth / Math.sqrt(2),
  },
  feedback: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: 'green',
  },
  analysisResult: {
    flex: 1,
    marginVertical: 10,
  },
  allAccuracy: {
    height: 30,
    width: '100%',
    borderRadius: 50,
    marginVertical: windowHeight * 0.02,
  },
  linearGradient: {
    borderRadius: 50,
    marginLeft: 1,
  },
  innerBar: {
    alignSelf: 'flex-end',
    height: '100%',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: '#FAFAFA',
  },
  dotsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '19%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#FDF3DD',
    // backgroundColor: '#FFB661'
  },
  resText: {
    marginTop: 10,
    fontSize: 14,
  },
  roundAccuracy: {
    // flex: 1,
    marginVertical: windowHeight * 0.05,
  },

  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  box: {
    width: '16%',
    height: '16%',
    aspectRatio: 1,
    margin: '2%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#ab9ef4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  circle: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    borderRadius: 15,
    margin: 6,
  },
  roundText: {
    alignSelf: 'center',
  },
  roundVideoPlayer: {
    alignSelf: 'center',
    width: windowWidth / Math.sqrt(1.1),
    height: windowWidth / Math.sqrt(1.1),
  },
  memo: {},

  centeredView: {
    // flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Feedback;
