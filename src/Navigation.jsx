import React from 'react';
import { Link } from 'react-router-dom';
import './App.scss';

export default function Navigation() {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item home-link"><Link className="nav-link" to="/"><strong>Home</strong></Link></li>
        <li className="nav-item"><Link className="nav-link" to="/FreshmanWithTest">Freshman Merit With Test</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/FreshmanTestOptional">Freshman Merit (Test Optional)</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/FreshmanNeedsBased">Freshman Needs Based</Link></li>
      </ul>
    </nav>
  );
}