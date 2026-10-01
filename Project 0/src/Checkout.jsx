import { useState } from "react";

function passesLuhn(number) {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    let digit = Number(number[number.length - 1 - i]);
    if (i % 2 === 1) {
      digit = digit * 2;
      if (digit > 9) digit = digit - 9;
    }
    sum = sum + digit;
  }
  return sum % 10 === 0;
}

function Checkout({ product, onSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const problems = [];

    if (name.trim() === "") {
      problems.push("Please enter the name on the card.");
    }

    const digits = number.replace(/[\s-]/g, "");
    if (!/^\d{13,19}$/.test(digits) || !passesLuhn(digits)) {
      problems.push("Card number is not valid.");
    }

    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match || match[1] < 1 || match[1] > 12) {
      problems.push("Expiration date must look like MM/YY.");
    } else {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear() % 100;
      if (match[2] < year || (match[2] == year && match[1] < month)) {
        problems.push("This card is expired.");
      }
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      problems.push("CVV must be 3 or 4 digits.");
    }

    setErrors(problems);
    if (problems.length === 0) {
      onSuccess();
    }
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>
        {product.name} - ${product.price.toFixed(2)}
      </p>

      <form onSubmit={handleSubmit}>
        <label>Name on card</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Card number</label>
        <input value={number} onChange={(e) => setNumber(e.target.value)} />

        <label>Expiration (MM/YY)</label>
        <input value={expiry} onChange={(e) => setExpiry(e.target.value)} />

        <label>CVV</label>
        <input value={cvv} onChange={(e) => setCvv(e.target.value)} />

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <button type="submit">Pay ${product.price.toFixed(2)}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
      <p>Test card: 4242 4242 4242 4242</p>
    </div>
  );
}

export default Checkout;
