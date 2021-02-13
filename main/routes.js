export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PHome
  },
  {
    path: '/hall',
    exact: true,
    component: components.PHall
  },
  {
    path: '/add',
    exact: true,
    component: components.PAdd
  }
]
