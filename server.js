const http = require('http')
const fs = require('fs')

function doOnRequest(request, response) {
  // Send back a message saying "Welcome to Twitter"
  // code here...
  const index = fs.readFileSync('./index.html')
  if (request.method === 'GET' && request.url === '/') {
    response.write(index)
    // console.log({ request }, { response })
    // read the index.html file and send it back to the client
    // const index = fs.readFileSync('./index.html')
    // code here...
  } else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    const greeting = 'Somebody said hi.\n'
    console.log('greeting appended to file')
    fs.appendFileSync('hi_log.txt', greeting)
    console.log('hi back to you!')
  } else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    const chunks = []
    request.on('data', (chunk) => chunks.push(chunk))
    request.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const body = buffer.toString()
      fs.appendFileSync('hi_log.txt', body + '\n')
      switch (body) {
        case 'hello':
          return console.log('hello there!')
        case "what's up":
          return console.log('the sky!')
        default:
          return console.log('good morning.')
      }
    })
  } else {
    // Handle 404 error: page not found
    // code here...
    response.statusCode(404)
    response.write("Error: Not found");
    response.end()
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000)
