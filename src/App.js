import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmailView from './views/EmailView';
import Link from 'next/link';
const App = () => {

  return <div>
    <div>
      Welcome to Ian Laksono's Email Sender.
      </div>
    <EmailView />
  </div>;

};
export default App;