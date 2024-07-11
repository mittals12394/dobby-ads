// src/pages/CreateFolder.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
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
  parent: string | null;
}

const CreateFolder: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const location = useLocation();
  const navigate = useNavigate();
  const parentFolderId = location.state?.parentFolderId || null;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const folderData = { ...data, parent: parentFolderId };

    try {
      const response = await axios.post('http://localhost:3000/folder/create-folder', folderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log(response.data);
      navigate(`/main/${parentFolderId ? parentFolderId : ''}`);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <FormContainer>
      <h1>Create Folder</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Folder Name</label>
          <Input {...register('name')} required />
        </div>
        <Button type="submit">Create Folder</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateFolder;
