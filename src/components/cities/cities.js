import React, { useEffect, useState } from "react";
import { TextInput, SafeAreaView, FlatList, Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

const CITIES = [
    {
        id: '0',
        name: 'Paris'
    },
    {
        id: '1',
        name: 'Marseille',
    },
    {
        id: '2',
        name: 'Lyon'
    },
    {
        id: '3',
        name: 'Bordeaux'
    },
    {
        id: '4',
        name: 'Lille'
    }
];
const fave = require("../../../assets/header/fave.png");

function City({ city, onPress }) {
    const [tint, setTint] = useState('grey');
    const [shouldUpdateTint, updateTint] = useState(false);

    useEffect(() => {
        if (shouldUpdateTint) {
            setTint(tint === 'grey' ? 'red' : 'grey');
            updateTint(false);
        }
    }, [shouldUpdateTint])

    return (
        <>
            <View style={styles.listContainer}>
                <TouchableOpacity onPress={onPress} style={styles.cityContainer}>
                    <Text style={styles.cityName}>{ city.name }</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateTint(true)} style={styles.iconContainer}>
                    <Image style={[styles.icon, { tintColor: tint }]} source={fave}/>
                </TouchableOpacity>
            </View>
        </>
    );
}

function Search({ filterCities }) {
    return (
        <TextInput onChangeText={city => filterCities(city)}
                   placeholder={'Filter cities'}
                   style={styles.searchContainer}
        />
    );
}

function Cities({ navigation }) {
    const [cities] = useState(CITIES);
    const [filteredCities, setFilteredCities] = useState(CITIES);

    useEffect(() => {}, []);

    const filterCities = (input) => {
        setFilteredCities(cities.filter(city => city.name.includes(input)));
    }

    const renderCity = ({ item }) => {
        return (
            <City city={item} onPress={() => {
                navigation.navigate('Map', { city: item.name });
            }}/>
        );
    }

    return (
        <>
            <SafeAreaView style={styles.citiesContainer}>
                <FlatList data={filteredCities} renderItem={renderCity}
                          ListHeaderComponent={() => Search({ filterCities })}
                          //contentContainerStyle={styles.listContainer}
                          keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </>
    );
}

export default Cities;

const styles = StyleSheet.create({
    citiesContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchContainer: {
        backgroundColor: '#383838',
        height: 75,
        fontSize: 36,
        padding:10,
        color: 'white',
        alignSelf: 'center',
        borderRadius: 25,
        borderWidth: 2,
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#383838',
        borderRadius: 25,
        borderWidth: 2,
    },
    cityContainer: {
        padding: 15,
    },
    cityName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        padding: 15,
    },
    icon: {
        height: 50,
        width: 50,
    }
})
