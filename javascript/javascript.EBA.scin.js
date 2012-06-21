/*
@
@name:          EBA 3x3
@description:   all-in-one image gallery
@location:      javascrpt/javascript.EBA.scin.js
@license:       GPL or MIT
@author:        Daniel Flöter http://www.kometschuh.de
@version:       0.9.0.1
@date:          Juli 21th 2012
@
*/


//------------------------------------------------------ - - - - - - - - - -------//
// div attributes
var aDivAttr = {
    top: ['0', '0', '0', '200px', '200px', '200px', '400px', '400px', '400px'],
    left: ['0', '267px', '533px', '0', '267px', '533px', '0', '267px', '533px'],
    toggle: [true, true, true, true, true, true, true, true, true]
}

//------------------------------------------------------ - - - - - - - - - -------//
// image attributes
var aImageAttr = {
    top: ['-274px', '-323px', '-330px', '-296px', '-150px', '-257px', '-228px', '-272px', '-369px'],
    left: ['-164px', '-306px', '-390px', '-480px', '-163px', '-360px', '-364px', '-277px', '-231px']
}

//------------------------------------------------------ - - - - - - - - - -------//
// global variables
var global = {
    nImagesCount: $(aDivAttr.top).toArray().length,
    nAnimatSpeed: 1000,
    nPreloadCount: 0
};

//------------------------------------------------------ - - - - - - - - - -------//
// DOM (document object model) is ready: registers events
$(document).on('ready', function () {

    // start preload images
    preloadImages();

    // for all (3x3) images
    for (var i = 0; i <= global.nImagesCount; i++) {

        $('#image' + i).click(function () {
            var j = /[0-9]{1,2}/.exec($(this).attr('id'));
            if (aDivAttr.toggle[j] == true) {
                aDivAttr.toggle[j] = false;
                $(this)
                        .stop()
                        .css('z-index', '99')
                        .animate({
                            height: '600px',
                            width: '800px',
                            top: '0',
                            left: '0'
                        }, { duration: global.nAnimatSpeed,
                            easing: 'easeOutCirc',
                            complete: function () { }
                        }).children()
                        .stop()
                        .animate({
                            top: '0',
                            left: '0'
                        }, { duration: global.nAnimatSpeed,
                            easing: 'easeOutCirc'
                        })
            } else {
                var jImage = $(this);
                aDivAttr.toggle[j] = true;
                jImage
                        .stop()
                        .css('z-index', '49')
                        .animate({
                            height: '200px',
                            width: '267px',
                            top: aDivAttr.top[j],
                            left: aDivAttr.left[j]
                        }, { duration: global.nAnimatSpeed,
                            easing: 'easeOutCirc',
                            complete: function () { jImage.css('z-index', '1'); }
                        })
                        .children()
                        .stop()
                        .animate({
                            top: aImageAttr.top[j],
                            left: aImageAttr.left[j]
                        }, { duration: global.nAnimatSpeed,
                            easing: 'easeOutCirc'
                        })
            }
        });
    }
});


//------------------------------------------------------ - - - - - - - - - -------//
// after page loading
$(window).on('load', function () {
    $('#image0 img').not('.preloader')
                    .css({
                        'top': aImageAttr.top[0],
                        'left': aImageAttr.left[0]
                    });
    $('#image0').css({
        'height': '200px',
        'width': '267px'
    });
});

//------------------------------------------------------ - - - - - - - - - -------//
// functions
// prelaod images
function preloadImages() {
    if (global.nPreloadCount < global.nImagesCount) {
        $('#image' + global.nPreloadCount).html('<img class="preloader" src="images/preloader.gif" />');
        var img = new Image();
        img.src = 'images/0' + global.nPreloadCount + '.jpg';
        img.onload = function () {
            $('#image' + global.nPreloadCount + ' img').replaceWith(img);
            if (global.nPreloadCount != 0) {
                $('#image' + global.nPreloadCount + ' img')
                            .css({
                                'top': aImageAttr.top[global.nPreloadCount],
                                'left': aImageAttr.left[global.nPreloadCount]
                            });
            }
            preloadImages(global.nPreloadCount++);
        }
    }
}
