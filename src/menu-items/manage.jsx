// assets
import { HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
// icons
const icons = {
  HomeOutlined,
  GlobalOutlined,
  LocationCityOutlinedIcon,
  CottageOutlinedIcon,
  MapsHomeWorkOutlinedIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const manage = {
  id: 'manage',
  title: 'Quản lý',
  type: 'group',
  children: [
    {
      id: 'TinhThanhPho',
      title: 'Tỉnh/Thành Phố',
      type: 'item',
      url: '/citylist',
      icon: icons.LocationCityOutlinedIcon
    },
    {
      id: 'QuanHuyen',
      title: 'Quận/Huyện',
      type: 'item',
      url: '/districtlist',
      icon: icons.MapsHomeWorkOutlinedIcon,
      // external: true,
      // target: true
    },
    {
      id: 'PhuongXa',
      title: 'Phường/Xã',
      type: 'item',
      url: '/wardlist',
      icon: icons.CottageOutlinedIcon,
      // external: true,
      // target: true
    },
    
  ]
};

export default manage;
