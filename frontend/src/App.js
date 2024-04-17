import './App.css';
import { Footer, Header, LandingPage, MyNotes } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<LandingPage/>} exact/>
        <Route path='/mynotes' element={<MyNotes/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
