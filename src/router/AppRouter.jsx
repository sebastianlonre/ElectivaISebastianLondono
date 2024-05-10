import { Routes, Route } from "react-router-dom";
import { NavBar } from "../UI/NavBar";
import { ViewProduct } from "../products/pages";
import { HomePage } from "../homePage/pages";
import { PrivateRoute } from "./PrivateRoute";
import { ProfileRouter } from "../Profile/routes/ProfileRouter";

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<NavBar/>}>
                <Route index element={<HomePage/>}/>

                <Route path="/Profile/*"
                element={
                  <PrivateRoute>
                    <ProfileRouter/>
                  </PrivateRoute>
                }/>

                <Route path="/ViewProduct/:productId"element={<ViewProduct/>}/>

                <Route path="/*" element={<HomePage />} />
            </Route>
        </Routes>
    </>
  )
}
