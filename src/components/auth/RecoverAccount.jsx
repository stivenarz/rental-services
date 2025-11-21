import {useState} from 'react'
import "./Auth.css";
import toast from 'react-hot-toast';

export function RecoverAccount() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Recovery link sent to:", email)
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2 className="auth-title">Recover Account</h2>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">Send Recovery Link</button>
      </form>
    </div>
  );
}