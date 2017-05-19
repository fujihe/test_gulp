// var navFixed = navFixed || {};
// navFixed.action = function() {
//   initialize: function() {
//     var $nav = $('.p-globalNav');
//     var $offset = $nav.offset();
//     var $is-fixed = $('.is-fixed');
//   },
//   $(window).scroll(function() {
//     if($(window).scrollTop() > $offset.top) {
//       $nav.addClass($is-fixed);
//       $nav.css('margin-left', $offset.left);
//     }else{
//       $nav.removeClass($is-fixed);
//       $nav.css('margin-left', '0');
//     }
//   });
// };
// navFixed.action();

  $(function() {
    var nav = $('.p-globalNav'),
    offset = nav.offset();
    $(window).scroll(function() {
      if($(window).scrollTop() > offset.top) {
        nav.addClass('is-fixed');
        nav.css('margin-left', offset.left);
      }else{
        nav.removeClass('is-fixed');
        nav.css('margin-left', '0');
      }
    });
  });
