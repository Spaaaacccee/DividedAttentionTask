(function () {

    function generateRandomNumber() {
        var min = -0.1,
            max = 0.1,
            highlightedNumber = Math.random() * (max - min) + min;
        return highlightedNumber;
    };

    var sphere = function (obj) {

        var s = this;
        this.r = 100;
        this.container = {
            x: 0,
            y: 0,
            width: innerWidth,
            height: innerHeight,
        }
        this.step = function () {
            if (s.active) {

                if (s.location.x - s.r + s.vectors.x < s.container.x || s.location.x + s.r + s.vectors.x > s.container.x + s.container.width) {
                    s.vectors.x = (-s.vectors.x) + generateRandomNumber();
                }

                if (s.location.y + s.r + s.vectors.y > s.container.y + s.container.height || s.location.y - s.r + s.vectors.y < s.container.y) {
                    s.vectors.y = (-s.vectors.y) + generateRandomNumber();
                }

                s.location.x += s.vectors.x
                s.location.y += s.vectors.y


                s.location = {
                    x: s.location.x + s.vectors.x,
                    y: s.location.y + s.vectors.y
                }
                s.applyLocation();
            }
            requestAnimationFrame(function () {
                s.step()
            })
        };
        this.location = {
            x: innerWidth / 2,
            y: innerHeight / 2
        }
        this.applyLocation = function () {
            s.HTML.style.top = (s.location.y - s.r) + "px";
            s.HTML.style.left = (s.location.x - s.r) + "px";
        };
        this.vectors = {
            x: 3,
            y: 3
        }
        this.active = true;
        this.run = function () {
            requestAnimationFrame(function () {
                s.step()
            })
        }
        $.extend(this, obj);
        s.run();
    }



    var circleLogic = function (obj) {
        var s = this;
        this.index = 0;
        this.circles = $(".sphere");
        this.words = ["Cat", "chair", "tree", "house", "eat", "high", "land", "kite", "out", "win"];
        this.numbers = [3, 7, 4, 5, 9, 8, 5, 10, 6, 4];
        this.shapeSides = [3, 6, 4, 5, 3, 8, 4, 10, 5, 4];
        this.step = function () {
            s.circles[0].innerHTML = s.words[s.index];
            s.circles[1].innerHTML = s.numbers[s.index];
            s.circles[2].style.backgroundPositionY = s.index * 200 + "px"
            s.index = (s.index >= s.numbers.length - 1) ? 0 : s.index + 1
        }
        s.step();
        $.extend(this, obj);
    }

    var c = new circleLogic({})

    onload = function () {
        $("button").bind('click', function () {
            document.body.classList.add("r");
            setTimeout(
                function () {
                    start();
                }, 3000)
        })
    }

    function start() {
        document.body.classList.add("s");
        new sphere({
            HTML: $("#s1")[0]
        })
        new sphere({
            HTML: $("#s2")[0],
            vectors: {
                x: -4,
                y: 2.5
            }
        })
        new sphere({
            HTML: $("#s3")[0],
            vectors: {
                x: -2,
                y: -5
            }
        })
    }

    $(window).keypress(function (e) {
        if (e.keyCode === 0 || e.keyCode === 32) {
            e.preventDefault()
            c.step()
        }
    })

    $(document).keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault()
            c.step()
        }
    });


})()
