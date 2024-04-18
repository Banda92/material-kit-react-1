import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// 이 컴포넌트는 편집 가능한 테이블 형태로 여러 개의 데이터 항목을 보여주고 수정할 수 있도록 설계되었습니다.
// 특히 MUI 컴포넌트를 사용하여 미적으로 깔끔하고 사용자 친화적인 인터페이스를 제공합니다.
function EditableTable({ title,data }) {
  // useState를 사용하여 컴포넌트의 상태를 관리합니다. 여기서는 여러 데이터 항목의 값을 저장하고 있습니다.
  const [values, setValues] = useState(data);

  // console.log(data)

  // 각 입력 필드의 값이 변경될 때 호출되는 이벤트 핸들러입니다.
  // 변경된 값은 상태에 반영되어 UI가 즉시 업데이트됩니다.
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // 상태에서 항목의 이름과 값을 추출하여, 입력 필드로 렌더링하기 쉽게 배열로 변환합니다.
  const items = Object.keys(values).map((key) => ({
    name: key,
    value: values[key],
  }));

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      {/* 제목을 표시하는 Typography 컴포넌트, 상단에 마진을 줘서 내용과의 간격을 조정합니다. */}
      <Typography variant="h6" sx={{ mb: 5 }}>
        {title} {/* 구조 분해 할당을 통해 직접 title을 사용합니다. */}
      </Typography>
      {console.log(data)}
{Object.keys(data).length!==0?<>
      {/* Grid 컨테이너를 사용하여 항목들을 반응형 그리드로 정렬합니다. */}
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            {/* Stack 컴포넌트는 각 TextField를 수직으로 정렬합니다. */}
            <Stack spacing={1}>
              {/* TextField 컴포넌트를 사용하여 데이터를 입력하고 수정할 수 있습니다. */}
              <TextField
                fullWidth // 필드가 그리드 셀의 전체 너비를 차지하도록 설정합니다.
                label={item.name} // 레이블은 항목의 이름으로 설정됩니다.
                value={item.value} // 값은 상태에서 관리되는 항목의 값입니다.
                onChange={handleChange} // 값이 변경될 때 handleChange를 호출합니다.
                name={item.name} // 각 필드를 식별하기 위한 이름으로 항목의 키를 사용합니다.
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
      </>
      :
      <h2>환자를 선택해주세요.</h2>
      }
      
    </Card>
  );
}

// props의 타입을 검사하여 title이 반드시 문자열로 전달되어야 함을 지정합니다.
EditableTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export default EditableTable;
