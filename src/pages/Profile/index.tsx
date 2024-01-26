import "./index.style.scss"

import { Dropdown, Skeleton, Tabs } from "antd"
import { IMAGE_PATH } from "../../constants"
import { BarsOutlined, MessageOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons"
import { loadingTabItems, ownerTabItems, profileActions, profileTabItems, settingActions } from "./itemLists"
import { useEffect, useState } from "react"
import { apiCaller } from "../../api"
import { userApi } from "../../api/user"
import { useParams } from "react-router-dom"
import { getLocalStorage } from "../../utils/Auth"
import TripCreation from "../../components/Trip/TripCreation"

interface IUserProfile {
  id: string
  picture: string
  familyName: string
  givenName: string
  username: string
  tripCount: number
  followers: string[]
  followingCount: number
}

export default function Profile() {
  const [user, setUser] = useState<IUserProfile|null>(null)
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [tripModal, setTripModal] = useState<boolean>(false)
  const params = useParams()

  const getUser = async () => {
    const res = await apiCaller(userApi.getUser(params.username ?? ""))
    
    if (res !== null) {
      console.log(res.data) 
      const storage = getLocalStorage("id")
      if (res.data.id !== storage.id) {
        setIsOwner(false)
        const followers = res.data.followers as Array<string>
        followers.includes(storage.id)
        ? setIsFollowing(true)
        : setIsFollowing(false)
      } else {
        setIsOwner(true)
      } 
      setUser(res.data)
    }
  }

  const followUser = async (action: boolean) => {
    await apiCaller(userApi.followUser(params.username ?? "", action))

    setIsFollowing(action)
  }

  useEffect(() => {
    getUser()
  }, [params])
  
  return (
    <div className="rv-page profile-page bg-background">
      <div className="rv-wrapper">
        <div className="profile-item bg-white p-6 pb-0 flex justify-between rounded-t-lg">
          <div className="flex">
            <div className="profile-image w-28 h-28">
              {
                !user
                ? <Skeleton.Avatar active style={{ height: "7rem", width: "7rem", verticalAlign: "baseline" }}/>
                : <img alt="#" src={user.picture ?? IMAGE_PATH.DEFAULT_AVATAR} className="image h-full w-full rounded-full" />
              }
            </div>
            {
              !user
              ? <div className="ml-5 w-44 max-h-7">
                <Skeleton active title={{ width: "inherit" }} paragraph={{ rows: 2, width: ["60%", "inherit"] }}/>
              </div>
              : <div className="profile-info flex flex-col justify-center ml-5">
                <span className="text-2xl font-semibold mb-1.5">{`${user.familyName} ${user.givenName}`}</span>
                <span className="text-sm text-extraText mb-1.5">{`@${user.username}`}</span>
                <div className="text-sm">
                  <span className="interact-info-label">
                    <span className="interact-info-result">{user.tripCount}</span> trips
                  </span>
                  <span className="interact-info-label">
                    <span className="interact-info-result">{user.followers.length}</span> followers
                  </span>
                  <span className="interact-info-label">
                    <span className="interact-info-result">{user.followingCount}</span> following
                  </span>
                </div>
              </div>
            }
          </div>
          {
            !user
            ? <></>
            : isOwner
            ? <div className="profile-action flex items-center">
              <span 
                className="extra-form-button text-sm rounded-md cursor-pointer mr-4"
                onClick={() => {setTripModal(true)}}
              >
                <PlusOutlined className="mr-1"/> Make a trip
              </span>
              <Dropdown
              menu={{ items: settingActions }}
              trigger={["click"]}
              onOpenChange={() => {}}
              >
                <SettingOutlined 
                  className="text-xl py-2 px-4 cursor-pointer rounded-md bg-extraButton hover:bg-buttonHover2"
                />
              </Dropdown>
            </div>
            : <div className="profile-action flex items-center">
              {
                isFollowing
                ? <span 
                    className="extra-form-button text-sm rounded-md cursor-pointer mr-4"
                    onClick={() => followUser(false)}
                  >
                    Following
                  </span>
                : <span 
                    className="primary-form-button text-sm rounded-md cursor-pointer mr-4"
                    onClick={() => followUser(true)}
                  >
                    Follow
                  </span>
              }
              
              <MessageOutlined 
                className="text-xl py-2 px-4 cursor-pointer rounded-md bg-extraButton hover:bg-buttonHover2"
              />
            </div>
          }
        </div>
        <div className="profile-item">
          {
            !user
            ? <Tabs className="text-sm" items={loadingTabItems}/>
            : <Tabs
              className="text-sm"
              items={isOwner ? ownerTabItems : profileTabItems}
              tabBarExtraContent={
                isOwner ? null
                : <Dropdown
                    menu={{ items: profileActions }}
                    trigger={["click"]}
                    onOpenChange={() => {}}
                  >
                    <BarsOutlined 
                      className="text-xl bg-extraButton hover:bg-buttonHover2 px-3 py-1 m-6 mb-0 rounded-md"
                    />
                  </Dropdown>
              } 
            />
          }
        </div>
      </div>
      <TripCreation 
        isOpen={tripModal} 
        onChangeState={(value: boolean) => setTripModal(value)}
      />
    </div>
  )
}
