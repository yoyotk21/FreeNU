import React, { useState } from 'react';

function AddEmailForm({ addEmail }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmail({ email });
    setEmail("");
  };

  return (
    <div className="card p-4 mb-4">
      <h3 className="text-center mb-4">Enter email to receive notifications</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-success w-100" type="submit">Add Email</button>
      </form>
    </div>
  );
}

export default AddEmailForm;
