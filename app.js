document.getElementById('photograph').onchange = function (e) {
  var file = e.target.files[0]
  if (file && file.name) {
    var image = new FileReader()
    image.readAsDataURL(file)
    image.onload = function () {
      document.getElementById('image').src = image.result
    }
    EXIF.getData(file, function () {
      var button = document.getElementById('copy')
      var result = document.getElementById('result')
      var exifData = EXIF.pretty(this)
      if (exifData) {
        var datetime = EXIF.getTag(this, 'DateTime')
        var iso = EXIF.getTag(this, 'ISOSpeedRatings')
        var make = EXIF.getTag(this, 'Make')
        var model = EXIF.getTag(this, 'Model')
        var focalLength = EXIF.getTag(this, 'FocalLength')
        var shutterSpeed = EXIF.getTag(this, 'ShutterSpeedValue')
        var flash = EXIF.getTag(this, 'Flash')
        var meteringMode = EXIF.getTag(this, 'MeteringMode')
        result.innerHTML = `Date & Time: ${datetime}\n`
        result.innerHTML += `Camera: ${make} ${model}\n`
        result.innerHTML += `ISO: ${iso}\n`
        result.innerHTML += `Focal-Length: ${focalLength}\n`
        result.innerHTML += `Shutter Speed: ${shutterSpeed}\n`
        result.innerHTML += `Flash: ${flash}\n`
        result.innerHTML += `Metering Mode: ${meteringMode}\n`
        button.style.display = "block"
      } else {
        result.innerHTML = 'No EXIF data found in your image'
        button.style.display = "none"
      }
    })
  }
}
