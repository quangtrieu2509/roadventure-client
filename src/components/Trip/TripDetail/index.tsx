import { Modal, Skeleton } from "antd";
import { useEffect, useMemo, useState } from "react";
import "./index.style.scss"
import { IInteract, ITripOverview, initInteract } from "../TripOverview";
import TripHeader from "../TripOverview/TripHeader";
import { CalendarOutlined, CommentOutlined, EnvironmentOutlined, HeartFilled, HeartOutlined, LikeFilled, LikeOutlined, SendOutlined } from "@ant-design/icons";
import { apiCaller } from "../../../api";
import { tripApi } from "../../../api/trip";
import { IMAGE_PATH, ROUTES, interactTypes } from "../../../constants";
import TextArea from "antd/es/input/TextArea";
import { getLocalStorage } from "../../../utils/Auth";
import { useNavigate } from "react-router-dom";
import { GeolocateControl, Map, MapRef, Marker, NavigationControl, Popup } from "react-map-gl";
import { MAPBOX_API_KEY } from "../../../configs";
import Pin from "../../../utils/Pin";
import { setMapBounds } from "../../../utils/Trip";
import { useDispatch, useSelector } from "react-redux";
import { getState, setDestHoverInfo } from "../../../redux/Trip";

type Props = {
  isOpen?: boolean
  tripOverview: ITripOverview
  onChangeState: (newState: boolean) => void
  updateInteract?: (interact: IInteract) => void
};

export interface ITripDetail {
  id: string
  ownerId: string
  interact: {
    liked: boolean
    saved: boolean
    likes: number
    comments: number
  }
  createdAt: Date
  title: string
  description: string
  destinations: Array<{
    text: string
    placeName: string
    coordinates: number[]
    description: string
  }>
  privacy: string
  isOwner: boolean
  date?: Date[]
}

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
  const [trip, setTrip] = useState<ITripDetail | null>(null)
  const [interact, setInteract] = useState<IInteract>(initInteract)
  const [comment, setComment] = useState<string>("")
  const [comments, setComments] = useState<Comment[]>([])
  const [mapRef, setMapRef] = useState<MapRef|null>(null)
  const { destHoverInfo }= useSelector(getState)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    setTrip({ ...props.tripOverview, ownerId: "",destinations: [] })
    setInteract(props.tripOverview.interact)
  }, [])

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

  const pins = useMemo(
    () =>
      trip?.destinations.map((dest, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={dest.coordinates[0]}
          latitude={dest.coordinates[1]}
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation()
            dispatch(setDestHoverInfo(dest))
          }}
        >
          <Pin/>
        </Marker>
      )),
    [trip]
  )

  useEffect(() => {
    if (trip !== null && trip.destinations.length) {
      setMapBounds(mapRef, trip.destinations.map((dest) => dest.coordinates))
    }
  }, [trip])

  console.log("this is trip: ", trip)

  return (
    <div>
      <Modal
        className="trip-detail"
        open={props.isOpen}
        onCancel={()=>{props.onChangeState(false)}}
        title={`${props.tripOverview.owner.givenName}'s Trip`}
        width={"80%"}
        centered
        footer={false}
      >
        <div className="flex h-full" >
          <div className="w-[55%] pr-2 overflow-y-scroll overflow-x-hidden">
            <TripHeader 
              trip={props.tripOverview} 
              isOwner={props.tripOverview.isOwner}
            />
            <div className="trip-content">
            {
              !trip
              ? <Skeleton active paragraph={{ rows: 2 }}/>
              : <div>
                <div className="text-base font-semibold mb-0.5">
                  {trip.title}
                </div>
                <div className={trip.date?.length ? "mb-0.5" : "hidden"}>
                  <CalendarOutlined/>
                  <span className="ml-1.5">
                    {trip.date ? `${trip.date[0]} - ${trip.date[1]}` : ""}
                  </span>
                </div>
                <div className="mb-1.5">
                  {trip.description}
                </div>
                <div className={`${trip.destinations.length ? "mb-0.5" : "hidden"}`}>
                  <p className=" font-semibold underline">Destinations</p>
                  <div className="mt-1">
                    {
                      trip.destinations.map((des, index) => {
                        return (
                          <div key={index}  className="flex">
                            <div className="flex flex-col items-center text-xs">
                              <div className=" h-5 w-5 pt-0.5 font-semibold bg-black rounded-full text-white text-center flex items-center justify-center">
                                {index + 1}
                              </div>
                              <div className="h-full w-0 my-1 border-dotted border-0 border-r-[3px] border-dividerFill"></div>
                            </div>
                            <div className="w-full ml-4 mb-3">
                              <div className="pb-2">
                                <div className=" font-semibold">{des.text}</div>
                                <div className="text-xs"><EnvironmentOutlined className="mr-1.5"/>{des.placeName}</div>
                              </div>
                              <div>
                                {des.description}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                    <div className="text-xs font-semibold w-fit border-solid border-2 border-black rounded-full px-2 py-0.5">End</div>
                  </div>
                </div>
              </div>
            }
            </div>
            <div className="trip-footer">
              <div className={!trip ? "hidden" : "py-1 mt-3.5 text-xs text-extraText"}>
                <span className={interact.likes === 0 ? "hidden" : "mr-4"}>
                  {`${interact.likes} likes`}
                </span>
                <span className={interact.comments === 0 ? "hidden" : "mr-4"}>
                  {`${interact.comments} comments`}
                </span>
              </div>
              <div className="h-[1px] bg-dividerFill"/>
              <div className={`flex py-1 justify-between ${!trip ? "pointer-events-none" : ""}`}>
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
          <div className="w-[45%]">
            {
              props.isOpen
              ? <Map
                mapboxAccessToken={MAPBOX_API_KEY}
                initialViewState={{
                  longitude: 105.853333,
                  latitude: 21.028333,
                  zoom: 8
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                attributionControl={false}
                ref={setMapRef}
              >

                <NavigationControl position="bottom-right"/>
                <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={true}
                  position="bottom-right"
                />

                {pins}

                {destHoverInfo.info && (
                  <Popup
                    anchor="top"
                    longitude={destHoverInfo.info.coordinates[0]}
                    latitude={destHoverInfo.info.coordinates[1]}
                    onClose={
                      () => dispatch(setDestHoverInfo(null))
                    }
                    style={{ fontFamily: "Poppins" }}
                  >
                    <div className=" text-sm font-semibold my-1">{destHoverInfo.info.text}</div>
                    <div className="mb-2">{destHoverInfo.info.placeName}</div>
                  </Popup>
                )}  
              </Map>
              : <></>
            }

          </div>
        </div>
      </Modal>
    </div>
  )
}