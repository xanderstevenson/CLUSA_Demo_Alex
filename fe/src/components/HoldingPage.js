import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function HoldingPage() {
  const { username } = useParams();
  return (
    <div>
      <h1>Profile Page for {username}!</h1>
      <Link to="/question">To the Question Page!</Link>
    </div>
  );
}