import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline'
import {AppProvider} from './ContextApi'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Login from './component/login/Login'
import Error_404 from './component/Error_404'
import ThemeProvider from './themeProvider';



function Index(){
  return (
    <div>
      <AppProvider>
        <ThemeProvider>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path='/' component={App} />
              <Route exact path='/admin' component={Login}/>
              <Route exact path="*" component={Error_404}/>
            </Switch>
          </Router>
        </ThemeProvider>
      </AppProvider>
  </div>
  )
}



ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
