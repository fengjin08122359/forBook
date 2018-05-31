<template>
  <div id="app">
    <span @click="startGame(0)">startGame</span>
    <div class="gameCenter" v-bind:style="{ width: widthPx }">
      <backgroundMatrix></backgroundMatrix>
      <tankMatrix></tankMatrix>
      <bulletMatrix></bulletMatrix>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      width: 330
    }
  },
  computed: {
    widthPx () {
      return this.width + 'px'
    }
  },
  created () {
    var that = this
    that.startGame(0)
    window.onkeydown = function (ev) {
      console.log('onkeydown', ev.keyCode)
      if (ev.keyCode === 37) {
        that.$store.dispatch('goStep', 0)
      } else if (ev.keyCode === 38) {
        that.$store.dispatch('goStep', 1)
      } else if (ev.keyCode === 39) {
        that.$store.dispatch('goStep', 2)
      } else if (ev.keyCode === 40) {
        that.$store.dispatch('goStep', 3)
      } else if (ev.keyCode === 32) {
        that.$store.dispatch('shoot')
      }
    }
    this.$store.dispatch('changeSize', this.width)
  },
  mounted () {
    var that = this
    window.onresize = () => {
      return (() => {
        that.$store.dispatch('changeSize')
      })()
    }
  },
  methods: {
    addTank (tank) {
      this.$store.dispatch('addTank', tank)
    },
    addOpTank (tank) {
      this.$store.dispatch('addOpTank', tank)
    },
    startGame (num) {
      var msg = this.$api.generateBackground(num)
      this.resetGame()
      this.addTank({level: 0, x: 3, y: 10})
      this.addOpTank({level: 0, x: 0, y: 0, direction: 3})
      this.addOpTank({level: 0, x: 5, y: 0, direction: 3})
      this.addOpTank({level: 0, x: 10, y: 0, direction: 3})
      this.$store.dispatch('changeBackground', msg.background)
    },
    resetGame () {
      this.$store.dispatch('resetGame')
    }
  }
}
</script>

<style>
#app{
  position: relative;
}
#app .gameCenter{
  position: relative;
}
</style>
