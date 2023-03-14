$(document).ready(function () {
    let displayQuantity = 10;

    let colorIdx=sessionStorage.getItem('colorIdx');
    //if null, then first color as default
    if(!colorIdx) colorIdx=1

    //getting objects form local storage
    let keys = (Object.keys(localStorage)).sort((a, b) => b - a)

    //if notes present ,hide empty page section
    if (keys.length) {
        $('.empty').hide()
    }

    //load more button
    $('body').append($("<button class='load-btn'>LOAD MORE</button>").hide())
    $('.load-btn').click(function (event) {
        // event.preventDefault()
        displayQuantity += 10
        $('#notesArea .notes').slice(0, displayQuantity).show()
        if (displayQuantity > keys.length) $('.load-btn').hide()
    })

    //if more than ten notes ,then only show load btn
    if (keys.length > displayQuantity) $('.load-btn').show()

    //adding 10 notes per click on load more 
    keys.forEach(element => {
        let note = JSON.parse(localStorage.getItem(element))
        $note = ($(`<div class="notes" data=${element}></span>`))
        $note.append(`<h1>${note.notestitle}</h1><span>${note.date}</span>`)
        if (note.imagUrl) { $note.append(`<img src="${note.imagUrl}" alt="URL Broken"/>`) }
        $note.append($(`<p>${note.notesTxt}</p></div>`)).css('background-color', note.selectedClr)
        $('#notesArea').append($note)
        $('#notesArea .notes').hide()
        $('#notesArea .notes').slice(0, displayQuantity).show()
    });

    //adding delete all promt card 
    $deleteAllPromt = $('<div id="deleteAll" class="promt"></div>')
    $deleteAllPromt.append($(`<div class="title-card"><h1>DELETE ALL NOTES</h1><i id="closeIcon" class="fa fa-xmark"></i></div>`))
    $deleteAllPromt.append($(`<p>Are you sure you want to delete all notes</p>`))
    $deleteAllPromt.append($(`<button class="deleteAll-confirm">YES, DELETE</button>`))
    $deleteAllPromt.hide()
    $('body').append($deleteAllPromt)
    $('.delete-all-btn').click(function () {
        $('#deleteAll').show()
        //close Icon
        $('#closeIcon').click(function () { $('#deleteAll').css('display', 'none') })
        //deleting all content
        $('.deleteAll-confirm').click(function () {
            localStorage.clear()
            location.reload()
        })
    })

    //new notes section
    $slider = $('.slider')
    $('.new-btn').click(() => {
        $slider.css('right', '0px')
        $('.blur-background').show()
        $('body').css('overflow-y','hidden')
    })

    //form for inputs
    $form = $('<form class="notes-form" id="addForm"></form>')

    $topCard = $('<div class="top-card"></div>')
    $topCard.append('<h2>NEW NOTE</h2>')
    $closeIcon = $('<i id="closeIconForm" class="fa fa-xmark"></i>')
    $topCard.append($closeIcon)
    $form.append($topCard)

    $form.append($('<input type="text" id="Ititle" class="title" placeholder="Notes Title" required maxlength="100">'))
    $form.append(`<input type="url" id ="Iimg" class="url-txt" placeholder="Add Image URL">`)
    $form.append($(`<textarea id="notesContent" class="content-box" placeholder='Add Content Here' required></textarea>`))

    $bottom = $("<div class='bottom-card'></div>")
    $colorPick = $("<div class='color-box'></div>")
    $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
    $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
    $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
    $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
    $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))


    $bottom.append($colorPick)
    $bottom.append($('<input type="submit" class="add-btn button" disabled value="ADD">'))
    $form.append($bottom)
    $slider.append($form)

    //enable add button
    $('#Ititle').keyup(function () {
        if ($.trim(this.value).length > 0) $('.add-btn').prop('disabled', false).css('opacity', 1)
        else $('.add-btn').prop('disabled', true).css('opacity', 0.5)
    })
    $('#notesContent').keyup(function () {
        if ($.trim(this.value).length > 0) $('.add-btn').prop('disabled', false).css('opacity', 1)
        else $('.add-btn').prop('disabled', true).css('opacity', 0.5)
    })

    //adding on leave clear promt card 
    $clearpromt = $('<div id="clear" class="promt"></div>')
    $clearpromt.append($(`<div class="title-card"><h1>CONFIRM</h1><i id="closeIconPromt" class="fa fa-xmark"></i></div>`))
    $clearpromt.append($(`<p>Seems like you are in the middle of adding/editing content.Do you want to leave</p>`))
    $clearpromt.append($(`<button class="clear-confirm" >YES, CLOSE</button>`))
    $clearpromt.hide()
    $('body').append($clearpromt)
    $('#closeIconForm').click(function () {
        if ($('#Ititle').val() || $('#notesContent').val() || $('#Iimg').val()) {
            $('#clear').show()
            //clear promt diable
            $('#closeIconPromt').click(function () { $('#clear').css('display', 'none') })
            //clear form content
            $('.clear-confirm').click(function () {
                $('#addForm')[0].reset()
                $('.slider').css('right', '-600px')
                $('#clear').hide()
            })
        }
        else {
            $('.blur-background').hide()
            $('.slider').css('right', '-600px')
            $('body').css('overflow-y','visible')
        }
    })

    //notes variables
    let notestitle = ''
    let imagUrl = ''
    let notesTxt = ''
    let date = ''
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const colors = ['#e6cdea', '#fcfcfc', '#f7cc7e', '#e6ed9c', '#f3ab91']
    let selectedClr = ''

    //notes object
    function Note(notestitle, imagUrl, notesTxt, selectedClr, date) {
        this.notestitle = notestitle;
        this.imagUrl = imagUrl;
        this.notesTxt = notesTxt;
        this.selectedClr = selectedClr;
        this.date = date;
    }
    // color picked
    $(`.color-box .toggle:nth-child(${colorIdx})`).children().show()

    //color  picker toggle
    $('.color-box').on('click', '.toggle', function () {
        colorIdx = $(this).index()
        console.log(colorIdx)
        $(this).children('img').show()
        $(this).siblings().children('img').hide();
    });

    //validate and adding notes to local storage
    $form.submit(function (event) {
        notestitle = $('#Ititle').val()
        imagUrl = $('#Iimg').val()
        notesTxt = $('#notesContent').val()
        let d = new Date();
        date = `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
        let key = Date.now(); //timestamp as key
        selectedClr = colors[colorIdx]
        //storing selected color index in session storage
        sessionStorage.setItem('colorIdx',colorIdx+1)

        //storing object in local storagae
        localStorage.setItem(key, JSON.stringify(new Note(notestitle, imagUrl, notesTxt, selectedClr, date)))
    })

    //full note page
    $('.notes').click(function (event) {
        $(window).attr('location', './notesDetail.html')
        sessionStorage.setItem('selectedNote', event.target.attributes.data.value)
        console.log(event)
    })
})
