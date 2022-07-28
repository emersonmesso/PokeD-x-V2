import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Captur from './pages/Captur';

ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <ColorModeScript />
    </StrictMode>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<Pokemon />} />
      <Route path="/capturados" element={<Captur />} />
    </Routes>

  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
