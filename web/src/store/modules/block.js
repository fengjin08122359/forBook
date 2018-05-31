var Block = function (json) {
  var self = this
  self.x = json.x || 0
  self.y = json.y || 0
  self.type = json.type || 0
  self.alive = 1
  return self
}

export default Block
