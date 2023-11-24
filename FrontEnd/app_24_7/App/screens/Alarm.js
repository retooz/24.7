import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Alarm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {selectedDay} = route.params;
  console.log('alarm -----', selectedDay);

  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    if (selectedDay) {
      let alarmDate = selectedDay.map(date => {
        let [year, month, day] = date.split(' ')[0].split('-');
        return {month, day};
      });

      setMonth(alarmDate.map(dateObj => dateObj.month));
      setDay(alarmDate.map(dateObj => dateObj.day));
    }
  }, [selectedDay]);

  console.log(month, day);

  // 헤더 (알림 -> 메인)
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
        backgroundColor: '#F6F6F6',
      },
    });
  }, [navigation]);

  return (
    <View>
      {/* 알림창 부분 */}
      <ScrollView>
        <View style={styles.alarmContainer}>
          {/* 개별 알림창 */}
          {selectedDay.map((date, index) => {
            let [, month, day] = date.split(' ')[0].split('-');

            return (
              <View key={index} style={styles.alarmBox}>
                <View style={styles.alarmText}>
                  <Text style={{fontSize: 18, fontFamily: 'Pretendard-Thin'}}>
                    {month}월 {day}일 운동 피드백이 도착했습니다.
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Feedback', {selectMonth: month, selectDay : day})
                  }>
                  <View style={styles.alarmBtn}>
                    <Icon name="chevron-right" size={45} color="#AB9EF4" />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  alarmContainer: {
    paddingHorizontal: windowHeight * 0.02,
    paddingTop: windowWidth * 0.045,
  },
  alarmBox: {
    width: windowWidth * 0.92,
    height: windowHeight * 0.09,
    borderRadius: 13,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  alarmText: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  alarmBtn: {
    alignItems: 'flex-end',
  },
});

export default Alarm;
