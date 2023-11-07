import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Feedback = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ' ',
      headerLeft: ({onPress}) => (
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
      <View style={styles.analysisResult}></View>
      {/* 메모 */}
      <View style={styles.memo}></View>
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
});

export default Feedback;
