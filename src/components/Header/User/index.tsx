import { useEffect, useState } from "react"
import { Dropdown, Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"

import { IMAGE_PATH } from "../../../constants"
import { userItems } from "../itemLists"
import { getState, setView, setState } from "../../../redux/Auth"
import { AuthView } from "../../../redux/Auth/types"

export default function User() {
  const [userTest, setUserTest] = useState(true)
  const currentState = useSelector(getState).state
  const currentView = useSelector(getState).view
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token !== null) setUserTest(true)
    else setUserTest(false)
  }, [])

  const handleOk = () => {
    dispatch(setState(false))
  }

  const handleCancel = () => {
    dispatch(setState(false))
  }

  const showSigninModal = () => {
    dispatch(setState(true))
    dispatch(setView(AuthView.SIGNIN))
  }

  return (
    <div className="flex justify-center items-center">
      {!userTest ? (
        <div>
          <span
            className="font-semibold text-base border-2 border-solid px-4 py-2 rounded-lg mx-1 bg-transparent hover:bg-buttonHover cursor-pointer"
            onClick={showSigninModal}
          >
            Sign in
          </span>
          <Modal
            footer={
              <div
                className="signin-footer mb-1"
                style={{ fontFamily: "Poppins" }}
              >
                <p className="px-7 m-0 text-xs text-subText text-center">
                  By proceeding, you agree to our{" "}
                  <u className="cursor-pointer">Terms of Use</u> and confirm
                </p>
                <p className="px-7 m-0 text-xs text-subText text-center">
                  you have read our{" "}
                  <u className="cursor-pointer">Privacy and Cookie Statement</u>
                  .
                </p>
              </div>
            }
            open={currentState}
            onOk={handleOk}
            onCancel={handleCancel}
            width={"fit-content"}
            centered
          >
            {currentView}
          </Modal>
        </div>
      ) : (
        <div>
          <Dropdown
            menu={{ items: userItems.items }}
            trigger={["click"]}
            onOpenChange={() => {}}
            className="header-dropdown"
          >
            <div className="header-item flex h-11 mx-1 rounded-full cursor-pointer">
              <img
                id="avatar-img"
                alt="#"
                src={IMAGE_PATH.DEFAULT_AVATAR}
                className="image"
              />
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  )
}
