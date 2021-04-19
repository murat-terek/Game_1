export function isLoggedIn (model, next, redirect) {
  const user = model.scope().get('_session.user')
  if (!user) {
    return redirect('/')
  }
  next()
}

export function isLoggedOut (model, next, redirect) {
  const user = model.scope().get('_session.user')
  if (user) {
    return redirect('/hall')
  }
  next()
}

export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PHome,
    filters: [isLoggedOut]
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
