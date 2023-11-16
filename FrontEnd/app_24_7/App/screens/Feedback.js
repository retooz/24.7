import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as Progress from "react-native-progress";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Feedback = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ' ',
      headerLeft: ({ onPress }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Alarm');
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
      {/* 날짜, 운동 종목 */}
      <View style={styles.dateAndExercise}>
        {/* 날짜 */}
        <View style={styles.date}>
          <Text>11월 23일</Text>
        </View>
        {/* 운동 종목 */}
        <View>
          <Text style={styles.exerciseInfo}>스쿼트</Text>
          <Text style={styles.exerciseText}> 피드백</Text>
        </View>
      </View>
      {/* 트레이너 정보 */}
      <View style={styles.trainerInfo}></View>
      {/* 운동영상 */}
      <View style={styles.exerciseVideo}></View>
      {/* 피드백 */}
      <View style={styles.feedback}></View>
      {/* 분석 결과 */}
      <View style={styles.analysisResult}>
        <View style={styles.barView}>
          <View style={styles.bar}>
            <Progress.Bar
              progress={0.3} // 임시로 30%로 설정
              width={null}
              height={16}
              color={'#FF0044'}
              animated = {true}
            />

          </View>
          <Text style={styles.barText}>
            30/100
          </Text>
          <Progress.Pie progress={0.4} size={50} />
        </View>
        {/* 메모 */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FeedbackContainer: {
    flex: 1,
    paddingHorizontal: windowHeight * 0.02,
    paddingTop: windowWidth * 0.035,

  },
  dateAndExercise: {},
  date: {},
  exerciseInfo: {},
  exerciseText: {},
  trainerInfo: {},
  exerciseVideo: {},
  feedback: {},
  analysisResult: {},
  memo: {},
  barview: {
    width: "100%",
    padding: 50,
    flexDirection: "row",
    marginTop: 50
  },
  bar: {
    flex: 1
  },
  bartext: {
    width: 40,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "bold",

  }
});

export default Feedback;
