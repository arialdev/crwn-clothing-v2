
import { useState } from "react";
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from "../button/button.component";
import FormInput from "../form-input/form-input";

import '././sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailandPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (error) {
      console.error('User creation encoutered an error', error);
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't you have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label="Display Name" required name="displayName" onChange={handleChange} value={displayName} />
        <FormInput label="Email" required name="email" onChange={handleChange} value={email} />
        <FormInput label="Password" required name="password" onChange={handleChange} value={password} type="password" />
        <FormInput label="Confirm Password" required name="confirmPassword" onChange={handleChange} value={confirmPassword} type="password" />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;