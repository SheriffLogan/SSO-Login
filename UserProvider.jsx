import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {

    const updateResponseData = (data) => {
        setResponseData(data);
      };
    const updateDataSource = (data) => {
        setDataSource(data);
    }

  const [responseData, setResponseData] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  return (
    <UserContext.Provider
      value={{
        responseData,
        updateResponseData,
        dataSource, 
        updateDataSource
      }}
    >
      {children}
    </UserContext.Provider>
  );
}