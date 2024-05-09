import { Routes, Route } from "react-router-dom";
import { NavBar } from "../UI/NavBar";
import {PushProuduct, ViewProduct } from "../products/pages";
import { HomePage } from "../homePage/pages";
import { Profile } from "../Profile/pages"
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<NavBar/>}>
                <Route index element={<HomePage/>}/>

                <Route path="/Profile"
                element={
                  <PrivateRoute>
                    <Profile/>
                  </PrivateRoute>

                }/>

                <Route path="/PushProuduct"
                element={
                  <PrivateRoute>
                    <PushProuduct/>
                  </PrivateRoute>
                }/>

                <Route path="/ViewProduct"element={<ViewProduct/>}/>

                <Route path="/*" element={<HomePage />} />
            </Route>
        </Routes>
    </>
  )
}
