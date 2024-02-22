import { Dropdown, Skeleton } from "antd"

import "../index.style.scss"
import { IMAGE_PATH, } from "../../../constants"
import { CalendarOutlined, EllipsisOutlined, MinusCircleOutlined } from "@ant-design/icons"
import Label from "../../Label"

export interface ISavedTrip {
  id: string
  owner: {
    id: string
    givenName: string
    familyName: string
    username: string
    picture: string
  }
  createdAt: Date
  title: string
  description: string
  points: string
  date?: Date[]
}

export default function SavedTrip(
  props: {
    trip: ISavedTrip | null
    onHandleUnsave: () => Promise<void>
  }
) {

  const action = [
    {
      key: "1",
      label: 
        <Label 
          title="Unsave" 
          icon={<MinusCircleOutlined/>}
          event={props.onHandleUnsave}
        />
    }
  ]

  return (
    <div className="rounded-md px-6 py-3.5 bg-white mb-4">
      <div className="trip-content">
        {
          !props.trip
          ? <div className="flex">
            <Skeleton.Image active style={{ height: "7rem", width: "7rem", verticalAlign: "baseline" }}/>
            <Skeleton className=" ml-4" active paragraph={{ rows: 2 }}/>
          </div> 
          
          : <div className="flex items-center">
            <div className="min-w-[7rem] h-28">
              <img alt="#" src={IMAGE_PATH.DEFAULT_AVATAR} className="image bg-black h-full w-full rounded-md" />
            </div>
            <div className="ml-4 flex flex-col justify-between w-full">
              <div>
                <div className="w-full flex justify-between">
                  <div className="text-xl font-semibold cursor-pointer hover:underline mb-1">
                    {props.trip.title}
                  </div>
                  <Dropdown
                    menu={{ items: action }}
                    trigger={["click"]}
                    onOpenChange={() => {}}
                    >
                      <div className="h-fit text-2xl px-1 rounded-md hover:bg-buttonHover hover:cursor-pointer mb-0.5">
                        <EllipsisOutlined/>
                      </div>
                  </Dropdown>
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
                <div className="mb-0.5">
                  {props.trip.description}
                </div>
              </div>
              <div className="flex items-center my-1">
                <div className="h-7 w-7">
                  <img 
                    alt="#" 
                    src={props.trip.owner.picture ?? IMAGE_PATH.DEFAULT_AVATAR} 
                    className="image h-full w-full rounded-full" 
                  />
                </div>
                <span className="ml-1.5">{`Saved from ${props.trip.owner.givenName}'s trip`}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}