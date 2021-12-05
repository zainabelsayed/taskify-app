import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomePage/home/Home'
import UserBoard from './components/UserBoard/userBoard/UserBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/user-board" element={<UserBoard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
