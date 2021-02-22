# Test how Chromes new File Handling APIs work.

## Lab
Run web server with https
```bash
yarn
yarn dev
```

Click the button and choose an empty directory of your choosing.

it took 3500ms to run in serial
it took 816ms to run in parallel

# Reference
In the file createfiles.sh is a reference implementation that uses bash to create 10 10mb files
it took 63ms to run

