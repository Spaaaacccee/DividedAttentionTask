(function () {

    var points = 0;
    var timeStart;

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
            if (s.index == s.words.length) {
                end()
            } else {
                s.index++
            }
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
        timeStart = Date.now();
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
        if (e.keyCode === 0 || e.keyCode === 32 && !$(document.body).hasClass("e")) {
            e.preventDefault()
            if (c.numbers[c.index] == c.shapeSides[c.index]) {
                points++
            }
            c.step()
        }
    })

    $(document).keypress(function (e) {
        if (e.which == 13 && !$(document.body).hasClass("e")) {

            e.preventDefault()
            if (c.numbers[c.index] !== c.shapeSides[c.index]) {
                points++
            }
            c.step()
        }
    });

    function end() {
        document.body.classList.add("e");
        var elapsed = (Date.now() - timeStart);
        var eString = Math.floor(elapsed / 60000) + " minutes and " + (elapsed / 1000 )%60+ " seconds";
        $("#getready div")[0].innerHTML = "<b>You have gotten " + points + " out 10 correct. Your time is " + eString + "</b>"
        document.body.classList.remove("s");
        var a = document.createElement("button")
        a.textContent = "Retry"
        a.onclick = function () {
            window.location.reload(false);
        }
        $("#getready")[0].appendChild(a);
    }

})()
