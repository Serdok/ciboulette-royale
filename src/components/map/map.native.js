import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { getDetailsForLyon } from "../../services/lyon";

const ASPECT_RATIO = Dimensions.get('window').width / Dimensions.get('window').height;
const LATITUDE_DELTA = 0.051;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Map({ match }) {
    const [location, setLocation] = useState(null);
    const [markers, setMarkers] = useState(null);

    useEffect(() => {
        (async () => {
            // Get city from routing
            const city = match.params['city'];
            switch (city.toLowerCase()) {
                case "lyon":
                    const markers = await getDetailsForLyon();
                    console.log('api call');
                    setMarkers(markers.features);
                    break;
            }
        })();
    }, []);

    const onUserLocationChange = coords => {
        console.log(coords);
        setLocation(coords);
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{ longitude: 4.8319618433010785, latitude: 45.75790021711596, longitudeDelta: LONGITUDE_DELTA, latitudeDelta: LATITUDE_DELTA }}
                     loadingEnabled
                     showsUserLocation
                     showsMyLocationButton
                     followsUserLocation
                     showsIndoorLevelPicker

                     onUserLocationChange={e => onUserLocationChange(e.nativeEvent)}
            >
                {
                    markers?.map(marker => {
                        return (
                            <Marker identifier={marker.id} key={marker.id} coordinate={{
                                latitude: marker.geometry.coordinates[1],
                                longitude: marker.geometry.coordinates[0]
                            }}/>
                        );
                    })
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
})

export default Map;
