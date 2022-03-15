import React from "react";

export function RegisterPage() {
  return (
    <div>
      <h1>Register Page!</h1>
      <Link to="/profile/:username">To the Holding Page!</Link>
    </div>
  );
}