import React from 'react';
import { FaHome, FaUser, FaStar, FaBoxOpen, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'Feedback and Ratings',
    path: '/feedback',
    icon: <FaStar />,
    cName: 'nav-text'
  },
  {
    title: 'Packages',
    path: '/package',
    icon: <FaBoxOpen />,
    cName: 'nav-text'
  },
  {
    title: 'Contact us',
    path: '/contact',
    icon: <FaEnvelope />, // Updated icon for "Contact us"
    cName: 'nav-text'
  },
  {
    title: 'About',
    path: '/about',
    icon: <FaInfoCircle />,
    cName: 'nav-text'
  }
];
