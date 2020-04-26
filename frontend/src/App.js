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
import Plans from './components/plans/plans';
import Help from './components/help/help';
import UploadImage from './components/ResetPassword/resetPassword';
import Profile from './components/myprofile/details.profile';
import Songpage from './components/StreamPage/songpage/songpage';
import UpdateUserInfo from './components/updateUserInfo/updateUserInfo';
import ResetPassword from './components/ResetPassword/resetPassword';


function App() {
  const NavRoute = ({ component: Pages, ...abc }) => {
    return (
      <Route  {...abc} render={(props) => {
        return (
          <>
            <div style={{ zIndex: '150' }} >
              <Navbar />
            </div>

            <div style={{ marginTop: '3%' }} >
              <Pages {...props} />
            </div>





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
          <Route path='/reset-password/:token' component={ResetPassword}></Route>
          <Route path='/forgot-password' component={ForgotPassword}></Route>
          <NavRoute path='/stream' component={StreamPage}></NavRoute>
          <NavRoute path='/profile' component={Profile}></NavRoute>
          <NavRoute path='/settings' component={UploadImage}></NavRoute>
          <NavRoute path='/plans' component={Plans}></NavRoute>
          <NavRoute path='/help' component={Help}></NavRoute>
          <NavRoute path='/updateProfile' component={UpdateUserInfo}></NavRoute>
          <NavRoute exact path='/' component={HomePage}></NavRoute>
        </Switch>


      </BrowserRouter>
      <ToastContainer />

    </div>
  );
}

export default App;
