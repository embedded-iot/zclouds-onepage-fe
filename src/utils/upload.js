function getValueFromEvent(e) {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function getFileListFromList(list = []) {
  return (list || []).map((image, index) => {
    const url = typeof image === 'string' ? image : image.url;
    const names = url.split('/');
    return (
      {
        uid: index,
        name: names[names.length - 1],
        status: 'done',
        url: url,
        response: image
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
