// src/pages/Main.tsx

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaFolder, FaImage, FaSearch } from "react-icons/fa";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Main: React.FC = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [folders, setFolders] = useState<any>({ children: [], images: [] });
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  let { folderId } = useParams();

  const fetchFoldersAndImages = useCallback(async () => {
    try {
      let url = "http://localhost:3000/folder/folder-by-id";
      if (folderId) {
        url += `?folderId=${folderId}`;
      }

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const fetchedFolderId = response.data.data._id;
      if (!folderId) {
        folderId = fetchedFolderId;
      }

      setCurrentFolderId(fetchedFolderId);
      setFolders(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [folderId]);

  useEffect(() => {
    fetchFoldersAndImages();
  }, [fetchFoldersAndImages]);

  const handleCreateFolder = () => {
    navigate("/create-folder", { state: { parentFolderId: currentFolderId } });
  };

  const handleUploadImage = () => {
    navigate("/upload-image", { state: { parentFolderId: currentFolderId } });
  };

  const handleFolderClick = (folderId: string) => {
    navigate(`/main/${folderId}`);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/image/get-user-images?search=${searchTerm}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response);
      

      setFolders(response.data.data);
    } catch (error) {
      console.error("Error searching images:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <MainContainer>
      <h1>Welcome to the Main Page</h1>
      
      {/* Search box */}
      <SearchContainer>
        <SearchInput type="text" value={searchTerm} onChange={handleChange} placeholder="Search images..." />
        <SearchButton onClick={handleSearch}><FaSearch /> Search</SearchButton>
      </SearchContainer>

      <div>
        {folders && folders.children && folders.children.map((folder: any) => (
          <div
            className=""
            key={folder._id}
            onClick={() => handleFolderClick(folder._id)}
          >
            <FaFolder size={20} />
            <p>{folder.name}</p>
          </div>
        ))}
      </div>
      <div>
        {folders && folders.images && folders.images.map((image: any) => (
          <div className="" key={image._id}>
            <FaImage size={20} />
            <img src={`http://localhost:3000/${image.image}`} alt={image.name} />
          </div>
        ))}
      </div>
      <button onClick={handleCreateFolder}>Create Folder</button>
      <button onClick={handleUploadImage}>Upload Image</button>
    </MainContainer>
  );
};

export default Main;
