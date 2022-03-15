import React from "react";
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div>
      <h1>Landing Page!</h1>
      <Link to="/register">To Register!</Link>
    </div>
  );
}