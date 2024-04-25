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
  RagisterScreen,
  Profile
} from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<LandingPage />} exact />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RagisterScreen />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/createnote' element={<CreateNote />} />
        <Route path='/note/:id' element={<SingleNote />} />
        <Route path='/mynotes' element={<MyNotes search={search} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
