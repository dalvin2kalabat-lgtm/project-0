import { useState } from "react";
import products from "./products.js";
import Checkout from "./Checkout.jsx";

function App() {
  const [selected, setSelected] = useState(null);
  const [bought, setBought] = useState(null);

  if (bought) {
    return (
      <div className="page">
        <h1>Thank you!</h1>
        <p>You bought {bought.name} for ${bought.price.toFixed(2)}.</p>
        <button onClick={() => setBought(null)}>Back to market</button>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="page">
        <Checkout
          product={selected}
          onSuccess={() => {
            setBought(selected);
            setSelected(null);
          }}
          onCancel={() => setSelected(null)}
        />
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Farmers Market</h1>
      <div className="products">
        {products.map((p) => (
          <div className="product" key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>${p.price.toFixed(2)}</p>
            <button onClick={() => setSelected(p)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
