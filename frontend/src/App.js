import './App.css';
import { Footer, Header, LandingPage, LoginScreen, MyNotes, RagisterScreen } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} exact />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RagisterScreen />} />
        <Route path='/mynotes' element={<MyNotes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
