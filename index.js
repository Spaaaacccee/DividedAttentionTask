(function () {

    function generateRandomNumber() {
        var min = -0.1,
            max = 0.1,
            highlightedNumber = Math.random() * (max - min) + min;
        return highlightedNumber;
    };

    var sphere = function (obj) {

        var s = this;
        this.r = 50;
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
            s.HTML.style.top = (s.location.y - 50) + "px";
            s.HTML.style.left = (s.location.x - 50) + "px";
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
            s.circles[2].style.backgroundPositionY = s.index*100 + "px"
            s.index = (s.index >= s.numbers.length - 1) ?  0 : s.index + 1
        }
        this.run = function () {
            setInterval(s.step, 3000)
        }
        s.step();
        s.run();
        $.extend(this, obj);
    }

    new circleLogic({})



})()
