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
        <li className="nav-item"><Link className="nav-link" to="/FreshmanNeedsBasedNJ">Freshman Needs Based: NJ Residents</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/FreshmanNeedsBasedNonNJ">Freshman Needs Based: Non-NJ Residents</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/TransferNeedsBasedNJ">Transfer: Needs Based (NJ Residents)</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/TransferNeedsBasedNonNJ">Transfer: Needs Based (Non NJ Residents)</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/TransferMeritBased">Transfer: Merit-Based (GPA)</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Pell">Pell</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/TuitionAssistanceGrant">Tuition Assistance Grant</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/EFCDependent">EFC - Dependent</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/EFCIndependentNoDependents">EFC - Independent with no Dependents</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/EFCIndependentWithDependents">EFC - Independent with Dependents</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Tuition">SHU Tuition and Expenses</Link></li>
      </ul>
    </nav>
  );
}