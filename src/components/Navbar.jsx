import { NavLink } from "react-router-dom";
import Wishlist from "./Wishlist";
import { useWishlist } from "../contexts/WishlistContext";

export default function Navbar(){

  const { wishlist } = useWishlist();

  return(
    <div className="container-fluid d-flex justify-content-between align-items-center p-3 mb-3 sticky-top navbar">
      <div className="logo">
        <h1>Compare&Play</h1>
      </div>
      <div className="links d-flex gap-3">
        <NavLink to={"/"}><h2 className="m-0 p-0 text-black"><i className="bi bi-house"></i></h2></NavLink>
        <a className="btn p-0 position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <h2 className="m-0 p-0"><i className="bi bi-heart position-relative"></i></h2>
          {
            wishlist.length > 0 && (
              <span class="position-absolute top-0 start-100 translate-middle badge p-2 bg-danger border border-light rounded-circle">
                <span class="visually-hidden">New alerts</span>
              </span>
            )
          }
        </a>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">Preferiti</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body p-0">
            <Wishlist />
          </div>
        </div>
      </div>
    </div>
  )
}