import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/customer/customer.component').then(
        c => c.CustomerComponent,
      ),
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/admin/admin.component').then(c => c.AdminComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../app/admin/components/dashboard/dashboard.component').then(
            c => c.DashboardComponent,
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../app/admin/components/category/category.component').then(
            c => c.CategoryComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./admin/components/post-product/postProduct.component').then(
            c => c.PostProductComponent,
          ),
      },
      {
        path: 'products/:productId',
        loadComponent: () =>
          import(
            './admin/components/update-product/update-product.component'
          ).then(c => c.UpdateProductComponent),
      },
      {
        path: 'post-coupon',
        loadComponent: () =>
          import(
            '../app/admin/components/post-coupon/post-coupon.component'
          ).then(c => c.PostCouponComponent),
      },
      {
        path: 'coupons',
        loadComponent: () =>
          import('../app/admin/components/coupons/coupons.component').then(
            c => c.CouponsComponent,
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('../app/admin/components/orders/orders.component').then(
            c => c.OrdersComponent,
          ),
      },
      {
        path: 'faq/:productId',
        loadComponent: () =>
          import(
            '../app/admin/components/post-product-faq/post-product-faq.component'
          ).then(c => c.PostProductFaqComponent),
      },
    ],
  },
  {
    path: 'customer',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/customer/customer.component').then(
            c => c.CustomerComponent,
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            '../app/customer/components/dashboard/dashboard.component'
          ).then(c => c.DashboardComponent),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../app/customer/components/cart/cart.component').then(
            c => c.CartComponent,
          ),
      },
      {
        path: 'my-orders',
        loadComponent: () =>
          import(
            '../app/customer/components/customer-orders/customer-orders.component'
          ).then(c => c.CustomerOrdersComponent),
      },
      {
        path: 'ordered-products/:orderId',
        loadComponent: () =>
          import(
            '../app/customer/components/view-ordered-products/view-ordered-products.component'
          ).then(c => c.ViewOrderedProductsComponent),
      },
      {
        path: 'review/:productId',
        loadComponent: () =>
          import(
            '../app/customer/components/review-ordered-product/review-ordered-product.component'
          ).then(c => c.ReviewOrderedProductComponent),
      },
    ],
  },
  {
    path: 'authenticate',
    loadComponent: () =>
      import('./login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./signup/signup.component').then(c => c.SignupComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./notfound/notfound.component').then(c => c.NotfoundComponent),
  },
];
