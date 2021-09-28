import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import MapView from "react-native-map-clustering";
import MapControl from "./native/control";

import { getDetailsForLyon } from "../../services/lyon";
import Feature from "./native/feature";
import { THEMES } from "./THEMES";


const ASPECT_RATIO = Dimensions.get('window').width / Dimensions.get('window').height;
const LATITUDE_DELTA = 0.051;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Map({ route }) {
    const [features, setFeatures] = useState(null);
    const [themes, setThemes] = useState(() => new Set());
    const [mapType, setMapType] = useState('standard');

    useEffect(() => {
        (async () => {
            // Get city from routing
            const { city } = route.params;
            switch (city.toLowerCase()) {
                case "lyon":
                    const result = await getDetailsForLyon();
                    setFeatures(result.features);
                    break;
            }
        })();
    }, []);

    const addTheme = theme => setThemes(prev => new Set(prev).add(theme))
    const removeTheme = theme => setThemes(prev => {
        const next = new Set(prev);
        next.delete(theme);
        return next;
    });

    function renderFeatures() {
        if (!features) {
            return null;
        }

        return THEMES.map(theme => {
            if (!themes.has(theme.name)) {
                return null;
            }

            const filtered = features.filter(feature => feature.properties.theme.includes(theme.name));
            return (
                <>
                    <Feature features={filtered} theme={theme.name}/>
                </>
            );
        })
    }

    return (
        <>
            <MapView style={styles.map}
                     initialRegion={{
                         longitude: 4.8319618433010785,
                         latitude: 45.75790021711596,
                         longitudeDelta: LONGITUDE_DELTA,
                         latitudeDelta: LATITUDE_DELTA
                     }}
                     mapType={mapType}
                     loadingEnabled
                     showsUserLocation
                     showsMyLocationButton
                     followsUserLocation
                     showsIndoorLevelPicker
                     provider={PROVIDER_GOOGLE}
            >
                { renderFeatures() }
            </MapView>
            <MapControl mapType={mapType} setMapType={setMapType}
                        addFilter={addTheme} removeFilter={removeTheme}
            />
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    },
})

export default Map;
