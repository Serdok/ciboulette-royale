import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Checkbox, Divider, IconButton, Menu, RadioButton } from "react-native-paper";
import { THEMES } from "../THEMES";

export default function MapControl({ mapType, setMapType, addFilter, removeFilter }) {
    const [surfaceVisible, setSurfaceVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    const [status, setStatus] = useState(() => Array(THEMES.length).fill('unchecked'))

    const openSurfaceMenu = () => setSurfaceVisible(true);
    const closeSurfaceMenu = () => setSurfaceVisible(false);
    const openFilterMenu = () => setFilterVisible(true);
    const closeFilterMenu = () => setFilterVisible(false);

    function renderSurfaceControl() {
        return (
            <>
                <Menu visible={surfaceVisible}
                      anchor={<IconButton onPress={openSurfaceMenu} icon={'layers'}/>}
                      onDismiss={closeSurfaceMenu}
                >
                    <RadioButton.Group onValueChange={val => setMapType(val)} value={mapType}>
                        <View>
                            <RadioButton.Item label={'Plan'} value={'standard'}/>
                        </View>
                        <View>
                            <RadioButton.Item label={'Satellite'} value={'hybrid'}/>
                        </View>
                    </RadioButton.Group>
                </Menu>
            </>
        );
    }

    function renderCheckboxes() {
        return THEMES.map(theme => {
            return (
                <>
                    <Checkbox.Item key={theme.id}
                                   label={theme.name}
                                   status={status[theme.id]}
                                   onPress={() => setStatus(prev => {
                                       const next = Array.from(prev);
                                       const status = (next[theme.id] === 'checked' ? 'unchecked' : 'checked')
                                       next[theme.id] = status;
                                       status === 'checked' ? addFilter(theme.name) : removeFilter(theme.name)
                                       return next;
                                   })}
                    />
                </>
            );
        });
    }

    function renderFilterControl() {
        return (
            <>
                <Menu visible={filterVisible}
                      anchor={<IconButton onPress={openFilterMenu} icon={'filter'}/>}
                      onDismiss={closeFilterMenu}
                >
                    {renderCheckboxes()}
                </Menu>
            </>
        );
    }

    return (
        <>
            <View style={styles.overlayContainer}>
                {renderSurfaceControl()}
                {renderFilterControl()}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        position: "absolute",
        right: 0,
        backgroundColor: 'white',
        opacity: 0.90,
    },
})
