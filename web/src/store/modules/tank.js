import game from '../game'
import bullets from '../bullets'
import Bullet from './bullet'
import store from '../index'

var no = 0
var Tank = function (json) {
  var self = this
  self.no = no
  no++
  self.type = json.type || 0
  self.level = json.level || 0
  self.direction = json.direction || 1
  self.left = json.x ? json.x * game.state.size : 0
  self.top = json.y ? json.y * game.state.size : 0
  self.x = json.x || 0
  self.y = json.y || 0
  self.width = game.state.size
  self.height = game.state.size
  self.alive = true
  self.speed = 2
  self.setPosition = function (x, y) {
    self.left = x * game.state.size
    self.top = y * game.state.size
  }
  self.goStep = function (direction) {
    var isHit = false
    var step = direction > 1 ? 1 : -1
    self.direction = direction
    if (direction % 2 === 0) {
      self.left = self.left + step * self.speed
    } else {
      self.top = self.top + step * self.speed
    }
    while (self.hitWall()) {
      self.stepBack()
      isHit = true
    }
    while (self.hitBlock()) {
      self.stepBack()
      isHit = true
    }
    while (self.hitTank()) {
      self.stepBack()
      isHit = true
    }
    self.x = Math.min(Math.max(Math.floor(self.left / game.state.size), 0), game.state.wLength - 1)
    self.y = Math.min(Math.max(Math.floor(self.top / game.state.size), 0), game.state.hLength - 1)
    return isHit
  }
  self.stepBack = function () {
    var direction = self.direction
    var step = direction > 1 ? 1 : -1
    if (direction % 2 === 0) {
      self.left = self.left - step
    } else {
      self.top = self.top - step
    }
  }
  self.cold = false
  self.shoot = function () {
    if (self.cold === true) {
      return
    }
    self.cold = true
    var bullet = new Bullet({
      direction: self.direction,
      left: self.left + game.state.size / 2,
      top: self.top + game.state.size / 2,
      speed: self.speed + 2,
      level: self.level,
      type: self.type,
      no: self.no
    })
    setTimeout(function () {
      self.cold = false
    }, 300)
    return bullet
  }
  self.hitWall = function () {
    if (self.top < 0 || self.left < 0 || self.left > game.state.size * game.state.wLength - game.state.size || self.top > game.state.size * game.state.hLength - game.state.size) {
      return true
    }
    return false
  }
  self.hitBlock = function () {
    var isHit = false
    var position = {
      x: Math.floor(self.left / game.state.size),
      y: Math.floor(self.top / game.state.size),
      stepx: Math.ceil((self.left % game.state.size) / game.state.size),
      stepy: Math.ceil((self.top % game.state.size) / game.state.size)
    }
    var ystart = Math.max(position.y, 0)
    var yend = Math.min(position.y + position.stepy, game.state.hLength - 1)
    var xstart = Math.max(position.x, 0)
    var xend = Math.min(position.x + position.stepx, game.state.wLength - 1)
    for (let x = xstart; x <= xend; x++) {
      for (let y = ystart; y <= yend; y++) {
        if (game.state.backgroundMatrix[y][x].type !== 0) {
          isHit = true
        }
      }
    }
    return isHit
  }
  self.hitTank = function () {
    var isHit = false
    var tanksArray = store.getters.tanksArray
    tanksArray.forEach(tank => {
      if (self.no !== tank.no && Math.abs(self.left - tank.left) < tank.width && Math.abs(self.top - tank.top) < tank.height) {
        isHit = true
      }
    })
    return isHit
  }
  self.die = function () {
    self.alive = false
    if (self.autoShootTimeout) {
      clearTimeout(self.autoShootTimeout)
    }
  }
  self.reborn = function (x, y) {
    self.alive = true
    self.level = 0
    self.setPosition(x, y)
  }
  self.levelUp = function (x, y) {
    self.level++
    self.speed = Math.min(10, (self.level + 1) * 2)
  }
  if (self.type === 3) {
    self.autoShoot = function () {
      if (self.autoShootTimeout) {
        clearTimeout(self.autoShootTimeout)
      }
      self.autoShootTimeout = setTimeout(function () {
        var bullet = self.shoot()
        if (bullet) {
          bullets.state.bullets.push(bullet)
        }
        self.autoShoot()
      }, 3000)
    }
    self.AIMove = function () {
      var step = Math.floor(Math.random() * 20) + 20
      self.AIStep = function () {
        setTimeout(function () {
          var isHit = self.goStep(self.direction)
          step--
          if (!self.alive) { return }
          if (!isHit && step > 0) {
            self.AIStep()
          } else if (isHit) {
            self.direction = (self.direction + Math.floor(Math.random() * 3)) % 4
            var bullet = self.shoot()
            if (bullet) {
              bullets.state.bullets.push(bullet)
            }
            self.autoShoot()
            self.AIMove()
          } else {
            self.direction = (self.direction + Math.floor(Math.random() * 4)) % 4
            self.AIMove()
          }
        }, 100)
      }
      self.AIStep()
    }
    setTimeout(function () {
      if (self.alive) {
        self.AIMove()
        self.autoShoot()
      }
    }, 5000)
  }
  return self
}

export default Tank
