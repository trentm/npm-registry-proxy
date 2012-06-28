A simple/limited proxy for registry.npmjs.org. No caching, no proper usage of
status codes or headers for proxies. Only handles GETs.


# Why?

To help with testing npm and npm-registry-client.


# Usage

First edit proxy.js and look for `TODO: Inject optional "server" failures
here.` where you can optionally uncomment some stock failures or build your
own. Then run the proxy:

    node proxy.js

or:

    npm install npm-registry-proxy
    ./node_modules/.bin/npm-registry-proxy


Then you *should* be able to npm install via this thing:

    npm --registry=http://localhost:8000/ install jsontool


# License

MIT.
