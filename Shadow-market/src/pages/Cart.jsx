import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({ cartItems, setCartItems }) {
  const [complete , setComplete]= useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, [setCartItems]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  function increaseQty(item) {
    if (item.product.stock === item.qty) {
      return; // Do not increase quantity if stock limit is reached
    }

    // Create a new array with the updated item
    const updatedItems = cartItems.map((i) => {
      if (i.product._id === item.product._id) {
        return {
          ...i,
          qty: i.qty + 1, // Increase quantity of the current item
        };
      }
      return i; // Return other items unchanged
    });

    setCartItems(updatedItems); // Update state
  }
  function decreaseQty(item) { 
    if (item.qty > 1 ){
      const updatedItems = cartItems.map((i) => {
        if (i.product._id === item.product._id) {
          return {
            ...i,
            qty: i.qty - 1, // Increase quantity of the current item
          };
        }
        return i; // Return other items unchanged
      });
  
      setCartItems(updatedItems); // Update state
    }
  }

  function removeItem(item) {
    const updatedItems = cartItems.filter((i) => i.product._id !== item.product._id);
  
    setCartItems(updatedItems); // Update state
    localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Update localStorage
  }
  
  function placeOrderHandler(){
    fetch(import.meta.env.VITE_API_KEY + '/order' , {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(cartItems)
    })
    .then(()=>{ setCartItems([]);
      setComplete(true);
      toast.success("Order Success!")
    })
  }

  return  cartItems.length>0?  <>
    <div className="container container-fluid">
      <h2 className="mt-5">
        Your Cart: <b>{cartItems.length} Items</b>
      </h2>

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          {cartItems.length === 0 ? (
            <p></p>
          ) : (
            cartItems.map((item) => (
              <Fragment key={item.product._id}>
                <hr />
                <div className="cart-item  ">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-2">
                      <Link to={"/product/" + item.product._id}>
                        {item.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={()=>decreaseQty(item)}>-</span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />

                        <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item" onClick={()=>removeItem(item)}
                        className="fa fa-trash btn btn-danger"
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))
          )}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">{cartItems.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span>
            </p>
            <p>
              Est. total: <span className="order-summary-values">${cartItems.reduce((acc,item)=>(acc+item.product.price* item.qty),0)}</span>
            </p>

            <hr />
            <button id="checkout_btn" onClick={placeOrderHandler} className="btn btn-primary btn-block">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
    </> : (!complete ? <h3 className="mt-5 text-center">Your Cart is Empty!</h3> :  <> <h3 className="mt-5 text-center">Order Complete!</h3> <p className="mt-5 text-center"> Order has been Placed Successfully!</p></>)
}
