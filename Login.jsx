import React, {useEffect} from "react";
import { Layout, Typography, Button, Input, Form } from "antd";
import loginBG from "../assets/login-bg.png";
import { login } from "./api";
import {useNavigate} from "react-router-dom";
import config from '../config/config';
import secureLocalStorage from 'react-secure-storage';

const { Content } = Layout;
const { Title } = Typography;

const Loginpage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Clear secure local storage whenever the user navigates to the login page
        secureLocalStorage.clear();
    }, []);

    const handleSSOLogin = async (e) => {
        window.location.href = config.user_persona_endpoints.api_hostname + "/pp/login";
       // window.location.href = "http://localhost:5173/redirect/pp/login";
    };

    const handleDBLogin = async (values) => {
        const { userId, password } = values;
        try {
            const response = await login(userId, password);

            if (response.status === 'success'){

                if (response.data[0].token) {
                    secureLocalStorage.setItem('accessToken', response.data[0].token);
                    secureLocalStorage.setItem('userId', response.data[0].username);
                    secureLocalStorage.setItem('role', response.data[0].role)
                    secureLocalStorage.setItem('loginBy', 'db');
                    console.log("login successful for ", response.data[0].username);
                    navigate("/");
                }
        }
        else {
                console.error('Login failed:',response.message);
                alert(`Login failed: ${response.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert("Login failed. Please try again!");
        }
    };

    
    

    return (
        <Layout style={{ height: "100vh" }}>
            <Content style={{ display: "flex", alignItems: "center", backgroundColor: "#ffff" }}>
                <img src={loginBG} alt="Background" style={{ height: "100vh", objectFit: "contain" }} />
                <div style={{ marginTop: "20px", paddingLeft: "0px", width: "100%" }}>
                    <Title style={{ fontFamily: "Heebo", fontSize: "30px", marginBottom: "40px", textAlign: "center", color: "#000" }}>
                        Revolutionize Your Project Management!
                    </Title>
                    
                    <Form
                        name="loginForm"
                        initialValues={{ remember: true }}
                        onFinish={handleDBLogin}
                        style={{ width: "300px", margin: "auto" }}
                    >
                        <Form.Item
                            name="userId"
                            rules={[{ required: true, message: "Please enter your user ID!" },
                            { pattern: /^\d{1,10}$/, message: "User ID must be a maximum of 10 digits!" }]}
                        >
                            <Input placeholder="User ID" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please enter your password!" }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item style={{ textAlign: "center" }}>
                            <Button type="primary" htmlType="submit" style={{ width: "50%", marginBottom: "10px", margin: "0 auto" }}>
                                Login
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" style={{ width: "100%" }} onClick={handleSSOLogin}>
                                Sign in with SSO
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default Loginpage;