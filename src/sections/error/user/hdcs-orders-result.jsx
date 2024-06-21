import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Folder,
  Delete,
  ArrowBack,
  FolderOpen,
  ArrowForward,
} from '@mui/icons-material';
import {
  Box,
  Card,
  Grid,
  Table,
  Paper,
  Button,
  Select,
  MenuItem,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  CardHeader,
  IconButton,
  InputLabel,
  Typography,
  CardContent,
  FormControl,
  TableContainer,
} from '@mui/material';

function HdcsResults({ title, subheader, ...other }) {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDay, setFilterDay] = useState('');

  const handleAddFolder = () => {
    // Logic for adding a folder
  };

  const handleDeleteFolder = (index) => {
    setFolders((prevFolders) => prevFolders.filter((_, i) => i !== index));
  };

  const handleRowClick = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const handlePrevImage = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = [
        { name: '240621ECG.png', date: '2024-06-21', path: '/assets/images/EKG/240621ECG.png' },
        { name: '240621TestPaper.png', date: '2024-06-21', path: '/assets/images/EKG/240621TestPaper.png' },
      ];
      setImages(fetchedImages);
    };

    fetchImages();
  }, [folders]);

  const filteredImages = images.filter((image) => {
    const date = new Date(image.date);
    const yearMatch = filterYear ? date.getFullYear() === parseInt(filterYear, 10) : true;
    const monthMatch = filterMonth ? date.getMonth() + 1 === parseInt(filterMonth, 10) : true;
    const dayMatch = filterDay ? date.getDate() === parseInt(filterDay, 10) : true;
    return yearMatch && monthMatch && dayMatch;
  });

  return (
    <Card {...other} sx={{ height: '100%' }}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  label="Year"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  {/* Add more years as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  label="Month"
                >
                  <MenuItem value="">All</MenuItem>
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Day</InputLabel>
                <Select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                  label="Day"
                >
                  <MenuItem value="">All</MenuItem>
                  {Array.from({ length: 31 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>파일명</TableCell>
                <TableCell>생성일자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredImages.map((image, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(index)}
                  sx={{ cursor: 'pointer', backgroundColor: selectedImage && selectedImage.name === image.name ? '#f0f0f0' : 'inherit' }}
                >
                  <TableCell>{image.name}</TableCell>
                  <TableCell>{image.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" startIcon={<FolderOpen />} onClick={handleAddFolder}>
                폴더 등록
              </Button>
            </Grid>
            {folders.map((folder, index) => (
              <Grid item key={index}>
                <Button variant="contained" startIcon={<Folder />} endIcon={<Delete />} onClick={() => handleDeleteFolder(index)}>
                  {folder}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, minHeight: 400, position: 'relative' }}>
          {selectedImage ? (
            <>
              <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', left: 0 }}>
                <ArrowBack />
              </IconButton>
              <Box component="img" src={selectedImage.path} alt={selectedImage.name} sx={{ maxWidth: '80%', maxHeight: 400, margin: '0 auto' }} />
              <IconButton onClick={handleNextImage} sx={{ position: 'absolute', right: 0 }}>
                <ArrowForward />
              </IconButton>
            </>
          ) : (
            <Typography variant="h6">이미지를 선택해주세요</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

HdcsResults.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};

export default HdcsResults;
