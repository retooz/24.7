import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Text,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
// import { RNCamera } from 'react-native-camera';
// ---------------------------------------------------------

import Icon from 'react-native-vector-icons/EvilIcons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RecordVideo = ({ navigation }) => {
    const route = useRoute();

  


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.category,
            headerLeft: ({ onPress }) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CategoryAi');
                    }}>
                    <Icon name="chevron-left" size={40} />
                </TouchableOpacity>
            ),
            contentStyle: {
                backgroundColor: '#FAFAFA',
            },
        });
    }, [navigation, route]);

    return (
        <View style={styles.Container}>
             <Video

                source={require('../assets/video/squat.mp4')}
                style={{ width: windowWidth * 0.85, height: windowHeight * 0.4 }}
                controls={true} // 플레이어 컨트롤 보이기
                resizeMode="cover" // 동영상 크기 조절

            /> 

            

        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    touchContainer: {
        backgroundColor: "#F9F7FE",
        width: windowWidth * 0.85,
        height: windowHeight * 0.39,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    headText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
        marginVertical: 10,
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        marginVertical: 20,
    },
});


export default RecordVideo;

