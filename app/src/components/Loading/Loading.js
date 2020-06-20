import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function LoadingComponent(props){
    return(
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        marginVertical: 20,
    }
});