$(document).ready(function () {
  let selectedDate =
    sessionStorage.getItem("selectedDate") || new Date().toLocaleDateString();
  //get journal object
  localStorage.getItem(selectedDate)
    ? null
    : localStorage.setItem(
        selectedDate,
        JSON.stringify({ journalText: "", images: [] })
      );

  let journal = JSON.parse(localStorage.getItem(selectedDate));

  //calander page
  $("#calandarContainer").hide();
  const calandarContainer = $("<div>");
  //handle the date selected
  const onDateSelect = (date) => {
    sessionStorage.setItem("selectedDate", date);
    $("#calandarContainer").hide();
    $("#imageContainer").show();
    $("#descpContainer").show();
    location.reload(true);
  };
  //date picker functionality
  calandarContainer.datepicker({
    onSelect: onDateSelect,
    dateFormat: "dd/mm/yy",
    defaultDate: new Date(),
  });
  $("#calandarContainer").append(calandarContainer);

  //Close Icon for add image form
  const closeIcon = $('<i class="fa-solid fa-xmark"></i>');
  closeIcon.click(() => {
    ImgForm.hide();
  });

  //add image form
  const ImgForm = $('<form class="images-form" id="imagesForm"></form>').hide();
  ImgForm.append(closeIcon);
  ImgForm.append(
    $('<div class="input-wrapper"></div>')
      .append(
        $('<label for="image" class="file-label">Choose an image</label>')
      )
      .append(
        $(
          '<input type="file" id="image" name="image" accept="image/*"  required >'
        )
      )
  );

  ImgForm.append($('<input type="submit"  value="ADD">'));

  ImgForm.submit((e) => {
    e.preventDefault();
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      journal = JSON.parse(localStorage.getItem(selectedDate));
      let images = journal.images;
      images.push(base64String);
      localStorage.setItem(
        selectedDate,
        JSON.stringify({
          ...journal,
          images: images,
          lastUpdated: new Date().toUTCString(),
        })
      );
      location.reload(true);
    };
  });

  //adding form to left container
  $("#imageContainer").append(ImgForm);

  //Add image Icon
  const addImgeIcon = $('<i class="fa fa-plus"></i>');
  addImgeIcon.click(() => {
    ImgForm.show();
  });

  //Calender Icon
  const calandarIcon = $('<i class="fa-solid fa-calendar-days"></i>');
  calandarIcon.click(() => {
    $("#calandarContainer").show();
    $("#imageContainer").hide();
    $("#descpContainer").hide();
  });

  const leftHeader = $("<div>");
  leftHeader.addClass("left-header");
  //left container header
  leftHeader
    .append(calandarIcon)
    .append($("<h2>MEDIA</h2>"))
    .append(addImgeIcon)
    .append($('<i class="fa fa-gear"></i>'));
  $("#imageContainer").append(leftHeader);

  //container for images
  const images = $("<div>");
  images.addClass("images");
  //Loading the date specific images form local storage
  const imageArray =
    JSON.parse(localStorage.getItem(selectedDate)).images || [];
  //show empty image if array is empty
  if (imageArray.length == 0) {
    const emptyCard = $("<img/>")
      .attr("src", "assets/images/empty.png")
      .addClass("empty-card");
    images.append(emptyCard);
  } else {
    journal.images.forEach((element) => {
      const imageCard = $("<img/>").attr("src", element).addClass("image-card");
      images.append(imageCard);
    });
  }
  $("#imageContainer").append(images);

  //time line  container
  //header
  const rightHeader = $("<div class='right-header'></div>");
  rightHeader
    .append($("<h2>TIMELINE</h2>"))
    .append($('<i class="fa-solid fa-star"></i>'));

  //cover iamge
  // const cover = JSON.parse(localStorage.getItem(selectedDate))
  let cover;
  if (imageArray.length > 0) {
    cover = imageArray[0];
  } else {
    cover = "assets/images/summer-cover.jpeg";
  }
  const coverImage = $("<img/>").attr("src", cover).addClass("cover-image");

  // format date
  const formatedDate = {};
  const formatDate = (fDate) => {
    let dateStr = fDate.replace(/\//g, "-");
    const parts = dateStr.split("-");
    dateStr = parts[2] + "-" + parts[1] + "-" + parts[0];
    const date = new Date(dateStr);

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    formatedDate.date = date.getDate();
    formatedDate.month = month[date.getMonth()];
    formatedDate.year = date.getFullYear();
    formatedDate.day = weekday[date.getDay()];
    formatedDate.time = ` ${date.getHours() % 12}:${date.getMinutes()} ${
      date.getHours() > 12 ? "PM" : "AM"
    }`;
  };
  formatDate(selectedDate);

  //time line card
  const timeLine = $("<div class='vertical-split'></div>")
    .append($(`<h1>${formatedDate.date}</h1>`))
    .append(
      $('<div class="horizontal-split"></div>')
        .append(
          $(
            `<p>${formatedDate.month} ${formatedDate.date},${formatedDate.year}</p>`
          )
        )
        .append($(`<p>${formatedDate.day} ${formatedDate.time}</p>`))
    )
    .append(
      $(
        `<h6>${
          journal.lastUpdated ? "Last updated: " + journal.lastUpdated : ""
        }</h6>`
      )
    );
  journal = JSON.parse(localStorage.getItem(selectedDate));
  journalText = journal.journalText;
  //journal area
  const journalArea = $(
    `<textarea id="journalBox" class="text-box"  placeholder="Enter text here..." >${journalText}</textarea>`
  );
  journalArea.on("input", function () {
    console.log("changed to ", $(this).val());
    localStorage.setItem(
      selectedDate,
      JSON.stringify({
        ...journal,
        journalText: $(this).val(),
        lastUpdated: new Date().toUTCString(),
      })
    );
  });

  $("#descpContainer")
    .append(rightHeader)
    .append(coverImage)
    .append(
      $("<div class='wrapper'></div>").append(timeLine).append(journalArea)
    );
});
