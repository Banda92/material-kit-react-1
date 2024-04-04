import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function EditableTable() {
  // 상태 관리를 위한 예시 코드
  // 실제로는 100여 개의 항목을 관리하기 위해 이러한 형태로 상태를 관리할 수 있습니다.
  const [values, setValues] = useState({
    item1: "값 1",
    item2: "값 2",
    item3: "값 3",
    item4: "값 4",
    item5: "값 5",
    item6: "값 6",
    item7: "값 7",
    item8: "값 8",
    item9: "값 9",
    item10: "값 10",
    // 추가 행...
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // 항목 리스트 예시 (100개를 넣어야 한다면, 이 배열에 추가)
  const items = Object.keys(values).map((key) => ({
    name: key,
    value: values[key],
  }));

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Stack spacing={1}>
              <TextField
                fullWidth
                label={item.name}
                value={item.value}
                onChange={handleChange}
                name={item.name}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default EditableTable;
