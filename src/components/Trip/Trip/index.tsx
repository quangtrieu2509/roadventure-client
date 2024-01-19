import { Dropdown, Skeleton } from "antd"
import { IMAGE_PATH, interactTypes } from "../../../constants"
import { privacies, privacyIcons } from "../../../constants/privacies"
import { CommentOutlined, EllipsisOutlined, HeartFilled, HeartOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons"

import "../index.style.scss"
import { actions, ownerActions } from "../actionLists"
import { useEffect, useState } from "react"
import { tripApi } from "../../../api/trip"
import { apiCaller } from "../../../api"

interface ITrip {
  id: string
  owner: {
    id: string
    givenName: string
    familyName: string
    username: string
  }
  quantity: {
    likes: number
    comments: number
  }
  interact: {
    liked: boolean
    saved: boolean
  }
  createdAt: Date
  title: string
  description: string
  points: string
  privacy: string
  date?: Date
}

export default function Trip(
  props: {
    trip: ITrip | null
    isOwner?: boolean
  } = { trip: null, isOwner: false },
) {
  const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)
  const [likes, setLikes] = useState<number>(0)

  const handleLike = async () => {
    await apiCaller(
      tripApi.interactTrip(
        props.trip?.id as string,
        interactTypes.LIKE,
        !liked,
      )
    )

    setLiked(!liked)
    liked
    ? setLikes(likes - 1)
    : setLikes(likes + 1)
  }
  const handleSave = async () => {
    await apiCaller(
      tripApi.interactTrip(
        props.trip?.id as string,
        interactTypes.SAVE,
        !saved,
      )
    )

    setSaved(!saved)
  }

  const handleComment = () => {
    alert("just commented!")
  }

  useEffect(() => {
    if (props.trip) {
      setLiked(props.trip.interact.liked)
      setSaved(props.trip.interact.saved)
      setLikes(props.trip.quantity.likes)
    }
    console.log(props.trip)
  }, [props.trip])


  return (
    <div className=" rounded-md px-6 pt-3.5 bg-white mb-4">
      <div className="trip-header h-10 flex mb-3.5">
        <div className="w-10 h-10">
          {
          // (!props.trip || 1) ?
          !props.trip ?
            <Skeleton.Avatar active style={{ height: "2.5rem", width: "2.5rem", verticalAlign: "baseline" }}/> :
            <img alt="#" src={IMAGE_PATH.DEFAULT_AVATAR} className="image h-full w-full rounded-full" />
          }
        </div>
        {
          // (!props.trip || 1) ?
          !props.trip
          ? <div className="ml-3 w-full flex items-center">
            <Skeleton.Input active/>
          </div>
          : <div className=" flex flex-col justify-between ml-3 w-full">
            <div className=" font-semibold">
              {`${props.trip.owner.familyName} ${props.trip.owner.givenName}`}
            </div>
            <div className="flex items-center text-xs text-extraText">
              <span>{props.trip.createdAt.toString()}</span>
              <span className="mx-1.5"> . </span>
              <span>
                {
                  props.trip.privacy === privacies.PUBLIC ?
                  privacyIcons.PUBLIC :
                  privacyIcons.PRIVATE
                }
              </span>
            </div>
          </div>
        }
        {
          !props.trip 
          ? <></>
          : <Dropdown
                menu={{ items: props.isOwner ? ownerActions : actions }}
                trigger={["click"]}
                onOpenChange={() => {}}
                >
                  <div className="h-fit text-2xl px-1 rounded-md hover:bg-buttonHover hover:cursor-pointer">
                    <EllipsisOutlined/>
                  </div>
          </Dropdown>
        }
      </div>
      <div className="trip-content">
        {
          // (!props.trip || 1) ?
          !props.trip
          ? <Skeleton active paragraph={{ rows: 2 }}/>
          : <div>
            <div className=" text-base font-semibold">
              {props.trip.title}
            </div>
            <div>
              {props.trip.description}
            </div>
          </div>
        }
      </div>
      <div className="trip-footer">
        <div className={!props.trip ? "hidden" : "py-1 mt-3.5 text-xs text-extraText"}>
          <span className={likes === 0 ? "hidden" : "mr-5"}>
            {`${likes} likes`}
          </span>
          <span className={props.trip?.quantity.comments === 0 ? "hidden" : "mr-5"}>
            {`${props.trip?.quantity.comments} comments`}
          </span>
        </div>
        <div className="border-solid border-0 border-t-[1px] border-dividerFill"/>
        <div className={`flex py-1 justify-between ${!props.trip ? "pointer-events-none" : ""}`}>
          <div 
            className={liked ? "active-interact-btn" : "interact-btn"}
            onClick={handleLike}
          >
            {liked ? <LikeFilled/> : <LikeOutlined/>}
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
            className={saved ? "active-interact-btn" : "interact-btn"}
            onClick={handleSave}
          >
            {saved ? <HeartFilled/> : <HeartOutlined/>}
            <span className="ml-1.5">
              Save
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}