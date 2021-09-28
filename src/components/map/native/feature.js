import React from 'react';
import MapMarker from "./marker";
import MapPopup from "./popup";

export default function Feature({ features, theme }) {
    function renderFeatures(features) {
        return features.map(feature => (
            <>
                <MapMarker id={feature.properties.id}
                           coordinates={feature.geometry.coordinates}
                           theme={theme}
                           key={`marker_${feature.properties.id}`}>
                    <MapPopup name={feature.properties.nom}
                              address={feature.properties.address}
                              contact={feature.properties.contact?.[0]}
                              image={feature.properties.illustrations?.[0]?.urlFiche}
                              key={`popup_${feature.properties.id}`}
                    />
                </MapMarker>
            </>
        ));
    }

    return (
        <>
            { renderFeatures(features) }
        </>
    );
}
