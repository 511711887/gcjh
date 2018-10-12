var canvas = {},
            centerX = 0,
            centerY = 0,
            color = '',
            containers = document.getElementsByClassName('material-design');
            context = {},
            element = {},
            radius = 0,

            requestAnimFrame = function () {
              return (
              this.requestAnimationFrame       ||
              this.mozRequestAnimationFrame    ||
              this.oRequestAnimationFrame      ||
              this.msRequestAnimationFrame     ||
              function (callback) {
                this.setTimeout(callback, 1000 / 60);
              }
              );
            } (),

            init = function () {
              this.containers = Array.prototype.slice.call(this.containers);
              for (var i = 0; i < this.containers.length; i += 1) {

                this.canvas = document.createElement('canvas');
                this.canvas.addEventListener('click', press, false);

                this.containers[i].appendChild(this.canvas);
                this.canvas.style.width ='100%';
                this.canvas.style.height='100%';
                this.canvas.width  = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
              }
            },

            press = function (event) {
              color = event.toElement.parentElement.dataset.color;
              element = event.toElement;
              context = element.getContext('2d');
              radius = 0;
              centerX = event.offsetX;
              centerY = event.offsetY;
              context.clearRect(0, 0, element.width, element.height);
              draw();
            },

            draw = function () {
              context.beginPath();
              context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
              context.fillStyle = color;
              context.fill();
              radius += 2;
              if (radius < element.width) {
                requestAnimFrame(draw);
              }
            };

    init();
