import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import IncidentsListItem from './IncidentsListItem';
import LoadingComponent from '../../components/Loading/Loading';
export default function IncidentsList(props){
    const { incidents, onPressItem, onLoadMore, loading } = props;

    function renderLoading(){
        return(
            !loading ? <></> : <LoadingComponent />
        );
    }
    return(
        <View style={styles.container}>
            <FlatList 
                data={ incidents }
                contentContainerStyle={{ }}
                renderItem={ ({ item }) => (
                    <IncidentsListItem 
                        item={item}
                        onPressItem={onPressItem}
                    /> 
                )}
                keyExtractor={ item => String(item.id) }
                showsVerticalScrollIndicator={false}
                onEndReached={() => onLoadMore()}
                onEndReachedThreshold={0.2}
                ListFooterComponent={renderLoading()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 32,
        flex: 1
    },
});
