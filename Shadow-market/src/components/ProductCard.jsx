import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="col-6 col-md-4 col-lg-3 my-3">
            <div className="card p-3 rounded h-100">
                <div
                    className="card-img-container d-flex align-items-center justify-content-center"
                    style={{
                        height: "150px", // Ensures consistent image container height
                        overflow: "hidden",
                        background: "#f8f9fa", // Light background for better appearance
                    }}
                >
                    <img
                        className="card-img-top"
                        src={product.images[0].image}
                        alt={product.name}
                        style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate" title={product.name}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="text-truncate" title={product.description}>
                        <p className="card-text small">{product.description}</p>
                    </div>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div
                                className="rating-inner"
                                style={{ width: `${(product.ratings / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <p className="card-text fw-bold small">${product.price}</p>
                    <Link
                        to={`/product/${product._id}`}
                        id="view_btn"
                        className="btn btn-primary btn-sm mt-2"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
