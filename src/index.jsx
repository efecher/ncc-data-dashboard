import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import FreshmanWithTest from './routes/FreshmanWithTest';
import FreshmanTestOptional from './routes/FreshmanTestOptional';
import FreshmanNeedsBasedNJ from './routes/FreshmanNeedsBasedNJ';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/FreshmanWithTest" element={<FreshmanWithTest />} />
      <Route path="/FreshmanTestOptional" element={<FreshmanTestOptional />} />
      <Route path="/FreshmanNeedsBasedNJ" element={<FreshmanNeedsBasedNJ />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
