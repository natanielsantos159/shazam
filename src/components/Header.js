import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <header>
      <Link to="identify">identificar</Link>
      <Link to="history">histórico</Link>
    </header>
  );
}
