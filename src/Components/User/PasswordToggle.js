import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";

const PasswordToggle = ({ password }) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const passwordRef = useRef();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  };

  return (
    <div className="input-field">
      <input
        type={type}
        className="password"
        id="password"
        placeholder="Mot de passe"
        ref={passwordRef}
        onChange={() => password(passwordRef.current.value)}
        required
      />
      <i className="icon">
        <FontAwesomeIcon icon={faLock} />
      </i>
      <i className="showHidePw" onClick={handleToggle}>
        <FontAwesomeIcon icon={icon} />
      </i>
    </div>
  );
};

export default PasswordToggle;
