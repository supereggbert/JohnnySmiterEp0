			// PRNG
			function random(i) {
				return (Math.sin(Math.sin(1e9*i)*1e6)+1)*0.5;
			}
			// Seemless clouds
			// size is power of two
			export default function diamondSquare(size, seed) {
			    var data = [
				[.5, .5],
				[.5, .5]
			    ];
			    var canvas = document.createElement('canvas');
			    canvas.width = canvas.height = size;
			    var ctx = canvas.getContext('2d');
			    var imgData = ctx.createImageData(size, size);
			    var height = 1.5;
			    var levels = Math.log(size) / Math.log(2);
			    for (var i = 0; i < levels; i++) {
				var output = [];
				height /= 2;
				var len = data.length * 2 - 1;
				for (var x = 0; x < len; x++) {
				    var a = [];
				    output.push(a);
				    for (var y = 0; y < len; y++) {
					var x1 = (x / 2) | 0,
					    y1 = (y / 2) | 0,
					    x2 = (x / 2 + .5) | 0,
					    y2 = (y / 2 + .5) | 0;
					var val = data[x1][y1] + data[x1][y2] + data[x2][y1] + data[x2][y2];
					a.push(val * 0.25 + (random((x % (len - 1) + 1) * (y % (len - 1) + 1) * seed) - 0.5) * height);
					if (i == levels - 1) {
					    var j = (y * size + x) * 4;
					    imgData.data[j] = imgData.data[j + 1] = imgData.data[j + 2] = output[x][y] * 255+128-64*Math.random();
					    imgData.data[j + 3] = 255;
					}
				    }
				}
				data = output;
			    }
			    ctx.putImageData(imgData, 0, 0);
			    return canvas;
			};
