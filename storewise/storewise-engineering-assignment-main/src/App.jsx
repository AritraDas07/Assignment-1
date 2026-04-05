import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Board from './components/Board';
import Header from './components/Header';
import IntroWrapper from './components/IntroWrapper';
import Hero from './components/Hero';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <IntroWrapper>
          <div className="App relative z-0">
            <Header />
            <Hero />
            <Routes>
              <Route path="/" element={<Navigate to="/boards" />} />
              <Route path="/boards" element={<Board />} />
            </Routes>
          </div>
        </IntroWrapper>
      </Router>
    </Provider>
  );
}

export default App;
