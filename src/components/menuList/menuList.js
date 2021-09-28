import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, FlatList, State, TextInput} from 'react-native';
import { CardViewWithImage } from 'react-native-simple-card-view'

const menuList = ({navigation}) => {

    const [state, setState] = React.useState ({
        cities: [],
        inMemoryCities: []
    })


    useEffect(() => {
        let mounted = true;
        let data = [
            {ville: "Lyon", 
             logourl: "https://www.lyon.fr/sites/lyonfr/files/content/2017-07/VDL-logo.jpg",
             content: "La ville des lumières"},
             {ville: "Dole",
              logourl: "https://www.jura-tourism.com/wp-content/uploads/2018/12/juratourisme_07753_a5.jpg",
              content: "La ville de Pasteur"}
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
            <View style={{...StyleSheet.absoluteFill}}>
                <TextInput
                        placeholder="Recherche"
                        placeholderTextColor="#FFFFFF"
                        style={styles.searchBar}
                        onChangeText={(value) => searchCities(value)}/>
            </View>
            <View style={{...StyleSheet.absoluteFill,justifyContent:"center", textAlign:"center", alignItems:"center", elevation: 3, marginTop: 75}}>
                <FlatList
                    data={state.cities}
                    renderItem={({item}) => <CardElement ville={item} navigation={navigation}/>}
                    style={styles.container}/>
            </View>
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
            <CardViewWithImage
                         width={ 200}  
                        source={ {uri: ville.logourl} }
                        content={ville.content}
                        title={ville.ville}
                        imageWidth={ '100%' }
                        imageHeight={ 100 }
                        onPress={() => navigation.navigate('Map',{city:ville.ville})}
                        roundedImage={ false } 
            />

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
                width: 40,
                height:40,
                marginTop: 100
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
