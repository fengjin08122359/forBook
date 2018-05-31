import game from '../game'
import store from '../index'

var Bullet = function (json) {
  var self = this
  self.type = json.type || 0
  self.no = json.no || 0
  self.width = 2
  self.height = 10
  self.level = json.level || 0
  self.direction = json.direction || 0
  self.left = json.left || 0
  self.top = json.top || 0
  self.alive = true
  self.speed = json.speed || 3
  self.hitWall = function () {
    if (self.top < 0 || self.left < 0 || self.left > game.state.size * game.state.wLength - self.width || self.top > game.state.size * game.state.hLength - self.height) {
      self.alive = false
      return true
    }
    return false
  }
  self.hitBlock = function () {
    var isHit
    var x = Math.min(Math.max(Math.floor(self.left / game.state.size), 0), game.state.wLength - 1)
    var y = Math.min(Math.max(Math.floor(self.top / game.state.size), 0), game.state.hLength - 1)
    if (game.state.backgroundMatrix[y][x].type !== 0) {
      isHit = game.state.backgroundMatrix[y][x]
    }
    return isHit
  }
  self.hitTank = function (tanks) {
    var isHit
    tanks.forEach(tank => {
      if (self.left > tank.left && self.left < tank.left + tank.width && self.top > tank.top && self.top < tank.top + tank.height) {
        isHit = tank
      }
    })
    return isHit
  }
  self.hitBullet = function () {
    var isHit
    var aliveBullets = store.getters.aliveBullets
    aliveBullets.forEach(bullet => {
      if (self.no !== bullet.no && Math.abs(self.left - bullet.left) < 10 && Math.abs(self.top - bullet.top) < 10) {
        isHit = bullet
      }
    })
    return isHit
  }
  return self
}

export default Bullet
