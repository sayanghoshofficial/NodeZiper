import { useState } from 'react';
import './App.css';
import {
  SingleNote,
  CreateNote,
  Footer,
  Header,
  LandingPage,
  LoginScreen,
  MyNotes,
  RagisterScreen
} from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState("");
  console.log(search)
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<LandingPage />} exact />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RagisterScreen />} />
        <Route path='/createnote' element={<CreateNote />} />
        <Route path='/note/:id' element={<SingleNote />} />
        <Route path='/mynotes' element={<MyNotes search={search} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
