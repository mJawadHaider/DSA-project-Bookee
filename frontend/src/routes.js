import HelloWorld from './components/HelloWorld.vue';


export default [
  {
    path: '/hello-world',
    component: HelloWorld,
    name: 'hello-world',
    meta: {
      pageTitle: 'Hello World'
    },
  },
  // {
  //   path: '/',
  //   component: HelloWorld,
  //   name: 'index',
  //   meta: {
  //     pageTitle: 'Budget manager',
  //   },
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: DashBoardPage,
    //     name: 'dashboard',
    //     meta: {
    //       pageTitle: 'Dashboard'
    //     },
    //   },
    //   {
    //     path: 'project',
    //     component: ProjectIndexPage,
    //     name: 'project-index',
    //     children: [
    //       {
    //         path: '',
    //         redirect: 'list',
    //       },
    //       {
    //         path: 'list',
    //         component: ProjectListPage,
    //         name: 'all-projects',
    //         meta: {
    //           pageTitle: 'Projects List'
    //         },
    //       },
    //       {
    //         path: 'create',
    //         component: ProjectCreatePage,
    //         name: 'create-project',
    //         meta: {
    //           pageTitle: 'Create Project'
    //         },
    //       },
    //       {
    //         path: 'update/:id',
    //         component: ProjectUpdatePage,
    //         name: 'update-project',
    //         meta: {
    //           pageTitle: 'Edit Project'
    //         },
    //       },
    //       {
    //         path: 'detail/:id',
    //         component: ProjectDetailPage,
    //         name: 'detail-project',
    //         meta: {
    //           pageTitle: 'Project Details'
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     path: 'employees',
    //     component: EmployeeListPage,
    //     name: 'all-employee',
    //     meta: {
    //       pageTitle: 'Employees List'
    //     },
    //   },
    //   {
    //     path: 'records',
    //     component: ActivitiesListPage,
    //     name: 'all-activities',
    //     meta: {
    //       pageTitle: 'Records List'
    //     },
    //   },
    //   {
    //     path: '*',
    //     redirect: '/dashboard',
    //   },
    // ],
  // }
];