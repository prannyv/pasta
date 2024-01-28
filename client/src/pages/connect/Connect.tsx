import React, { useRef, useState, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import rachelteam from "../../assets/rachelsteam.png"; 
import atrium from "../../assets/IMG_1774.jpg";
import stanley from "../../assets/IMG_1769.jpg";
import sophieteam from "../../assets/IMG_1770.jpg";
import Marracas from "../../assets/marracas.gif";
import { BottomBlob, TopBlob } from '../home/Hero';
import Background2 from "../../assets/background2.png";
import Background1 from "../../assets/background1.png";
const Connect = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const media: string[] = [rachelteam, stanley, sophieteam, atrium];


  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      // Send the base64-encoded image to the API endpoint
      addToDatabase(base64String, "description", "keywords");
    };
    reader.readAsDataURL(file);
  };

  const addToDatabase = (base64String: string, description: string, keywords: string) => {
    // Replace 'yourApiEndpoint' with your actual API endpoint
    const uploadEndpoint = 'http://localhost:5000/upload';
    // http://localhost:5000/upload?image=iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAmklEQVR42mP8z8AARIhkmGADDCSCDUDSAGDBCgOFAKpAMVAIMQxAAQAAZMIgADBBgByCgAAGYAmEJFAbEAiCBngAYYAFgCBggDzAAFM+QBRQAUwAAAAASUVORK5CYII=&description=imagedescription
    
    console.log("base64String: ", base64String)
    const requestBody = {
      image: base64String.slice(23),  // "data:image/jpeg;base64,".length
      description: description,
      keywords: keywords,
    };

    // Perform the API call here, using fetch or any other HTTP library
    fetch(uploadEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Image uploaded successfully:', data);
        // You can handle the response from the server here
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };


  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("pog")
    const selectedFiles = e.currentTarget.files;

    if (selectedFiles) {
      setFiles(selectedFiles);
      if (selectedFiles) {
        console.log("selected files converted to base 64");
        convertToBase64(selectedFiles[0]);
      }
    }
  };


  
  return (
    <ConnectContainer>
      <ConnectHeader>
        <h1>
          Connect your Media
        </h1>
        <UploadContainer>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg"
            style={{
              display: "none",
            }}
            onChange={handleChangeFile}
            multiple
          />
          <UploadButton 
            onClick={() => fileInputRef.current?.click()}>
              <p>
                Upload Photos!
              </p>              
          </UploadButton>
        </UploadContainer>
        <FilesContainer>
          {files && (
              Array.from(files).map((file, index) =>
                <p key={index}>{file.name}</p>)
          )}
        </FilesContainer>
      </ConnectHeader>
      
      <MediaContainer>
        <MediaGallery>
          {media.map((photo, index) => 
          <div key={index}>
            <img src={photo}/>
          </div>)
          }
        </MediaGallery>
      </MediaContainer>

    </ConnectContainer>
  )
}
const ConnectContainer = styled.div`
  margin: 0;
  padding: 0
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

`

const GradientAnimation = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`

const ConnectHeader = styled.div`
  background: linear-gradient(231deg, #ce89a9, #98769e, #7dbfcb);
  background-size: 600% 600%;
  height: 450px;
  width: 100vw;
  margin-top: 0px;
  padding: 0px;
  padding-top: 85px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  -webkit-animation: ${GradientAnimation} 9s ease infinite;
  -moz-animation: ${GradientAnimation} 9s ease infinite;
  animation: ${GradientAnimation} 9s ease infinite;

  > h1 {
    color: white;
    font-family: Helvetica Now Display;
    font-weight: 600;
    font-size: 55px;
  }
`

const UploadButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: white;
  width: 200px;
  outline: 2px solid white;
  border: none;
  height: 60px;
  cursor: pointer;
  text-align: center;
  font-family: Helvetica Now Display;
  transition: all 500ms;
  font-weight: 600;
  border-radius: 10px;
  font-size: 15px;
  :hover {
    background-color: white;
    > p {
      background-image: linear-gradient(to right, #44A2B1, #C15A93, #B9B8BF);
      background-size: 100%;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent; 
      -moz-text-fill-color: transparent;
    }
  }
`

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FilesContainer = styled.div`
  display: flex;
  color: rgba(255, 255, 255, 0.8);
  text-family: Helvetica Now Display;
  font-weight: 500;
  margin-top: 20px;
  flex-wrap: wrap;
  min-height: 50px;
`
const MediaGallery = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  display: grid;
  align-items: center;
  div {
    width: 275px;
    height: 250px;
    display: flex;
    transition: all 500ms;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
      width: 100%;
      object-fit: cover;
      transition: transform 300ms;
      :hover {
        transform: translateY(-10px);
      }
    }
  }
  gap: 60px;
  z-index: 5;
`

const MediaContainer = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
`
export default Connect
