import { NavLink } from "react-router-dom";

export default function Navbar(){
  return(
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <div className="logo">
        <h1>Compare&Play</h1>
      </div>
      <div className="links d-flex gap-3">
        <NavLink to={"/"}>Home</NavLink>
      </div>
    </div>
  )
}