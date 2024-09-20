// import { faker } from '@faker-js/faker';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography } from '@mui/material';
// // components
// import Page from '../components/Page';
// import Iconify from '../components/Iconify';
// // sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// // ----------------------------------------------------------------------

// export default function DashboardApp() {
//   const theme = useTheme();

//   return (
//     <Page title="Dashboard">
//       {/* <Container maxWidth="xl">


//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Total Blogs" total={714000} icon={'ant-design:android-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Total Quotes" total={1352831} color="info" icon={'ant-design:apple-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Total Categories" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Total Users" total={234} color="error" icon={'ant-design:bug-filled'} />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppWebsiteVisits
//               title="Website Visits"
//               subheader="(+43%) than last year"
//               chartLabels={[
//                 '01/01/2003',
//                 '02/01/2003',
//                 '03/01/2003',
//                 '04/01/2003',
//                 '05/01/2003',
//                 '06/01/2003',
//                 '07/01/2003',
//                 '08/01/2003',
//                 '09/01/2003',
//                 '10/01/2003',
//                 '11/01/2003',
//               ]}
//               chartData={[
//                 {
//                   name: 'Team A',
//                   type: 'column',
//                   fill: 'solid',
//                   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//                 },
//                 {
//                   name: 'Team B',
//                   type: 'area',
//                   fill: 'gradient',
//                   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//                 },
//                 {
//                   name: 'Team C',
//                   type: 'line',
//                   fill: 'solid',
//                   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentVisits
//               title="Current Visits"
//               chartData={[
//                 { label: 'America', value: 4344 },
//                 { label: 'Asia', value: 5435 },
//                 { label: 'Europe', value: 1443 },
//                 { label: 'Africa', value: 4443 },
//               ]}
//               chartColors={[
//                 theme.palette.primary.main,
//                 theme.palette.chart.blue[0],
//                 theme.palette.chart.violet[0],
//                 theme.palette.chart.yellow[0],
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppConversionRates
//               title="Conversion Rates"
//               subheader="(+43%) than last year"
//               chartData={[
//                 { label: 'Italy', value: 400 },
//                 { label: 'Japan', value: 430 },
//                 { label: 'China', value: 448 },
//                 { label: 'Canada', value: 470 },
//                 { label: 'France', value: 540 },
//                 { label: 'Germany', value: 580 },
//                 { label: 'South Korea', value: 690 },
//                 { label: 'Netherlands', value: 1100 },
//                 { label: 'United States', value: 1200 },
//                 { label: 'United Kingdom', value: 1380 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentSubject
//               title="Current Subject"
//               chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
//               chartData={[
//                 { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
//                 { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
//                 { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
//               ]}
//               chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 {
//                   name: 'FaceBook',
//                   value: 323234,
//                   icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
//                 },
//                 {
//                   name: 'Google',
//                   value: 341212,
//                   icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
//                 },
//                 {
//                   name: 'Linkedin',
//                   value: 411213,
//                   icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
//                 },
//                 {
//                   name: 'Twitter',
//                   value: 443232,
//                   icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container> */}
//     </Page>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import cardImg1 from "../assest/activity_1.png"
import cardImg2 from "../assest/ic_customer.png"
import {CountsTotalGet, CountsStatusGet} from '../Api/counts'; 





const COLORS = ['#000091', '#DA0003', '#027402'];

