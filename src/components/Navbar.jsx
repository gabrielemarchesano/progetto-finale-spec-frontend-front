import { NavLink } from "react-router-dom";

export default function Navbar(){
  return(
    <div className="navbar">
      <h1>Navbar</h1>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/games/:id"}>Details</NavLink>
    </div>
  )
}