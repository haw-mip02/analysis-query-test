
let finalhandler = require('finalhandler')
let http = require('http')
let serveStatic = require('serve-static')

let serve = serveStatic('build', {'index': ['index.html']})

let server = http.createServer((req, res) => {
    if (req.url.indexOf('/analysis/') === 0) {
        proxy(req, res, 'hqor.de', 16500)
        // proxy(req, res, 'analysis-rest', 5000)
    } else if (req.url.indexOf('/tweets/') === 0) {
        proxy(req, res, 'data-management', 3000)
    } else {
        serve(req, res, finalhandler(req, res))
    }
})

function proxy(req, res, host, port) {
    let reqP = http.request({
        port: port,
        host: host,
        path: req.url,
        timeout: 5000
    }, resQ => {
        delete resQ.headers['content-length']
        res.writeHead(resQ.statusCode, resQ.statusMessage, resQ.headers)
        resQ.pipe(res)
    })
    reqP.on('error', e => {
        console.log(e)
        res.statusCode = 500
        res.end()
    })
    reqP.end()
}

server.listen(80)
