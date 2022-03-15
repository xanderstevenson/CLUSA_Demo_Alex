import React from "react";
import { Link } from 'react-router-dom';

export function RegisterPage() {
  return (
    <div>
      <h1>Register Page!</h1>
      {/* <Link to="/profile/:username">To the Holding Page!</Link> */}
      {/* hardcode username for testing */}
      <Link to="/profile/andrew">To the Holding Page!</Link>
    </div>
  );
}