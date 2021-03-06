
import { db, auth } from '@/services/firebase'

export const state = () => ({
  login: false,

  loading: {
    login: false,
    edit: false,
    add: false
  },

  alert: {
    is: false,
    type: '',
    message: ''
  },

  all: null,
  registered: null,
  verified: null,
  activated: null,
  paid: null
})

export const getters = {
  getUsers: state => (type) => {
    if (state[type] !== null) {
      return state[type]
    } else {
      return []
    }
  },
  getLoading (state) {
    return state.loading
  },
  getAlert (state) {
    return state.alert
  },
  getLogin (state) {
    return state.login
  }
}

export const mutations = {
  setUsers (state, { type, data }) {
    state[type] = data
  },
  setLoading (state, { type, is }) {
    state.loading[type] = is
  },
  setAlert (state, alert) {
    state.alert = alert
  },
  setLogin (state, login) {
    state.login = login
  }

}

export const actions = {
  initAlert ({ commit }, { is, type, message, time }) {
    time ? time = time * 1000 : time = 5000
    commit('setAlert', { is, type, message })

    setTimeout(() => {
      commit('setAlert', { is: false, type: '', message: '' })
    }, time)
  },

  initUser ({ commit }) {
    db.collection('users').onSnapshot((snapshot) => {
      const all = []
      const data = snapshot.docs
      data.forEach((el) => {
        all.push(el.data())
      })
      commit('setUsers', { type: 'all', data: all })
    })

    db.collection('users').where('verified', '==', false).onSnapshot((snapshot) => {
      const verified = []
      const data = snapshot.docs
      data.forEach((el) => {
        verified.push(el.data())
      })
      commit('setUsers', { type: 'verified', data: verified })
    })

    db.collection('users').where('activated', '==', false).onSnapshot((snapshot) => {
      const activated = []
      const data = snapshot.docs
      data.forEach((el) => {
        activated.push(el.data())
      })
      commit('setUsers', { type: 'activated', data: activated })
    })

    db.collection('users').where('paid', '==', false).onSnapshot((snapshot) => {
      const paid = []
      const data = snapshot.docs
      data.forEach((el) => {
        paid.push(el.data())
      })
      commit('setUsers', { type: 'paid', data: paid })
    })

    db.collection('users').where('registered', '==', true).onSnapshot((snapshot) => {
      const registered = []
      const data = snapshot.docs
      data.forEach((el) => {
        registered.push(el.data())
      })
      commit('setUsers', { type: 'registered', data: registered })
    })
  },

  addUser ({ commit, dispatch }, user) {
    // check if username exist
    commit('setLoading', { type: 'add', is: true })

    db.collection('users').get().then((docs) => {
      const data = docs.docs
      const itExist = data.find((doc) => {
        return user.username.toLowerCase() === doc.data().username.toLowerCase()
      })
      // add new user
      if (!itExist) {
        db.collection('users').add(user).then(() => {
          commit('setLoading', { type: 'add', is: false })
          dispatch('initAlert', { is: true, type: 'success', message: 'User added successfully' })
        }).catch((err) => {
          commit('setLoading', { type: 'add', is: false })
          dispatch('initAlert', { is: true, type: 'error', message: err.message })
        })
      } else {
        commit('setLoading', { type: 'add', is: false })
        dispatch('initAlert', { is: true, type: 'error', message: 'Username already exist' })
      }
    })
  },

  editUser ({ commit, dispatch }, user) {
    commit('setLoading', { type: 'edit', is: true })
    db.collection('users').where('username', '==', user.username).get()
      .then((doc) => {
        const id = doc.docs[0].id

        db.collection('users').doc(id).update(user)
          .then(() => {
            commit('setLoading', { type: 'edit', is: false })
            dispatch('initAlert', { is: true, type: 'success', message: 'User updated successfully' })
          }).catch((err) => {
            commit('setLoading', { type: 'edit', is: false })
            dispatch('initAlert', { is: true, type: 'error', message: err.message })
          })
      })
  },

  deleteUser ({ commit, dispatch }, username) {
    db.collection('users').where('username', '==', username).get()
      .then((doc) => {
        const id = doc.docs[0].id
        db.collection('users').doc(id).delete()
          .then(() => {
            dispatch('initAlert', { is: true, type: 'success', message: `${username} deleted successfully` })
          }).catch((err) => {
            dispatch('initAlert', { is: true, type: 'error', message: err.message })
          })
      })
  },

  loginUser ({ commit, dispatch }, user) {
    // start the loading
    commit('setLoading', { type: 'login', is: true })
    // Login the User
    auth
      .signInWithEmailAndPassword(user.email, user.password).then(() => {
        commit('setLogin', true)
        this.$router.push('/dashboard')
      })
      .catch((error) => {
        dispatch('initAlert', { is: true, type: 'error', message: error.message })
        commit('setLoading', { type: 'login', is: false })
      })
  },

  logoutUser ({ commit }) {
    auth.signOut().then(() => {
      location.href = '/login'
      commit('setLogin', false)
    }).catch((error) => {
      console.log(error.message)
    })
  },

  handleAuthStateChanged ({ commit, dispatch, state }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        commit('setLogin', true)
        this.$router.push('/dashboard')
      } else {
        location.href = '/login'
        commit('setLogin', false)
      }
    })
  }
}
