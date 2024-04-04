import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// props 대신 { title }을 사용하여 구조 분해 할당을 적용합니다.
function EditableTable({ title }) {
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

  const items = Object.keys(values).map((key) => ({
    name: key,
    value: values[key],
  }));

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 5 }}>
        {title} {/* 직접 title을 사용 */}
      </Typography>

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

EditableTable.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EditableTable;
