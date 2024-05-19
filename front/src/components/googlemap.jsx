import React, { useEffect, useState } from "react";
/* global google */

const Map = (props) => {
    // Initialize and add the map
    let map;

    async function initMap() {
        const position = { lat: props.location.ltd, lng: props.location.lng };
        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

        // The map, centered at Uluru
        map = new Map(document.getElementById("map"), {
            zoom: 16,
            center: position,
            mapId: "ce392e83585acbc6",
        });

        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerView({
            map: map,
            position: position,
            title: "Uluru",
        });
    }
    initMap()

    return (
        <div className="mimapa">


        </div>
    )
}

export default Map;