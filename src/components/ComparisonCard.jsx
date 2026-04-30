export default function ComparisonCard({ game }){

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
  } = game;

  return(
    <div className="card comparison-card h-100 border-0 shadow-lg" style={{ borderRadius: "20px", overflow: "hidden"}}>

      <img
        src={imageUrl}
        className="card-img-top object-fit-cover"
        alt={title}
        style={{ height: "220px" }}
      />

      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge rounded-pill bg-primary-subtle text-primary px-2 small">
            {category}
          </span>
          <span className="fw-bold text-muted small">PEGI {pegi}</span>
        </div>

        <h3 className="h5 fw-bold mb-1">{title}</h3>
        <p className="text-muted x-small mb-3">{developer} • {releaseYear}</p>

        <div className="mb-3">
          <h6 className="fw-bold text-uppercase x-small text-secondary">Genere</h6>
          <p className="small mb-0">{genres?.join(", ")}</p>
        </div>

        <div className="mb-3">
          <h6 className="fw-bold text-uppercase x-small text-secondary">Piattaforme</h6>
          <p className="small mb-0">{platforms?.join(", ")}</p>
        </div>
      </div>
    </div>
  )
}