import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InfoIcon from '@mui/icons-material/Info';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';




function DropdownSelect({ title }) {
    const [selectedValue, setSelectedValue] = useState('Model-1');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const modelList = ["Model-1", "Model-2", "Model-3"];
    const modelInfo = {
        "Model-1": "Model 1의 정보입니다.",
        "Model-2": "Model 2의 정보입니다.",
        "Model-3": "Model 3의 정보입니다.",
    };

    const [open, setOpen] = useState(false);
    const handleTooltipToggle = () => {
        setOpen(!open);
    };

    const runPredict = () => {
        console.log('Predict has run')
    }

    return (
        <Card sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h6" sx={{ mb: 5 }}>
                {title} {/* 구조 분해 할당을 통해 직접 title을 사용합니다. */}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Tooltip
                        title={selectedValue ? modelInfo[selectedValue] : modelInfo[modelList[0]]}
                        open={open}
                        onClose={() => setOpen(false)}
                        enterTouchDelay={0}
                        leaveTouchDelay={5000}
                    >
                        <IconButton onClick={handleTooltipToggle} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                            <InfoIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption">모델 정보</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">모델 선택</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedValue}
                            label="Model"
                            displayEmpty
                            onChange={handleChange}
                        >
                            {modelList.map((model, index) => (
                                <MenuItem key={index} value={model}>{model}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} md={2}>
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="inherit"
                        onClick={runPredict}
                    >
                        예측 시작
                    </LoadingButton>



                </Grid>
            </Grid>
        </Card>
    );
    
}
DropdownSelect.propTypes = {
    title: PropTypes.string.isRequired,
  };
  
export default DropdownSelect;
