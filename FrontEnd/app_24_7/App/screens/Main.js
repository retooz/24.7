import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

// ---------------------------------------------------------
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowWidth);
console.log(windowHeight);

const Main = ({navigation}) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [connectionCodes, setConnectionCodes] = useState({});

  const [data, setData] = useState();
  const [alarm, setAlarm] = useState();
  const today = new Date();
  let todayString = today.toISOString().split('T')[0];

  // const markedDates = {
  //   '2023-11-20': {
  //     marked: true,
  //     dotColor: '#AB9EF4',
  //   },
  //   '2023-11-17': {
  //     marked: true,
  //     dotColor: '#AB9EF4',
  //   },
  //   '2023-11-18': {
  //     marked: true,
  //     dotColor: '#AB9EF4',
  //   },
  //   [todayString]: {
  //     selected: true,
  //     marked: true,
  //     selectedColor: '#7254F5',
  //     height: 8,
  //   },
  // };

  useEffect(() => {
    getData();
    getFeedbackConfirm();
  }, []);

  // connection date 정보 가져오기
  const getData = async () => {
    try {
      const response = await axios.get(
        'http://20.249.87.104:3000/user/getData',
      );
      // console.log('data -----', response.data.list);
      setData(response.data.list);
    } catch (error) {
      console.error('Main ----- ', error);
    }
  };

  const getFeedbackConfirm = async () => {
    try {
      const response = await axios.get(
        'http://20.249.87.104:3000/user/feedbackConfirm',
      );
      console.log('data -----', response.data);
      setAlarm(response.data);
    } catch (error) {
      console.error('Main ----- ', error);
    }
  };

  console.log('0000000', alarm)



  useEffect(() => {
    if (data) {
      // selectedDay가 정의되었는지 확인
      let connectionDates = data.map(item => item.connection_date);
      setSelectedDay(connectionDates);
    }
  }, [data]);

  // 선택한 날짜, connection code 각 state에 저장
  useEffect(() => {
    if (selectedDay) {
      let newMarkedDates = selectedDay.reduce((acc, date) => {
        let dateKey = date.split(" ")[0];
        acc[dateKey] = {
          marked: true,
          dotColor: '#AB9EF4',
        };
        return acc;
      }, {});
  
      // 오늘 날짜 표시
      newMarkedDates[todayString] = {
        selected: true,
        selectedColor: '#7254F5',
        height: 8,
      };
      setMarkedDates(newMarkedDates);

      let newConnectionCodes = data.reduce((acc, item) => {
        let dateKey = item.connection_date.split(" ")[0];
        acc[dateKey] = item.connection_code;
        return acc;
      }, {});
      setConnectionCodes(newConnectionCodes);
    }
  }, [selectedDay]);


  /** 서버로 유저 코드 보내주는 함수 */
  const sendConnectionCode = (day) => {
    let connectionCode = connectionCodes[day.dateString];
    console.log('Selected connection code:', connectionCode);
    
    axios.post('http://20.249.87.104:3000/user/getFeedback', {
      code : connectionCode
    });
  }


  const theme = {
    arrowColor: 'black',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
  };

  const headerStyle = {
    textMonthFontSize: 85, // 월 폰트 크기 설정
    textYearFontSize: 80, // 년도 폰트 크기 설정
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.headerComponent}>
        {/* 알림 */}
        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => navigation.navigate('Alarm', {selectedDay})}>
            {/* 계산해서 0이면 동그라미, 숫자 없애고, 1 이상이면 표시 */}
          <View style={styles.alarmContainer}>
            <View style={styles.alarmCircle}>
              <Text style={styles.alarmText}>1</Text>
            </View>
          </View>
          <Image
            source={require('../assets/image/Bell.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
        {/* 마이페이지 */}
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => {
            navigation.navigate('Mypage');
          }}>
          <View style={styles.userCircle}>
            {/* <Icon name="user" size={35} color="#AB9EF4" /> */}
            <Image
              source={require('../assets/image/user.png')}
              style={{width: 45, height: 45}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Calendar
          style={styles.calendar}
          theme={theme}
          markedDates={markedDates}
          headerStyle={headerStyle}
          onDayPress={day => {
            console.log('Selected day:', day.month, day.day);
            if (markedDates[day.dateString]) {
              
              sendConnectionCode(day);
              navigation.navigate('Feedback', {selectMonth: day.month, selectDay : day.day});
              // navigation.navigate('Feedback', {selectedDay: day});
            }
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.cameraBtn}
        onPress={() => navigation.navigate('Category')}>
        <View style={styles.circle}>
          <Image
            source={require('../assets/image/Camera.png')}
            style={{width: 66, height: 65, marginTop: 15, marginLeft: 15}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: '75%',
    marginTop: windowHeight * 0.13,
    borderBottomColor: '#ffffff',
  },
  calendarContainer: {
    width: windowWidth,
    height: windowHeight,
    alignSelf: 'center', // 가운데 정렬
    paddingHorizontal: 15, // 좌우 마진을 15
    backgroundColor: 'white',
  },
  cameraBtn: {
    alignItems: 'center',
    // marginTop: '-80%',
    marginTop: windowHeight * -0.2,
    // marginBottom: windowHeight*40,
  },
  circle: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: '#ab9ef4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.37,
    shadowRadius: 6,
    elevation: 4,
  },
  cameraIcon: {
    width: 65,
    height: 65,
    marginTop: 17,
    marginLeft: 17,
    // backgroundColor: 'blue',
  },

  headerComponent: {
    flexDirection: 'row', // 수평 배치
    justifyContent: 'space-between', // 요소 양 쪽 끝에 배치
    alignItems: 'center', // 세로 방향 가운데 정렬
    // backgroundColor: 'blue',
    marginTop: windowHeight * 0.07,
  },
  bellBtn: {
    marginRight: 15,
  },
  alarmContainer: {
    marginLeft: 20, position: 'relative', zIndex: 1
  },
  alarmCircle: {
    width: 20, height: 20, backgroundColor: '#7254F5', borderRadius: 50, justifyContent: 'center', position: 'absolute',
  },
  alarmText: {
    color: '#fff', alignSelf: 'center'
  },
  userBtn: {
    marginLeft: 15,
  },
  // userCircle: {
  //   width: '100%', // 선의 너비를 100%로 설정
  //   borderWidth: 3,
  //   borderColor: '#AB9EF4',
  //   borderRadius: 50,
  // },
});

export default Main;
