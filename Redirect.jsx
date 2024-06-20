import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { LoadingOutlined } from '@ant-design/icons';

const Redirect = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
//   const [username,setUsername]=useState("");
  const parseQueryParams = () => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const user_details = {
        username: urlParams.get("username"),
        user_id: urlParams.get("user_id"),
        access_token: urlParams.get("token"),
        user_role: urlParams.get("user_role"),
      };
      console.log(user_details);
      if (
        user_details.username ||
        user_details.user_id ||
        user_details.access_token ||
        user_details.user_role
      ) {
        // setUsername(user_details.username);
        secureLocalStorage.setItem("username", user_details.username);
        secureLocalStorage.setItem("userId", user_details.user_id);
        secureLocalStorage.setItem("accessToken", user_details.access_token);
        secureLocalStorage.setItem("role", user_details.user_role);
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      window.location.href = "/login";
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    parseQueryParams();
    
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
       {loading ? (
       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
       <LoadingOutlined style={{ color: '#1E2125' }} />
     </div>
      ) : null} 
      

    </div>
  );
};
export default Redirect;