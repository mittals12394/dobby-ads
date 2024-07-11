// src/pages/UploadImage.tsx
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
  folderId: string;
  image: FileList;
}

const UploadImage: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const location = useLocation();
  const parentFolderId = location.state?.parentFolderId || '';
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('folderId', parentFolderId);
    formData.append('image', data.image[0]);

    try {
      const response = await axios.post('http://localhost:3000/image/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      navigate(`/main/${parentFolderId}`);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <FormContainer>
      <h1>Upload Image</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Image Name</label>
          <Input {...register('name')} required />
        </div>
        <div>
          <label>Upload Image</label>
          <Input type="file" {...register('image')} required />
        </div>
        <Button type="submit">Upload Image</Button>
      </Form>
    </FormContainer>
  );
};

export default UploadImage;
