const onClick = async () => {
  // 'showDirectoryPicker' gives us access to a
  // directory the user selected.
  const dirHandle = await window.showDirectoryPicker();
  
  // Oh yeah, creating new directories with the given handle
  // is possible - we're talking about true file system
  // access here!
  // const newDirHandle = await dirHandle.getDirectoryHandle('Test write', { create: true });

  console.time('create files')
  const data = []
  for (let i = 0; i < 10; i++) {
    const file = new Uint8Array(10 * 1024 * 1024)
    data.push(file)
  }
  console.timeEnd('create files')


  console.time('write linear')
  for (let i = 0; i < 10; i++) {
    const fileHandle = await dirHandle.getFileHandle(`${i}.bin`, { create: true });
    const writable = await fileHandle.createWritable();

    // Write the contents of the file to the stream.
    await writable.write(data[i]);

    // Close the file and write the contents to disk.
    await writable.close();
  }
  console.timeEnd('write linear')

  console.time('write parallel')
  const writes = []
  for (let i = 0; i < 10; i++) {
    const fileHandle = await dirHandle.getFileHandle(`p${i}.bin`, { create: true });
    const writable = await fileHandle.createWritable();
    writes.push(writable);
  }
  await Promise.all(writes.map((w, i) => w.write(data[i])))
  await Promise.all(writes.map(w => w.close()))

  console.timeEnd('write parallel')
}

const button = document.getElementById('button')
button.addEventListener('click', onClick);