/// <reference types="../@types/jquery" />
// *NOTE - all variables
  let singer = $(".contentHeader");
  let sidebarWidth = $(".sidebarContent").outerWidth(true);
  let sidebarContent = $(".sideBar");
// *NOTE - loader function
$(document).ready(function () {
  $("#loader").fadeOut(300, function () {
    $("body").css("overflow", "auto");
  });
  // *REVIEW - hide sidebar
  sidebarContent.css("left", -sidebarWidth);
  //SECTION - side bar hide and show
  function toogleSidebar() {
    if (sidebarContent.css("left") == "0px") {
      sidebarContent.animate({ left: -sidebarWidth });
    } else {
      sidebarContent.animate({ left: 0 });
    }
  }
  $("#openSidebar").click(() => {
    toogleSidebar();
  });
  $("#closeSidebar-btn").click(() => {
    toogleSidebar();
  });

  // *SECTION - Scroll Function --------------
  $("a[href^='#']").click(function (eventInfo) {
    let aHref = $(eventInfo.target).attr("href");
    let secOffset = $(aHref).offset().top;
    $("body").animate({ scrollTop: secOffset }, 500);
  });

  // *SECTION - singer toggle function ------------
  singer.click((e) => {
    let singerInfo = $(e.target).next();
    $(".contentData").not(singerInfo).slideUp(200);
    singerInfo.slideToggle(200);
  });

  //SECTION - countdown function ---------
  (function countdown() {
    let currentTiime = new Date();
    let getTime = currentTiime.getTime();
    let eventTime = new Date(2023, 8, 12).getTime();
    let remTime = eventTime - getTime;
    let s = Math.floor(remTime / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24) - 30;
    h %= 24;
    m %= 60;
    s %= 60;
    if (d < 0) {
      s = m = h = d = 0;
    }
    $("#eDay").html(d);
    $("#eHours").html(h);
    $("#eMinute").html(m);
    $("#eSec").html(s);
    setTimeout(countdown, 1000);
    // *NOTE - current year for copyright:
    $("#currentYear").text(currentTiime.getFullYear());
  })();

  //SECTION - calc charchter in textmessage ----

  (function calcMessageChar() {
    let messChar = $("textarea");
    messChar.keyup(() => {
      let messageLenght = messChar.val().length;
      let restOfmessageLenght = $(".messageLenght");
      let messageLenghtCalc = 100 - messageLenght;
      if (messageLenghtCalc <= 0) {
        restOfmessageLenght.html(`<span id="charNumb">your available character finished</span>`);
        $("#sendMessageBtn").attr('disabled','disabled').css('background-color','#777')
      } else {
        restOfmessageLenght.html(`<span id="charNumb"> ${messageLenghtCalc}</span> Character Reamining`);
        $("#sendMessageBtn").removeAttr('disabled','').css('background-color','')
      }
    });
  })();
})
