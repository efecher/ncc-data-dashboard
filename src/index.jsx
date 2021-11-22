import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import FreshmanWithTest from './routes/FreshmanWithTest';
import FreshmanTestOptional from './routes/FreshmanTestOptional';
import FreshmanNeedsBased from './routes/FreshmanNeedsBased';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/FreshmanWithTest" element={<FreshmanWithTest />} />
      <Route path="/FreshmanTestOptional" element={<FreshmanTestOptional />} />
      <Route path="/FreshmanNeedsBased" element={<FreshmanNeedsBased />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
