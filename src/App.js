import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Employee from './Component/Employee';
import Attendance from './Component/Attendance';
import Advance from './Component/Advance';
import Leave from './Component/Leave';
import Salary from './Component/Salary';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
         <div className="container-fluid">
          
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
             <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="collapsibleNavbar">
             <ul className="navbar-nav">
               <li className="nav-item"> 
                 <Link className='nav-link' to="/Employee" >Employee</Link>
               </li>
               <li className="nav-item"> 
                 <Link className='nav-link' to="/Attendance" >Attendance</Link>
               </li>
               <li className="nav-item"> 
                 <Link className='nav-link' to="/Advance" >Advance</Link>
               </li>
               <li className="nav-item"> 
                 <Link className='nav-link' to="/Leave" >Leave</Link>
               </li>
               <li className="nav-item"> 
                 <Link className='nav-link' to="/Salary" >Salary</Link>
               </li>
             </ul>
           </div>
         </div>
       </nav>
    <Routes>
   
    <Route path='/Employee' element={<Employee></Employee>}></Route>
     <Route path='/Attendance' element={<Attendance/>}></Route> 
     <Route path='/Advance' element={<Advance/>}></Route> 
     <Route path='/Leave' element={<Leave/>}></Route> 
     <Route path='/Salary' element={<Salary/>}></Route>
    </Routes>
    </BrowserRouter>
   </div>


  );
}


export default App;
