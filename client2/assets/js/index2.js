let $ = require('jquery')


navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {

  const signalhub = require('signalhub')
  const createSwarm = require('webrtc-swarm')
  const hub = signalhub('my-game', [
    'http://localhost:8080'
  ])
  const swarm = createSwarm(hub, {
    stream: stream
  })

  const Player = require('./player.js')
  const Player2 = require('./player2.js')

  const you = new Player()
  you.addStream(stream)


  // swarm.on('connect', function (peer, id) {
  //     players[id] = new Player()
  //     peer.on('data', function (data) {
  //       data = JSON.parse(data.toString())
  //       players[id].update(data)
  //     })
  //     players[id].addStream(peer.stream)
  //   }
  // })


  const players = {}
const test = []


  function setup (swarm, peer, id) {
  peer.on('connect', function () {
    debug('connected to peer', id)

    swarm.peers.push(peer)
    swarm.emit('peer', peer, id)
    swarm.emit('connect', peer, id)
  })
}


console.log(swarm.peers)
console.log(players)

    swarm.on('connect', function (peer, id) {
      setup(swarm, swarm.peers, id)

        if (!players[id]) {
        players[id] = new Player2()
        test.push(peer)
        peer.on('data', function (data) {
          data = JSON.parse(data.toString())
          players[id].update(data)
        })
        players[id].addStream(peer.stream)
      }
    })
console.log(test)
  // swarm.on('peer', function(peer, id){
  //   console.log('connected to a new peer:', id)
  //   console.log('total peers:', swarm.peers.length)
  //
  // })


  swarm.on('disconnect', function (peer, id) {
    if (players[id]) {
      players[id].element.parentNode.removeChild(players[id].element)
      delete players[id]
    }
  })

  setInterval(function () {
    you.update()
    const youString = JSON.stringify(you)
    swarm.peers.forEach(function (peer) {

      peer.send(youString)


    })
  }, 100)

  document.addEventListener('keypress', function (e) {
    const speed = 146
    switch (e.key) {
      case 'a':
        you.x -= speed
        break
      case 'd':
        you.x += speed
        break
      case 'w':
        you.y -= speed
        break
      case 's':
        you.y += speed
        break
    }
  }, false)

})
