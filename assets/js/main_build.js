const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count')

if(coins == null){
    localStorage.setItem('coins' , '0');
    h1.textContent = '0';
}else{
    h1.textContent = Number(coins).toLocaleString();
}

if(total == null){
    localStorage.setItem('total' , '500')
    body.querySelector('#total').textContent = '/500';
}else {
    body.querySelector('#total').textContent = `/${total}`;
}


if(power == null){
    localStorage.setItem('power' , '500');
    body.querySelector('#power').textContent = '500';
}else{
    body.querySelector('#power').textContent = power;
}


if(count == null){
    localStorage.setItem('count' , '1')
}

image.addEventListener('click' , (e)=> {

    let x = e.offsetX;
    let y = e.offsetY;


    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');
    
    if(Number(power) > 0){
        localStorage.setItem('coins' , `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;
    
        localStorage.setItem('power' , `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    } 

    if(x < 150 & y < 150){
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x < 150 & y > 150){
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x > 150 & y > 150){
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    }
    else if (x > 150 & y < 150){
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }


    setTimeout(()=>{
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

setInterval(()=> {
    count = localStorage.getItem('count')
    power = localStorage.getItem('power');
    if(Number(total) > power){
        localStorage.setItem('power' , `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);



console.clear();
$('.building').resizable({
	handles: "n",
	minHeight: 60,
	grid: 60
});

$('.building').resize(function() {
	stop();
});

const floor = '<div class="floor"><div class="window"></div><div class="window"></div><div class="window"></div><div class="window"></div></div>';
const classes = ["", "open", ""];

const stop = () => {
	let buildingHeight = $('.building').outerHeight() - 40;
	let floorHeight = $('.floor').outerHeight();
	
	let floors = Math.floor(buildingHeight / floorHeight);
	let currentFloors = $('.building .floor').length;
	
	// get the difference
	let diff = floors - currentFloors;
	
	if (diff < 0) {
		diff = -diff;
		
		for (let i = 0; i < diff; i++) {
			// remove top floor
			$('.building').find('.floor:first').remove();
		}
	} else {
		for (let i = 0; i < diff; i++) {
			$('.building').prepend(floor);
		}
	}
	
	// show price tag
	let price = Math.round(floors / 2);
	let pricetag = [];
	
	for (let i = 0; i < price; i++) {
		pricetag.push('$');
	}
	
	$('.price').html(pricetag);
	
	// randomly open windows
	$('.window').each(function() {
		$(this).removeClass(classes[~~(Math.random()*classes.length)]);
		$(this).addClass(classes[~~(Math.random()*classes.length)]);
	})
}

// Particles by Zed Dash https://codepen.io/z-/pen/bpxgWZ
const initparticles = () => leaves();

const rnd = (m, n) => {
	return Math.floor(Math.random() * (parseInt(n) - parseInt(m) + 1)) + parseInt(m);
}

const leaves = () => {
	$('.tree').each(function() {
		let count = ($(this).width() / 20) * 5;
		for (let i = 0; i <= count; i++) {
			let size = (rnd(60, 120) / 10);
			$(this).append(`<span class="particle" style="left:${rnd(-70, 70)}px;width:${size}px;height:${size}px;animation-delay:${(rnd(0, 30) / 10)}s;"></span>`);
		}
	});
}

initparticles();


// hide ui
let uis = 0;
const keydown = (e) => {
	let key = e.which;
	
	if (key === 32) {
		if (uis == 0) {
			$('.ui').css('opacity', '0');
			uis = 1;
		} else {
			$('.ui').css('opacity', '1');
			uis = 0;
		}
	}
}

$(document).on('keydown', keydown);