function DashboardApp ()  {
  const [totalData, setTotalData] = useState({
    userCount: 0,
    grievanceCount: 0,
    eventCount: 0,
    epicUserCount: 0,
    constituencyCount: 0,
    boothCount: 0,
    adminCount: 0,
  });
  const [statusData, setStatusData] = useState({
    users: { active: 0, inactive: 0 },
    epicUsers: { active: 0, inactive: 0 },
    grievances: { accepted: 0, processing: 0, completed: 0, rejected: 0 },
    events: { accepted: 0, processing: 0, completed: 0, rejected: 0 },
  });

  const dataPie = [
    { name: 'Total Grievances', value: totalData.grievanceCount },
    { name: 'Completed', value: statusData.grievances.completed },
    { name: 'Rejected', value: 7 },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalResponse = await CountsTotalGet();
        if (totalResponse.success) {
          setTotalData(totalResponse.data);
        } else {
          console.error('Failed to fetch total data:', totalResponse.message);
        }

        const statusResponse = await CountsStatusGet();
        if (statusResponse.success) {
          setStatusData(statusResponse.data);
        } else {
          console.error('Failed to fetch status data:', statusResponse.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome to Admin!
      </Typography>
      <Grid container spacing={3}>
        {/* Top Cards */}



        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ borderRadius: "50%", padding: "10px", backgroundColor: "#DEE4FF", }}>
              <img src={cardImg1} alt="Card" />
            </Box>
            <CardContent>

              <Typography variant="h3">{totalData.grievanceCount}</Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>Total Grievances</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ borderRadius: "50%", padding: "10px", backgroundColor: "#DEE4FF", }}>
              <img src={cardImg1} alt="Card" />
            </Box>

            <CardContent>
              <Typography variant="h3"> {statusData.grievances.completed}</Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ borderRadius: "50%", padding: "10px", backgroundColor: "#DEE4FF", }}>
              <img src={cardImg2} alt="Card" />
            </Box>

            <CardContent>
              <Typography variant="h3">{totalData.epicUserCount}</Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "10px" }}>Total Karyakarthas</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", padding: "10px", justifyContent: "space-between", alignItems: "center", paddingBottom: "20px" }}>
            <Box sx={{ borderRadius: "50%", padding: "10px", backgroundColor: "#DEE4FF" }}>
              <img src={cardImg1} alt="Card" />
            </Box>

            <CardContent sx={{ padding: "10px" }}>
              <Typography variant="h3">{totalData.userCount}</Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>Total Users</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Grievances Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h6" gutterBottom>
                  Grievances
                </Typography>
                <Box sx={{ display: "flex", backgroundColor: "#F4F5F9", padding: "5px" }}>
                  <Button disabled>
                    Monthly
                  </Button>
                  <Button disabled>
                    Weekly
                  </Button>
                  <Button sx={{ backgroundColor: "white", color: "black" }}>
                    Daily
                  </Button>
                </Box>
              </Box>
              <br />
              {/* <Button variant="outlined" size="small" sx={{ marginBottom: 2 }}>New</Button> */}

              <Box sx={{ padding: "10px", borderRadius: "5px", backgroundColor: "#E9FFEF", display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", }}>
                  <Typography sx={{ backgroundColor: "#2BC155", color: "white", padding: "4px 16px", borderRadius: "10px", mr: 2 }}>
                  {totalData.grievanceCount}
                  </Typography>
                  <Typography>
                    New
                  </Typography>
                </Box>
                <Typography sx={{ color: "#2F4CDD" }}>
                  Manage &gt;
                </Typography>
              </Box>

              <br />
              <br />

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h5">{totalData.grievanceCount}</Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>Total Grievances</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{statusData.grievances.completed}</Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>Completed</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{statusData.grievances.rejected}</Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>Rejected Grievances</Typography>
                </Grid>
              </Grid>
              <br />
              <br />


              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Pie Chart */}
                <Box sx={{}}>
                  <PieChart width={120} height={120}>
                    <Pie
                      data={dataPie}
                      cx={60} // Center X at half of the width
                      cy={60} // Center Y at half of the height
                      innerRadius={30} // Adjust the innerRadius to fit the smaller size
                      outerRadius={50} // Adjust the outerRadius to fit the smaller size
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dataPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>

                </Box>

                {/* Progress Bars */}
                <Box sx={{ padding: "10px", flexGrow: 1 }}>
  {[
    { label: "Total Grievances", value: totalData.grievanceCount, progress: 70, color: "#000091" },
    { label: "Completed", value: statusData.grievances.completed, progress: 50, color: "#DA0003" },
    { label: "Pending", value:  statusData.grievances.processing, progress: 20, color: "#027402" },
  ].map(({ label, value, progress, color }) => (
    <Box key={label} sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      <Typography sx={{ width: "30%", fontSize: "14px" }}>
        {label}
      </Typography>
      <Box sx={{ width: "50%", backgroundColor: "#E0E0E0", height: "7px", borderRadius: "10px", mx: "10px" }}>
        <Box sx={{ width: `${progress}%`, backgroundColor: color, height: "100%", borderRadius: "10px" }} />
      </Box>
      <Typography sx={{ fontSize: "12px" }}>
        {value}
      </Typography>
    </Box>
  ))}
</Box>

              </Box>


            </CardContent>
          </Card>
        </Grid>

        {/* User Analytics Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h6" gutterBottom>
                  User Analytics
                </Typography>
                <Box sx={{ display: "flex", backgroundColor: "#F4F5F9", padding: "5px" }}>
                  <Button disabled>
                    Monthly
                  </Button>
                  <Button disabled>
                    Weekly
                  </Button>
                  <Button sx={{ backgroundColor: "white", color: "black" }}>
                    Daily
                  </Button>
                </Box>
              </Box>
              <br />

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h5">{totalData.userCount}</Typography>
                  <Typography variant="subtitle1">Total Users</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{statusData.users.active}</Typography>
                  <Typography variant="subtitle1">Active</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5"> {statusData.users.inactive}</Typography>
                  <Typography variant="subtitle1">Inactive</Typography>
                </Grid>
              </Grid>
              <br />
              <br />
              <br />
              {/* <BarChart
                width={500}
                height={300}
                data={dataBar}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8884d8" />
                <Bar dataKey="pv" fill="#82ca9d" />
              </BarChart> */}

<Box sx={{ padding: "10px", flexGrow: 1 }}>
  {[
    { label: "Total Grievances", value: totalData.grievanceCount, progress: 70, color: "#000091" },
    { label: "Completed", value: statusData.grievances.completed, progress: 50, color: "#DA0003" },
    { label: "Pending", value:  statusData.grievances.processing, progress: 20, color: "#027402" },
  ].map(({ label, value, progress, color }) => (
    <Box key={label} sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      <Typography sx={{ width: "30%", fontSize: "14px" }}>
        {label}
      </Typography>
      <Box sx={{ width: "50%", backgroundColor: "#E0E0E0", height: "7px", borderRadius: "10px", marginX: "10px" }}>
        <Box sx={{ width: `${progress}%`, backgroundColor: color, height: "100%", borderRadius: "10px" }} />
      </Box>
      <Typography sx={{ fontSize: "12px" }}>
        {value}
      </Typography>
    </Box>
  ))}
</Box>

            </CardContent>
          </Card>

        </Grid>


        {/* Bottom Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ borderRadius: "50%", padding: "10px", backgroundColor: "#DEE4FF", }}>
              <img src={cardImg1} alt="Card" />
            </Box>

            <CardContent>
              <Typography variant="h3">{totalData.constituencyCount}</Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "10px" }}>Total Constituency's</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ borderRadius: "50%", padding: "10px", backgroundColor: "#DEE4FF", }}>
              <img src={cardImg1} alt="Card" />
            </Box>
            <CardContent>
              <Typography variant="h3">{totalData.boothCount}</Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>Total Booths</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Dashboard Layout */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage dashboard layout</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box >
  );
};

export default DashboardApp