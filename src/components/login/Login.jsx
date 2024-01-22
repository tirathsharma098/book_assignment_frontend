import React, { useCallback, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useSubmit } from 'react-router-dom';
const Login = (props) => {
  const FORM_TYPE = props.formType;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  let submit = useSubmit();

  const setAuthPage = (authPageToGo) => {
    props.setAuthPage(authPageToGo);
  };

  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
  );

  const onSubmitForm = useCallback(() => {
    submit(
      {
        username: username,
        password: password,
        mode: props.authPage,
        remember_me: rememberMe,
      },
      { method: 'post', encType: 'application/json' },
    );
  }, [username, password, props.authPage, rememberMe, submit]);

  return (
    <div>
      <div className={containerClassName}>
        <div className="flex flex-column align-items-center justify-content-center">
          <div
            style={{
              borderRadius: '56px',
              padding: '0.3rem',
              marginTop: '0.3rem',
              background:
                'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
            }}
          >
            <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
              <h3 className="text-center mb-5">
              Sartia Global
                {/* <div className="text-900 text-3xl font-medium mb-3">Presence</div>
                <span className="text-600 font-medium">Take your attendance</span> */}
              </h3>

              <div className="flex flex-column justify-content-center">
                {props.authPage === FORM_TYPE.LOGIN && (
                  <>
                    <label htmlFor="username" className="block text-900 text-xl font-medium mb-1">
                      Email
                    </label>
                    <InputText
                      id="username"
                      type="text"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Email address"
                      className="p-inputtext-sm w-full md:w-30rem mb-3"
                      style={{ zIndex: 200, backgroundColor: 'white' }}
                    />

                    <label htmlFor="password" className="block text-900 font-medium text-xl mb-1">
                      Password
                    </label>
                    <Password
                      inputId="password"
                      value={password}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      toggleMask
                      feedback={false}
                      className="p-inputtext-sm w-full md:w-30rem mb-3"
                      inputClassName="w-full md:w-30rem"
                    />
                    <div className="flex align-items-center justify-content-between mb-5 gap-5">
                      <div className="flex align-items-center">
                        <Checkbox
                          inputId="remember_me"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.checked ?? false)}
                          className="mr-2"
                        />
                        <label htmlFor="remember_me">Remember me</label>
                      </div>
                    </div>
                  </>
                )}
                {props.authPage === FORM_TYPE.VERIFY_EMAIL && (
                  <>
                    <label
                      htmlFor="forgot_email"
                      className="block text-900 text-xl font-medium mb-1"
                    >
                      Email
                    </label>
                    <InputText
                      id="forgot_email"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Email address"
                      className="p-inputtext-sm w-full md:w-30rem mb-3"
                    />
                  </>
                )}
                <div className="flex flex-column">
                  <Button size="small" style={{ fontSize: '18px' }} onClick={onSubmitForm}>
                    {props.authPage === 'login' && 'Sign In'}
                    {props.authPage === 'verify-email' && 'Forgot Password'}
                  </Button>
                  <span
                    className="font-medium no-underline ml-2 text-right cursor-pointer"
                    style={{ color: 'var(--primary-color)' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setAuthPage(props.authPage === 'login' ? 'verify-email' : 'login');
                    }}
                  >
                    {props.authPage === 'login' ? 'Forgot password?' : 'Login'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
