export default function DetailsCard({ gameDetails }){

  const {
    title,
    imageUrl,
    category,
    platforms,
    genres,
    description,
    developer,
    pegi,
    price,
    releaseYear
  } = gameDetails;

  return(
    <div className="card border-0 shadow-lg overflow-hidden mx-auto" style={{ maxWidth: "900px", borderRadius: "20px" }}>
      <div className="row g-0">

        <div className="col-md-5">
          <img
            src={imageUrl}
            className="img-fluid w-100 h-100 object-fit-cover"
            alt={title}
            style={{ minHeight: "300px" }}
          />
        </div>

        <div className="col-md-7 d-flex flex-column">
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="badge rounded-pill bg-primary-subtle text-primary px-3">
                {category}
              </span>
              <span className="fw-bold text-muted small">PEGI {pegi}</span>
            </div>

            <h1 className="display-6 fw-bold mb-1">{title}</h1>
            <p className="text-muted mb-3">{developer} • {releaseYear}</p>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small text-secondary">Genere</h6>
              <p className="mb-0">{genres.join(", ")}</p>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small text-secondary">Descrizione</h6>
              <p className="card-text text-secondary" style={{ lineHeight: "1.6" }}>
                {description}
              </p>
            </div>

            <div className="mt-auto pt-4 border-top">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold text-uppercase small text-secondary mb-1">Disponibile su</h6>
                  <p className="small mb-0">{platforms.join(", ")}</p>
                </div>
                <div className="text-end">
                  <span className="h3 fw-bold text-dark">{price}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}