import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter, Route, Link,  Routes } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Loginscreen from './screens/Loginscreen';
function App() {
  return (
    <div className="App">
     
    <Navbar/> 
   <BrowserRouter>
   
   <Routes>
   <Route path='/home' exact element={<Homescreen/>} />
   <Route path='/book/:roomid' exact element={<Bookingscreen/>} />
   <Route path='/register' exact element={<Register/>} />
   <Route path='/login' exact element={<Loginscreen/>} />
   </Routes>
   
   </BrowserRouter>
    </div>
  );
}

export default App;
