# change

1. npm run i
2. Start a zookeeper server
2. cd issue
3. Change the address in options.js to the server address
3. Run node init-data.js until enough nodes have been appended to root path (create 8000 nodes to the root path)
4. Run watch.js (watch root path's children change event)
5. Run add.js (create a new child node every 2 seconds)

# Result

There will be some logs of empty response when a new node has been append to the path been watched.

# Try

* Change the total number in init-data.js.
* Change the length of the node path character.

With the number of child nodes increasing, the number of errors increases.

# Conclusion

A safe limit times for empty response does not exist.