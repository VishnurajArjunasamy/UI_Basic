$(document).ready(function(){
    const selectedNote=sessionStorage.getItem('selectedNote')

    let colorIdx=sessionStorage.getItem('colorIdx');
    //if null, then first color as default
    if(!colorIdx) colorIdx=1

    //getting note values from local storage
    const noteData=JSON.parse(localStorage.getItem(selectedNote))
    
    $('#notesExpand').append($(`<div class='color-picked'></div>`).css('background-color',noteData.selectedClr))
    $noteDetails=$('<div class="note-details"></div>')
    $noteDetails.append(`<h1>${noteData.notestitle}</h1>`)
    $noteDetails.append(`<h3>${noteData.date}</h3>`)
    if(noteData.imagUrl) {$noteDetails.append(`<img src="${noteData.imagUrl}" alt="URL Broken"/>`)}
    $noteDetails.append(`<p>${noteData.notesTxt}</p>`)
    $('#notesExpand').append($noteDetails)

    $('#back-icon').click(function(){
        $(window).attr('location','./index.html')
        console.log('hhhhh')
    })

    //adding delete note promt card 
    $deletePromt=$('<div id="delete" class="promt"></div>')
    $deletePromt.append($(`<div class="title-card"><h1>DELETE  NOTE</h1><i id="closeIcon" class="fa fa-xmark"></i></div>`))
    $deletePromt.append($(`<p>Are you sure you want to delete this note?</p>`))
    $deletePromt.append($(`<button class="delete-confirm">YES, DELETE</button>`))
    $deletePromt.hide()
    $('body').append($deletePromt)
    $('.delete-btn').click(function(){  
        $('#delete').show()
        //close Icon
        $('#closeIcon').click(function(){$('#delete').css('display','none')})
        //deleting selected note 
        $('.delete-confirm').click(function(){
            localStorage.removeItem(selectedNote)
            $(window).attr('location','./index.html')
        })
    })

    //on click edit form
    $slider = $('.slider')
    $('.edit-btn').click(() => {
        $slider.css('right', '0px')
        $('.blur-background').show()
        $('body').css('overflow-y','hidden')
    })

     $form = $('<form class="notes-form" id="editForm"></form>')

     $topCard = $('<div class="top-card"></div>')
     $topCard.append('<h2>EDIT NOTE</h2>')
     $closeIcon=$('<i id="closeIconForm" class="fa fa-xmark"></i>')
     $topCard.append($closeIcon)
     $form.append($topCard)
 
     $form.append($(`<input type="text" id="Ititle" class="title" placeholder="Notes Title" maxlength="100" required value="${noteData.notestitle}">`))
     $form.append($(`<input type="url" id ="Iimg" class="url-txt" placeholder="Add Image URL" value=${noteData.imagUrl}>`))
     $form.append($(`<textarea id="notesContent" class="content-box" required placeholder='Add Content Here'>${noteData.notesTxt}</textarea>`))
 
     $bottom = $("<div class='bottom-card'></div>")
     $colorPick=$("<div class='color-box'></div>")
     $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
     $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
     $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
     $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
     $colorPick.append($('<div class="toggle"><img class="check" src="assets/images/tick.png"/></div>'))
 
     $bottom.append($colorPick)
     $bottom.append($('<input type="submit" class="save-btn button" value="SAVE" disabled>'))
     $form.append($bottom)
     $slider.append($form)

    //enable save button
    $('#Ititle').keyup(function(){
        if($.trim(this.value).length > 0)  $('.save-btn').prop('disabled',false).css('opacity',1)
        else $('.save-btn').prop('disabled',true).css('opacity',0.5)
    })
    $('#notesContent').keyup(function(){
        if($.trim(this.value).length > 0)  $('.save-btn').prop('disabled',false).css('opacity',1)
        else $('.save-btn').prop('disabled',true).css('opacity',0.5)
    })

    //adding ,on leave clear promt card 
    $clearpromt=$('<div id="clear" class="promt"></div>')
    $clearpromt.append($(`<div class="title-card"><h1>CONFIRM</h1><i id="closeIconPromt" class="fa fa-xmark"></i></div>`))
    $clearpromt.append($(`<p>Seems like you are in the middle of adding/editing content.Do you want to leave?</p>`))
    $clearpromt.append($(`<button class="clear-confirm">YES, CLOSE</button>`))
    $clearpromt.hide()
    $('body').append($clearpromt)
    $('#closeIconForm').click(function(){  
        if($('#Ititle').val()||$('#notesContent').val()||$('#Iimg').val()){
            $('#clear').show()
            //clear promt diable
            $('#closeIconPromt').click(function(){$('#clear').css('display','none')})
            //clear form content
            $('.clear-confirm').click(function(){
                // $('#editForm')[0].reset()
                $('.slider').css('right','-600px')
                $('#clear').hide()
                $('.blur-background').hide()
            })
        }
        else {
            $('.slider').css('right','-600px')
            $('body').css('overflow-y','visible')
        }
    })

    //selected color for note
    $(`.color-box .toggle:nth-child(${colorIdx})`).children().show()

    //color toggle 
    $('.color-box').on('click', '.toggle', function () {
        colorIdx = $(this).index()
        console.log(colorIdx)
        $(this).children('img').show()
        $(this).siblings().children('img').hide();
    });

     //notes variables
    let notestitle=''
    let imagUrl=''
    let notesTxt=''
    let date=''
    const monthNames=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const colors = ['#e6cdea', '#fcfcfc', '#f7cc7e', '#e6ed9c', '#f3ab91']
    let selectedClr = ''

    //notes object
    function Note(notestitle, imagUrl, notesTxt, selectedClr,date) {
        this.notestitle = notestitle;
        this.imagUrl = imagUrl;
        this.notesTxt = notesTxt;
        this.selectedClr = selectedClr;
        this.date=date;
    }

      //validate and stroing notes on local storage
      $form.submit(function(event){
        event.preventDefault()
        console.log('submitted')
        notestitle=$('#Ititle').val()
        imagUrl=$('#Iimg').val()
        notesTxt=$('#notesContent').val()
        // selectedClr=$('').val()
        selectedClr='white'
        let d= new Date();
        date=`${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
        let key=Date.now();
        //storing selected color index in session storage
        sessionStorage.setItem('colorIdx',colorIdx+1)
        localStorage.setItem(key,JSON.stringify(new Note(notestitle,imagUrl,notesTxt,selectedClr,date)))
        localStorage.removeItem(selectedNote)
        $(window).attr('location','./index.html')
        })
})