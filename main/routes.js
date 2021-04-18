export function isLoggedIn (model, next, redirect) {
  const userId = model.scope().get('_session.userId')
  const loggedIn = model.scope().get(`users.${userId}`)
  if (!loggedIn) {
    return redirect('/')
  }
  next()
}

export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PHome
  },
  {
    path: '/hall',
    exact: true,
    component: components.PHall,
    filters: [isLoggedIn]
  },
  {
    path: '/add',
    exact: true,
    component: components.PAdd,
    filters: [isLoggedIn]
  },
  {
    path: '/game/:id',
    exact: true,
    component: components.PGame,
    filters: [isLoggedIn]
  },
  {
    path: '/pastgames',
    exact: true,
    component: components.PPastGames,
    filters: [isLoggedIn]
  },
  {
    path: '/pastgame/:id',
    exact: true,
    component: components.PPastGame,
    filters: [isLoggedIn]
  },
  {
    path: '/historygame/:id',
    exact: true,
    component: components.PHistoryGame,
    filters: [isLoggedIn]
  }
]
