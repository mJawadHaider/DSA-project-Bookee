
import { ROLES } from './enums';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LayoutPage from './pages/LayoutPage';
import MyBooksList from './components/MyBooksList';

export default [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'login',
    meta: {
      authNotRequired: true,
      roles: [ROLES.all],
      pageTitle: 'Login Page'
    },
  },
  {
    path: '/',
    component: LayoutPage,
    name: 'index',
    meta: {
      pageTitle: 'Bookee',
      roles: [ROLES.admin, ROLES.reader],
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
        name: 'dashboard',
        meta: {
          pageTitle: 'Dashboard',
          roles: [ROLES.admin, ROLES.reader],
        },
      },
      {
        path: 'my-books',
        component: MyBooksList,
        name: 'MyBooksList',
        meta: {
          pageTitle: 'My Books',
          roles: [ROLES.admin, ROLES.reader],
        },
      },
      // {
      //   path: 'project',
      //   component: ProjectIndexPage,
      //   name: 'project-index',
      //   children: [
      //     {
      //       path: '',
      //       redirect: 'list',
      //     },
      //     {
      //       path: 'list',
      //       component: ProjectListPage,
      //       name: 'all-projects',
      //       meta: {
      //         pageTitle: 'Projects List'
      //       },
      //     },
      //     {
      //       path: 'create',
      //       component: ProjectCreatePage,
      //       name: 'create-project',
      //       meta: {
      //         pageTitle: 'Create Project'
      //       },
      //     },
      //     {
      //       path: 'update/:id',
      //       component: ProjectUpdatePage,
      //       name: 'update-project',
      //       meta: {
      //         pageTitle: 'Edit Project'
      //       },
      //     },
      //     {
      //       path: 'detail/:id',
      //       component: ProjectDetailPage,
      //       name: 'detail-project',
      //       meta: {
      //         pageTitle: 'Project Details'
      //       },
      //     },
      //   ],
      // },
      {
        path: '*',
        redirect: '/dashboard',
      },
    ],
  }
];