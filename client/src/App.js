import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreens from './screens/Landingscreens';
function App() {
  return (
    <div className="App">
     
    <Navbar/> 
   <BrowserRouter>
   
   <Routes>
   <Route path='/home' exact element={<Homescreen/>} />
   <Route path='/book/:roomid/:fromdate/:todate' exact element={<Bookingscreen/>} />
   <Route path='/register' exact element={<Register/>} />
   <Route path='/login' exact element={<Loginscreen/>} />
   <Route path='/profile' exact element={<Profilescreen/>} />
   <Route path='/' exact element={<Landingscreens/>} />
   </Routes>
   
   </BrowserRouter>
    </div>
  );
}

export default App;
