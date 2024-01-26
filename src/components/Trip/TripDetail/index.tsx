import { DatePicker, Modal, Skeleton } from "antd";
import {
  GoogleMap
} from "@react-google-maps/api";
import GoogleWrapper from "../../GoogleMap";
import { useEffect, useMemo, useState } from "react";
import "./index.style.scss"
import { IInteract, ITripOverview, initInteract } from "../TripOverview";
import TripHeader from "../TripOverview/TripHeader";
import { CalendarOutlined, CommentOutlined, HeartFilled, HeartOutlined, LikeFilled, LikeOutlined, SendOutlined } from "@ant-design/icons";
import { apiCaller } from "../../../api";
import { tripApi } from "../../../api/trip";
import { IMAGE_PATH, ROUTES, interactTypes } from "../../../constants";
import TextArea from "antd/es/input/TextArea";
import { getLocalStorage } from "../../../utils/Auth";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  isOpen?: boolean
  onChangeState: (newState: boolean) => void
  tripOverview: ITripOverview
  updateInteract?: (interact: IInteract) => void
};

interface Comment {
  user: {
    id: string
    givenName: string
    familyName: string
    username: string
    picture: string
  }
  content: string
  createdAt: Date
}


export default function TripDetail(props: Props) {
  const [trip, setTrip] = useState<ITripOverview | null>(null)
  const [interact, setInteract] = useState<IInteract>(initInteract)
  const [comment, setComment] = useState<string>("")
  const [comments, setComments] = useState<Comment[]>([])

  const navigate = useNavigate()

  const handleComment = async () => {
    await apiCaller(
      tripApi.interactTrip(
        props.tripOverview.id as string,
        interactTypes.COMMENT,
        true, comment.trim()
      )
    )
    const storage = getLocalStorage("id", "givenName", "familyName", "username", "picture")

    const newComment = {
      user: storage,
      content: comment.trim(),
      createdAt: new Date()
    }

    setComments([...comments, newComment])
    setComment("")

    const newInteract = { ...interact, comments: interact.comments + 1 }
    setInteract(newInteract)
    if (props.updateInteract) {
      props.updateInteract(newInteract)
    } 
  }

  
  const handleLike = async () => {
    const { liked, likes } = interact
    await apiCaller(
      tripApi.interactTrip(
        props.tripOverview.id as string,
        interactTypes.LIKE,
        !liked
      )
    )

    let newInteract: IInteract
    interact.liked
    ? newInteract = { ...interact, liked: !liked, likes: likes - 1 }
    : newInteract = { ...interact, liked: !liked, likes: likes + 1 }

    setInteract(newInteract)
    if (props.updateInteract) {
      props.updateInteract(newInteract)
    } 
  }
  const handleSave = async () => {
    const { saved } = interact
    await apiCaller(
      tripApi.interactTrip(
        props.tripOverview.id as string,
        interactTypes.SAVE,
        !saved
      )
    )

    setInteract({ ...interact, saved: !saved })
    if (props.updateInteract) {
      props.updateInteract({ ...interact, saved: !saved })
    } 
  }

  useEffect(() => {
    setTrip(props.tripOverview)
    setInteract(props.tripOverview.interact)
  }, [props.tripOverview])

  const getTripDetail = async () => {
    const res = await apiCaller(
      tripApi.getTripDetail(props.tripOverview.id)
    )

    if (res !== null) {
      console.log({ ...trip, ...res.data })
      setTrip({ ...trip, ...res.data })
      setComments(res.data.comments)
    }
  }

  useEffect(() => {
    if (props.isOpen) getTripDetail()
  }, [props.isOpen])

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 43.45, lng: -80.49 }),
    []
  );
  return (
    <div>
      <Modal
        className="trip-detail"
        open={props.isOpen}
      // onOk={handleOk}
        onCancel={()=>{props.onChangeState(false)}}
        title={`${trip?.owner.givenName}'s Trip`}
        width={"80%"}
        centered
        footer={false}
      >
        <div className="flex h-full" >
          <div className="w-7/12 pr-2 overflow-y-scroll overflow-x-hidden">
            <TripHeader trip={trip} isOwner={trip?.isOwner}/>
            <div className="trip-content">
            {
              !trip
              ? <Skeleton active paragraph={{ rows: 2 }}/>
              : <div>
                <div className="text-base font-semibold">
                  {trip.title}
                </div>
                <div className={trip.date ? "hidden" : ""}>
                  <CalendarOutlined/>
                  <span className="ml-1.5">{trip.createdAt.toString()}</span>
                </div>
                <div>
                  {trip.description}
                </div>
              </div>
            }
            </div>
            <div className="trip-footer">
              <div className={!trip ? "hidden" : "py-1 mt-3.5 text-xs text-extraText"}>
                <span className={trip?.interact.likes === 0 ? "hidden" : "mr-4"}>
                  {`${trip?.interact.likes} likes`}
                </span>
                <span className={trip?.interact.comments === 0 ? "hidden" : "mr-4"}>
                  {`${trip?.interact.comments} comments`}
                </span>
              </div>
              <div className="h-[1px] bg-dividerFill"/>
              <div className={`flex py-1 justify-between ${!trip ? "pointer-events-none" : ""}`}>
                <div 
                  className={trip?.interact.liked ? "active-interact-btn" : "interact-btn"}
                  onClick={handleLike}
                >
                  {trip?.interact.liked ? <LikeFilled/> : <LikeOutlined/>}
                  <span className="ml-1.5">
                    Like
                  </span>
                </div>
                <div 
                  className="interact-btn mx-1"
                >
                  <CommentOutlined/>
                  <span className="ml-1.5">
                    Comment
                  </span>
                </div>
                <div 
                  className={trip?.interact.saved ? "active-interact-btn" : "interact-btn"}
                  onClick={handleSave}
                >
                  {trip?.interact.saved ? <HeartFilled/> : <HeartOutlined/>}
                  <span className="ml-1.5">
                    Save
                  </span>
                </div>
              </div>
              <div className="h-[1px] bg-dividerFill"/>
            </div>
            <div className="comment-section">
              <div className="flex items-center py-1 mt-1.5 mb-5">
                <div className="h-8 max-w-[2rem] mr-2.5">
                  <img alt="#" src={getLocalStorage("picture").picture} 
                    className="image h-full rounded-full" 
                  />
                </div>
                <TextArea
                  className="my-1"
                  placeholder="Leave a comment..."
                  autoSize={{ maxRows: 4 }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div 
                  className={`h-8 w-8 text-xl pl-2 py-1 ${comment.trim() === "" ? "cursor-not-allowed" : "cursor-pointer hover:text-main"}`}
                  onClick={handleComment}
                >
                  <SendOutlined/>
                </div>
              </div>
              {
                comments.map((value, index) => {
                  return (
                    <div key={index} className="flex mb-5">
                      <div className="h-8 max-w-[2rem] mr-2.5">
                        <img alt="#" src={value.user.picture ?? IMAGE_PATH.DEFAULT_AVATAR} 
                          className="image h-full rounded-full cursor-pointer" 
                          onClick={
                            () => navigate(
                              ROUTES.PROFILE_BASE + value.user.username
                            )
                          }
                        />
                      </div>
                      <div>
                        <div className=" text-xs">
                          <span className="font-semibold cursor-pointer"
                            onClick={
                              () => navigate(
                                ROUTES.PROFILE_BASE + value.user.username
                              )
                            }
                          >
                            {`${value.user.familyName} ${value.user.givenName}`}
                          </span>
                          <span className=" ml-2">{value.createdAt.toString()}</span>
                        </div>
                        <div>
                          {value.content}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div>
            <GoogleWrapper>
              <div className=" bg-extra-text">
                Content
              </div>
            </GoogleWrapper>
          </div>
        </div>
      </Modal>
    </div>
  )
}