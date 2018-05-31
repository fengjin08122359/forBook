<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div :class="defaultSwiperClasses.wrapperClass">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  props: {
    options: {
      type: Object,
      default () {
        return {
          autoplay: 3500
        }
      }
    },
    notNextTick: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      defaultSwiperClasses: {
        wrapperClass: 'swiper-wrapper'
      }
    }
  },
  updated () {
    if (!this.swiper) {
      this.swiper = new window.Swiper('.swiper-container', this.options)
    } else {
      this.swiper.reInit()
    }
  },
  mounted () {
    var self = this
    if (!this.swiper) {
      this.swiper = new window.Swiper('.swiper-container', this.options)
    }
    function mount () {
      if (!self.swiper) {
        delete self.options.notNextTick
        var setClassName = false
        for (var className in self.defaultSwiperClasses) {
          if (self.defaultSwiperClasses.hasOwnProperty(className)) {
            if (self.options[className]) {
              setClassName = true
              self.defaultSwiperClasses[className] = self.options[className]
            }
          }
        }
        var mountInstance = function () {
          self.swiper = new window.Swiper(self.$el, self.options)
        }
        setClassName ? self.$nextTick(mountInstance) : mountInstance()
      }
    }
    (this.options.notNextTick || this.notNextTick) ? mount() : this.$nextTick(mount)
  },
  beforeDestroy () {
    if (this.swiper) {
      this.swiper.destroy()
      delete this.swiper
    }
  }
}
</script>
