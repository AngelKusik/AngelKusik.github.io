import app from './app'
import debug from 'debug'
debug('temp:server')
import http from 'http'
import { HttpError } from 'http-errors'

// Normalize part into a number, string, or false
const normalizePort = (val: string) => {
    const port = parseInt(val, 10)

    if (isNaN(port)) return val   // if it is not a number - returns true or false

    if (port >= 0) return port 

    return false
}

const port = normalizePort(process.env.PORT || '3000') as number
app.set('port', port)

// Event listening for HTTP server 'error' event
const onError = (error: HttpError) => {
    if (error.syscall !== 'listen') throw error

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    // Handle specific listen errors with custom messages
    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1)
            break
        default:
            throw error
    }
}

// Listener
const onListening = () => {
    let addr = server.address()
    let bind = 'pipe ' + addr
    debug('listening on ' + bind)
}

// Start our server
const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)