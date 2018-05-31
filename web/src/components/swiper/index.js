import swiper from './swiper'
import swiperslide from './swiper-slide'

/* istanbul ignore next */
swiper.install = function (Vue) {
  Vue.component(swiperslide.name, swiperslide)
  Vue.component(swiper.name, swiper)
}

export default swiper
