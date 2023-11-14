import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [alarmText, setAlarmText] = useState('')
  const emailRef = useRef({})
  const pwRef = useRef({})
  const alarmRef = useRef({})
  const handleLogin = () => {
    if (email === "" || email === undefined) {
      alert("이메일 확인 하고 와")
      return false;
    }
    if (pw === "" || pw === undefined) {
      alert("비번 확인")
      return false;
    }
    else {
      axios
        .post("http://10.0.2.2:3000/auth/userLogin", {
          email: email,
          pw: pw
        })
        .then((res) => {
          console.log("handleLogin =>", res.data.result);
          // 로그인 성공여부는 res.data.affectedRows가 0인지 1인지 확인하면 됨
          if (res.data.result === 0) {
            navigation.navigate('Main')
          }
        })
        .catch((e) => {
          // console.error(e);
          setAlarmText("잘못된 비밀번호입니다. 다시 확인하세요.")
          alarmRef.current.setNativeProps({ style: { color: 'red', display: 'block' } });
        });


    };
  }


  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}>
      <ImageBackground
        source={require('../assets/image/backColor2.png')}
        style={styles.container}>
        <View>
          <Image
            style={styles.img}
            source={require('../assets/image/logo3.png')}
          />
        </View>

        <TextInput
          placeholder="Email"
          style={{ ...styles.input, marginBottom: 5 }}
          placeholderTextColor="#AB9EF4"
          ref={ref => (this.emailRef = ref)} onChangeText={(text) => setEmail(text)}></TextInput>

        <TextInput
          placeholder="Password"
          style={{ ...styles.input, marginBottom: 30 }}
          secureTextEntry
          returnKeyType="done"
          keyboardType="email-address"
          placeholderTextColor="#AB9EF4"
          ref={ref => (this.pwRef = ref)} onChangeText={(text) => setPw(text)}></TextInput>
        <Text style={{ display: 'none', color: 'red', fontWeight: "bold", marginTop: windowHeight * -0.018, marginBottom: windowHeight * 0.025 }} ref={alarmRef}>{alarmText}</Text>

        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.kakaoLoginButton} onPress={() => { }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/image/kakaologo3.png')}
                style={{ width: 20, height: 20, marginRight: 15, marginTop: 1 }}
              />
              <Text style={styles.kakaoLoginButtonText}>카카오 로그인</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.others}>
          <TouchableOpacity onPress={() => navigation.navigate('Join')}>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FindPw')}>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  img: {
    width: 160,
    height: 90,
    marginTop: -40,
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 18,
    width: '80%',
  },
  btn: {
    width: '80%',
    marginVertical: 20,
    marginTop: 20,
  },
  others: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  kakaoLoginButton: {
    backgroundColor: '#FEE500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#7254F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  linkText: {
    marginHorizontal: 40,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  kakaoLoginButtonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
// 1. 클레스이름 마주기
// 2. 토요일까지 달력
// 3.

export default Login;
