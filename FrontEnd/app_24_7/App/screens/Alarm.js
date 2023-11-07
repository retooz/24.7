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

const Alarm = () => {
  const navigation = useNavigation();

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
      <View style={styles.alarmContainer}>
        {/* 개별 알림창 */}
        <View style={styles.alarmBox}>
          <View style={styles.alarmText}>
            <Text style={{fontSize: 18, fontFamily: 'Pretendard-Light'}}>
              10월 28일 운동 피드백이 도착했습니다.
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
            <View style={styles.alarmBtn}>
              <Icon name="chevron-right" size={45} color="#AB9EF4" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  alarmText: {
    flex: 1,
    alignItems: 'center',
  },
  alarmBtn: {
    alignItems: 'flex-end',
  },
});

export default Alarm;
