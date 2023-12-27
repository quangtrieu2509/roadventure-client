import { Button, Form, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"

import "../index.style.scss"
import { IMAGE_PATH } from "../../../constants"
import { getState, setView } from "../../../redux/Auth"
import { AuthView } from "../../../redux/Auth/types"
import { apiCaller, authApi } from "../../../api"
import { setAuthStorage } from "../../../utils/Auth"

export default function GoogleSignUp() {
  const dispatch = useDispatch()
  const { user, GoogleToken } = useSelector(getState)

  const goBackSignInView = () => {
    dispatch(setView(AuthView.SIGNIN_VIEW))
  }

  const createGoogleAccount = async (values: any) => {
    const res = await apiCaller(
      authApi.signUpByGoogle(GoogleToken, {
        ...user,
        username: values.username,
      }),
    )

    if (res !== null) {
      setAuthStorage(res.data)
      window.location.reload() // fix here
      // dispatch(setState(false))
    }
  }

  return (
    <div className="auth-page">
      <div className="google-signup-header">
        <p className="text-2xl font-semibold mt-2 mb-6">Almost done!</p>
        <p className=" text-sm mb-6">
          Finish creating your account for the full
          <b>
            <span className="text-main"> road</span>venture
          </b>{" "}
          experience.
        </p>
      </div>
      <div className="google-signup-body flex-col">
        <div>
          <div className="mb-6 flex h-16">
            <div className="flex">
              <img
                alt="#"
                src={IMAGE_PATH.DEFAULT_AVATAR}
                className="image w-full p-1 border-solid border-dividerFill border-2 rounded-full"
              />
            </div>
            <div className="flex flex-col h-full ml-4 justify-center">
              <div className=" font-bold text-base">
                <span>
                  {user?.givenName} {user?.familyName}
                </span>
              </div>
              <div>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          <Form
            name="normal_create"
            className="create-form"
            initialValues={{ remember: true }}
            style={{ fontFamily: "Poppins" }}
            onFinish={createGoogleAccount}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  pattern: /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/,
                  message: "Username is not valid",
                },
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
            >
              <Input prefix={"@"} type="text" placeholder="Username" />
            </Form.Item>

            <Form.Item className="w-full flex justify-center">
              <Button htmlType="submit" className="primary-form-button">
                Create
              </Button>
            </Form.Item>
            <div className="w-full">
              <span className=" cursor-pointer" onClick={goBackSignInView}>
                {"<< Back"}
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
