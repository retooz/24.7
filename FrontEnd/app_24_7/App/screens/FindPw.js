import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/EvilIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function FindPw({navigation}) {
  const [email, setEmail] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  React.useLayoutEffect(() => {
    navigation.setOptions({
      //  headerTitle: ' ',
      headerLeft: ({ onPress }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      ),
      contentStyle: {
        backgroundColor: '#F6F6F6',
      },
    });
  }, [navigation]);




  const handleCheckEmail = () => {
    if (email === 'abc') {
      setShowPasswordFields(true);
      setErrorMessage('');
    } else {
      setErrorMessage('등록된 회원 정보가 없습니다');
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}>
      <ImageBackground
        source={require('../assets/image/backColor2.png')}
        style={styles.container}>
        <View style={styles.headerContent}>
          <Text style={{...styles.text, marginRight: 230}}>이메일 입력</Text>
          <TextInput
            style={styles.inputText}
            value={email}
            onChangeText={text => {
              if (!showPasswordFields) {
                setEmail(text);
              }
            }}
            editable={!showPasswordFields}
          />
          <TouchableOpacity
            style={styles.checkBtn}
            onPress={() => {
              if (!showPasswordFields) {
                if (email === 'abc') {
                  setShowPasswordFields(true);
                  setErrorMessage('');
                } else {
                  setErrorMessage('등록된 회원 정보가 없습니다');
                }
              }
            }}
            disabled={showPasswordFields}>
            <Text style={styles.checkBtnText}>다음</Text>
          </TouchableOpacity>
          {errorMessage !== '' && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
        </View>

        {showPasswordFields && (
          <View style={styles.newPw}>
            <Text style={{...styles.text, marginRight: 190}}>
              새로운 비밀번호
            </Text>
            <TextInput
              style={styles.inputText}
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
            />
            <Text style={{...styles.text, marginRight: 160, marginTop: 20}}>
              새로운 비밀번호 확인
            </Text>
            <TextInput
              style={styles.inputText}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity
              style={styles.checkBtn}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.checkBtnText}>확인</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 50,
  },
  inputText: {
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 18,
    width: 320,
    height: 50,
  },
  checkBtn: {
    backgroundColor: '#7254F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 320,
    marginVertical: 10,
  },
  checkBtnText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  errorMessage: {
    color: 'red',
    fontSize: 15,
    marginTop: 10,
  },
  newPw: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
});

export default FindPw;