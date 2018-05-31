import Bullet from './modules/bullet'

const state = {
  bullets: []
}

// getters
const getters = {
  aliveBullets: (state) => {
    var bullets = []
    state.bullets.forEach(bullet => {
      if (bullet.alive === true) {
        bullets.push(bullet)
      }
    })
    return bullets
  }
}

// actions
const actions = {
  addBullet ({ commit }, bullet) {
    commit('addBullet', bullet)
  },
  breakBullet ({ commit }, bullet) {
    commit('breakBullet', bullet)
  }
}

// mutations
const mutations = {
  addBullet (state, bullet) {
    state.bullets.push(new Bullet(bullet))
  },
  breakBullet (state, bullet) {
    bullet.alive = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
