import React from 'react'
import loading from "./loading.gif"
const Loading = () => {
  return (
    <div
    style={{
      position: "absolute",
      inset: "0",
      background: "rgba(255,255,255,0.5)",
      display: "flex",
      alignItems:"center",
      justifyContent:"center"
    }}
    className="d-flex align-items-center justify-content-center"
  >
    <img src={loading} alt="" style={{ width: "250px" }} />
  </div>
  )
}

export default Loading
