$(document).ready(function () {

  $('.single-item').slick();


  $("#accordion").accordion({
    collapsible: true,
    active: false,
    heightStyle: "content",
  });


  $(".table-size").click(function () {
    $(".black").toggle();

    $('.multiple-items').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        }
      ]
    });

  });
  $(".close-sizes").click(function () {
    $(".black").toggle();
  });
  $(".btn-order").click(function () {
    $(".popup-form").toggle();
  });
  $(".close-form").click(function () {
    $(".popup-form").toggle();
  });

  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    slidesPerView: 1
  });

  $('#file-form').on('submit', function(e) {

    e.preventDefault();

    var fd = new FormData(document.querySelector("#file-form"));
    var input = document.querySelector("#file-input");
    fd.append( 'file', input.files[0] );
    var $loading = $('.loading-icon_file');

    $.ajax({
      url: "upload_file.php",
      type: "POST",
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      beforeSend: function () {
        $loading.show();
      },
      success: function(responce) {

        $loading.hide();

        responce = JSON.parse(responce);

        $('#responce').html(responce.msg).fadeIn(200);

        if (responce.success) {
          $('#file-url').val(responce.file);
        }
      }
    });
  });

  var $contactForm = $('#contact-form');

  $contactForm.validate({

    rules: {
      name: {
        required: true
      },
      middle_name: {
        required: true
      },
      last_name: {
        required: true
      },
      phone: {
        required: true
      },
      address: {
        required: true
      },
      file_url: {
        required: true
      },
      payment: {
        required: true
      }
    },
    ignore: [],
    errorPlacement: function(error, element) {
      error.insertBefore(element);
    },
    messages: {
      name: "Пожалуйста, введите Ваше имя",
      middle_name: "Пожалуйста, укажите Ваше отчество",
      last_name: "Пожалуйста, укажите Вашу фамилию",
      phone: "Пожалуйста, укажите Ваш телефон",
      address: "Пожалуйста, укажите Ваш адрес",
      file_url: "Пожалуйста, прикрепите макет с шаблоном.",
      payment: "Пожалуйста, укажите способ оплаты,"
    },

    submitHandler: function (form) {

      var $loading = $('.loading-icon_send-form');

      $.ajax({
        url: "send_form.php",
        data: {
          form: $(form).serialize()
        },
        method: 'POST',
        //dataType: 'json',
        beforeSend: function () {
          $loading.show();
        },
        success: function(responce) {
          $loading.hide();
          $('#send-form-responce').html(responce).fadeIn(200);
        }
      });
    }
  });

  //$('#contact-form-submit').on('click', function(e){
  //  $contactForm.submit();
  //  console.log('submitted');
  //})
});

function positionHeroContent() {

  var isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false,
    $heroContent = $('.hero-content'),
    heroContentHeight = $heroContent.outerHeight(),
    windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    heroUnitHeight = parseInt(heroContentHeight) + 'px',
    $heroContainer = $('.video-container');
    firstPadding = parseInt($('#first').css('padding-top'));

  if ( windowHeight - firstPadding > heroContentHeight && windowWidth > 992 ) {
    $heroContent.addClass('hero-content_v-center');
    $heroContainer.height(windowHeight - firstPadding);
  } else {
    $heroContent.removeClass('hero-content_v-center');
    $heroContainer.height('auto');
  }

  var $poster = $('#poster'),
    $video = $('#bgvid');

  if ( isMobile ) {
    $video.hide();
    $poster.show();
  }
}

$( document ).ready(function() {

  positionHeroContent();

  $(window).on('resize', function() {
    positionHeroContent();
  });
});

// $( document ).ready(function() {

//   scaleVideoContainer();

//   initBannerVideoSize('.video-container .poster');
//   initBannerVideoSize('.video-container .filter');
//   initBannerVideoSize('.video-container video');

//   $(window).on('resize', function() {
//     scaleVideoContainer();
//     scaleBannerVideoSize('.video-container .poster');
//     scaleBannerVideoSize('.video-container .filter');
//     scaleBannerVideoSize('.video-container video');
//   });

// });

// function scaleVideoContainer() {

//   var windowWidth = $(window).width();
//   var height = $(window).height() + 5 - 140;
//   var unitHeight = parseInt(height) + 'px';

//   if ( windowWidth > 1000 ) {
//     $('.homepage-hero-module').css('height',unitHeight);
//   }

//   if ( windowWidth < 768 ) {
//     $('.poster').css('height',unitHeight).removeClass('hidden');
//   }
// }

// function initBannerVideoSize(element){

//   $(element).each(function(){
//     $(this).data('height', $(this).height());
//     $(this).data('width', $(this).width());
//   });

//   scaleBannerVideoSize(element);

// }

// function scaleBannerVideoSize(element){

//   var windowWidth = $(window).width(),
//     windowHeight = $(window).height() + 5,
//     videoWidth,
//     videoHeight;

//   // console.log(windowHeight);

//   $(element).each(function(){
//     var videoAspectRatio = $(this).data('height')/$(this).data('width');

//     $(this).width(windowWidth);

//     if(windowWidth < 1000){
//       videoHeight = windowHeight;
//       videoWidth = videoHeight / videoAspectRatio;
//       $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

//       $(this).width(videoWidth).height(videoHeight);
//     }

//     $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

//   });
// }


$(document).ready(function(){

    $("header").on("click","a", function (event) {

        //отменяем стандартную обработку нажатия по ссылке

        event.preventDefault();



        //забираем идентификатор бока с атрибута href

        var id  = $(this).attr('href'),



        //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = $(id).offset().top;
        if ($("header").css('position') === 'fixed') {
          top -= 110;
        }



        //анимируем переход на расстояние - top за 1500 мс

        $('body,html').animate({scrollTop: top}, 1500);

    });

});

$(document).ready(function() {
  $(".to-top").click(function() {
    var elementClick = $(this).attr("href")
    var destination = $("#first").offset() ? $("#first").offset().top : $("#first").offset().top;
    if ($("header").css('position') === 'fixed') {
          top += 110;
        }
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: destination
    }, 800);
    return false;
  });

});

$(document).ready(function() {
  $(".know-more").click(function() {
    var elementClick = $(this).attr("href")
    var destination = $("#second").offset() ? $("#second").offset().top  : $("#second").offset().top ;
    if ($("header").css('position') === 'fixed') {
          top -= 110;
        }
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: destination
    }, 800);
    return false;
  });


  $( ".menu-mob" ).click(function() {
    $( ".navbar-right" ).toggle( "slow", function() {
    });
  });

});
