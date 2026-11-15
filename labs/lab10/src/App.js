import React, { useState } from 'react';
import './App.css';

const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
];

const emptyForm = {
  email: '',
  name: '',
  address: '',
  address2: '',
  city: '',
  province: '',
  postalCode: '',
  agree: false,
};

function App() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted({ ...form });
  };

  return (
    <div className="container form-container">
      <h1 className="text-center">Data Entry Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6 text-center">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6 text-center">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group text-center">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="1234 Main St"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group text-center">
          <label htmlFor="address2">Address 2</label>
          <input
            type="text"
            className="form-control"
            id="address2"
            name="address2"
            placeholder="Apartment, studio, or floor"
            value={form.address2}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group col-md-4 text-center">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4 text-center">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              name="province"
              className="form-control"
              value={form.province}
              onChange={handleChange}
              required
            >
              <option value="">Choose...</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-4 text-center">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group text-center">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="agree"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="agree">
              Agree Terms &amp; Condition?
            </label>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>

      {submitted && (
        <div className="submission mt-4">
          <table className="table table-borderless table-sm">
            <tbody>
              <tr>
                <th>Email:</th>
                <td>{submitted.email}</td>
              </tr>
              <tr>
                <th>Full Name:</th>
                <td>{submitted.name}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>
                  {submitted.address}
                  {submitted.address2 ? `, ${submitted.address2}` : ''}
                </td>
              </tr>
              <tr>
                <th>City:</th>
                <td>{submitted.city}</td>
              </tr>
              <tr>
                <th>Province:</th>
                <td>{submitted.province}</td>
              </tr>
              <tr>
                <th>Postal Code:</th>
                <td>{submitted.postalCode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
