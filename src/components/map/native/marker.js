import React from 'react';
import { StyleSheet, Image, View } from "react-native";
import { Marker } from "react-native-maps";

import { THEMES } from "../THEMES";

export default function MapMarker(props) {
    const { id, coordinates, theme } = props;

    function getImage(themeName) {
        return THEMES.find(t => t.name === themeName)?.icon;
    }

    return (
        <>
            <Marker coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
                    identifier={`${id}`}
                    key={`${id}`}
                    style={styles.container}
            >
                <View>
                    {/*<Image source={getImage(theme)} style={styles.image}/>*/}
                    { props.children }
                </View>
            </Marker>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    container: {
        width: 200,
        height: 300,
    }
});
