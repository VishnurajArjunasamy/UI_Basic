$(document).ready(function () {
    $('#solutions-tab').accordion()
    $('#tabContainer').tabs()
    $('#tabContainer').addClass('tab-container')

    //tab 3

    // let flagUrl={}
    // $.getJSON('assets/data/flags.json',function(flag){
    //     flagUrl=flag
    //     console.log(flagUrl)
    // })
    // console.log(flagUrl)
    let container = '<div class="location-container"></div>'
    $('#locations-tab').append(container)
    $.getJSON('assets/data/locations.json', function (location) {
         //get flag url
        $.getJSON('assets/data/flags.json',function(flag){


            console.log(location)
            location.forEach(element => {
                console.log()
                $('.location-container').append($(`<div class="location-card"><img src=${flag[element.country]} alt=${JSON.stringify((element.country)+' flag')}/><p>${element.state}</p><p>${element.city}</p><p>${element.contact}</p></div>`))
            });
        })
       
    })
})