// import JWTDecode from 'jwt-decode'
// import cookerparser from 'cookieparser'
export const state = () => ({

})

// export const actions = {
//   nuxtServerInit ({ commit }, { req }) {
//     if (process.server && process.static) { return }
//     if (!req.headers.cookie) { return }

//     const parsed = cookerparser.parse(req.headers.cookie)
//     const accessTokenCookie = parsed.access_token

//     if (!accessTokenCookie) { return }

//     const decoded = JWTDecode(accessTokenCookie)

//     if (decoded) {
//       commit('authentication/SET_USER', {
//         uid: decoded.user_id,
//         email: decoded.email
//       })
//     }
//   }
// }
