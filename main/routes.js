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
    path: '/pokemon/:id?',
    exact: true,
    component: components.PEdit
  }
]
