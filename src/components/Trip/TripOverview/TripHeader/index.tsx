import { Dropdown, Skeleton } from "antd"
import { ITripOverview } from ".."
import { IMAGE_PATH, ROUTES } from "../../../../constants"
import { privacies, privacyIcons } from "../../../../constants/privacies"
import { EllipsisOutlined } from "@ant-design/icons"
import { actions, ownerActions } from "../../actionLists"
import { useNavigate } from "react-router-dom"

export default function TripHeader(
  props: {
    trip: ITripOverview | null
    isOwner?: boolean
  } = { trip: null, isOwner: false }
) {
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate(ROUTES.PROFILE_BASE + props.trip?.owner.username)
  }

  return (
    <div className="trip-header h-10 flex mb-3.5">
      <div className="h-10 max-w-[2.5rem] mr-3">
        {
        // (!props.trip || 1) ?
        !props.trip ?
          <Skeleton.Avatar active style={{ height: "2.5rem", width: "2.5rem", verticalAlign: "baseline" }}/> :
          <img alt="#" src={props.trip.owner.picture ?? IMAGE_PATH.DEFAULT_AVATAR} 
            className="image h-full rounded-full cursor-pointer" 
            onClick={goToProfile}
          />
        }
      </div>
      {
        // (!props.trip || 1) ?
        !props.trip
        ? <div className="w-full flex items-center">
          <Skeleton.Input active/>
        </div>
        : <div className=" flex flex-col justify-between w-full">
          <div className=" font-semibold cursor-pointer"
            onClick={goToProfile}
          >
            {`${props.trip.owner.familyName} ${props.trip.owner.givenName}`}
          </div>
          <div className="flex items-center text-xs text-extraText h-4">
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
  )
}