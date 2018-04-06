﻿


var speak = new Array( );


function LanguageChange(lang)
{
    if(lang === "english")
    {
        window.external.ChangeLanguage("en-gb");
        eraseCookie("CurrentLanguage");
        writeCookie("CurrentLanguage", "English", 30);
        document.getElementById("btn_english").style.backgroundColor = "#ffffff";
        document.getElementById("btn_english").style.color = "#FF6600";
        document.getElementById("btn_spanish").style.backgroundColor = "#FF6600";
        document.getElementById("btn_spanish").style.color = "#ffffff";

        document.getElementById("txt_eat").innerHTML = "Restaurants";
        document.getElementById("txt_shopping").innerHTML = "Shopping";
        document.getElementById("txt_take_selfie").innerHTML = "Take Selfie";
        document.getElementById("txt_robot_avatar").innerHTML = "Robot Avatar";
        // document.getElementById("vote-title").innerHTML = "Vote for who will win?";

        speak[0] = "Enjoy your time at some of our great restaurants.";
        speak[1] = "Spend some time at some of our shops.";
        speak[2] = "Please touch the camera icon below and Say Cheese!";
        speak[3] = "Smile you are about to become a robot.";


    }
    else if (lang === "spanish")
    {
        window.external.ChangeLanguage("es-us");
        eraseCookie("CurrentLanguage");
        writeCookie("CurrentLanguage", "Spanish", 30);
        document.getElementById("btn_english").style.backgroundColor = "#FF6600";
        document.getElementById("btn_english").style.color = "#ffffff";
        document.getElementById("btn_spanish").style.backgroundColor = "#ffffff";
        document.getElementById("btn_spanish").style.color = "#FF6600";

        document.getElementById("txt_eat").innerHTML = "Restaurante";
        document.getElementById("txt_shopping").innerHTML = "Compras";
        document.getElementById("txt_take_selfie").innerHTML = "Tomar Selfie";
        document.getElementById("txt_robot_avatar").innerHTML = "Robot Avatar";
        // document.getElementById("vote-title").innerHTML = "Vote por quién ganará?";


        speak[0] = "Disfruta de tu tiempo en algunos de nuestros excelentes restaurantes.";
        speak[1] = "Pase tiempo en algunas de nuestras tiendas.";
        speak[2] = "Toca el icono de la cámara a continuación y ¡Di queso!";
        speak[3] = "Sonríe, estás a punto de convertirte en un robot.";
    }

}

function FC_ContentsCall(strContentsName, strLanguage)
{
   // alert(strContentsName);
  

    switch (strContentsName)
    {
        case "Home":
           location.href = "../../maincontents.htm";
            break;
        case "Eats":
            PlaySpeech(speak[0]);
            location.href = "Contents/Eat/index.html";
            break;
        case "Shopping":
            PlaySpeech(speak[1]);
            location.href = "Contents/Shopping/index.html";
            break;
        case "Selfie":
            PlaySpeech(speak[2]);
            location.href = "Contents/Selfie/index.html";
            break;
        case "Avatar":
            PlaySpeech(speak[3]);
            location.href = "Contents/RobotAvatar/index.htm";
            break;
        case "Config":
            location.href = "Config/Config.htm";
            break;
        default:
            break;
    } // end switch(strContentsName)
} // end FC_ContentsCall


function votePress(team) {
    var i;
    switch (team)
    {
        case "t1":
            if(readCookie("team1")=== null)
            {i = 0;}
                i = readCookie("team1");
                i++;
                writeCookie("team1", i.toString(), 30);
                document.getElementById("t1-vote").innerHTML = i.toString();
            break;
        case "t2":
            if(readCookie("team2")=== null)
            {i = 0;}
            i = readCookie("team2");
            i++;
            writeCookie("team2", i.toString(), 30);
            document.getElementById("t2-vote").innerHTML = i.toString();
            break;
        case "t3":
            if(readCookie("team3")=== null)
            {i = 0;}
            i = readCookie("team3");
            i++;
            writeCookie("team3", i.toString(), 30);
            document.getElementById("t3-vote").innerHTML = i.toString();
            break;
        case "t4":
            if(readCookie("team4")=== null)
            {i = 0;}
            i = readCookie("team4");
            i++;
            writeCookie("team4", i.toString(), 30);
            document.getElementById("t4-vote").innerHTML = i.toString();
            break;
    } // end switch
} // end votepress()

function voteInit() {
    document.getElementById("t1-vote").innerHTML = readCookie("team1").toString();
    document.getElementById("t2-vote").innerHTML = readCookie("team2").toString();
    document.getElementById("t3-vote").innerHTML = readCookie("team3").toString();
    document.getElementById("t4-vote").innerHTML = readCookie("team4").toString();
}

function OnUserApproached()
{
    PlaySpeech("Hi, I'm Erin, thanks for traveling with us.  To get started, please press a button below.");
}



function ShowPopup(){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();
    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800" src="assets/contact.png"/></div></div>';
}

$(document).ready(function(){
    ShowTime();

    $('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {
        $('#dialog-overlay, #dialog-box').hide();
        return false;
    });
})


var city = "San Antonio";
var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='f'";
var queryURL = "https://query.yahooapis.com/v1/public/yql?q="+ searchtext + "&format=json";

$.getJSON(queryURL, function (data) {

    var results = data.query.results;
    var firstResult = results.channel.item.condition;
    console.log(firstResult);


    var location = 'Unknown'; // not returned in response
    var temp = firstResult.temp;
    var text = firstResult.text;
    var image =  firstResult.code;
    var loc = 'https://s.yimg.com/zz/combo?a/i/us/we/52/'+image+'.gif' ;

    // $('#temp').append('The temperature is <strong>' + temp + '</strong><sup>°F</sup> Forecast calls for '+text);

    $('#condition').append(text);
    $('#temp').append(temp+ '</strong><sup>°F</sup>');

    $('#image-zoom').attr("src",loc);
});

function ShowTime()
{
    var dt = new Date();
    // formatAMPM(dt);
    document.getElementById("content_air") .innerHTML = formatAMPM(dt) ;
    document.getElementById("content_date") .innerHTML = formatDate(dt);

}
function formatAMPM(date) {

    var hours = date.getHours();
    var minutes = date.getMinutes();


    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var dayName = days[date.getDay()];

    //dayName = date.toString().split(' ')[0];
    hours = hours <10? '0' +hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = dayName + ' ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
    //alert(strTime);
}

function formatDate(date){

    var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = m_names[date.getMonth()];
    var day = date.getDate();
    day = getGetOrdinal(day);

    var output = (month<10 ? '0' : '') + month + ' ' +(day<10 ? '0' : '') + day+', '+ date.getFullYear() ;
    return output;
}

function getGetOrdinal(n) {
    var s=["th","st","nd","rd"],
        v=n%100;
    return n+'<sup>'+(s[(v-20)%10]||s[v]||s[0])+'</sup>';
}