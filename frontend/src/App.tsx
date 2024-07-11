// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Main from './pages/Main';
import CreateFolder from './pages/CreateFolder';
import UploadImage from './pages/UploadImage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main/:folderId?" element={<Main />} />
        <Route path="/create-folder" element={<CreateFolder />} />
        <Route path="/upload-image" element={<UploadImage />} />
      </Routes>
    </Router>
  );
};

export default App;
