<template>
  <div class="bulletMatrix">
    <div class="bullet" v-bind:key="index" v-bind:style="bulletClass(bullet)" v-for="(bullet, index) in bullets"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'bulletMatrix',
  data () {
    return {
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      bullets: 'aliveBullets'
    }),
    ...mapGetters({
      tanks: 'tanksArray'
    })
  },
  created () {
    var self = this
    self.interval = setInterval(function () {
      self.bullets.forEach(bullet => {
        var block = bullet.hitBlock()
        var tank = bullet.hitTank(self.tanks)
        var hitBullet = bullet.hitBullet()
        if (bullet.hitWall()) {
          bullet.alive = false
          return
        } else if (block) {
          if (block.type === 1) {
            self.$store.dispatch('breakBlock', block)
            self.$store.dispatch('breakBullet', bullet)
            return
          } else if (block.type === 2) {
            self.$store.dispatch('breakBullet', bullet)
            if (bullet.level >= 2) {
              self.$store.dispatch('breakBlock', block)
            }
            return
          } else if (block.type === 4) {
            self.$store.dispatch('breakBlock', block)
            self.$store.dispatch('breakBullet', bullet)
            return
          }
        } else if (tank) {
          if (tank.type !== bullet.type) {
            self.$store.dispatch('breakBullet', bullet)
            self.$store.dispatch('attackTank', { tank, bullet })
            return
          }
        } else if (hitBullet) {
          if (hitBullet.type !== bullet.type) {
            self.$store.dispatch('breakBullet', bullet)
            self.$store.dispatch('breakBullet', hitBullet)
            return
          }
        }
        var step = bullet.direction > 1 ? 1 : -1
        if (bullet.direction % 2 === 0) {
          bullet.left = bullet.left + step * bullet.speed
        } else {
          bullet.top = bullet.top + step * bullet.speed
        }
      })
    }, 30)
  },
  updated () {
  },
  methods: {
    bulletClass (bullet) {
      return {
        background: 'blue',
        width: bullet.width + 'px',
        height: bullet.height + 'px',
        top: bullet.top + 'px',
        left: bullet.left + 'px',
        transform: 'rotate(' + (bullet.direction - 1) * 90 + 'deg)'
      }
    }
  }
}
</script>

<style>
.bulletMatrix{
  position: absolute;
  top: 0;
}
.bulletMatrix .bullet{
  position: absolute;
}
</style>
