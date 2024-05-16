// assets
import { HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

const datamanage = {
      id: 'QuanLiDuLieu',
      type: 'submenu',
      url: '/quanlidulieu',
      icon: icons.SaveAsIcon,
      arrowRightIcon: icons.ArrowForwardIosIcon,
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

const MyMenu = () => {
  return (
    <div>
      {datamanage.children.map((item) => (
        <MenuItemWithArrow key={item.id} title={item.title}>
          {item.children.map((child) => (
            <ListItem key={child.id} button component="a" href={child.url}>
              <ListItemIcon>{child.icon}</ListItemIcon>
              <ListItemText primary={child.title} />
            </ListItem>
          ))}
        </MenuItemWithArrow>
      ))}
    </div>
  );
};

export default MyMenu;







