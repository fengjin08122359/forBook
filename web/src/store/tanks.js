import Tank from './modules/tank'
import bullets from './bullets'

const state = {
  myTanks: [],
  opTanks: [],
  opIndex: 0
}

// getters
const getters = {
  aliveTanks: (state) => {
    var tanks = []
    state.myTanks.forEach(tank => {
      if (tank.alive === true) {
        tanks.push(tank)
      }
    })
    return tanks
  },
  aliveOpTanks: (state) => {
    var tanks = []
    state.opTanks.forEach(tank => {
      if (tank.alive === true) {
        tanks.push(tank)
      }
    })
    state.opTanks = tanks
    return state.opTanks
  },
  tanksArray: (state, getter) => {
    var tanks = getter.aliveTanks.concat(getter.aliveOpTanks)
    var tankArray = []
    tanks.forEach(tank => {
      if (tank.alive === true) {
        tankArray.push(tank)
      }
    })
    return tankArray
  }
}

// actions
const actions = {
  addTank ({ commit }, tank) {
    commit('addTank', tank)
  },
  goStep ({ commit }, direction) {
    commit('goStep', direction)
  },
  shoot ({ commit }) {
    commit('shoot')
  },
  addOpTank ({ commit }, tank) {
    commit('addOpTank', tank)
  },
  opShoot ({ commit }) {
    commit('opShoot')
  },
  attackTank ({ commit }, { tank, bullet }) {
    commit('attackTank', { tank, bullet })
  }
}

// mutations
const mutations = {
  dieAllTanks (state) {
    state.myTanks.forEach(tank => {
      tank.die()
    })
    state.opTanks.forEach(tank => {
      tank.die()
    })
    state.opIndex = 0
  },
  addTank (state, tank) {
    state.myTanks.push(new Tank(tank))
  },
  goStep (state, direction) {
    state.myTanks[0].goStep(direction)
  },
  shoot (state) {
    var bullet = state.myTanks[0].shoot()
    if (bullet) {
      bullets.state.bullets.push(bullet)
    }
  },
  destory (state) {
  },
  addOpTank (state, tank) {
    tank.type = 3
    state.opTanks.push(new Tank(tank))
  },
  opShoot (state) {
    bullets.state.bullets.push(state.opTanks[0].shoot())
  },
  attackTank (state, { tank, bullet }) {
    tank.level--
    if (tank.level < 0) {
      if (bullet.type === 0) {
        state.myTanks[0].levelUp()
      }
      tank.die()
      if (tank.type === 0) {
        setTimeout(function () {
          tank.reborn(3, 10)
        }, 3000)
      } else if (tank.type === 3) {
        var x = state.opIndex * 5
        state.opIndex = (state.opIndex + 1) % 3
        mutations.addOpTank(state, {level: 0, x: x, y: 0, direction: 3})
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
