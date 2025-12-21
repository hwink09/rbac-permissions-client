// Author: Hwinkdev: https://www.youtube.com/@hwinkdev.official

import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT, TAB_URLS } from '~/utils/constants'
import { useNavigate } from 'react-router-dom'
import { handleLogoutAPI } from '~/apis'
import { Link } from 'react-router-dom'
import YoutubeCoverHwinkdev from '~/assets/youtube-cover-hwink.jpeg'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState('1')

  useEffect(() => {
    const fetchData = async () => {
      const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`)
      setUser(res.data)
    }
    fetchData()
  }, [])

  const handleLogout = async () => {
    await handleLogoutAPI()
    localStorage.removeItem('userInfo')
    navigate('/login')
  }

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }


  if (!user) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      maxWidth: '1200px',
      // marginTop: '1em',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 1em',
      gap: 2
    }}>

      <Box as={Link} to="https://www.youtube.com/@hwinkdev.official" target='blank'>
        <Box
          component='img'
          sx={{ width: '100%', height: '180px', borderRadius: '6px', objectFit: 'cover' }}
          src={YoutubeCoverHwinkdev}
          alt='hwinkdev-cover'
        />
      </Box>

      <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' }, width: { md: 'max-content' } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.email}</Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>

      <Alert severity="success" variant="outlined" sx={{ '.MuiAlert-message': { overflow: 'hidden' }, width: { md: 'max-content' } }}>
        Role hiện tại của user đang đăng nhập là:&nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.role}</Typography>
      </Alert>

      {/* Khu vực phân quyền truy cập. Sử dụng MUI Tabs cho đơn giản để test các chức năng khác nhau */}
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Hwinkdev RBAC Permissions Tabs">
            <Tab label="Dashboard" value={TAB_URLS.DASHBOARD} />
            <Tab label="Support" value={TAB_URLS.SUPPORT} />
            <Tab label="Messages" value={TAB_URLS.MESSAGES} />
            <Tab label="Revenue" value={TAB_URLS.REVENUE} />
            <Tab label="Admin Tools" value={TAB_URLS.ADMIN_TOOLS} />
          </TabList>
        </Box>

        <TabPanel value={TAB_URLS.DASHBOARD}>
          <Alert severity='success' sx={{ width: 'max-content' }}>
            Đây là nội dung của tab Dashboard, tất cả user đã đăng nhập đều có thể truy cập vào tab này.
          </Alert>
        </TabPanel>

        <TabPanel value={TAB_URLS.SUPPORT}>
          <Alert severity='success' sx={{ width: 'max-content' }}>
            Đây là nội dung của tab Support!
          </Alert>
        </TabPanel>

        <TabPanel value={TAB_URLS.MESSAGES}>
          <Alert severity='info' sx={{ width: 'max-content' }}>
            Đây là nội dung của tab Messages!
          </Alert>
        </TabPanel>

        <TabPanel value={TAB_URLS.REVENUE}>
          <Alert severity='warning' sx={{ width: 'max-content' }}>
            Đây là nội dung của tab Revenue!
          </Alert>
        </TabPanel>

        <TabPanel value={TAB_URLS.ADMIN_TOOLS}>
          <Alert severity='error' sx={{ width: 'max-content' }}>
            Đây là nội dung của tab Admin Tools!
          </Alert>
        </TabPanel>
      </TabContext>

      <Divider />

      <Button
        type='button'
        variant='contained'
        color='info'
        size='large'
        sx={{ mt: 2, maxWidth: 'min-content', alignSelf: 'flex-end' }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  )
}

export default Dashboard
