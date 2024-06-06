import React from "react";
/* global google */

const MapComponent = (props) => {
    let map;

    async function initMap() {
        const position = { lat: props.location.ltd, lng: props.location.lng };
        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

        map = new Map(document.getElementById("map"), {
            zoom: 16,
            center: position,
            mapId: "ce392e83585acbc6",  //el ID del mapa personalizado.
        });

        const marker = new AdvancedMarkerView({
            map: map,
            position: position,
            title: "My map",
        });

        console.log('position: ', position)
    }
    initMap()

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div id="map" style={{ width: '100%', height: '100%', borderRadius: '10px'}}></div>
        </div>
    )
}

export default MapComponent;