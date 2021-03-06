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
  },
  {
    path: '/game/:id',
    exact: true,
    component: components.PGame
  },
  {
    path: '/pastgames',
    exact: true,
    component: components.PPastGames
  }
]
