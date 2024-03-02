import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../app/customer/customer.component').then(c => c.CustomerComponent)
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadComponent: () => import('../app/admin/admin.component').then(c => c.AdminComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../app/admin/components/dashboard/dashboard.component')
          .then(c => c.DashboardComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('../app/admin/components/category/category.component')
          .then(c => c.CategoryComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('../app/admin/components/product/product.component')
          .then(c => c.ProductComponent)
      },
      {
        path: 'post-coupon',
        loadComponent: () => import('../app/admin/components/post-coupon/post-coupon.component')
          .then(c => c.PostCouponComponent)
      },
      {
        path: 'coupons',
        loadComponent: () => import('../app/admin/components/coupons/coupons.component')
          .then(c => c.CouponsComponent)
      }
    ]
  },
  {
    path: 'customer',
    children: [
      {
        path: '',
        loadComponent: () => import('../app/customer/customer.component').then(c => c.CustomerComponent)},
      {
        path: 'dashboard',
        loadComponent: () => import('../app/customer/components/dashboard/dashboard.component')
          .then(c => c.DashboardComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('../app/customer/components/cart/cart.component')
          .then(c => c.CartComponent)
      }
    ]
  },
  { path: 'authenticate',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)
  },
  {
    path:'**',
    loadComponent: () => import('./notfound/notfound.component').then(c => c.NotfoundComponent)
  }
];
