import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";

import { IMAGE_PATH } from "../../../constants";
import { setEmailSignInView, setSignInView } from "../../../redux/Auth";

export default function SingUp() {
  const dispatch = useDispatch();
  
  const goBackSignInView = () => {
    dispatch(setSignInView());
  }

  const goToEmailSignInView = () => {
    dispatch(setEmailSignInView());
  }

  return (
    <div className="signup-page w-96 px-10 pt-6 pb-10" style={{ fontFamily: 'Poppins' }}>
      <div className="signup-header">
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
          Join with us
          <span className=" text-main font-bold"> road</span>
          <span className="font-bold">venture</span>
          :
        </p>
      </div>
      <div className="signup-body flex-col">
        <div>
          <Form
            name="normal_signup"
            className="signup-form"
            initialValues={{ remember: true }}
            style={{ fontFamily: 'Poppins' }}
            // onFinish={onFinish}
          >
            <Form.Item
              name="givenName"
              rules={[{ required: true, message: 'Please input your given name' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Given Name" 
              />
            </Form.Item>
            <Form.Item
              name="familyName"
              rules={[{ required: true, message: 'Please input your family name' }]}
            >
              <Input 
                prefix={<TeamOutlined className="site-form-item-icon" />} 
                placeholder="Family Name" 
              />
            </Form.Item>
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
            <Form.Item className="w-full flex justify-center">
              <Button htmlType="submit" className="signin-form-button">
                Sign up
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
            <span className="font-semibold underline cursor-pointer" onClick={goToEmailSignInView}>
              Sign in
            </span> if you already have an account.
          </div>
        </div>
      </div>
    </div>
  );
}