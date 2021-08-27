import React, { useState } from 'react';
import useStore from '../../hooks/store';
import { Button, Input } from '../../components';

export default function AuthPage() {
  const { actions } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogInButtonClick() {
    if (email && password) {
      actions.logInUser(email, password).catch((error) => setError(error.message));
    }
  }

  function handleRegisterButtonClick() {
    if (email && password) {
      actions.registerUser(email, password).catch((error) => setError(error.message));
    }
  }
  
  return (
    <div id="login-page" className="page">
      {error && <div>{error}</div>}

      <div className="container container-auth">
        <form className="form-block form-block-auth">
          <h2>Вход</h2>
          <Input
            type="email"
            value={email}
            onChange={setEmail}
          />

          <Input
            type="password"
            value={password}
            onChange={setPassword}
          />
        </form>

        <div className="form-button-auth">
          <Button classButton={"button"} onClick={handleLogInButtonClick} value={"Войти"}/>
          <Button classButton={"button"} onClick={handleRegisterButtonClick} value={"Зарегистрироваться"}/>
        </div>
      </div>
    </div>
  );
}
