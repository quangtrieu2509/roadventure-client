import { useDispatch } from "react-redux"
import "./index.style.scss"
import { setIsAtHome } from "../../redux/Header"
import { useEffect } from "react"
import { ArrowRightOutlined } from "@ant-design/icons"
import Map, { type FillLayer, GeolocateControl, NavigationControl, Layer, Marker, type CircleLayer, Source } from 'react-map-gl'
import { MAPBOX_API_KEY } from "../../configs"
import { type FeatureCollection } from "geojson"
import GeocoderControl from "../../components/GeocoderControl"


const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature',"properties": {}, geometry: { type: 'Point', coordinates: [-122.4, 37.8] } }
  ]
};

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': 'red'
  }
};

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsAtHome(true))
    console.log("set")

    return () => {
      dispatch(setIsAtHome(false))
      console.log("remove")
    }
  }, [])

  const parkLayer: FillLayer = {
    id: 'landuse_park',
    type: 'fill',
    source: 'mapbox',
    'source-layer': 'landuse',
    filter: ['==', 'class', 'park'],
    paint: {
      'fill-color': '#4E3FC8'
    }
  };

  return (
    <div className="rv-page">
      <div className="rv-wrapper flex flex-col items-center">
        <h1 className="text-[3.5rem] mb-0 text-center">Where to?</h1>
        <div className="search-box-main flex justify-between h-fit m-6 p-1 w-[40em] border-solid border-2 rounded-full border-boxBorder">
          <input
            className="h-8 w-full p-2 pl-6 text-base border-none rounded-full focus:outline-none"
            style={{ fontFamily: "Poppins" }}
            placeholder="Places you want to go..."
          ></input>
          <span className="flex items-center font-semibold text-base border-solid border border-main text-main no-underline px-5 py-2.5 rounded-full bg-white hover:bg-buttonHover1 active:bg-buttonClick1 cursor-pointer">
            Search
          </span>
        </div>
        <div>
          <span className=" text-extraText">Not sure where to go? </span>
          <span className=" text-main font-semibold cursor-pointer rcm-element">
              Check out some fantastic trips
              <span className=" text-lg align-middle smooth-trans ml-1">
                <ArrowRightOutlined/>
              </span>
            </span>
        </div>

        <Map
          mapboxAccessToken={MAPBOX_API_KEY}
          initialViewState={{
            longitude: 105.853333,
            latitude: 21.028333,
            zoom: 8
          }}
          style={{ width: "100%", height: "600px" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          attributionControl={false}
          // onClick={(event) => console.log(event) }
        > 
        
        <NavigationControl position="bottom-right"/>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          position="bottom-right"
        />
        <Layer {...parkLayer} />
        <Marker longitude={105} latitude={21} style={{cursor: "pointer"}} onClick={(evt) => console.log(evt)}>
        </Marker>
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        <GeocoderControl mapboxAccessToken={MAPBOX_API_KEY} position="top-left" />
              
        </Map>
      </div>
    </div>
  )
}
