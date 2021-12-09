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
import TransferMeritBased from './routes/TransferMeritBased';
import Pell from './routes/Pell';
import TuitionAssistanceGrant from './routes/TuitionAssistanceGrant';
import EFCDependent from './routes/EFCDependent';
import EFCIndependentNoDependents from './routes/EFCIndependentNoDependents';
import EFCIndependentWithDependents from './routes/EFCIndependentWithDependents';
import Tuition from './routes/Tuition';

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
      <Route path="/TransferMeritBased" element={<TransferMeritBased />} />
      <Route path="/Pell" element={<Pell />} />
      <Route path="/TuitionAssistanceGrant" element={<TuitionAssistanceGrant />} />
      <Route path="/EFCDependent" element={<EFCDependent />} />
      <Route path="/EFCIndependentNoDependents" element={<EFCIndependentNoDependents />} />
      <Route path="/EFCIndependentWithDependents" element={<EFCIndependentWithDependents />} />
      <Route path="/Tuition" element={<Tuition />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
