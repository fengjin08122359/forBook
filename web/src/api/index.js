import level from '../level'

export default {
  generateBackground (num) {
    return level.length > num ? level[num] : level[0]
  }
}
