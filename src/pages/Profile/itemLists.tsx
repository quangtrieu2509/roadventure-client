import { ExclamationCircleOutlined, HeartOutlined, PictureOutlined, SettingOutlined, StopOutlined, UserOutlined } from "@ant-design/icons"
import Label from "../../components/Label"
import Activities from "./Activities"
import Media from "./Media"
import Trips from "./Trips"
import Reviews from "./Reviews"
import Empty from "./Empty"
import { Skeleton } from "antd"
import Saved from "./Saved"

export const profileTabItems = [
  {
    label: "Activities",
    key: "1",
    children: <Activities/>,
  },
  {
    label: "Trips",
    key: "2",
    children: <Trips/>,
  },
  {
    label: "Reviews",
    key: "3",
    children: <Reviews/>,
  },
  {
    label: "Media",
    key: "4",
    children: <Media/>,
  },
  {
    label: "Travel Map",
    key: "5",
    children: "Content of Travel Map",
  }
]

export const ownerTabItems = [
  {
    label: "Activities",
    key: "1",
    children: <Activities/>,
  },
  {
    label: "Trips",
    key: "2",
    children: <Trips/>,
  },
  {
    label: "Reviews",
    key: "3",
    children: <Reviews/>,
  },
  {
    label: "Media",
    key: "4",
    children: <Media/>,
  },
  {
    label: "Saved",
    key: "5",
    children: <Saved/>,
  },
  {
    label: "Travel Map",
    key: "6",
    children: "Content of Travel Map",
  }
]

const titleStyle = {
  width: "4rem"
}
export const loadingTabItems = [
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "1",
    children: <Empty/>,
  },
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "2",
    children: <Empty/>,
  },
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "3",
    children: <Empty/>,
  },
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "4",
    children: <Empty/>,
  },
  {
    label: 
      <div className="loading-profile-tab">
        <Skeleton paragraph={false} active title={titleStyle}/>
      </div>,
    key: "5",
    children: <Empty/>,
  }
]

export const profileActions = [
  {
    key: "1",
    label: <Label title="Report profile" icon={<ExclamationCircleOutlined/>}/>,
  },
  {
    key: "2",
    label: <Label title="Block" icon={<StopOutlined/>}/>,
  }
]

export const settingActions = [
  {
    key: "1",
    label: <Label title="Edit your profile" icon={<UserOutlined/>}/>,
  },
  {
    key: "2",
    label: <Label title="Edit profile picture" icon={<PictureOutlined/>}/>,
  },
  {
    key: "3",
    label: <Label title="Settings" icon={<SettingOutlined/>}/>,
  }
]
