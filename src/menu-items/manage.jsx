// assets
import { HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

// icons
const icons = {
  HomeOutlined,
  GlobalOutlined,
  LocationCityOutlinedIcon,
  CottageOutlinedIcon,
  MapsHomeWorkOutlinedIcon,
  AccountBalanceIcon,
  WorkOutlineIcon,
  MenuBookIcon,
  AssignmentIndIcon,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const manage = {
  id: 'manage',
  title: 'Quản lý',
  type: 'group',
  children: [
    {
      id: 'Hoso',
      title: 'Hồ sơ thí sinh',
      type: 'item',
      url: '/hoso',
      icon: icons.AssignmentIndIcon
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
      id:'Truong',
      title: 'Trường học',
      type: 'item',
      url: '/schoollist',
      icon: icons.AccountBalanceIcon ,
      // external: true,
      // target: true
    },
    {
      id:'NganhHoc',
      title: 'Ngành học',
      type: 'item',
      url: '/majorlist',
      icon: icons.WorkOutlineIcon ,
      // external: true,
      // target: true
    },
    {
      id:'ToHop',
      title: 'Tổ hợp xét tuyển',
      type: 'item',
      url: '/entranceexamblocks',
      icon: icons.MenuBookIcon ,
      // external: true,
      // target: true
    },
  ]
};

export default manage;
