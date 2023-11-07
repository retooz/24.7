import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// ---------------------------------------------------------
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Category = ({navigation}) => {
  // 드롭다운 열고 닫기
  const [open, setOpen] = useState(false);

  // 라이브러리에 기본값을 설정할 수 있는 defaultValue 속성이 없어졌다고 하여 value를 초기화할 때 기본값을 지정해주었다.
  const [value, setValue] = useState(' ');

  // 드롭다운 메뉴에 들어갈 아이템들 {label: '메뉴명', value: '값} 형태
  const [items, setItems] = useState([
    {label: '스쿼트', value: '1'},
    {label: '런지', value: '2'},
    {label: '푸쉬업', value: '3'},
  ]);

  // 현재 선택된 값
  const [currentValue, setCurrentValue] = useState(1);

  // 드롭다운 메뉴를 선택할 때마다 값 변경
  const onChange = (value, index) => {
    setCurrentValue(value);

    switch (value) {
      case '1':
        navigation.navigate('Login');
        break;
      case '2':
        // 다른 값(2에 해당하는 동작) 처리
        break;
      case '3':
        // 다른 값(3에 해당하는 동작) 처리
        break;
      default:
        setCurrentValue(0);
        break;
    }
  };

  const [open2, setOpen2] = useState(false);

  const [value2, setValue2] = useState(' ');

  const [items2, setItems2] = useState([
    {label: '여기', value: '1'},
    {label: '뭐', value: '2'},
    {label: '들어가?', value: '3'},
  ]);

  const [currentValue2, setCurrentValue2] = useState(1);

  const onChange2 = (value, index) => {
    switch (value) {
      case '1':
        setCurrentValue2(1);
        break;
      case '2':
        setCurrentValue2(2);
        break;
      case '3':
        setCurrentValue2(3);
        break;
      default:
        setCurrentValue2(0);
    }
  };

  const [open3, setOpen3] = useState(false);

  const [value3, setValue3] = useState(' ');

  const [items3, setItems3] = useState([
    {label: '여기', value: '1'},
    {label: '뭐', value: '2'},
    {label: '들어가?', value: '3'},
  ]);

  const [currentValue3, setCurrentValue3] = useState(1);

  const onChange3 = (value, index) => {
    switch (value) {
      case '1':
        setCurrentValue3(1);
        break;
      case '2':
        setCurrentValue3(2);
        break;
      case '3':
        setCurrentValue3(3);
        break;
      default:
        setCurrentValue3(0);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.headerComponent}>
        <TouchableOpacity style={styles.bellBtn} onPress={() => {}}>
          <Fontisto name="bell" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
          <View style={styles.userCircle}>
            <Icon name="user" size={35} color="#AB9EF4" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.dropdown_container}>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            placeholder="분석 가능 운동"
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            maxHeight={500} // 옵션이 많으면 잘려서 나오는데, 이때 maxHeight를 사용하여 길이를 조절하면 된다.
            onChangeValue={onChange} // 값이 바뀔 때마다 실행
            listItemContainerStyle={styles.dropdown}
            style={{...styles.Picker, zIndex: 3}}
            textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            dropDownContainerStyle={{borderWidth: null}}
            arrowIconStyle={{
              width: 25,
              height: 25,
              tintColor: '#7254F5', // 원하는 색상으로 설정
            }}
          />
        </View>
        <View style={{marginTop: windowHeight * 0.05}}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            placeholder="요가"
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            maxHeight={150} // 옵션이 많으면 잘려서 나오는데, 이때 maxHeight를 사용하여 길이를 조절하면 된다.
            onChangeValue={onChange2} // 값이 바뀔 때마다 실행
            listItemContainerStyle={styles.dropdown}
            style={{...styles.Picker, zIndex: 2}}
            textStyle={{
              textAlign: 'center',
              fontWeight: 'bold',
              justifyContent: 'center',
            }}
            dropDownContainerStyle={{borderWidth: null}}
            arrowIconStyle={{
              width: 25,
              height: 25,
              tintColor: '#7254F5', // 원하는 색상으로 설정
            }}
          />
        </View>
        <View style={{marginTop: windowHeight * 0.05}}>
          <DropDownPicker
            open={open3}
            value={value3}
            items={items3}
            placeholder="헬스"
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            maxHeight={150} // 옵션이 많으면 잘려서 나오는데, 이때 maxHeight를 사용하여 길이를 조절하면 된다.
            onChangeValue={onChange3} // 값이 바뀔 때마다 실행
            listItemContainerStyle={styles.dropdown}
            style={{...styles.Picker, zIndex: 1}}
            textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            dropDownContainerStyle={{borderWidth: null}}
            arrowIconStyle={{
              width: 25,
              height: 25,
              tintColor: '#7254F5', // 원하는 색상으로 설정
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    flex: 1,
  },
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 15,
  },
  bellBtn: {
    marginRight: 15,
  },
  userBtn: {
    marginLeft: 15,
  },
  userCircle: {
    width: '100%',
    borderWidth: 3,
    borderColor: '#AB9EF4',
    borderRadius: 50,
  },

  // 드롭다운 메뉴를 열면 아래의 컴포넌트가 먼저 나와 메뉴들이 안 보이는 현상이 있었는데
  // DropDownPicker의 부모 요소에 zIndex를 주면 메뉴가 먼저 나오게 된다.
  dropdown_container: {
    marginTop: 30,
    zIndex: 1000,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  Picker: {
    backgroundColor: '#F9F7FE',
    width: windowWidth * 0.9,
    borderWidth: 0,
  },
});

export default Category;
