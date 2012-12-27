$(function(){
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    $("#name").lettering();

    if (!is_chrome) {
        $('h1').html('Only viewable in <a href="http://chrome.google.com">Google Chrome</a>.');
    }

    setTimeout(function(){
        $('body').addClass('loaded1');
        setTimeout(function(){
            $('body').addClass('loaded2');
        }, 800);
    }, 300);

    $('circle').mouseover(function(e){
        if (falling || puttingback) {
            return;
        }
        var $target = $(e.target);
        if ($target.is('circle')) {
            bubble($target, 50, Math.random() > 0.5);
        }
    });

    function bubble($circle, disperse, direction) {
        if (disperse <= 1) {
            return;
        }
        if (!$circle.data('original-r')) {
            $circle.data('original-r', $circle.attr('r'));
        }
        $circle.attr('r', parseFloat($circle.attr('r'), 10) + 2);
        setTimeout(function(){
            $circle.attr('r', $circle.data('original-r'));
        }, 300);
        var $new_circle;
        if (direction > 0.5) {
            $new_circle = $circle.next('circle');
        } else {
            $new_circle = $circle.prev('circle');
        }
        if (Math.random() < 0.01) {
            fall();
        }
        if ($new_circle.length) {
            return setTimeout(function(){
                bubble($new_circle, disperse - 1, direction);
            }, 20);
        }
    }

    var falling = false;

    function fall() {
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            return;
        }
        if (falling) {
            return;
        }
        falling = true;
        $('circle').each(function(){
            var $c = $(this),
                    y = parseFloat($c.attr('cy'), 10)
            ;
            $c.attr('data-original-cy', $c.attr('cy'));
            var bottom = 730 - parseFloat($c.attr('r'), 10);
            setTimeout(function(){
                $({ y: y }).animate({ y: bottom }, {
                    duration: 3000,
                    easing: 'easeOutBounce',
                    step: function(now, fx) {
                        $c.attr('cy', now);
                    }
                });
            }, Math.abs(2000 - y));
        });

        setTimeout(function(){
            putback();
        }, 5000);
    }

    var puttingback = false;

    function putback() {
        if (puttingback) {
            return;
        }
        puttingback = true;
        $('circle').each(function(){
            var $c = $(this),
                    y = parseFloat($c.attr('cy'), 10)
            ;
            var top = $c.attr('data-original-cy');
            setTimeout(function(){
                $({ y: y }).animate({ y: top }, {
                    duration: 3000,
                    easing: 'easeOutElastic',
                    step: function(now, fx) {
                        $c.attr('cy', now);
                    }
                });
            }, Math.abs(2000 - top));
        });

        setTimeout(function(){
            falling = false;
            puttingback = false;
        }, 5000);
    }
});