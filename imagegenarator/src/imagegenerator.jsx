import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios';

//put openai apikey
const API_KEY = '';

function ImageGenerator() {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);

  const getImages = async () => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        prompt: inputValue,
        n: 4,
        size: '1024x1024',
      }),
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', options);
      const data = response.data;
      const newImages = data?.data.map(imageObject => imageObject.url);
      setImages(newImages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <TextField
        label="Enter a prompt"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<Send />}
        onClick={getImages}
      >
        Generate Images
      </Button>

      <Grid container spacing={2}>
        {images.map((imageUrl, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                alt={`Generated Image ${index + 1}`}
                height="250"
                image={imageUrl}
              />
              <CardContent>
                {/* You can add any additional content or information here */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ImageGenerator;
