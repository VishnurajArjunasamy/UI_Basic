$(document).ready(function () {
  //calander page

  $("#calandarContainer").hide();
  const calandarContainer = $("<div>");
  //date picker functionality
  //handle the date selected
  const onDateSelect = (selectedDate) => {
    console.log(selectedDate);
    $("#calandarContainer").hide();
    $("#imageContainer").show();
    $("#descpContainer").show();
  };
  calandarContainer.datepicker({
    onSelect: onDateSelect,
    dateFormat: "dd/mm/yy",
    defaultDate: new Date().now,
  });
  $("#calandarContainer").append(calandarContainer);

  const leftHeader = $("<div>");
  leftHeader.addClass("left-header");

  //Add image Icon
  const addImgeIcon = $('<i class="fa fa-plus"></i>');
  addImgeIcon.click(() => {
    form.show();
  });

  //Calender Icon
  const calandarIcon = $('<i class="fa-solid fa-calendar-days"></i>');
  calandarIcon.click(() => {
    $("#calandarContainer").show();
    $("#imageContainer").hide();
    $("#descpContainer").hide();
  });

  //Close Icon
  const closeIcon = $('<i class="fa-solid fa-xmark"></i>');
  closeIcon.click(() => {
    form.hide();
  });

  //left container header
  leftHeader
    .append(calandarIcon)
    .append($("<h2>MEDIA</h2>"))
    .append(addImgeIcon)
    .append($('<i class="fa fa-gear"></i>'));
  $("#imageContainer").append(leftHeader);

  const images = $("<div>");
  images.addClass("images");
  const imageCard = $("<img/>");
  images.append(imageCard);
  $("#imageContainer").append(images);

  //add image form
  const form = $('<form class="images-form" id="imagesForm"></form>').hide();
  form.append(closeIcon);
  form.append(
    $(
      '<div class="input-wrapper"><label for="image" class="file-label">Choose an image</label><input type="file" id="image" name="image" accept="image/*"  required ></div>'
    )
  );

  // form.append(
  //   $(
  //     `<textarea id="journalTxt" class="content-box" placeholder='Add Content Here' required></textarea>`
  //   )
  // );
  form.append($('<input type="submit"  value="ADD">'));

  form.submit(function (e) {
    e.preventDefault();

    const file = $("#image").get(0).files[0];
    const reader = new FileReader();
    // reader.addEventListener("load", function () {
    //   imageData = reader.result;
    //   alert("Image uploaded successfully!");
    // });
    // reader.readAsDataURL(file);

    let key = Date.now(); //timestamp as key
    date = key;
    localStorage.setItem(key, JSON.stringify());
    form.hide();
  });

  //adding form to left container
  $("#imageContainer").append(form);
});
