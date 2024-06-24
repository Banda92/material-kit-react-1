import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'MediumsPMIS',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'MediumHDCS',
    path: '/hdcs',
    icon: icon('ic_user'),
  },
  {
    title: 'MediumDashboard ',
    path: '/dashboard',
    icon: icon('ic_cart'),
  },
  {
    title: 'Page 4',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Page 5',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Page 6',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
