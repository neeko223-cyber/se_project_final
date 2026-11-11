import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
    }
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email, password, username });
  }

  const isComplete = email.trim() !== "" && password.trim() !== "" && username.trim() !== "";

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign up"
      isButtonDisabled={!isComplete}
      redirectText="or"
      redirectLinkText="Sign in"
      onRedirect={onSwitchToLogin}
    >
      <label className="modal__field">
        <span className="modal__label">Email</span>
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Enter email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="modal__field">
        <span className="modal__label">Password</span>
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Enter password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label className="modal__field">
        <span className="modal__label">Username</span>
        <input
          className="modal__input"
          type="text"
          name="username"
          placeholder="Enter your username"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
