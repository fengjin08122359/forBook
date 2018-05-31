import Vue from 'vue'
import Vuex from 'vuex'
import game from './game'
import tanks from './tanks'
import bullets from './bullets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    tanks,
    bullets
  }
})
