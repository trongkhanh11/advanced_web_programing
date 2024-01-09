import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import MiniDrawer from '../../components/Drawer';
import { Box, Grid } from '@mui/material';
import TeacherClassCard from '../../components/TeacherClassCard';
import { getCurrentUserApi } from '../../api/profileService';

export default function Teaching() {
  const [classInfo, setClassInfo] = useState([]);

  useEffect(() => {
    async function fetchData(){
      let response = await getCurrentUserApi();
      setClassInfo(response.data.is_teacher_classes)
    }
    fetchData();
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <MiniDrawer>
      <Box sx={{margin: '20px', ml: '30px'}}>
        <Grid container spacing={3} >
          {classInfo.map(element => 
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <TeacherClassCard classInfo={element} />
            </Grid>)
          }
        </Grid>
      </Box>
      </MiniDrawer>
    </React.Fragment>
  )
}