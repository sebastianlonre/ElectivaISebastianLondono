import { Routes, Route } from "react-router-dom";
import { NavBar } from "../UI/NavBar";
import { HomePage, Login, Register, Profile, PushProuduct, ViewProduct } from "../pages";

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<NavBar/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/Profile" element={<Profile/>}/>
                <Route path="/PushProuduct" element={<PushProuduct/>}/>
                <Route path="/ViewProduct" element={<ViewProduct/>}/>
            </Route>
        </Routes>
    </>
  )
}
