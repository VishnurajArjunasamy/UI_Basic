$(document).ready(function () {
  const leftHeader = $("<div>");
  leftHeader.addClass("left-header");

  leftHeader
    .append($("<i class='fa fa-cloud'></i>"))
    .append($("<h2></h2>").append("MEDIA"))
    .append($('<i class="fa fa-plus"></i>'))
    .append($('<i class="fa fa-gear"></i>'));
  $("#imageContainer").append(leftHeader);

  const images = $("<div>");
  images.addClass("images");
  const imageCard = $("<img/>");
  images.append(imageCard);
  $("#imageContainer").append(images);

  let imageData = "";
  let date = "";
  let location = "";
  let journalTxt = "";
  //journal object
  function Journel(imageData, date, location, journalTxt) {
    this.imageData = imageData;
    this.date = date;
    this.location = location;
    this.journalTxt = journalTxt;
  }

  const form = $('<form class="add-data-form" id="journelForm"></form>');
  form.append(
    $('<input type="file" id="image" name="select image"  required >')
  );
  form.append(
    $(
      '<input type="text" id="location"  placeholder="Add location" required maxlength="100">'
    )
  );
  form.append(
    $(
      `<textarea id="journalTxt" class="content-box" placeholder='Add Content Here' required></textarea>`
    )
  );
  form.append($('<input type="submit"  value="ADD">'));

  form.submit(function (e) {
    e.preventDefault();

    const file = $("#image").get(0).files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      imageData = reader.result;
      alert("Image uploaded successfully!");
    });
    reader.readAsDataURL(file);

    location = $("#location").val();
    journalTxt = $("#journalTxt").val();

    let key = Date.now(); //timestamp as key
    date = key;
    localStorage.setItem(
      key,
      JSON.stringify(new Journel(imageData, date, location, journalTxt))
    );
  });

  $("#imageContainer").append(form);
});
