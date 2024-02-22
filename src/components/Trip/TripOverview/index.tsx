import { Skeleton } from "antd"

import "../index.style.scss"
import { useEffect, useState } from "react"
import TripDetail, { ITripDetail } from "../TripDetail"
import TripHeader from "./TripHeader"
import { CalendarOutlined, CommentOutlined, HeartFilled, HeartOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons"
import { apiCaller } from "../../../api"
import { tripApi } from "../../../api/trip"
import { interactTypes } from "../../../constants"
import { Map, type MapRef, Marker } from "react-map-gl"
import { MAPBOX_API_KEY } from "../../../configs"
import Pin from "../../../utils/Pin"
import { setMapBounds } from "../../../utils/Trip"

export interface ITripOverview {
  id: string
  owner: {
    id: string
    givenName: string
    familyName: string
    username: string
    picture: string
  }
  interact: {
    liked: boolean
    saved: boolean
    likes: number
    comments: number
  }
  createdAt: Date
  title: string
  description: string
  destinations: Array<[number, number]>
  privacy: string
  isOwner: boolean
  date?: Date[]
}

export interface IInteract {
  liked: boolean
  likes: number
  saved: boolean
  comments: number
}
export const initInteract = {
  liked: false,
  likes: 0,
  saved: false,
  comments: 0
}

export default function TripOverview(
  props: {
    trip: ITripDetail | null
  } = { trip: null }
) {
  const [tripDetail, setTripDetail] = useState<boolean>(false)
  const [interact, setInteract] = useState<IInteract>(initInteract)
  const [mapRef, setMapRef] = useState<MapRef|null>(null)

  const handleComment = () => {
    setTripDetail(true)
  }

  
  const handleLike = async () => {
    const { liked, likes } = interact
    await apiCaller(
      tripApi.interactTrip(
        props.trip?.id as string,
        interactTypes.LIKE,
        !liked,
      )
    )

    liked
    ? setInteract({ ...interact, liked: !liked, likes: likes - 1 })
    : setInteract({ ...interact, liked: !liked, likes: likes + 1 })
  }
  const handleSave = async () => {
    const { saved } = interact
    await apiCaller(
      tripApi.interactTrip(
        props.trip?.id as string,
        interactTypes.SAVE,
        !saved,
      )
    )

    setInteract({ ...interact, saved: !saved })
  }

  useEffect(() => {
    if (props.trip) {
      setInteract(props.trip.interact)
      console.log(props.trip)
    }
  }, [props.trip])

  useEffect(() => {
    if (props.trip && props.trip.destinations.length) {
      setMapBounds(mapRef, props.trip.destinations.map((e) => e.coordinates))
    }
  }, [mapRef, props.trip])

  return (
    <div className="rounded-md px-6 pt-3.5 bg-white mb-4">
      {
        !props.trip
        ? <>
          <TripHeader 
            owner={null} 
            privacy=""
            createdAt={new Date()}
            isOwner={false}
          />
          <div className="trip-content">
            <Skeleton active paragraph={{ rows: 2 }}/>
          </div>
        </>
        : <>
          <TripHeader 
            owner={props.trip.owner} 
            privacy={props.trip.privacy}
            isOwner={props.trip.isOwner}
            createdAt={props.trip.createdAt}
          />
          <div className="trip-content">
            <div>
              <div className="text-base font-semibold cursor-pointer hover:underline mb-0.5" onClick={() => setTripDetail(true)}>
                {props.trip.title}
              </div>
              {
                props.trip.date !== undefined 
                && props.trip.date[0] !== undefined
                ? <div className="mb-0.5">
                    <CalendarOutlined/>
                    <span className="ml-1.5">
                      {`${(new Date(props.trip.date[0])).toLocaleDateString()} - ${(new Date(props.trip.date[1])).toLocaleDateString()}`}
                    </span>
                  </div>
                : <></>
              }
              <div className="mb-1.5">{props.trip.description}</div>
              <div className={`${props.trip.destinations.length ? "h-80 w-full cursor-pointer" : "hidden"}`}
                onClick={() => setTripDetail(true)}
              >
                <Map
                  mapboxAccessToken={MAPBOX_API_KEY}
                  initialViewState={{
                    longitude: 105.853333,
                    latitude: 21.028333,
                    zoom: 8
                  }}
                  style={{ width: "100%", height: "100%" }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  attributionControl={false}
                  interactive={false}
                  ref={setMapRef}
                >
                  {
                    props.trip.destinations.map((dest, index) => (
                      <Marker
                        key={`marker-${index}`}
                        longitude={dest.coordinates[0]}
                        latitude={dest.coordinates[1]}
                      >
                        <Pin/>
                      </Marker>
                    ))
                  }
                </Map>
              </div>
              <TripDetail 
                isOpen={tripDetail} 
                onChangeState={(value) => setTripDetail(value)}
                tripOverview={
                  {
                    ...props.trip, 
                    interact
                  }
                }
                updateInteract={(value) => setInteract(value)}
              />
            </div>
          </div>
        </>
      }
      
      <div className="trip-footer">
        {
          props.trip
          && <div className="py-1 mt-1.5 text-xs text-extraText">
            <span className={interact.likes === 0 ? "hidden" : "mr-4"}>
              {`${interact.likes} likes`}
            </span>
            <span className={interact.comments === 0 ? "hidden" : "mr-4"}>
              {`${interact.comments} comments`}
            </span>
          </div>
        }
        <div className="h-[1px] bg-dividerFill"/>
        <div className={`flex py-1 justify-between ${!props.trip ? "pointer-events-none" : ""}`}>
          <div
            className={interact.liked ? "active-interact-btn" : "interact-btn"}
            onClick={handleLike}
          >
            {
              interact.liked ? <LikeFilled/> : <LikeOutlined/>
            }
            <span className="ml-1.5">
              Like
            </span>
          </div>
          <div 
            className="interact-btn mx-1"
            onClick={handleComment}
          >
            <CommentOutlined/>
            <span className="ml-1.5">
              Comment
            </span>
          </div>
          <div 
            className={interact.saved ? "active-interact-btn" : "interact-btn"}
            onClick={handleSave}
          >
            {
              interact.saved ? <HeartFilled/> : <HeartOutlined/>
            }
            <span className="ml-1.5">
              Save
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}