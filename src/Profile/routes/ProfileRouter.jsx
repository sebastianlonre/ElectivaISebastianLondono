import { Routes, Route } from "react-router-dom"
import { PushProuduct } from "../../products/pages"
import { Profile } from "../pages"

export const ProfileRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Profile/>}/>
        <Route path="/PushProduct" element={<PushProuduct/>}/>
      </Routes>
    </>
  )
}
