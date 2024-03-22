import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { CategoryContextProvider } from "./CategoryContext";
import { UserContextProvider } from "./UserContext";

export const Root = () => {
  return (
    <CategoryContextProvider>
      <UserContextProvider>
        <Navigation />
        <Outlet />
      </UserContextProvider>
    </CategoryContextProvider>
  );
};
