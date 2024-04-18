import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { useStatus } from 'src/utils/Context API/StatusContext';

import { account } from 'src/_mock/account';
// import { patient } from 'src/_mock/patient';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import { getPatientInfoData } from '../../../public/assets/Datas/AKFP_Datas';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  // const [patNo, setPatNo] = useState('')

  const {
    // isPatSelected, setIsPatSelected,
    // patientNumber, setPatientNumber,
    selectedPatNo, setSelectedPatNo,
  } = useStatus()

  const[patientNumber, setPatientNumber] = useState('')

  const handlePatnoInput = (e) => { 
    setPatientNumber(e.target.value) }

  const handleKeyDownSelectPatNo = (e) => { if (e.key === 'Enter') { 
    setSelectedPatNo(e.target.value)
    setPatientNumber('') } 
  }




  const [selectedPatData, setSelectedPatData] = useState(null)

  useEffect(()=>{
    setSelectedPatData(getPatientInfoData().find(person => person.pat_id === parseInt(selectedPatNo, 10)))
  },[selectedPatNo])
  
  

  // useEffect(() => {
  //   // selectedPatNo가 true로 평가되고 빈 문자열이 아닌지 확인
  //   if (selectedPatNo && selectedPatNo !== '') {
  //     setIsPatSelected(true);
  //   } else {
  //     setIsPatSelected(false);
  //   }
  // }, [selectedPatNo, setIsPatSelected]);


  







  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );


  const renderSearchPatientNumber = (
    <Box
      sx={{
        // my: 3,
        // mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <TextField
        fullWidth // 필드가 그리드 셀의 전체 너비를 차지하도록 설정합니다.
        label='환자번호 조회' // 레이블은 항목의 이름으로 설정됩니다.
        value={patientNumber} // 값은 상태에서 관리되는 항목의 값입니다.
        onChange={(e) => handlePatnoInput(e)} // 값이 변경될 때 handleChange를 호출합니다.
        onKeyDown={(e) => handleKeyDownSelectPatNo(e)}
        // name={item.name} // 각 필드를 식별하기 위한 이름으로 항목의 키를 사용합니다.
        type='number'
      />
    </Box>

  )

  const renderSelectedPatientInfo = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>선택환자 정보</Typography>
        <hr />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>환자번호: {selectedPatNo}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>성별: {selectedPatData && selectedPatData.sex}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>나이: {selectedPatData && selectedPatData.real_age}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>몸무게: {selectedPatData && selectedPatData.patientweight}</Typography>
      </Box>
    </Box>
  )

  const renderNotSelectedPatientInfo = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>선택환자 정보</Typography>
        <hr />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}> 선택된 환자 정보가 존재하지 않습니다. 대상 환자를 선택해주세요.
        </Typography>

      </Box>
    </Box>
  )



  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderHelp = (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box
          component="img"
          src="/assets/images/avatars/avatar_2.jpg"
          sx={{ width: 100, position: 'absolute', top: -50 }}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Need Help?</Typography>

          <Typography variant="h7" sx={{ mt: 1, }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            반영훈
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            010-7595-7666 qksdudgns92@gmail.com
          </Typography>

        </Box>

        {/* <Button
          href="https://material-ui.com/store/items/minimal-dashboard/"
          target="_blank"
          variant="contained"
          color="inherit"
        >
          Upgrade to Pro
        </Button> */}
      </Stack>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}
      {renderSearchPatientNumber}
      {selectedPatData ? renderSelectedPatientInfo : renderNotSelectedPatientInfo}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />

      {renderHelp}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
