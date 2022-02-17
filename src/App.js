import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameBoard from './GameBoard';

function App() {
  return (
    <div className='app-routes'>
      <Switch>
        <Route path='/'>
          <GameBoard />
        </Route>
      </Switch>
      </div>
  );
}

export default App;
