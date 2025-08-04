import { useNavigate } from "react-router-dom";
import data from '../data.json';

function Home() {
    const navigate = useNavigate();

    const handleSubmit = (index) => {
        const product = data[index];
        const productName = product.title;
        alert(productName + ' has been added to the cart');
        if (window.confirm("Are you sure you want to purchase it?")) {
            navigate('/mycart', { state: { product } });
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {data.map((productObj, index) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center mb-4" key={index}>
                        <img src={productObj.url} alt={productObj.title} style={{ width: '250px', height: '180px', objectFit: 'contain' }} />
                        <p>
                            <strong>{productObj.title}</strong>
                            <br />₹{productObj.price}
                        </p>
                        <input
                            type="button"
                            value="Add to Cart"
                            className="btn btn-primary"
                            onClick={() => handleSubmit(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

