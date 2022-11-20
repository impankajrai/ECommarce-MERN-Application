import GroupsIcon from '@mui/icons-material/Groups';
import EmailIcon from '@mui/icons-material/Email';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HomeIcon from '@mui/icons-material/Home';

export const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <HomeIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: <SummarizeIcon />,
      cName: 'nav-text'
    },
    {
      title: 'Products',
      path: '/products',
      icon: <ProductionQuantityLimitsIcon/>,
      cName: 'nav-text'
    },
    {
      title: 'Team',
      path: '/team',
      icon: <GroupsIcon />,
      cName: 'nav-text'
    },
    {
      title: 'Messages',
      path: '/messages',
      icon: <EmailIcon />,
      cName: 'nav-text'
    },
    {
      title: 'Support',
      path: '/support',
      icon: <ContactSupportIcon/>,
      cName: 'nav-text'
    }
  ];