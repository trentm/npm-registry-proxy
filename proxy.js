// Proxy for registry.npmjs.org.

var http = require('http')
var log = console.log
var counter = 0;


var server = http.createServer(function(req, res) {
    log("proxy:", req.method, req.url)

    if (req.method !== "GET") {
        res.statusCode = 400;
        res.write('only handle GETs\n')
        res.end()
        return
    }

    // TODO: Inject optional "server" failures here.
    /*
    // - Fail twice for 'GET /$package'
    if (req.url.split('/').length - 1 === 1 && counter < 2) {
        log('500 this request')
        res.statusCode = 500
        res.end()
        counter++
    }
    */
    /*
    // - Fail once for 'GET /$package/-/$package-$version.tgz'
    var packageRe = new RegExp('^/([^/]+)/-/\\1-[^/]+\.tgz$')
    if (packageRe.test(req.url) && counter < 1) {
        log('500 this request')
        res.statusCode = 500
        res.end()
        counter++
    }
    */

    var options = {
        host: 'registry.npmjs.org',
        port: 80,
        path: req.url,
        method: req.method
    };

    var preq = http.request(options, function(pres) {
        // The registry json for a module hardcodes "registry.npmjs.org"
        // for the package URLs. If you want `npm install` to download
        // via the proxy, we need to replace those URLs here.
        if (pres.headers['content-type'] === "application/json") {
            var chunks = [];
            pres.on('data', function (chunk) {
                //log('PROXY: got a chunk (%d bytes)', chunk.length)
                chunks.push(chunk);
            });
            pres.on('end', function () {
                var data = chunks.join('')
                data = data.replace(/registry.npmjs.org/g, "localhost:8000")
                res.write(data);
                res.end();
            });
        } else {
            pres.on('data', function (chunk) {
                res.write(chunk)
            });
            pres.on('end', function () {
                res.end()
            });
        }
    });

    preq.on('error', function(e) {
        res.statusCode = 500;
        res.write('error proxying: ' + e)
        res.end();
    });

    preq.end();
})
server.listen(8000)
