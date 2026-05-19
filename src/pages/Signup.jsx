import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, countryCode })
    });

    const data = await res.json();

    if (data.success) {
      navigate("/login");
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <input value={countryCode} onChange={(e) => setCountryCode(e.target.value)} placeholder="Country Code" />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
