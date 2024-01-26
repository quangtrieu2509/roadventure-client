import { Skeleton } from "antd"

import "../index.style.scss"
import { useEffect, useState } from "react"
import TripDetail from "../TripDetail"
import TripHeader from "./TripHeader"
import { CommentOutlined, HeartFilled, HeartOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons"
import { apiCaller } from "../../../api"
import { tripApi } from "../../../api/trip"
import { interactTypes } from "../../../constants"

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
  points: string
  privacy: string
  isOwner: boolean
  date?: Date
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
    trip: ITripOverview | null
  } = { trip: null }
) {
  const [tripDetail, setTripDetail] = useState<boolean>(false)
  const [interact, setInteract] = useState<IInteract>(initInteract)

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

    interact.liked
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
    }
  }, [props.trip])

  return (
    <div className="rounded-md px-6 pt-3.5 bg-white mb-4">
      <TripHeader 
        trip={props.trip} 
        isOwner={props.trip ? props.trip.isOwner : false}
      />
      <div className="trip-content">
        {
          !props.trip
          ? <Skeleton active paragraph={{ rows: 2 }}/>
          : <div>
            <div className="text-base font-semibold cursor-pointer hover:underline" onClick={() => setTripDetail(true)}>
              {props.trip.title}
            </div>
            <div>
              {props.trip.description}
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
        }
      </div>
      <div className="trip-footer">
        <div className={!props.trip ? "hidden" : "py-1 mt-3.5 text-xs text-extraText"}>
          <span className={interact.likes === 0 ? "hidden" : "mr-4"}>
            {`${interact.likes} likes`}
          </span>
          <span className={interact.comments === 0 ? "hidden" : "mr-4"}>
            {`${interact.comments} comments`}
          </span>
        </div>
        <div className="h-[1px] bg-dividerFill"/>
        <div className={`flex py-1 justify-between ${!props.trip ? "pointer-events-none" : ""}`}>
          <div
            className={interact.liked ? "active-interact-btn" : "interact-btn"}
            onClick={handleLike}
          >
            {interact.liked ? <LikeFilled/> : <LikeOutlined/>}
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
            {interact.saved ? <HeartFilled/> : <HeartOutlined/>}
            <span className="ml-1.5">
              Save
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}