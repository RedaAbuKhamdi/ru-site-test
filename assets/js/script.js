$(function() {

    if( $('body').width() <= 768 ) {
        $('.siteHeader.fill-header-on-mobile').removeClass('siteHeader-mini')

        $('.vacancySingle__sidebar-apply').click(function() {
            $('html, body').stop().animate({
                scrollTop: $('.vacancySingle__tabs').offset().top - 50
            }, 500)
        })
    }

    let timeoutId;
    $('.shareLink__copyLink-label').click(function(e) {
        e.preventDefault();
        clearTimeout(timeoutId);

        let $btn = $(this).find('.shareLink__copyLink-icon');
        
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($('.shareLink__copyLink-label p').text()).select();
        document.execCommand("copy");
        $temp.remove();

        $btn.addClass('active')

        timeoutId = setTimeout(() => {
            $btn.removeClass('active')
        }, 3000);
    })

    $('.shareLink__close').on('click', function() {
        $('.shareLink').removeClass('active')
    })
    
    $('.vacancySingle__sidebar-share').on('click', function() {
        $('.shareLink').addClass('active')
    })

    $('select').niceSelect();

    if( $('html').width() <= 992 ) {
        $('body').removeClass('do-css-hover')

        $('.companyGames__item').on('mousedown', function() {
            $('.companyGames__item.active').removeClass('active')
            $(this).addClass('active')
        })
    }

    $('select.vacancies__catsSelect').on('change', function() {
        let cat = $(this).find('option:checked').data('cat');

        if( cat == 'all' ) {
            $('.vacancies__list-item').addClass('active')
        } else {
            $('.vacancies__list-item.active').removeClass('active')
            $('.vacancies__list-item[data-cat="'+ cat +'"]').addClass('active')
        }

    })

    $('.vacancies__catsList-item').on('click', function(e) {
        e.preventDefault();

        $('.vacancies__catsList-item.active').removeClass('active')
        $(this).addClass('active')

        let cat = $(this).data('cat')

        if( cat == 'all' ) {
            $('.vacancies__list-item').addClass('active')
        } else {
            $('.vacancies__list-item.active').removeClass('active')
            $('.vacancies__list-item[data-cat="'+ cat +'"]').addClass('active')
        }

    }).first().click()

    function scrollTopHandler( scrollTop ) {

        if( scrollTop >= 300 ) {
            $('.siteHeader-fixed').addClass('active')
        } else {
            $('.siteHeader-fixed').removeClass('active')
        }

    }
    scrollTopHandler( $(window).scrollTop() )

    $(window).on('scroll', function() {
        scrollTopHandler( $(this).scrollTop() )
    })

    if( location.hash ) {
        let $elem = $(location.hash);
        if( $elem.length ) {
            $('body, html').stop().animate({
                scrollTop: $elem.offset().top - $('.siteHeader-fixed').outerHeight()
            })
        }
        location.hash = '';
    }

    let allowCheckSectionScroll = true, allowerTimoutId;
    $('.siteNav__item').on('click', function(e) {
        
        let href = $(this).attr('href').split('#').pop();
        let $elem = $('#' + href);
        if( $elem.length ) {
            e.preventDefault();
        }

        clearTimeout(allowerTimoutId);
        allowCheckSectionScroll = false;
        allowerTimoutId = setTimeout(() => {
            allowCheckSectionScroll = true;
        }, 1500);

        $('.siteNav__item.active').removeClass('active')
        $(this).addClass('active')
        $('body, html').stop().animate({
            scrollTop: $elem.offset().top - $('.siteHeader-fixed').outerHeight()
        })
    })

    function checkSectionScroll() {

        if( allowCheckSectionScroll == false ) return;

        let index = 0;
        $('section').each(function() {
            // console.log($(this).offset().top)
            if( ($(window).scrollTop() + window.outerHeight / 2) >= $(this).offset().top  ) {
                index = $(this).index();
            }
        })

        if( index == 0 ) { index = 1 }

        let $menuItemActive = $('.siteNav__item.active');
        let menuItemActiveIndex = $menuItemActive.index();
        if( index >= 1 && menuItemActiveIndex != (index - 1) ) {
            $menuItemActive.removeClass('active')
            $('.siteNav__item').eq(index - 1).addClass('active')
        }
        // console.log(menuItemActiveIndex, index)

    }

    if( $('body').hasClass('page-home') ) {

        checkSectionScroll();

        setInterval(() => {
            checkSectionScroll();
        }, 1000)

    }

    $('.siteFaqItem').on('click', function() {
        
        $(this).toggleClass('active')

    }).first().trigger('click')

    // function changeTab(index) {

    //     $('.vacancySingle__tabs-item.active').removeClass('active')
    //     $('.vacancySingle__tabs-item').eq(index).addClass('active')

    // }

    // $('.vacancySingle__header-buttons button').on('click', function() {
    //     let index = $(this).index();

    //     changeTab(index)

    // }).first().trigger('click')

    $('.vacancySingle__sidebar-apply').on('click', function() {
        let offset = $('.vacancySingle__tabs-item:nth-child(2)').offset().top - $('.siteHeader-fixed').outerHeight()
        $('html,body').stop().animate({
            scrollTop: offset
        }, 300)
    })
    
})