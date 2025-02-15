import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({ cartItems, setCartItems }) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  function increaseQty(item) {
    if (item.product.stock === item.qty) {
      return;
    }

    const updatedItems = cartItems.map((i) => {
      if (i.product._id === item.product._id) {
        return { ...i, qty: i.qty + 1 };
      }
      return i;
    });

    setCartItems(updatedItems);
  }

  function decreaseQty(item) {
    if (item.qty > 1) {
      const updatedItems = cartItems.map((i) => {
        if (i.product._id === item.product._id) {
          return { ...i, qty: i.qty - 1 };
        }
        return i;
      });

      setCartItems(updatedItems);
    }
  }

  function removeItem(item) {
    const updatedItems = cartItems.filter((i) => i.product._id !== item.product._id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  }

  function placeOrderHandler() {
    fetch(import.meta.env.VITE_API_KEY + "/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    }).then(() => {
      setCartItems([]);
      setComplete(true);
      toast.success("Order Success!");
    });
  }

  return cartItems.length > 0 ? (
    <>    
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} Items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item) => (
              <Fragment key={item.product._id}>
                <hr />
                <div className="cart-item">
                  <div className="row align-items-center">
                    {/* Product Image */}
                    <div className="col-4 col-md-2">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    {/* Product Name */}
                    <div className="col-8 col-md-4">
                      <Link to={`/product/${item.product._id}`} className="cart-product-name text-black">
                        {item.product.name}
                      </Link>
                    </div>

                    {/* Quantity, Price, and Delete in One Row for Mobile */}
                    <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex align-items-center justify-content-between">
                      <div className="stockCounter d-flex align-items-center">
                        <button className="btn btn-danger minus" onClick={() => decreaseQty(item)}>
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control count mx-2 text-center"
                          value={item.qty}
                          readOnly
                        />
                        <button className="btn btn-primary plus" onClick={() => increaseQty(item)}>
                          +
                        </button>
                      </div>
                      <p className="cart-price fw-bold fs-3" style={{color:"#8820bc"}}>${item.product.price}</p>
                      <button className="btn btn-danger bg-danger delete-btn" onClick={() => removeItem(item)}>
                        <i className="fa fa-trash "></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  ${cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)}
                </span>
              </p>

              <hr />
              <button id="checkout_btn" onClick={placeOrderHandler} className="btn btn-primary btn-block">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : !complete ? (
    <h3 className="mt-5 text-center">Your Cart is Empty!</h3>
  ) : (
    <>
      <h3 className="mt-5 text-center">Order Complete!</h3>
      <p className="mt-5 text-center">Order has been Placed Successfully!</p>
    </>
  );
}
