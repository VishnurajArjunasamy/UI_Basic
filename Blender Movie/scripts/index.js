const videoBlog = {
    "videoUrl": "https://ia800200.us.archive.org/7/items/Sintel/sintel-2048-stereo.mp4",
    "title": "Sintel",
    "description": "“Sintel” is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film. This 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. ",
    "comments": [
        {
            "name": "Micheal Scott",
            "image": "images/reviewers/micheal.png",
            "comment": "How often do people make a film where the main character kills the thing they were trying to rescue because they didn’t recognize it? Not that often. This brought tears to my eyes."
        },
        {
            "name": "Dwight K Schrute (Asst. to the Regional Manager)",
            "image": "images/reviewers/dwight.png",
            "comment": "Breathtaking, I’ve only just begun my blender journey. Making something every day until I get to the point I can create something on this scale. Pretty amazing short story as well. Props all around to all involved in this great piece of work!"
        },
        {
            "name": "Jim Halpert",
            "image": "images/reviewers/jim.png",
            "comment": "Only the best stories can make you cry, and while I’ve lost count how many times I’ve watched this remarkable piece of art  over the years showing it to people I know, Sintel brings a tear to my eye every time. This film is inspiring not only for the beautiful story but for the magical quality animation."
        },
        {
            "name": "Pam Beesly Halpert",
            "image": "images/reviewers/pam.png",
            "comment": "This short film was riveting. The musical overlay was astounding and so were the animations. I was bawling like a little kid at the end of this video and not many videos are able to do this to me."
        },
        {
            "name": "Angela Martin",
            "image": "images/reviewers/angela.png",
            "comment": "I saw this movie a long time ago as a child and it still scars me to this day. This is the kind of stuff that should AT THE VERY LEAST be played before a movie the way they showed bao before The Incredibles 2. These are little masterpieces."
        },
        {
            "name": "Kevin Malone",
            "image": "images/reviewers/kevin.png",
            "comment": "Wow, at first I thought that it wasn’t that good, nice animation and all but not excellent story. Then I saw the end. The feels are real. You win Blender Foundation, you win."
        },
        {
            "name": "Andy Bernard",
            "image": "images/reviewers/andy.png",
            "comment": "Honestly seeing a story with a sad ending is refreshing, I can tell you the ending of 99% of all movies ever made. “Its a happy ending”. Its why I like game of thrones and its why I loved this."
        }
    ]
}
const posters = [
    {
        "imageUrl": "https://ddz4ak4pa3d19.cloudfront.net/cache/56/62/5662bc2079ee7ffd491b65c29a360ac9.jpg",
        "title": "Sprite Fright"
    },
    {
        "imageUrl": "https://cdna.artstation.com/p/assets/covers/images/019/392/064/large/andy-goralczyk-agent-poster-street-small.jpg?1563288236",
        "title": "Agent 327"
    },
    {
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Spring2019AlphaPosterBlender.jpg/1200px-Spring2019AlphaPosterBlender.jpg",
        "title": "Spring"
    }
]

const leftContainer = document.getElementById('left-container')

//inseritng video
const vidContainer  = document.createElement('div')
const video = document.createElement('video')
const source = document.createElement('source')
source.setAttribute('src', videoBlog.videoUrl)
source.setAttribute('type', 'video/mp4')
video.append(source)
vidContainer.append(video)
const playIcon  = document.createElement('i')
playIcon.setAttribute('class','fa-sharp fa-regular fa-circle-play')
vidContainer.append(playIcon)
const pauseIcon  = document.createElement('i')
pauseIcon.setAttribute('class','fa-sharp fa-regular fa-circle-pause')
vidContainer.append(pauseIcon)
vidContainer.style.position='relative'
leftContainer.append(vidContainer)

let isPlaying = false
video.addEventListener('mouseover',()=>{
    if (isPlaying) {
        pauseIcon.style.display='block'
    }
    else{
        playIcon.style.display='block'
    }

})

playIcon.addEventListener('click',()=>{
    pauseIcon.style.display='block'
    playIcon.style.display='none'
    video.play()
    isPlaying=true
})

pauseIcon.addEventListener('click',()=>{
    playIcon.style.display='block'
    pauseIcon.style.display='none'
    video.pause()
    isPlaying=false
})

setInterval(()=>{
    pauseIcon.style.display='none'
},6000)


const movieNmae = document.createElement('h1')
movieNmae.textContent = videoBlog.title
leftContainer.append(movieNmae)

const descrip = document.createElement('p')
descrip.setAttribute('class','description-txt')
descrip.textContent = videoBlog.description
leftContainer.append(descrip)

const ruler = document.createElement('hr')
leftContainer.append(ruler)

//comment section
const forumConatiner = document.createElement('div')
forumConatiner.setAttribute('class', 'comment-container')

const cmnt = document.createElement('h1')
cmnt.textContent = 'Comments'
forumConatiner.append(cmnt)


videoBlog.comments.forEach(element => {
    const commentCard = document.createElement('div')
    commentCard.setAttribute('class', 'comment-card')

    //commented user profile
    const profile = document.createElement('img')
    profile.setAttribute('src', element.image)
    profile.setAttribute('alt', 'user profile')

    commentCard.append(profile)

    //user name and comment
    const details = document.createElement('div')
    details.setAttribute('class', 'details')

    const userName = document.createElement('h5')
    userName.textContent = element.name
    details.append(userName)

    const comment = document.createElement('p')
    comment.setAttribute('class','comment-txt')
    comment.textContent = element.comment
    details.append(comment)

    commentCard.append(details)
    forumConatiner.append(commentCard)

    leftContainer.append(forumConatiner)

});

const rulerHidden = document.createElement('hr')
rulerHidden.setAttribute('class','hidden-hr')
leftContainer.append(rulerHidden)

//Upcoming movie section
const rightContainer = document.getElementById('right-container')
const upcomingTxt = document.createElement('h1')
upcomingTxt.textContent='Upcoming Projects'
rightContainer.append(upcomingTxt)
posters.forEach(element => {
    const posterCard = document.createElement('div')
    posterCard.setAttribute('class', 'poster-card')
    const poster = document.createElement('img')
    poster.setAttribute('src', element.imageUrl)
    poster.setAttribute('alt', element.title + ' ' + 'poster')
    posterCard.append(poster)
    rightContainer.append(posterCard)
});

