////////////////////////////////////////////////////////////
// future features
// 1. add CSS transition effect to img
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// func handler naming = element + event(user action)	
// format ⟹ element + event(user action) + browser reaction
// HF ⟹ handler function
// HF1. link + mouseover + img slide
// HF2. btn + click + img slide
// HF3. img + autoSlide + img slide
// HF4. wrapper container + mouse enter + btn appear
// HF5. wrapper container + mouse leave + btn disappear
////////////////////////////////////////////////////////////

;window.onload = function() {
	////////////////////////////////////////////////////////////
	// 1. Variable declaration & assignment
	////////////////////////////////////////////////////////////
	let aLinks = document.querySelectorAll('.nav-link');
	let aImgs = document.querySelectorAll('.img-fluid');
	let aBtns = document.querySelectorAll('input');
	let imgAutoSlideId;
	
	////////////////////////////////////////////////////////////
	// 2. Handler func declaration
	////////////////////////////////////////////////////////////
	// HF1. link + mouseover + img slide
	function linkMouseover() {	
		// hide previous img
		for(let i=0, len=aImgs.length; i<len; i++) {
			aImgs[i].classList.remove('active');
			aLinks[i].classList.remove('active');
		};
		
		// Identify the img to show
		let curImgId = '#img' + this.id.slice(-1);
		curImgEl = document.querySelector(curImgId);
		
		// show
		curImgEl.classList.add('active');
		this.classList.add('active');
	}
	
	// stop timer when mouse enter the container
	function ctnMouseEnter() {
		clearInterval(imgAutoSlideId);
	}
	
	// restart timer when mouse leave the container
	function ctnMouseLeave() {
		imgAutoSlideId = setInterval(imgAutoSlide, 1800);
	}

	// HF2. btn + click + img slide
	function btnClick() {
		// clearInterval(imgAutoSlideId);
		// Identify the img to show
		let curImg = document.querySelector('img.active');
		let curImgIdNum = +curImg.id.slice(-1); 
		
		// hide 
		for(let i=0, len=aImgs.length; i<len; i++) {
			aImgs[i].classList.remove('active');
			aLinks[i].classList.remove('active');
		};

		let nextImgIdNum, prevImgIdNum;
		if(this.classList.contains('c-btn-right')) {
			nextImgIdNum = (curImgIdNum === aImgs.length) ? 1:curImgIdNum + 1;
			let nextImgId = '#img' + nextImgIdNum.toString();
			let nextLinkId = '#link' + nextImgIdNum.toString();

			let nextImg = document.querySelector(nextImgId);
			let nextLink = document.querySelector(nextLinkId);
			nextImg.classList.add('active');
			nextLink.classList.add('active');
		} else {
			prevImgIdNum = (curImgIdNum === 1) ? aImgs.length:curImgIdNum - 1;
			
			let prevImgId = '#img' + prevImgIdNum.toString();
			let prevLinkId = '#link' + prevImgIdNum.toString();

			let prevImg = document.querySelector(prevImgId);
			let prevLink = document.querySelector(prevLinkId);
			prevImg.classList.add('active');
			prevLink.classList.add('active');
		};
	}

	function btnAppear() {
		for(let i=0, len=aBtns.length; i<len; i++) {
			aBtns[i].classList.add("active");
		};
	}

	function btnDisappear() {
		for(let i=0, len=aBtns.length; i<len; i++) {
			aBtns[i].classList.remove("active");
		};
	}
	////////////////////////////////////////////////////////////
	// 3. other functions
	////////////////////////////////////////////////////////////
	function imgAutoSlide() {
		document.querySelector('.c-btn-right').click();
	}
	////////////////////////////////////////////////////////////
	// 4. addEventListener & call func
	////////////////////////////////////////////////////////////
	function aAEL(arr, e, func) {
		for(let i=0, len=arr.length; i<len; i++) {
			arr[i].addEventListener(e,func)
		};
	}

	aAEL(aLinks, 'mouseover', linkMouseover);
	aAEL(aBtns, 'click', btnClick);	

	ctnEl = document.querySelector('.container')
	ctnEl.addEventListener('mouseenter', btnAppear);
	ctnEl.addEventListener('mouseleave', btnDisappear);
	
	
	ctnEl.addEventListener('mouseenter', ctnMouseEnter);
	ctnEl.addEventListener('mouseleave', ctnMouseLeave);

	imgAutoSlideId = setInterval(imgAutoSlide, 1800);
};

