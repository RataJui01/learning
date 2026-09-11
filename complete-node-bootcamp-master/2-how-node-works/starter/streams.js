const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  /**
   * Node have to download entire file into memory, because only after
   * that's ready, it can send that data
   *
   * This is a problem when file is big and when there are ton of requests hitting your server
   * because node process will very quickly run out of resources and your app will be crash
   *
   * This solution works in locally but not in production-ready.
   *
   */
  /*
  fs.readFile('test-file.txt', (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
  */
  // Solution 2: Streams
  /**
   * In this solution, we don't have a variable to keep a large data and send it.
   * But we read a part of large data(chunk) then send it chunk by chunk.
   *
   * Problems: Backpressure (We can't send the data nearly as fast as it is receiving it).
   * Because readable stream that we read a file from disk is much much faster than sending
   * the result with the response writable stream over the network.
   */
  //   const readable = fs.createReadStream('test-file.txt'); // Create Read Stream
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //     // Listen to "data" event from read stream and we can read chunk of data,
  //     // then we will write and send that chunk to browser.
  //     });
  //   readable.on('end', () => {
  //     res.end();
  //     /**
  //      * Need to have this line because it is a signals "response is complete"
  //      * but don't write any data because we already sent them
  //      */
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not Found!');
  //   });

  // Solution 3
  /**
   * What pipe does is pipe the output of readable stream into input of writable stream
   */
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res); // readableSource.pipe(writableDest)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
