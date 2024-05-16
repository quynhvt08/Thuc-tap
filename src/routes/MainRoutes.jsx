import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const CityList = Loadable(lazy(() => import('pages/city-list/CityList')));
const DistrictList = Loadable(lazy(() => import('pages/district-list/DistrictList')));
const WardList = Loadable(lazy(() => import('pages/ward-list/WardList')));
const Quanlidulieu = Loadable(lazy(() => import('pages/Quanlidulieu/Quanlidulieu')));
const Hoso = Loadable(lazy(() => import('pages/Hoso/Hoso')));
const Chitiethoso = Loadable(lazy(() => import('pages/Hoso/Chitiethoso')));
const School = Loadable(lazy(() => import('pages/school/School')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
      ]
    },
    {
      path: 'hoso',
      element: <Hoso />
    },
    {
      path: 'chitiethoso',
      element: <Chitiethoso />
    },
    {
      path: 'quanlidulieu',
      element: <Quanlidulieu />
    },
    {
      path: 'citylist',
      element: <CityList />
    },
    {
      path: 'districtlist',
      element: <DistrictList />
    },
    {
      path: 'wardlist',
      element: <WardList />
    },
    {
      path: 'school',
      element: <School />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
