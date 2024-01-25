import { lazy } from 'react';
import GiftBundle from '../pages/GiftBundles';
import GiftIdeas from '../pages/GiftIdeas';
import { details } from '../pages/GiftBundles/details';
import { editDetails } from '../pages/GiftBundles/editDetails';

const coreRoutes = [
 
  {
    path: '/GiftBundle',
    title: 'GiftBundle',
    component: GiftBundle,
  },
  {
    path: '/GiftIdeas',
    title: 'GiftIdeas',
    component: GiftIdeas,
  },
  {
    path: '/details/:id',
    title: 'details',
    component: details,
  },
  {
    path: '/editDetails/:id',
    title: 'editDetails',
    component: editDetails,
  },
];

const routes = [...coreRoutes];
export default routes;
