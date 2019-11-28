# Run

1. Run `npm i`
2. Start a zookeeper server
2. cd issue
3. Change the address in options.js to the server address
3. Run `node init-data.js` until enough nodes have been appended to root path (create 8000 nodes to the root path)
4. Run `node watch.js` (watch root path's children change event)
5. Run `node add.js` (create a new child node every 2 seconds)

# Result

There will be some logs of empty response when a new node has been append to the path been watched.

# Try

* Change the total number in init-data.js.
* Change the length of the node path character.
* Create a large data node, and get it.

When you are getting data, with the increasing of data size（children list data size or single node data size）, the number of empty response increases.

# Conclusion

A safe limit times for empty response does not exist.