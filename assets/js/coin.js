//  This canvas is inspired from @Pyramidium
//  in his Pen Canvas Nodes.
//  https://codepen.io/Pyramidium/pen/pJNwJP

var Pops = {
	density: 20,
	drawDistance: 0,
	baseRadius: 4,
	maxLineThickness: 4,
	reactionSensitivity: 0.5,
	lineThickness: 1,
	offsetX: 0,
	offsetY: 0,
	result: document.body.querySelector('h1'),

	moveTimeout: null,
	coins: 0,
	power: 500,

	points: [],
	mouse: { x: -1000, y: -1000, down: false, move: false },

	animation: null,

	canvas: null,
	context: null,

	imageInput: null,
	bgImage: null,
	bgCanvas: null,
	bgContext: null,
	bgContextPixelData: null,

	init: function() {
		this.canvas = document.getElementById('pops')
		this.context = this.canvas.getContext('2d')
		this.context.globalCompositeOperation = 'lighter'
		this.canvas.style.display = 'block'

		this.canvas.addEventListener('mousemove', this.mouseMove, false)
		this.canvas.addEventListener('mousedown', this.mouseDown, false)
		this.canvas.addEventListener('mouseup',   this.mouseUp,   false)
		this.canvas.addEventListener('mouseout',  this.mouseOut,  false)

		this.preparePoints()
		this.nucubuc = moveObjectTo(this.nucubuc, this.offsetX, this.offsetY);
		this.love = moveObjectTo(this.love, this.offsetX, this.offsetY);
		this.gale = moveObjectTo(this.gale, this.offsetX, this.offsetY);
		this.draw()
	},

	preparePoints: function() {

		this.points = []

		var width, height, i, j, pop

		var color = '0, 0, 0'
		var offsetX = this.offsetX+140
		var offsetY = this.offsetY+140
		var that = this

		function pushPoint(x, y, originalX, originalY, radius, opacityDelay) {
			that.points.push({
				x: x + offsetX,
				y: y + offsetY,
				originalX: originalX + offsetX,
				originalY: originalY + offsetY,
				radius: radius,
				opacityDelay: opacityDelay,
				color: color
			})
		}

		var popArray = [
		{x: 170, y: 50,  pop: 14, opacityDelay: -0.7},
		{x: 131, y: 177, pop: 14, opacityDelay: -0.4},

		{x: 68,  y: 23,  pop: 12, opacityDelay: -0.2},
		{x: 128, y: 48,  pop: 12, opacityDelay: 0},
		{x: 21,  y: 64,  pop: 12, opacityDelay: -0.6},
		{x: 182, y: 119, pop: 12, opacityDelay: 0},
		{x: 92,  y: 127, pop: 12, opacityDelay: -0.4},
		{x: 47,  y: 153, pop: 12, opacityDelay: -0.9},
		{x: 88,  y: 198, pop: 12, opacityDelay: -0.1},

		{x: 118, y: 10,  pop: 10, opacityDelay: -0.7},
		{x: 50,  y: 50,  pop: 10, opacityDelay: -0.3},
		{x: 51,  y: 86,  pop: 10, opacityDelay: 0},
		{x: 166, y: 88,  pop: 10, opacityDelay: -0.1},
		{x: 17,  y: 115, pop: 10, opacityDelay: -0.6},
		{x: 184, y: 156, pop: 10, opacityDelay: 0},
		{x: 55,  y: 188, pop: 10, opacityDelay: -0.5},

		{x: 94,  y: 10,  pop: 7, opacityDelay: -0.1},
		{x: 139, y: 23,  pop: 7, opacityDelay: -0.2},
		{x: 98,  y: 40,  pop: 7, opacityDelay: -0.9},
		{x: 74,  y: 59,  pop: 7, opacityDelay: -0.4},
		{x: 191, y: 63,  pop: 7, opacityDelay: -0.6},
		{x: 145, y: 73,  pop: 7, opacityDelay: -0.3},
		{x: 26,  y: 88,  pop: 7, opacityDelay: -0.7},
		{x: 7,   y: 93,  pop: 7, opacityDelay: 0},
		{x: 105, y: 92,  pop: 7, opacityDelay: -0.1},
		{x: 203, y: 102, pop: 7, opacityDelay: -0.7},
		{x: 156, y: 110, pop: 7, opacityDelay: 0},
		{x: 48,  y: 126, pop: 7, opacityDelay: -0.8},
		{x: 119, y: 144, pop: 7, opacityDelay: -0.8},
		{x: 16,  y: 148, pop: 7, opacityDelay: 0},
		{x: 155, y: 151, pop: 7, opacityDelay: -0.9},
		{x: 85,  y: 158, pop: 7, opacityDelay: -0.7},
		{x: 157, y: 185, pop: 7, opacityDelay: -0.5},
		{x: 112, y: 198, pop: 7, opacityDelay: -0.4},

		{x: 162, y: 23,  pop: 5, opacityDelay: -0.4},
		{x: 114, y: 31,  pop: 5, opacityDelay: -0.1},
		{x: 77,  y: 42,  pop: 5, opacityDelay: 0},
		{x: 29,  y: 44,  pop: 5, opacityDelay: -0.8},
		{x: 148, y: 56,  pop: 5, opacityDelay: -0.1},
		{x: 187, y: 86,  pop: 5, opacityDelay: -0.2},
		{x: 90,  y: 99,  pop: 5, opacityDelay: -0.5},
		{x: 118, y: 102, pop: 5, opacityDelay: 0},
		{x: 32,  y: 104, pop: 5, opacityDelay: -0.4},
		{x: 120, y: 124, pop: 5, opacityDelay: -0.6},
		{x: 157, y: 131, pop: 5, opacityDelay: 0},
		{x: 32,  y: 133, pop: 5, opacityDelay: -0.5},
		{x: 196, y: 136, pop: 5, opacityDelay: -0.4},
		{x: 105, y: 160, pop: 5, opacityDelay: -0.2},
		{x: 27,  y: 164, pop: 5, opacityDelay: -0.8},
		{x: 164, y: 166, pop: 5, opacityDelay: -0.2},
		{x: 75,  y: 178, pop: 5, opacityDelay: -0.6},

		{x: 103, y: 24,  pop: 4, opacityDelay: -0.5},
		{x: 87,  y: 26,  pop: 4, opacityDelay: -0.1},
		{x: 49,  y: 31,  pop: 4, opacityDelay: -0.5},
		{x: 152, y: 35,  pop: 4, opacityDelay: -0.7},
		{x: 95,  y: 56,  pop: 4, opacityDelay: -0.3},
		{x: 44,  y: 69,  pop: 4, opacityDelay: -0.9},
		{x: 159, y: 70,  pop: 4, opacityDelay: 0},
		{x: 201, y: 78,  pop: 4, opacityDelay: -0.1},
		{x: 44,  y: 110, pop: 4, opacityDelay: -0.5},
		{x: 111, y: 117, pop: 4, opacityDelay: 0},
		{x: 9,   y: 131, pop: 4, opacityDelay: -0.1},
		{x: 170, y: 139, pop: 4, opacityDelay: -0.3},
		{x: 98,  y: 146, pop: 4, opacityDelay: -0.7},
		{x: 149, y: 165, pop: 4, opacityDelay: 0},
		{x: 68,  y: 166, pop: 4, opacityDelay: -0.5},
		{x: 38,  y: 179, pop: 4, opacityDelay: 0},
		{x: 101, y: 179, pop: 4, opacityDelay: -0.7},
		{x: 131, y: 202, pop: 4, opacityDelay: -0.9},

		{x: 151, y: 16,  pop: 3, opacityDelay: -0.6},
		{x: 126, y: 29,  pop: 3, opacityDelay: -0.1},
		{x: 65,  y: 44,  pop: 3, opacityDelay: -0.4},
		{x: 110, y: 56,  pop: 3, opacityDelay: 0},
		{x: 59,  y: 66,  pop: 3, opacityDelay: -0.8},
		{x: 178, y: 74,  pop: 3, opacityDelay: -0.1},
		{x: 7,   y: 77,  pop: 3, opacityDelay: -0.7},
		{x: 150, y: 88,  pop: 3, opacityDelay: -0.6},
		{x: 187, y: 99,  pop: 3, opacityDelay: -0.4},
		{x: 20,  y: 100, pop: 3, opacityDelay: -0.8},
		{x: 52,  y: 103, pop: 3, opacityDelay: 0},
		{x: 169, y: 105, pop: 3, opacityDelay: -0.1},
		{x: 3,   y: 107, pop: 3, opacityDelay: -0.7},
		{x: 97,  y: 108, pop: 3, opacityDelay: -0.3},
		{x: 34,  y: 119, pop: 3, opacityDelay: -0.3},
		{x: 204, y: 123, pop: 3, opacityDelay: -0.1},
		{x: 109, y: 132, pop: 3, opacityDelay: 0},
		{x: 20,  y: 135, pop: 3, opacityDelay: -0.4},
		{x: 118, y: 159, pop: 3, opacityDelay: -0.8},
		{x: 57,  y: 171, pop: 3, opacityDelay: -0.7},
		{x: 89,  y: 174, pop: 3, opacityDelay: -0.1},
		{x: 174, y: 175, pop: 3, opacityDelay: -0.6},
		{x: 143, y: 195, pop: 3, opacityDelay: 0},

		{x: 134, y: 9,   pop: 2, opacityDelay: -0.1},
		{x: 81,  y: 10,  pop: 2, opacityDelay: -0.8},
		{x: 51,  y: 20,  pop: 2, opacityDelay: -0.2},
		{x: 170, y: 30,  pop: 2, opacityDelay: -0.4},
		{x: 39,  y: 36,  pop: 2, opacityDelay: -0.8},
		{x: 111, y: 42,  pop: 2, opacityDelay: -0.2},
		{x: 146, y: 43,  pop: 2, opacityDelay: -0.3},
		{x: 85,  y: 50,  pop: 2, opacityDelay: -0.6},
		{x: 39,  y: 59,  pop: 2, opacityDelay: -0.8},
		{x: 135, y: 65,  pop: 2, opacityDelay: -0.1},
		{x: 63,  y: 75,  pop: 2, opacityDelay: 0},
		{x: 191, y: 76,  pop: 2, opacityDelay: -0.7},
		{x: 36,  y: 77,  pop: 2, opacityDelay: 0},
		{x: 196, y: 91,  pop: 2, opacityDelay: -0.4},
		{x: 38,  y: 94,  pop: 2, opacityDelay: -0.2},
		{x: 107, y: 106, pop: 2, opacityDelay: -0.3},
		{x: 86,  y: 109, pop: 2, opacityDelay: 0},
		{x: 121, y: 113, pop: 2, opacityDelay: -0.6},
		{x: 165, y: 121, pop: 2, opacityDelay: -0.2},
		{x: 30,  y: 148, pop: 2, opacityDelay: -0.8},
		{x: 108, y: 149, pop: 2, opacityDelay: -0.4},
		{x: 129, y: 155, pop: 2, opacityDelay: -0.6},
		{x: 64,  y: 157, pop: 2, opacityDelay: -0.3},
		{x: 139, y: 157, pop: 2, opacityDelay: 0},
		{x: 97,  y: 167, pop: 2, opacityDelay: -0.1},
		{x: 37,  y: 169, pop: 2, opacityDelay: -0.7},
		{x: 111, y: 171, pop: 2, opacityDelay: 0},
		{x: 47,  y: 174, pop: 2, opacityDelay: -0.7},
		{x: 169, y: 182, pop: 2, opacityDelay: -0.3},
		{x: 110, y: 186, pop: 2, opacityDelay: -0.2},
		{x: 71,  y: 188, pop: 2, opacityDelay: -0.6}];

		for( var y=0; y<popArray.length; y++){
			pushPoint(popArray[y].x-70, popArray[y].y-70, popArray[y].x-70, popArray[y].y-70, popArray[y].pop, popArray[y].opacityDelay);
		}
	},

	nucubuc: [
		//	POPS 14
		{x: 170, y: 50},
		{x: 131, y: 177},

		//	POPS 12
		{x: 68, y: 23},
		{x: 128, y: 48},
		{x: 21, y: 64},
		{x: 182, y: 119},
		{x: 92, y: 127},
		{x: 47, y: 153},
		{x: 88, y: 198},

		//	POPS 10
		{x: 118, y: 10},
		{x: 50, y: 50},
		{x: 51, y: 86},
		{x: 166, y: 88},
		{x: 17, y: 115},
		{x: 184, y: 156},
		{x: 55, y: 188},

		//	POPS 7
		{x: 94, y: 10},
		{x: 139, y: 23},
		{x: 98, y: 40},
		{x: 74, y: 59},
		{x: 191, y: 63},
		{x: 145, y: 73},
		{x: 26, y: 88},
		{x: 7, y: 93},
		{x: 105, y: 92},
		{x: 203, y: 102},
		{x: 156, y: 110},
		{x: 48, y: 126},
		{x: 119, y: 144},
		{x: 16, y: 148},
		{x: 155, y: 151},
		{x: 85, y: 158},
		{x: 157, y: 185},
		{x: 112, y: 198},

		//	POPS 5
		{x: 162, y: 23},
		{x: 114, y: 31},
		{x: 77, y: 42},
		{x: 29, y: 44},
		{x: 148, y: 56},
		{x: 187, y: 86},
		{x: 90, y: 99},
		{x: 118, y: 102},
		{x: 32, y: 104},
		{x: 120, y: 124},
		{x: 157, y: 131},
		{x: 32, y: 133},
		{x: 196, y: 136},
		{x: 105, y: 160},
		{x: 27, y: 164},
		{x: 164, y: 166},
		{x: 75, y: 178},

		//	POPS 4
		{x: 103, y: 24},
		{x: 87, y: 26},
		{x: 49, y: 31},
		{x: 152, y: 35},
		{x: 95, y: 56},
		{x: 44, y: 69},
		{x: 159, y: 70},
		{x: 201, y: 78},
		{x: 44, y: 110},
		{x: 111, y: 117},
		{x: 9, y: 131},
		{x: 170, y: 139},
		{x: 98, y: 146},
		{x: 149, y: 165},
		{x: 68, y: 166},
		{x: 38, y: 179},
		{x: 101, y: 179},
		{x: 131, y: 202},

		//	POPS 3
		{x: 151, y: 16},
		{x: 126, y: 29},
		{x: 65, y: 44},
		{x: 110, y: 56},
		{x: 59, y: 66},
		{x: 178, y: 74},
		{x: 7, y: 77},
		{x: 150, y: 88},
		{x: 187, y: 99},
		{x: 20, y: 100},
		{x: 52, y: 103},
		{x: 169, y: 105},
		{x: 3, y: 107},
		{x: 97, y: 108},
		{x: 34, y: 119},
		{x: 204, y: 123},
		{x: 109, y: 132},
		{x: 20, y: 135},
		{x: 118, y: 159},
		{x: 57, y: 171},
		{x: 89, y: 174},
		{x: 174, y: 175},
		{x: 143, y: 195},

		//	POPS 2
		{x: 134, y: 9},
		{x: 81, y: 10},
		{x: 51, y: 20},
		{x: 170, y: 30},
		{x: 39, y: 36},
		{x: 111, y: 42},
		{x: 146, y: 43},
		{x: 85, y: 50},
		{x: 39, y: 59},
		{x: 135, y: 65},
		{x: 63, y: 75},
		{x: 191, y: 76},
		{x: 36, y: 77},
		{x: 196, y: 91},
		{x: 38, y: 94},
		{x: 107, y: 106},
		{x: 86, y: 109},
		{x: 121, y: 113},
		{x: 165, y: 121},
		{x: 30, y: 148},
		{x: 108, y: 149},
		{x: 129, y: 155},
		{x: 64, y: 157},
		{x: 139, y: 157},
		{x: 97, y: 167},
		{x: 37, y: 169},
		{x: 111, y: 171},
		{x: 47, y: 174},
		{x: 169, y: 182},
		{x: 110, y: 186},
		{x: 71, y: 188}
	],

	nucubucTime: function() {
		var i, currentPoint
		var offsetX = 440/4
		var offsetY = 100/4

		for (i = 0; i < this.points.length; i++) {

			currentPoint = this.points[i]

			currentPoint.originalX = Pops.nucubuc[i].x + offsetX
			currentPoint.originalY = Pops.nucubuc[i].y + offsetY
		}
	},

	love: [
		//	POPS 14
		{x: 170, y: 50},
		{x: 150, y: 181},

		//	POPS 12
		{x: 69, y: 22}, {x: 127, y: 47},{x: 22, y: 63},{x: 183, y: 118},{x: 107, y: 169},
		{x: 48, y: 151},{x: 76, y: 194},

		//	POPS 10
		{x: 118, y: 10},{x: 49, y: 48},{x: 45, y: 81},{x: 170, y: 89},
		{x: 17, y: 115},{x: 186, y: 151},{x: 50, y: 183},

		//	POPS 7
		{x: 96, y: 9},{x: 138, y: 22},{x: 98, y: 39},{x: 86, y: 56},
		{x: 192, y: 62},{x: 150, y: 65},{x: 21, y: 85},{x: 7, y: 93},
		{x: 137, y: 140},{x: 203, y: 102},{x: 158, y: 111},{x: 44, y: 114},
		{x: 124, y: 196},{x: 16, y: 148},{x: 161, y: 129},{x: 60, y: 122},
		{x: 167, y: 161},{x: 100, y: 203},

		//	POPS 5
		{x: 162, y: 23},
		{x: 114, y: 31},
		{x: 80, y: 41},
		{x: 30, y: 45},
		{x: 147, y: 49},
		{x: 187, y: 86},
		{x: 85, y: 145},
		{x: 131, y: 165},
		{x: 30, y: 101},
		{x: 124, y: 180},
		{x: 145, y: 126},
		{x: 37, y: 129},
		{x: 197, y: 136},
		{x: 72, y: 133},
		{x: 27, y: 164},
		{x: 152, y: 153},
		{x: 65, y: 173},

		//	POPS 4
		{x: 103, y: 23},
		{x: 89, y: 25},
		{x: 51, y: 30},
		{x: 151, y: 31},
		{x: 105, y: 66},
		{x: 60, y: 65},
		{x: 164, y: 71},
		{x: 201, y: 78},
		{x: 42, y: 100},
		{x: 123, y: 146},
		{x: 9, y: 131},
		{x: 168, y: 145},
		{x: 85, y: 169},
		{x: 138, y: 154},
		{x: 68, y: 151},
		{x: 34, y: 176},
		{x: 96, y: 154},
		{x: 138, y: 200},

		//	POPS 3
		{x: 151, y: 16},
		{x: 126, y: 28},
		{x: 64, y: 40},
		{x: 115, y: 60},
		{x: 69, y: 51},
		{x: 179, y: 73},
		{x: 7, y: 77},
		{x: 156, y: 79},
		{x: 187, y: 99},
		{x: 20, y: 100},
		{x: 51, y: 95},
		{x: 170, y: 106},
		{x: 3, y: 107},
		{x: 85, y: 157},
		{x: 32, y: 112},
		{x: 204, y: 123},
		{x: 100, y: 188},
		{x: 20, y: 135},
		{x: 109, y: 194},
		{x: 73, y: 163},
		{x: 62, y: 138},
		{x: 181, y: 171},
		{x: 171, y: 174},

		//	POPS 2
		{x: 134, y: 9},
		{x: 82, y: 9},
		{x: 51, y: 20},
		{x: 170, y: 30},
		{x: 39, y: 32},
		{x: 109, y: 49},
		{x: 143, y: 38},
		{x: 99, y: 56},
		{x: 39, y: 61},
		{x: 136, y: 61},
		{x: 71, y: 61},
		{x: 192, y: 76},
		{x: 48, y: 65},
		{x: 197, y: 91},
		{x: 33, y: 90},
		{x: 116, y: 154},
		{x: 54, y: 168},
		{x: 115, y: 186},
		{x: 178, y: 136},
		{x: 30, y: 140},
		{x: 126, y: 155},
		{x: 152, y: 141},
		{x: 50, y: 129},
		{x: 143, y: 163},
		{x: 76, y: 142},
		{x: 29, y: 150},
		{x: 115, y: 205},
		{x: 38, y: 168},
		{x: 171, y: 183},
		{x: 90, y: 180},
		{x: 78, y: 177}
	],

	loveTime: function() {
		var i, currentPoint
		var offsetX = 0
		var offsetY = 0

		for (i = 0; i < this.points.length; i++) {

			currentPoint = this.points[i]

			currentPoint.originalX = Pops.love[i].x + offsetX
			currentPoint.originalY = Pops.love[i].y + offsetY
		}
	},



	gale: [
		//	POPS 14
		{x: 170, y: 50}, {x: 150, y: 181},

		//	POPS 12
		{x: 69, y: 22}, {x: 127, y: 47},{x: 22, y: 63},{x: 183, y: 118},{x: 107, y: 169},
		{x: 48, y: 151},{x: 76, y: 194},

		//	POPS 10
		{x: 118, y: 10},{x: 49, y: 48},{x: 45, y: 81},{x: 170, y: 89},
		{x: 17, y: 115},{x: 186, y: 151},{x: 50, y: 183},

		//	POPS 7
		{x: 96, y: 9},{x: 138, y: 22},{x: 98, y: 39},{x: 86, y: 56},
		{x: 192, y: 62},{x: 150, y: 65},{x: 21, y: 85},{x: 7, y: 93},
		{x: 137, y: 140},{x: 203, y: 102},{x: 158, y: 111},{x: 44, y: 114},
		{x: 124, y: 196},{x: 16, y: 148},{x: 161, y: 129},{x: 60, y: 122},
		{x: 167, y: 161},{x: 100, y: 203},

		//	POPS 5
		{x: 162, y: 23},
		{x: 114, y: 31},
		{x: 80, y: 41},
		{x: 30, y: 45},
		{x: 147, y: 49},
		{x: 187, y: 86},
		{x: 85, y: 145},
		{x: 131, y: 165},
		{x: 30, y: 101},
		{x: 124, y: 180},
		{x: 145, y: 126},
		{x: 37, y: 129},
		{x: 197, y: 136},
		{x: 72, y: 133},
		{x: 27, y: 164},
		{x: 152, y: 153},
		{x: 65, y: 173},

		//	POPS 4
		{x: 103, y: 23},
		{x: 89, y: 25},
		{x: 51, y: 30},
		{x: 151, y: 31},
		{x: 105, y: 66},
		{x: 60, y: 65},
		{x: 164, y: 71},
		{x: 201, y: 78},
		{x: 42, y: 100},
		{x: 123, y: 146},
		{x: 9, y: 131},
		{x: 168, y: 145},
		{x: 85, y: 169},
		{x: 138, y: 154},
		{x: 68, y: 151},
		{x: 34, y: 176},
		{x: 96, y: 154},
		{x: 138, y: 200},

		//	POPS 3
		{x: 151, y: 16},
		{x: 126, y: 28},
		{x: 64, y: 40},
		{x: 115, y: 60},
		{x: 69, y: 51},
		{x: 179, y: 73},
		{x: 7, y: 77},
		{x: 156, y: 79},
		{x: 187, y: 99},
		{x: 20, y: 100},
		{x: 51, y: 95},
		{x: 170, y: 106},
		{x: 3, y: 107},
		{x: 85, y: 157},
		{x: 32, y: 112},
		{x: 204, y: 123},
		{x: 100, y: 188},
		{x: 20, y: 135},
		{x: 109, y: 194},
		{x: 73, y: 163},
		{x: 62, y: 138},
		{x: 181, y: 171},
		{x: 171, y: 174},

		//	POPS 2
		{x: 134, y: 9},
		{x: 82, y: 9},
		{x: 51, y: 20},
		{x: 170, y: 30},
		{x: 39, y: 32},
		{x: 109, y: 49},
		{x: 143, y: 38},
		{x: 99, y: 56},
		{x: 39, y: 61},
		{x: 136, y: 61},
		{x: 71, y: 61},
		{x: 192, y: 76},
		{x: 48, y: 65},
		{x: 197, y: 91},
		{x: 33, y: 90},
		{x: 116, y: 154},
		{x: 54, y: 168},
		{x: 115, y: 186},
		{x: 178, y: 136},
		{x: 30, y: 140},
		{x: 126, y: 155},
		{x: 152, y: 141},
		{x: 50, y: 129},
		{x: 143, y: 163},
		{x: 76, y: 142},
		{x: 29, y: 150},
		{x: 115, y: 205},
		{x: 38, y: 168},
		{x: 171, y: 183},
		{x: 90, y: 180},
		{x: 78, y: 177}
	],

	galeTime: function() {
		var i, currentPoint
		var offsetX = 440/4
		var offsetY = 100/4

		for (i = 0; i < this.points.length; i++) {

			currentPoint = this.points[i]

			currentPoint.originalX = Pops.gale[i].x + offsetX
			currentPoint.originalY = Pops.gale[i].y + offsetY
		}
	},




	rdm: function(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from)
	},

	updatePoints: function() {

		var i, currentPoint, theta, distance

		for (i = 0; i < this.points.length; i++) {

			currentPoint = this.points[i]

			theta = Math.atan2(currentPoint.y - this.mouse.y, currentPoint.x - this.mouse.x)


			if (this.mouse.down) {
				distance = this.reactionSensitivity * 200 / Math.sqrt((this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
				 (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y))
			} else {
				distance = this.reactionSensitivity * 100 / Math.sqrt((this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
				 (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y))
			}

			currentPoint.x += Math.cos(theta) * distance + (currentPoint.originalX - currentPoint.x) * 0.05
			currentPoint.y += Math.sin(theta) * distance + (currentPoint.originalY - currentPoint.y) * 0.05

		}
	},

	drawPoints: function() {
		var i, currentPoint

		for (i = 0; i < this.points.length; i++) {
			currentPoint = this.points[i]

			this.context.fillStyle = 'rgba('+currentPoint.color+','+currentPoint.opacityDelay+')'
			if(currentPoint.opacityDelay < 1) currentPoint.opacityDelay = currentPoint.opacityDelay + 0.025
			this.context.strokeStyle = 'rgb('+currentPoint.color+')'

			this.context.beginPath()
			this.context.arc(currentPoint.x, currentPoint.y, currentPoint.radius ,0 , Math.PI*2, true)
			this.context.closePath()
			this.context.fill()
		}
	},

	draw: function() {
		this.animation = requestAnimationFrame(function() {
			Pops.draw()
		})

		this.clear()
		this.updatePoints()
		this.drawPoints()

	},

	clear: function() {
		this.canvas.width = this.canvas.width
	},

	mouseDown: function(event) {
		Pops.mouse.down = true
		document.body.querySelector('h1')
		Pops.coins = localStorage.getItem('coins');
	    Pops.power = localStorage.getItem('power');
		//this.moveTimeout
	},

	mouseUp: function(event) {
		Pops.mouse.down = false
	},

	mouseMove: function(event) {
		if(!Pops.mouse.down){
			for (var i = 0; i < Pops.points.length; i++) {
				$(Pops.points[i]).stop()
			}
		}
		if(Pops.mouse.down){
//			coins = localStorage.getItem('coins');
//		    power = localStorage.getItem('power');
			Pops.coins++
		    Pops.result.textContent = (Number(Pops.coins)).toLocaleString();

	//        body.querySelector('#power').textContent = `${Number(power) - 1}`;

			Pops.mouse.x = event.offsetX || (event.layerX - Pops.canvas.offsetLeft)
			Pops.mouse.y = event.offsetY || (event.layerY - Pops.canvas.offsetTop)
			Pops.mouse.move = true
		}
	},

	mouseOut: function(event) {
		Pops.mouse.x = -1000
		Pops.mouse.y = -1000
		Pops.mouse.down = false
		Pops.mouse.move = false
	}
}

function moveObjectTo(obj, xMove, yMove){
	for(var i = 0; i < Pops.points.length; i++)
	{
		obj[i].x=obj[i].x-xMove;
		obj[i].y=obj[i].y-yMove;
	}

	return obj;
}

Pops.init()

$('#popsShape input').on('change', function() {
  var value= $('#popsShape input:checked').val()
  if(value== 'nucubuc') Pops.nucubucTime()
  else if(value== 'love') Pops.loveTime()
  else if(value== 'gale') gale.loveTime()
})