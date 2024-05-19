import { useReducer } from "react"
import { socialReducer } from "../reducer"


const initialState = {
  social: []
}

export const socialProvider = ({ children }) => {
  const [socialState, dispatch] = useReducer(socialReducer, initialState)

  return (
    <div>socialProvider</div>
  )
}
