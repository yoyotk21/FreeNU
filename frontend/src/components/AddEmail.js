import React, { useState } from 'react';

function AddEmail() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    const emailData = { email };

    // Send the email to Flask API
    fetch("http://localhost:5000/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData), // Sends the email to Flask
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User added successfully") {
          alert("Email added successfully!");
          setEmail("");  // Clear the input field
        } else {
          alert(data.error || "Error adding email");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error adding email");
      });
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Enter Email For Email List</h2>
      <form onSubmit={handleSubmit} className="form-inline justify-content-center">
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success ml-3" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddEmail;
