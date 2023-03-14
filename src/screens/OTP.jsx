import React, { useState } from "react";
import axios from "axios";

const OTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const generateOtp = () => {
    axios
      .post("http://localhost:5152/api/generate-otp")
      .then((res) => {
        setSecret(res.data.secret);
        setOtp(res.data.otp);
        setError("");
      })
      .catch((err) => setError(err.response.data.error));
  };

  const sendOtp = () => {
    axios
      .post("http://localhost:5152/api/send-otp", {
        email: email,
        otp: otp,
      })
      .then((res) => setMessage(res.data.message))
      .catch((err) => setError(err.response.data.error));
  };

  const verifyOtp = () => {
    axios
      .post("http://localhost:5152/api/verify-otp", {
        secret: secret,
        otp: otp,
      })
      .then((res) => {
        if (res.data.verified) {
          setMessage("OTP verified successfully!");
          setError("");
        } else {
          setError("Invalid OTP!");
          setMessage("");
        }
      })
      .catch((err) => setError(err.response.data.error));
  };

  return (
    <div>
      <h2>OTP Verification via Email</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <button onClick={generateOtp}>Generate OTP</button>
      <br />
      <br />
      <div>
        <label>OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <br />
      <button onClick={sendOtp}>Send OTP</button>
      <br />
      <br />
      <div>
        <label>Enter OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <br />
      <button onClick={verifyOtp}>Verify OTP</button>
      <br />
      <br />
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default OTP;