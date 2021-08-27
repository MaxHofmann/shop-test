import './scss/app.scss';
import React, { useEffect } from 'react';
import useStore from './hooks/store';
import { Home, AddProduct, AuthPage, UpdateProduct } from './pages/';
import { Header, AppContent } from './components';
import { Switch, Route } from 'react-router-dom';

function App() {
  const { state, actions } = useStore();

  useEffect(() => {
    actions.initAuth();
  }, [actions]);

  if (!state.user) {
    return <Route component={AuthPage} />;
  } else {
    return (
      <div className="wrapper">
        <Header />
        <AppContent>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddProduct} />
            <Route exact path="/update" component={UpdateProduct} />
          </Switch>
        </AppContent>
      </div>
    );
  }
}

export default App;
