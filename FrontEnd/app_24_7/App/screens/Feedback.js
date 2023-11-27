import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
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
  TextInput,
  Button,
  Image,
  Linking,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetHandle,
} from '@gorhom/bottom-sheet';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/EvilIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Feedback = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {selectedDay, selectMonth, selectDay} = route.params;
  // console.log(selectedDay, selectMonth, selectDay);

  // DB 정보 가져오기
  const [profile, setProfile] = useState(); // 트레이너 프로필
  const [videoPath, setVideoPath] = useState(); // 사용자 녹화 영상
  const [feedback, setFeedback] = useState(); // 트레이너 피드백
  const [link, setLink] = useState(); // 참고 링크
  // const [value, setValue] = useState(); // 전체 정확도
  // const [roundValue, setRoundValue] = useState(); // 회차별 정확도

  const [showVideo, setShowVideo] = useState(false); // 회차별 영상
  const v = require('../assets/video/squat.mp4');

  const dots = Array(4).fill(0);
  const boxes = Array(10).fill(0);

  let value = 40; // 사용자 전체 정확도
  let roundValue = [20, 98, 40, 60, 76, 80, 70, 55, 100, 88]; // 사용자 회차별 정확도
  const getResult = value => {
    let color;
    let text;
    if (value == null) {
      color = '#fff';
    } else if (value <= 40) {
      color = '#FF939C';
      text =
        '더 노력하면 더 나은 결과를 얻을 수 있을 거예요. 조금만 더 힘내세요!';
    } else if (value <= 54) {
      color = '#FFC692';
      text =
        '아직은 미숙하지만, 꾸준한 노력으로 더 나아질 수 있어요. 계속해서 발전해 나가세요!';
    } else if (value <= 69) {
      color = '#FFE86D';
      text = '지금처럼 계속 하시면 더욱 더 좋은 결과를 얻을 수 있을 거예요.';
    } else if (value <= 85) {
      color = '#97E79A';
      text =
        '정말 멋진 성과를 이뤄내셨어요! 계속해서 이런 성과를 이어나가세요!';
    } else if (value <= 100) {
      color = '#969AFF';
      text = '정말 훌륭한 성과를 거두셨어요!👏👏👏👏👏';
    }
    return {color, text};
  };
  const result = getResult(value);

  // 모달창
  const [modalVisible, setModalVisible] = useState(false);

  // 메모
  const [input, setInput] = useState('');
  const [memo, setMemo] = useState('');

  /** 메모 저장하는 함수 */
  const handleSave = () => {
    console.log('save memo');
    setMemo(input);
  };

  // 바텀시트 ---------------------------------------------------
  const [bottomText, setBottomText] = useState(
    '난 강력한 트레이너\n3대 500 가능',
  );
  // ref
  const bottomSheetModalRef = useRef(null);
  // state
  const [modalOpened, setModalOpened] = useState(false);
  // variables
  const snapPoints = useMemo(() => ['50%'], []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setModalOpened(true);
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  const CustomHandleComponent = () => (
    <BottomSheetHandle
      style={{
        // backgroundColor: '#7254F5',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        color: 'white',
      }}
    />
  );

  // 뒤로가기 (Feedback -> Main)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${selectMonth}월 ${selectDay}일`,
      headerLeft: ({onPress}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      ),
      headerTitleStyle: {fontFamily: 'Pretendard-Light', fontSize: 20},
      contentStyle: {
        backgroundColor: '#FAFAFA',
      },
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View style={styles.FeedbackContainer}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            handleComponent={CustomHandleComponent}>
            {/* 바텀시트 내용 */}
            <View style={[styles.contentContainer]}>
              <View style={styles.trainerInfo}>
                {/* 프로필 사진 */}
                <View style={styles.trainerImg}>
                  {/* <Image source={require('../assets/image/user.png')}></Image> */}
                </View>
                <View>
                  <Text style={styles.trainerName}>김형진 트레이너</Text>
                </View>
              </View>
              <Text style={{paddingLeft: 20}}>{bottomText}</Text>
            </View>
          </BottomSheetModal>

          <ScrollView>
            <KeyboardAwareScrollView>
              {/* 날짜, 운동 종목 */}
              <View style={styles.dateAndExercise}>
                {/* 운동 종목 */}
                <View>
                  <Text style={styles.exerciseInfo}>스쿼트 피드백</Text>
                </View>
              </View>

              {/* 트레이너 정보 */}
              <TouchableOpacity
                style={styles.trainerInfo}
                onPress={handlePresentModalPress}>
                {/* 프로필 사진 */}
                {/* <View style={styles.trainerImg}> */}
                <Image
                  source={require('../assets/image/trainer.png')}
                  style={{width: 35, height: 35}}
                />
                {/* </View> */}
                <View>
                  <Text style={styles.trainerName}>김형진 트레이너</Text>
                </View>
              </TouchableOpacity>

              {/* 운동영상 */}
              <View style={styles.exerciseVideo}>
                <Video
                  source={v}
                  style={styles.videoPlayer}
                  controls={true}
                  volume={0.0}
                  paused={true}
                />
              </View>

              {/* 피드백 */}
              <View style={styles.feedback}>
                <Text
                  style={{
                    fontFamily: 'Pretendard-Light',
                    fontSize: 17,
                    marginBottom: 10,
                    lineHeight: 23,
                  }}>
                  안녕하세요 김형진 트레이너 입니다. 회원님의 경우, 스쿼트
                  자세에서 무릎이 다소 앞으로 나오는 경향이 있어 중심이 앞으로
                  쏠릴 수 있으니, 엉덩이 근육에 신경을 써주시면 좋을 거
                  같습니다.
                </Text>
                <Text
                  style={{
                    fontFamily: 'Pretendard-Light',
                    fontSize: 20,
                    color: '#7254F5',
                  }}>
                  참고할 링크
                </Text>
                <Text
                  style={{
                    fontFamily: 'Pretendard-Light',
                    fontSize: 15,
                    marginTop: 7,
                    color: 'grey',
                  }}
                  onPress={() =>
                    Linking.openURL(
                      `https://youtu.be/q6hBSSfokzY?si=cbGgISW7VdCDLqV6`,
                    )
                  }>
                  Youtube 바로가기
                </Text>
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
                            사용자의 회차별 정확도를 합하여 평균으로 계산한
                            점수입니다.
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
                          <Icon name="close-o" size={40} color="#7254F5" />
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                  <Text
                    style={{fontSize: 23, fontFamily: 'Pretendard-SemiBold'}}>
                    분석결과
                  </Text>
                  <Pressable onPress={() => setModalVisible(true)}>
                    <Icon
                      name="question"
                      size={25}
                      style={{marginTop: 2}}
                      color="#939393"
                    />
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
                    colors={[
                      '#FF939C',
                      '#FFC692',
                      '#FFE86D',
                      '#97E79A',
                      '#969AFF',
                    ]}
                    style={styles.linearGradient}>
                    <View
                      style={[
                        styles.innerBar,
                        {width: `${100 - value}%`},
                      ]}></View>
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
                  <Text
                    style={{fontSize: 15, fontFamily: 'Pretendard-SemiBold'}}>
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
                            {
                              backgroundColor: getResult(roundValue[index])
                                .color,
                            },
                          ]}
                        />
                        <Text style={styles.roundText}>{index + 1}회</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {showVideo && (
                    <View>
                      <Text></Text>
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
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: 'Pretendard-Regular',
                    fontSize: 20,
                    color: '#AB9EF4',
                    marginBottom: 10,
                  }}>
                  MEMO
                </Text>
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  placeholder="메모를 작성해주세요"
                  multiline={true}
                  style={{...styles.memo, lineHeight: 30}}
                  placeholderTextColor="#AFAFB5"
                />
                <View style={styles.btn}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}>
                    <Text style={styles.saveButtonText}>저장</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  FeedbackContainer: {
    flex: 1,
    paddingHorizontal: windowHeight * 0.02,
    paddingTop: windowWidth * 0.02,
  },
  dateAndExercise: {
    flex: 0.4,
    alignItems: 'center',
  },
  exerciseInfo: {
    fontSize: 23,
    fontFamily: 'Pretendard-Light',
    marginVertical: 10,
    color: '#7254F5',
  },
  trainerInfo: {
    flex: 0.2,
    flexDirection: 'row',
    marginBottom: 10,
  },
  trainerImg: {
    width: 40,
    height: 40,
    // backgroundColor: 'gray',
    borderRadius: 50,
  },
  trainerName: {
    marginTop: 10,
    marginHorizontal: 5,
    fontFamily: 'Pretendard-Regular',
    fontSize: 18,
  },
  exerciseVideo: {
    flex: 1.5,
    // backgroundColor: 'orange',
  },
  videoPlayer: {
    alignSelf: 'center',
    width: windowWidth / Math.sqrt(1.1),
    height: windowWidth / Math.sqrt(1.1),
  },
  feedback: {
    flex: 1,
    marginVertical: 20,
    // backgroundColor: 'green',
  },
  analysisResult: {
    flex: 1,
    marginVertical: 10,
    marginBottom: 0,
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
  memo: {
    backgroundColor: '#F9F7FE',
    borderColor: '#AB9EF4',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    textAlignVertical: 'top',
    borderRadius: 5,
    fontSize: 18,
  },
  btn: {
    width: '100%',
    marginVertical: 20,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#7254F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

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
    padding: 20,
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
    textAlign: 'center',
    fontFamily: 'Pretendard-Light',
    fontSize: 15,
    marginVertical: 10,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'left',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default Feedback;
