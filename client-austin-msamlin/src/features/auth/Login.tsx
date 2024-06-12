import { useRef, useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

const Login = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...data, user: email }));
      setEmail('');
      setPassword('');
      navigate('/task');
    } catch (err) {
      setErrMsg('Login Failed');
      errRef.current?.focus();
    }
  };

  const handleEmailInput = (e: { target: { value: SetStateAction<string> } }) =>
    setEmail(e.target.value);
  const handlePasswordInput = (e: {
    target: { value: SetStateAction<string> };
  }) => setPassword(e.target.value);
  const handleFirstNameInput = (e: {
    target: { value: SetStateAction<string> };
  }) => setFirstName(e.target.value);
  const handleLastNameInput = (e: {
    target: { value: SetStateAction<string> };
  }) => setLastName(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Login OR Sign UP</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">Name</label>
        <input
          type="text"
          id="firstName"
          ref={userRef}
          value={firstName}
          onChange={handleFirstNameInput}
          autoComplete="off"
          required
        />
        <label htmlFor="lastName">Surname</label>
        <input
          type="text"
          id="lastName"
          ref={userRef}
          value={lastName}
          onChange={handleLastNameInput}
          autoComplete="off"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />
        <button>Sign In</button>
        <button type="button" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </section>
  );

  return content;
};
export default Login;
