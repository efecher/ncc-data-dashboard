import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import FreshmanWithTest from './routes/FreshmanWithTest';
import FreshmanTestOptional from './routes/FreshmanTestOptional';
import FreshmanNeedsBasedNJ from './routes/FreshmanNeedsBasedNJ';
import FreshmanNeedsBasedNonNJ from './routes/FreshmanNeedsBasedNonNJ';
import TransferNeedsBasedNJ from './routes/TransferNeedsBasedNJ';
import TransferNeedsBasedNonNJ from './routes/TransferNeedsBasedNonNJ';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/FreshmanWithTest" element={<FreshmanWithTest />} />
      <Route path="/FreshmanTestOptional" element={<FreshmanTestOptional />} />
      <Route path="/FreshmanNeedsBasedNJ" element={<FreshmanNeedsBasedNJ />} />
      <Route path="/FreshmanNeedsBasedNonNJ" element={<FreshmanNeedsBasedNonNJ />} />
      <Route path="/TransferNeedsBasedNJ" element={<TransferNeedsBasedNJ />} />
      <Route path="/TransferNeedsBasedNonNJ" element={<TransferNeedsBasedNonNJ />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
