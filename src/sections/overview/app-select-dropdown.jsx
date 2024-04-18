import PropTypes from 'prop-types';
import React, { useState, useEffect, } from 'react';

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

import { useSelectedPatNo } from '../../hooks/useStatusHooks';
import { getResult } from '../../../public/assets/Datas/AKFP_Datas';





function DropdownSelect({ title }) {
    const [selectedValue, setSelectedValue] = useState('Model-1');
    const [isAiResult, setIsAiResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { selectedPatNo } = useSelectedPatNo();

    const result = { getResult }.getResult
    const base64String = `data:image/jpeg;base64,${result.explain_row}`

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

    const runPredict = (e) => {
        e.preventDefault();
        setIsLoading(true); // 로딩 시작
        setIsAiResult(false); // AI 결과 상태 초기화



        setTimeout(() => {
            setIsAiResult(true); // 예시로 setTimeout을 사용하여 결과 설정
            setIsLoading(false); // 로딩 종료
            // 실제 예측 API 호출 및 결과 처리 로직을 여기에 구현...
        }, 1000); // 예측 처리에 대한 시뮬레이션으로 1초 대기
        console.log('Predict has run')
    }

useEffect(()=>{setIsAiResult(false)},[selectedPatNo])

    function renderContent() {
        if (isAiResult) {
            return (
                <>
                    <div className='result'>
                        <h2>
                            <p>급성 신부전증 발생 확률 : {Math.round(result.probability * 100) / 100}%
                            </p>
                        </h2>
                    </div>
                    <div className='base64Img'>
                        <img src={base64String} alt="Base64 Encoded" style={{ width: '100%' }} />
                    </div>
                </>
            );
        }

        if (isLoading) {
            return (
                <div style={{ textAlign: 'center', fontSize: '2rem' }}>
                    예측 결과를 불러오는 중입니다.
                </div>
            );
        }

        return (
            <div style={{ textAlign: 'center', fontSize: '2rem' }}>
                모델을 선택한 후 예측을 시작해주세요.
            </div>
        );
    }


    return (
        <Card sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h6" sx={{ mb: 5 }}>
                {title} {/* 구조 분해 할당을 통해 직접 title을 사용합니다. */}
            </Typography>

            {selectedPatNo ? <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4} md={2} display="flex" flexDirection="row" justifyContent="end" alignItems="center">
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
                <Grid item xs={12} sm={8} md={8}>
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
                <Grid item xs={12} sm={12} md={2}>
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
                <Grid item xs={12} sm={12} md={12}>
                    <div>
                        {renderContent()}
                    </div>
                </Grid>

            </Grid> : <h2>환자를 선택해주세요.</h2>}

        </Card>
    );

}
DropdownSelect.propTypes = {
    title: PropTypes.string.isRequired,
};

export default DropdownSelect;
