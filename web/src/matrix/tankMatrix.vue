<template>
  <div class="tankMatrix">
    <div class="myTanks">
      <div class="tank" v-bind:key="index" v-bind:style="tankClass(tank)"  v-for="(tank, index) in myTanks">1</div>
    </div>
    <div class="opTanks">
      <div class="opTank" v-bind:key="index" v-bind:style="opTankClass(tank)"  v-for="(tank, index) in opTanks">1</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'tankMatrix',
  computed: {
    size () {
      return this.$store.state.game.size + 'px'
    },
    ...mapGetters({
      myTanks: 'aliveTanks'
    }),
    ...mapGetters({
      opTanks: 'aliveOpTanks'
    })
  },
  created () {
  },
  methods: {
    tankClass (tank) {
      return {
        background: 'blue',
        width: this.$store.state.game.size + 'px',
        height: this.$store.state.game.size + 'px',
        top: tank.top + 'px',
        left: tank.left + 'px',
        transform: 'rotate(' + (tank.direction - 1) * 90 + 'deg)'
      }
    },
    opTankClass (tank) {
      return {
        background: 'red',
        width: this.$store.state.game.size + 'px',
        height: this.$store.state.game.size + 'px',
        top: tank.top + 'px',
        left: tank.left + 'px',
        transform: 'rotate(' + (tank.direction - 1) * 90 + 'deg)'
      }
    }
  },
  updated () {
  }
}
</script>

<style>
.tankMatrix{
  position: absolute;
  top: 0;
}
.tankMatrix .myTanks{
  position: relative;
}
.tankMatrix .myTanks .tank{
  position: absolute;
}
.tankMatrix .opTanks{
  position: relative;
}
.tankMatrix .opTanks .opTank{
  position: absolute;
}
</style>
