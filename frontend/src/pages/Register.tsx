// src/pages/Register.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', data);
      console.log(response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <Input {...register('name')} required />
        </div>
        <div>
          <label>Email</label>
          <Input type="email" {...register('email')} required />
        </div>
        <div>
          <label>Password</label>
          <Input type="password" {...register('password')} required />
        </div>
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  );
};

export default Register;
