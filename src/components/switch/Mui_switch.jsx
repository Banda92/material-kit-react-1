import React from 'react';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function ToggleButton(statusProps) {
    // const [checked, setChecked] = useState(false);
    const {setIsDiagTrue, isDiagTrue} = statusProps
    


    const handleChange = (event) => {
        // setChecked(event.target.checked);
        setIsDiagTrue(!isDiagTrue);
    };

    return (
        <Box display="flex" flexDirection="row" justifyContent="flex-end" alignItems='center'>
            <div style={{ marginRight: '2vw' }}> True값만 보기 </div>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isDiagTrue}
                            onChange={handleChange}
                            sx={{
                                transform: 'scale(1.2)',
                                '@media (max-width: 600px)': {
                                    transform: 'scale(0.75)', // 작은 화면
                                },
                                '@media (min-width: 601px) and (max-width: 900px)': {
                                    transform: 'scale(0.85)', // 중간 크기 화면
                                },
                                // 넓은 화면에서는 scale(1)로 이미 설정되어 있음
                            }}
                        />
                    }
                    label={isDiagTrue ? 'On' : 'Off'}
                />
            </FormGroup>
        </Box>
    );
}

export default ToggleButton;
