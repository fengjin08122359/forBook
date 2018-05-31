<template>
  <div class="backgroundMatrix">
    <div class="wd" v-for="n in hSize" v-bind:key="n">
      <span class="hd" v-bind:class="divClass(n, m)" v-for="m in wSize" v-bind:key="m" v-bind:style="{ width: size, height: size }"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'backgroundMatrix',
  data () {
    return {
      hSize: 1,
      wSize: 1
    }
  },
  computed: {
    ...mapGetters({
      matrix: 'blocks'
    }),
    size () {
      return this.$store.state.game.size + 'px'
    }
  },
  created () {
    this.wSize = this.$store.state.game.wLength
    this.hSize = this.$store.state.game.hLength
  },
  methods: {
    divClass (n, m) {
      if (this.matrix) {
        return this.$type.backgroundType[this.matrix[n - 1][m - 1].type]
      }
    }
  },
  updated () {
  }
}
</script>

<style>
.backgroundMatrix{
  position: absolute;
  top: 0;
}
.backgroundMatrix .wd{
  display: block;
  font-size: 0;
  text-align: center;
}
.backgroundMatrix .hd{
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #000;
}
.backgroundMatrix .hd.home{
  background:red;
}
.backgroundMatrix .hd.wood{
  background:brown;
}
.backgroundMatrix .hd.iron{
  background:gray;
}
.backgroundMatrix .hd.water{
  background:#9898f9;
}
</style>
