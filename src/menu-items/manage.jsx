// assets
import { HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


// icons
const icons = {
  HomeOutlined,
  GlobalOutlined,
  LocationCityOutlinedIcon,
  CottageOutlinedIcon,
  MapsHomeWorkOutlinedIcon,
  ContentPasteIcon,
  SaveAsIcon,
  ArrowForwardIosIcon,
  
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const manage = {
  id: 'manage',
  title: 'Quản lý',
  type: 'group',
  children: [
    {
      id: 'HoSo',
      title: 'Hồ sơ',
      type: 'item',
      url: '/hoso',
      icon: icons.ContentPasteIcon
    },
    {
      id: 'QuanLiDuLieu',
      title: 'Quản lí dữ liệu',
      type: 'item',
      url: '/quanlidulieu',
      icon: icons.SaveAsIcon,
      arrowRightIcon: icons.ArrowForwardIosIcon,
    },
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
    {
      id: 'school',
      title: 'Trường học',
      type: 'item',
      url: '/school',
      icon: icons.CottageOutlinedIcon,
      // external: true,
      // target: true
    }
  ]
};

export default manage;
