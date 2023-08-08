
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function downloadFile(url,name){
  var a = document.createElement("a") //新建一个a链接
  a.setAttribute("href",url) // a链接的url为图片的url
  a.setAttribute("download",name)
  a.setAttribute("target","_blank")
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a); //下载完成移除元素
  if (typeof blob != 'string') {
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }

}

export function downloadFileByBase64(base64,name){
  var myBlob = dataURLtoBlob(base64);
  var myUrl = URL.createObjectURL(myBlob); //创建图片的临时url
  downloadFile(myUrl,name)
  window.URL.revokeObjectURL(myUrl);
}
