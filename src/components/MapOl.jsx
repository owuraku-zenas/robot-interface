

import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Image, Layer } from 'ol/layer';
import { ImageWMS, Vector } from 'ol/source'
import OSM from 'ol/source/OSM';
import OSMXML from 'ol/format/OSMXML'

import 'ol/ol.css';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

function MapOl() {

    const [map, setMap] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    useEffect(() => {
        const initialMap = new Map('map_canvas',{
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                // new Layer("", { isBaseLayer: true }),
                // new Layer("EmptyLayer", { isBaseLayer: true, visibility: true, transparent: true, displayInLayerSwitcherBase: true }),
                // new VectorLayer({
                //     source: new VectorSource({
                //         format: new OSMXML(),
                //         url: '../maps/legon.osm',
                //         // projection: 'EPSG:4326'
                //     })
                // })
            ],
            view: new View({
                center: [5.6506, 0.1871],
                zoom: 10,
            }),
        });

        // const layer = new VectorLayer({
        //     source: new VectorSource({
        //         format: new OSMXML(),
        //         url: '../maps/legon.osm',
        //         // projection: 'EPSG:4326'
        //     })
        // })

        // initialMap.addLayer(layer)
        setMap(initialMap);
    }, []);

    return (
        <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container" />
    );
}

export default MapOl;