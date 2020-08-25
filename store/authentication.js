
import { db } from '@/services/firebase'

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

    db.collection('users').where('verified', '==', true).onSnapshot((snapshot) => {
      const verified = []
      const data = snapshot.docs
      data.forEach((el) => {
        verified.push(el.data())
      })
      commit('setUsers', { type: 'verified', data: verified })
    })

    db.collection('users').where('activated', '==', true).onSnapshot((snapshot) => {
      const activated = []
      const data = snapshot.docs
      data.forEach((el) => {
        activated.push(el.data())
      })
      commit('setUsers', { type: 'activated', data: activated })
    })

    db.collection('users').where('paid', '==', true).onSnapshot((snapshot) => {
      const paid = []
      const data = snapshot.docs
      data.forEach((el) => {
        paid.push(el.data())
      })
      commit('setUsers', { type: 'paid', data: paid })
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
    // commit('setLoading', { type: 'edit', is: true })
    db.collection('users').where('username', '==', user.username).get()
      .then((doc) => {
        const id = doc.docs[0].id
        db.collection('user').doc(id).get()
          .then((doc) => {
            console.log(doc)
          }).catch((err) => {
            console.log(err.message)
          })
      })
  }
}
