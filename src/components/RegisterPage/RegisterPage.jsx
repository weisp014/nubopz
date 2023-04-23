import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom';
import { Button } from "@mui/material";

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          name="register"
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
