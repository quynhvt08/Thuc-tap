import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const CityList = Loadable(lazy(() => import('pages/city-list/CityList')));
const DistrictList = Loadable(lazy(() => import('pages/district-list/DistrictList')));
const WardList = Loadable(lazy(() => import('pages/ward-list/WardList')));
const SchoolList = Loadable(lazy(() => import('pages/school-list/SchoolList')));
const EntranceExamBlocks = Loadable(lazy(() => import('pages/entrance-exam-blocks/EntranceExamBlocks')));
const MajorList = Loadable(lazy(() => import('pages/major-list/MajorList')));
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
      path: 'schoollist',
      element: <SchoolList />
    },
    {
      path: 'entranceexamblocks',
      element: <EntranceExamBlocks />
    },
    {
      path: 'majorlist',
      element: <MajorList />
    },
    
  ]
};

export default MainRoutes;
