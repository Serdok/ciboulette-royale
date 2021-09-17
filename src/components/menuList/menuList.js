import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { FlatList, State, TextInput } from 'react-native-gesture-handler';
import { Link } from '../routing/routing';


const menuList = props => {

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
                    renderItem={({item}) => <CardElement ville={item.ville}/>}
                    style={styles.container}/>
        </View>

        </>
    );


}

const CardElement = props => {
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
            <Link to={`/map/${props.ville}`} component={TouchableOpacity} style={styles.cardList}>
                <View style={styles.villeName}>
                    <Text style={styles.textNomVille}>{props.ville}</Text>
                </View>
                <TouchableOpacity style={styles.containerFave} onPress={() => changeColor(tint)}>
                    <Image style={[styles.faveIcon, {tintColor: tint}]} source={fave}/>
                </TouchableOpacity>
            </Link>
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
        borderTopWidth: 0.5, 
        textAlign: 'center',
        borderTopColor: '#7d90a0' 
    }

});
