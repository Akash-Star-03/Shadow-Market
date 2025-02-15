import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductDetail({ cartItems, setCartItems }) {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const { id } = useParams();

    const fetchProduct = () => {
        fetch(import.meta.env.VITE_API_KEY + "/api/v1/products/" + id)
            .then((res) => res.json())
            .then((res) => {
                if (res.product) {
                    setProduct(res.product);
                } else {
                    console.error("Product not found");
                }
            })
            .catch((err) => console.error("Error fetching product:", err));
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }
    

    function addToCart() {
        const itemExist = cartItems.find((item) => item.product._id === product._id);
        if (!itemExist) {
            const newItem = { product, qty };
            setCartItems((state) => [...state, newItem]);
            toast.success("Cart Item Added Successfully!");
            
            
        } else {
            toast.warn("Item already in cart");
        }
        fetchProduct();
    }

    function increaseQty() {
        if (product.stock === qty) {
            toast.warn("Maximum stock reached");
            return;
        }
        setQty((state) => state + 1);
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1);
        }
    }
    console.log("Product Stock:", product.stock);
console.log("Product Stock Type:", typeof product.stock);
console.log("Button Disabled:", product.stock === 0);



    return (
        <div className="container container-fluid">
            <div className="row justify-content-center">
                {/* Product Image */}
                <div className="col-6 col-md-6 text-center mb-4">
                    <img
                        src={product.images[0].image}
                        alt="Product"
                        className="img-fluid"
                    />
                </div>

                {/* Product Details */}
                <div className="col-12 col-md-6">
                    <h3 className="text-center text-md-start">{product.name}</h3>
                    <p id="product_id" className="text-center text-md-start">
                        
                    </p>

                    <hr />
                    <div className="rating-container d-flex justify-content-center justify-content-md-start">
    <div className="rating-outer">
        <div
            className="rating-inner"
            style={{ width: `${(product.ratings / 5) * 100}%` }}
        ></div>
    </div>
</div>



                   


                    <hr />

                    <p id="product_price" className="text-center text-md-start">${product.price}</p>
                    <div className="stockCounter d-flex justify-content-center justify-content-md-start align-items-center">
                        <span className="btn btn-danger minus" onClick={decreaseQty}>
                            -
                        </span>

                        <input
                            type="number"
                            className="form-control count mx-2"
                            value={qty}
                            readOnly
                        />

                        <span className="btn btn-primary plus" onClick={increaseQty}>
                            +
                        </span>
                    </div>
                    <div className="text-center text-md-start mt-3">
                        <button
                            type="button"
                            onClick={addToCart}
                            disabled={product.stock === 0}
                            id="cart_btn"
                            className="btn btn-primary"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <hr />

                    <p className="text-center text-md-start">
                        Status:{" "}
                        <span
                            id="stock_status"
                            className={product.stock > 0 ? "text-success" : "text-danger"}
                        >
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                    </p>

                    <hr />

                    <h4 className="text-center text-md-start mt-2">Description:</h4>
                    <p className="text-center text-md-start">{product.description}</p>
                    <hr />
                    <p id="product_seller" className="text-center text-md-start">
                        Sold by: <strong>{product.seller}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
