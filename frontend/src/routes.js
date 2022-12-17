import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LayoutPage from './pages/LayoutPage';

export default [
  {
    path: '/login',
    component: LoginPage,
    name: 'login',
    meta: {
      authNotRequired: true,
      pageTitle: 'Login Page'
    },
  },
  {
    path: '/',
    component: LayoutPage,
    name: 'index',
    meta: {
      pageTitle: 'Bookee',
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
        name: 'dashboard',
        meta: {
          pageTitle: 'Dashboard'
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
      // {
      //   path: 'employees',
      //   component: EmployeeListPage,
      //   name: 'all-employee',
      //   meta: {
      //     pageTitle: 'Employees List'
      //   },
      // },
      // {
      //   path: 'records',
      //   component: ActivitiesListPage,
      //   name: 'all-activities',
      //   meta: {
      //     pageTitle: 'Records List'
      //   },
      // },
      {
        path: '*',
        redirect: '/dashboard',
      },
    ],
  }
];