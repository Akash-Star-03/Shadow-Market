import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Search from "../components/Search";
import "../Home.css";
import asus1 from "../assets/images/asus1.jpg";
import bb from "../assets/images/BB.jpg";
import cloth from "../assets/images/cloth.jpg";
import buds from "../assets/images/buds.jpg";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [showCarousel, setShowCarousel] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect search keyword
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    setShowCarousel(!keyword); // Hide carousel if a search keyword exists
    fetch(import.meta.env.VITE_API_KEY + "/products?" + searchParams)
      .then((res) => res.json())
      .then((res) => setProducts(res.products))
      .catch((err) => console.error("Error fetching products:", err)); // Error handling
  }, [searchParams]);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Render Search bar for mobile view */}
      {isMobile && (
        <div className="mobile-search-container">
          <Search />
        </div>
      )}

      {showCarousel && (
        <div className="carousel-container">
          <h2 className="carousel-title">Featured Products</h2>
          <Carousel className="custom-carousel" fade interval={3000}>
            <Carousel.Item>
              <img
                className="carousel-image"
                src={asus1}
                alt="ASUS New Gen"
              />
              <Carousel.Caption className="mb-3">
                <h2 className="caption-title">ASUS New Gen</h2>
                <h6 className="caption-subtitle">
                  Launching brand new ASUS business laptops.
                </h6>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-image"
                src={cloth}
                alt="Peter England"
              />
              <Carousel.Caption className="mb-3">
                <h2 className="caption-title">Peter England</h2>
                <h6 className="caption-subtitle">
                  10% Discount on all sweatshirts
                </h6>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-image"
                src={buds}
                alt="Air Dropes"
              />
              <Carousel.Caption className="mb-3">
                <h2 className="caption-title">Better Ear Buds</h2>
                <h6 className="caption-subtitle">
                  New Bluetooth 16.3.5 version
                </h6>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      )}

      <section id="products" className="container mt-5">
        <div className="row">
          <h1 id="products_heading">New Upcoming Products</h1>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
