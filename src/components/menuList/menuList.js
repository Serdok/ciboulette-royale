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
            setTint("tomato")
        } else {
            setTint("grey")
        }
    }

    return(
        <>
            <TouchableOpacity onPress={() => navigation.navigate('Map',{city:ville})} style={styles.tempCardList}>
                <View style={{flex:2}}>
                    <Image style={styles.cityPreview} source={{uri:'https://j3n6c2a8.rocketcdn.me/wp-content/uploads/2019/11/ville_lyon-scaled.jpg'}}/>
                </View>
                <View style={styles.cityNameContainer}>
                    <Text style={styles.cityName}>{ville}</Text>
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
    cityPreview: {
        height: 150,
        ...Platform.select({
            web:{
                width: 250,
            },
            default: {
                width: 150,
            }
        })
    },
    cityNameContainer: {
        ...Platform.select({
            web: {
                flex:2,
                justifyContent:"center"
            },
            android: {
                justifyContent:"flex-end",
                marginRight: 50
            }
        }),
    },
    cityName: {
        fontWeight: "bold",
        fontFamily: "Coolvetica",
        ...Platform.select({
            web: {
                fontSize: 75
            },
            default: {
                fontSize: 25,
            }
        }),
    },
    tempCardList: {
        height:150, 
        backgroundColor:"lightgrey",
        margin: 10, 
        borderWidth: 2, 
        borderColor:"grey",
        borderBottomRightRadius: 2,
        borderTopRightRadius: 2,
        flexDirection: "row",
        alignContent:"center",
        alignItems:"center",
        zIndex: 2
    },
    
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
        ...Platform.select({
            web:{
                height: 100,
                width: 100
            },
            default: {
                width: 50,
                height: 50,
            }
        }),
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


        
    }

});
