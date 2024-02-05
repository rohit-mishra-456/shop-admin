import { lazy } from 'react';
import GiftBundle from '../pages/GiftBundles';
import GiftIdeas from '../pages/GiftIdeas';
import { details } from '../pages/GiftBundles/details';
import { editDetails } from '../pages/GiftBundles/editDetails';
import Orders from '../pages/Orders';
import  OrderDetails  from '../pages/Orders/orderDetails';

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
  {
    path: '/orders',
    title: 'orders',
    component: Orders,
  },
  {
    path: '/ordersdetails/:id',
    title: 'ordersdetails',
    component: OrderDetails,
  },
];

const routes = [...coreRoutes];
export default routes;
