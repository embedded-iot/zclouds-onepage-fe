function getValueFromEvent(e) {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function getFileListFromList(list = []) {
  return (list || []).map((url, index) => {
    const names = url.split('/');
    return (
      {
        uid: index,
        name: names[names.length - 1],
        status: 'done',
        url,
      }
    )
  })
}

function getListFromFileList(fileList = []) {
  return (fileList || []).map((file, index) => {
    return file && file.response ? file.response.url : file.url;
  })
}

export {
  getValueFromEvent,
  getFileListFromList,
  getListFromFileList,
}
