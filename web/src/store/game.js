import Block from './modules/Block'

const state = {
  wLength: 11,
  hLength: 11,
  size: 30,
  point: 0,
  background: [],
  backgroundMatrix: []
}

// getters
const getters = {
  size: (state, getters) => {
    return Math.floor(Math.min(window.innerWidth / state.wLength, window.innerHeight / state.hLength))
  },
  blocks: (state) => {
    var background = []
    var backgroundMatrix = state.backgroundMatrix
    state.backgroundMatrix.forEach((block, yIndex) => {
      block.forEach((item, xIndex) => {
        var b = new Block({
          x: xIndex,
          y: yIndex,
          type: item
        })
        backgroundMatrix[yIndex][xIndex] = b
        if (item !== 0) {
          background.push(b)
        }
      })
    })
    state.background = background
    return backgroundMatrix
  }
}

// actions
const actions = {
  changeSize ({ commit }, width) {
    commit('changeSize', width)
  },
  changeBackground ({ commit }, matrix) {
    commit('changeBackground', matrix)
  },
  breakBlock ({ commit, getters }, position) {
    commit('breakBlock', { getters, position })
  },
  resetGame ({ commit, rootState }) {
    commit('dieAllTanks')
    commit('resetGame', rootState)
  }
}

// mutations
const mutations = {
  resetGame (state, rootState) {
    rootState.tanks.myTanks = []
    rootState.bullets.bullets = []
  },
  changeSize (state, width) {
    state.size = Math.floor(Math.min(width / state.wLength, width / state.hLength))
  },
  changeBackground (state, matrix) {
    state.backgroundMatrix = matrix
  },
  breakBlock (state, { getters, position }) {
    getters.blocks[position.y][position.x].type = 0
    var background = []
    state.background.forEach((block, xIndex) => {
      if (block.x !== position.x || block.y !== position.y) {
        background.push(block)
      }
    })
    state.background = background
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
