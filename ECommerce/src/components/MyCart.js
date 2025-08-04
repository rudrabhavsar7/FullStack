import { useLocation } from "react-router-dom";

function MyCart() {
    const location = useLocation();
    const product = location.state?.product;

    if (!product) {
        return <div className="container mt-5"><h3>No product in cart.</h3></div>;
    }

    return (
        <div className="container mt-5">
            <h2>My Cart</h2>
            <div className="card" style={{ width: "18rem" }}>
                <img src={product.url} className="card-img-top" alt={product.title} style={{ width: "100%", height: "200px", objectFit: "contain" }} />
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">Price: ₹{product.price}</p>
                    <p className="card-text">{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default MyCart;

