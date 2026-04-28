import { NavLink } from "react-router-dom";
import Wishlist from "./Wishlist";

export default function Navbar(){

  return(
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <div className="logo">
        <h1>Compare&Play</h1>
      </div>
      <div className="links d-flex gap-3">
        <NavLink to={"/"}><h2><i className="bi bi-house"></i></h2></NavLink>
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <i className="bi bi-heart"></i>
        </button>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">Preferiti</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <Wishlist />
          </div>
        </div>
      </div>
    </div>
  )
}