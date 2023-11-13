import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Text,
} from 'react-native';


import Icon from 'react-native-vector-icons/EvilIcons';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const categoriesData = [
    { name: '스쿼트', description: '스쿼트에 대한 설명' },
    { name: '런지', description: '런지에 대한 설명' },
    { name: '푸쉬업', description: '푸쉬업에 대한 설명' },
    // 다른 카테고리 추가
];

const CategoryAi = ({ navigation }) => {


    // 뒤로가기 (CategoryAi -> Category)
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'AI 분석 운동',
            headerLeft: ({ onPress }) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Category');
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
        <View style={styles.Container}>
            {categoriesData.map((categoryData) => (
                <TouchableOpacity
                    key={categoryData.name}
                    style={styles.touchContainer}
                    onPress={() => {
                        navigation.navigate('RecordVideo', {
                            category: categoryData.name
                        });
                    }}>
                    <Text style={styles.headText}>{categoryData.name}</Text>
                </TouchableOpacity>
            ))}
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
        height: windowHeight * 0.24,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    headText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
        marginVertical: 10,
    },
});

export default CategoryAi;

