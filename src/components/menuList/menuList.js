import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, FlatList, State, TextInput} from 'react-native';


const menuList = ({navigation}) => {

    const [state, setState] = React.useState ({
        cities: [],
        inMemoryCities: []
    })


    useEffect(() => {
        let mounted = true;
        let data = [
            {ville: "Lyon"}
        ]
        setState({...state, cities: data, inMemoryCities: data})
        return () => mounted = false;
    }, []);

    const searchCities = (value) => {
        const filterCities = state.inMemoryCities.filter(
            cities => {
                let citiesLowerCase = (cities.ville).toLowerCase();
                let searchTermLower = value.toLowerCase();

                return citiesLowerCase.indexOf(searchTermLower)> -1
            });
            setState({...state, cities:filterCities})
    }

    return(
        <>
        <View style={{...StyleSheet.absoluteFill}}>
            <TextInput
                    placeholder="Recherche"
                    placeholderTextColor="#FFFFFF"
                    style={styles.searchBar}
                    onChangeText={(value) => searchCities(value)}/>
                <FlatList
                    data={state.cities}
                    renderItem={({item}) => <CardElement ville={item.ville} navigation={navigation}/>}
                    style={styles.container}/>
        </View>

        </>
    );


}

const CardElement = ({navigation, ville}) => {
    const fave = require("../../../assets/header/fave.png");

    const [tint, setTint] = useState("grey");

    const changeColor = (tint) => {
        if(tint === "grey") {
            setTint("red")
        } else {
            setTint("grey")
        }
    }

    return(
        <>
            <TouchableOpacity onPress={()=> navigation.navigate('Map', {city: ville})} style={styles.cardList}>
                <View style={styles.villeName}>
                    <Text style={styles.textNomVille}>{ville}</Text>
                </View>
                <TouchableOpacity style={styles.containerFave} onPress={() => changeColor(tint)}>
                    <Image style={[styles.faveIcon, {tintColor: tint}]} source={fave}/>
                </TouchableOpacity>
            </TouchableOpacity>
        </>
    );
}


export default menuList;


const textColor = { color: "white" }


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent: "center",
    },
    textParam: {
        ...textColor,
        fontWeight: "bold"
    },
    cardList: {
        flex:1,
        height: 100,
        borderWidth: 2,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        textAlign:"center",
        alignContent:"center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor:"#383838",
        zIndex: 2,
    },
    villeName: {
        flex:1,
        marginLeft: 15
    },
    textNomVille: {
        ...textColor,
        fontSize: 20,
        fontWeight: "bold"
    },
    containerFave: {
        justifyContent: "flex-end",
        marginRight: 20
    },
    faveIcon: {
        height: 50,
        width: 50,
        zIndex: 3,
        // elevation: 3
    },
    searchBar: {
        backgroundColor: '#383838',
        height: 75,
        fontSize: 36,
        padding:10,
        color: 'white',
        textAlign: 'center',
        ...Platform.select({
            android: {
                borderTopWidth: 0.5, 
                borderTopColor: '#7d90a0',

            },
            default: {

            }
        })

        
    }

});
