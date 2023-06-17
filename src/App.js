import Additem from './components/Additem'
import Notecontext from './components/Context/Notecontext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Note from './components/Note';
import Signup from './components/Signup';
import { Route, Routes, Navigate } from "react-router-dom"
import Alert from './components/Alert'
import { useEffect, useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(0)

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      const jwtToken = localStorage.getItem('jwtToken')
      const getUser = async () => {
        try {
          const user = await fetch('http://localhost:8000/api/getuser', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
            }
          })
          const res = await user.json()
          console.log(res)
          if (res.success) {
            setIsLoggedIn(1)
          }
        }
        catch(error){
          console.log('Error : ',error.message)
        }
      }
      getUser()
    }
  }, [])

  const ProtectedLoginRoute = () => {
    if (isLoggedIn) {
      console.log(isLoggedIn)
      return <Navigate to="/" />;
    } else {
      console.log(isLoggedIn)
      return <Login />;
    }
  };

  const ProtectedSignupRoute = () => {
    if (isLoggedIn) {
      console.log(isLoggedIn)
      return <Navigate to="/" />;
    } else {
      console.log(isLoggedIn)
      return <Signup />;
    }
  };





  return (
    <div style={{ height: '100%', backgroundColor: 'white' }}>
      <Notecontext>
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <Alert />
        <Routes>
          <Route exact path='/' element={
            <div >
              <Additem />
              <Note />
            </div>
          } />
          <Route exact path='/login' element={<ProtectedLoginRoute />} />
          <Route exact path='/signup' element={<ProtectedSignupRoute />} />
        </Routes>
      </Notecontext>
    </div>
  );
}

export default App;
