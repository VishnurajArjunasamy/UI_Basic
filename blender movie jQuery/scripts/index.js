$(document).ready(function(){
    $.ajax({url: "https://mocki.io/v1/4da47fc5-bbf3-4e41-b35f-c88a584bc4b0", success: function(videoBlog){
        //inseting video
        $videoConatiner = $('<div class=""></div>')
        $video=$('<video></video>',{poster:"images/banner.png"})
        $source=$(`<source></source>`,{src:videoBlog.videoUrl})
        $video.append($source)
        $videoConatiner.append($video)

        //creating play and pause icon
        $playIcon=$('<i></i>',{class:'fa-sharp fa-regular fa-circle-play'})
        $videoConatiner.append($playIcon)
        $pauseIcon=$('<i></i>',{class:'fa-sharp fa-regular fa-circle-pause'})
        $videoConatiner.append($pauseIcon)

        $videoConatiner.css('position','relative')
        $('#left-container').append($videoConatiner)

        //toggling play and pause icon
        let isPlaying = false
        $video.mouseenter(function(){
            if (isPlaying) {
                $pauseIcon.css('display','block')
            }
            else{
                $playIcon.css('display','block')
            }
        })

        $playIcon.click(function(){
            $pauseIcon.css('display','block')
            $playIcon.css('display','none')
            $video[0].play()
            isPlaying=true
        })

        $pauseIcon.click(function(){
            $playIcon.css('display','block')
            $pauseIcon.css('display','none')
            $video[0].pause()
            isPlaying=false
        })
        //pause icon diappear after 6 seconds
        setInterval(()=>{
            $pauseIcon.css('display','none')
        },6000)

        $('#left-container').append((`<h1>${videoBlog.title}</h1>`))
        $('#left-container').append((`<p class='description-txt'>${videoBlog.description}</p>`))
        $('#left-container').append(`<hr>`)

        //comment section
        $('#left-container').append((`<h1>Comments</h1>`))
        const commentsFrag = $(document.createDocumentFragment());

        videoBlog.comments.forEach(element => {
            $commentCard=$('<div class="comment-card"></div>')
            //commented user profile
            $profile=$(`<img/>`,{src:element.image,alt:'profile image'})
            $commentCard.append($profile)
            //user name and comment
            $details=$('<div class="details"></div>').append($(`<h5>${element.name}</h5>`)).append($(`<p class='comment-txt'>${element.comment}</p>`))
            $commentCard.append($details)
            commentsFrag.append($commentCard)
        });
        $('#left-container').append(commentsFrag)

        //hidden hr
        $('#left-container').append($('<hr>',{class:'hidden-hr'}))

        //upcoming movie section
        $('#right-container').append(`<h1>Upcoming Projects</h1>`)
        const posterFrag = $(document.createDocumentFragment());
        $.ajax({url: "https://mocki.io/v1/8c9b378b-d248-4203-93b0-b8e7659ac346", success: function(posters){
            posters.forEach(element => {
                $posterCard=$('<div class="poster-card"></div>').append($('<img/>',{src:element.imageUrl,alt:element.title + ' ' + 'poster'}))
                posterFrag.append($posterCard)
            });
            $('#right-container').append(posterFrag)
        }});
        
    }});
})