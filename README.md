A simple/limited proxy for registry.npmjs.org. No caching, no proper usage of
status codes or headers for proxies. Only handles GETs.

# Why?

To help with testing npm and npm-registry-client.

# Usage

    node proxy.js

or:

    npm install npm-registry-proxy
    ./node_modules/.bin/npm-registry-proxy

# License

MIT.
