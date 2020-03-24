import React from 'react';
import Login from './components/login/login.component'
import Register from './components/register/register.component'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Preloader from './components/preloader/preloader'
import 'tachyons'
import ForgotPassword from './components/forgotPassword/forgotPassword';
import StreamPage from './components/StreamPage/streamPage';
import Webcam from 'react-webcam';
import HomePage from './components/Home/homePage';
import Navbar from './components/Navbar/Navbar'

function App() {
  const NavRoute = ({ component: Pages, ...abc }) => {
    return (
      <Route  {...abc} render={(props) => {
        return (
          <>
            <div className='bg-gray black'>
              <Navbar />
            </div>



            <Pages {...props} />



          </>
        )


      }} />


    )


  }
  return (
    <div className="App">
      <BrowserRouter>

        <Switch>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/forgot-password' component={ForgotPassword}></Route>
          <NavRoute path='/stream' component={StreamPage}></NavRoute>
          <NavRoute exact path='/' component={HomePage}></NavRoute>
        </Switch>


      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
