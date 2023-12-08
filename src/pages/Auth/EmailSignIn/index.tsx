import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";

import './index.style.scss'
import { IMAGE_PATH } from "../../../constants";
import { setSignInView, setSignUpView } from "../../../redux/Auth";

export default function EmailSignIn() {
  const dispatch = useDispatch();
  
  const goBackSignInView = () => {
    dispatch(setSignInView());
  }

  const goToSignUpView = () => {
    dispatch(setSignUpView());
  }

  return (
    <div className="email-signin-page w-96 px-10 pt-6 pb-10" style={{ fontFamily: 'Poppins' }}>
      <div className="signin-header">
        <div className="w-full flex justify-center">
          <div className="w-12">
            <img
              alt="#"
              src={IMAGE_PATH.LOGO}
              className="image w-full"
            />
          </div>
        </div>
        <p className="text-2xl font-semibold mt-2 mb-11 ">
          Welcome to
          <span className=" text-main font-bold"> road</span>
          <span className="font-bold">venture</span>
          :
        </p>
      </div>
      <div className="signin-body flex-col">
        <div>
          <Form
            name="normal_signin"
            className="signin-form"
            initialValues={{ remember: true }}
            style={{ fontFamily: 'Poppins' }}
            // onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input 
                prefix={<MailOutlined className="site-form-item-icon" />} 
                placeholder="Email" 
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <div className="w-full">
              <span className="float-right cursor-pointer hover:underline">Forgot password?</span>
            </div>

            <Form.Item className="w-full flex justify-center">
              <Button htmlType="submit" className="signin-form-button">
                Sign in
              </Button>
            </Form.Item>
            <div className="w-full">
              <span className=" cursor-pointer" onClick={goBackSignInView}>{"<< Back"}</span>
            </div>
          </Form>
        </div>
        <div className=" bg-dividerFill h-px w-full my-6"></div>
        <div className="w-full flex justify-center" style={{ fontFamily: 'Poppins' }}>
          <div>
            <span className=" font-semibold underline cursor-pointer" onClick={goToSignUpView}>
              Join
            </span> us if you are not a member.
          </div>
        </div>
      </div>
    </div>
  );
}