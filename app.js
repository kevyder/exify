document.getElementById('photograph').onchange = function (e) {
  var file = e.target.files[0]
  if (file && file.name) {
    var image = new FileReader()
    image.readAsDataURL(file)
    image.onload = function () {
      document.getElementById('image').src = image.result
    }
    EXIF.getData(file, function () {
      var result = document.getElementById('result')
      var exifData = EXIF.pretty(this)
      if (exifData) {
        result.innerHTML = exifData
      } else {
        result.innerHTML = 'No EXIF data found in your image'
      }
    })
  }
}
