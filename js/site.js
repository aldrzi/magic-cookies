"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	if (!!$.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});

});


/* Preloader and animations */
$(window).load(function () { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow-y': 'visible'});

	/* WOW Elements */
	if (typeof WOW == 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if (!!$.prototype.enllax) {
		$(window).enllax();
	}

});


// audio
const music = document.getElementById('music');
const playPauseButton = document.getElementById('playPause');

playPauseButton.addEventListener('click', function() {
    if (music.paused) {
        music.play();
        playPauseButton.innerHTML = '<i class="fa fa-pause-circle fa-1x"></i>';
    } else {
        music.pause();
        playPauseButton.innerHTML = '<i class="fa fa-play-circle fa-1x"></i>';
    }
});

// Tambahkan event listener untuk mengubah ikon tombol saat musik berhenti atau bermain secara otomatis
music.addEventListener('play', function() {
    playPauseButton.innerHTML = '<i class="fa fa-pause-circle fa-1x"></i>';
});

music.addEventListener('pause', function() {
    playPauseButton.innerHTML = '<i class="fa fa-play-circle fa-1x"></i>';
});
/*
//Sneak Peaks
document.addEventListener("DOMContentLoaded", function () {
	const nftContainer = document.getElementById('nftContainer');
	let currentIndex = 0;

	function showNextNFT() {
		const nftCards = nftContainer.getElementsByClassName('nft-card');
		nftCards[currentIndex].style.display = 'none';
		
		currentIndex = (currentIndex + 1) % nftCards.length;
		
		nftCards[currentIndex].style.display = 'block';
	}

	setInterval(showNextNFT, 2000); // Ganti gambar setiap 3 detik
});
*/
//typing text
const dynamicText = document.querySelector("h1 span");
const words = ["CHRISTMAS.", "COOKIES."];

// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");

    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

typeEffect();


document.addEventListener("DOMContentLoaded", function () {
	const nftContainer = document.getElementById('nftContainer');
	const nftCard = document.querySelector('.nft-card');
	const nftTitle = document.querySelector('.nft-title');
	let currentIndex = 0;

	const nftData = [
		{ src: 'images/gallery-images/coomingsoon.png', title: 'NFT Title 1' },
		{ src: 'images/logo.jpg', title: 'NFT Title 2' },
		{ src: 'images/gallery-images/coomingsoon.png', title: 'NFT Title 3' },
		{ src: 'images/logo.jpg', title: 'NFT Title 4' },
		// Add more NFT data as needed
	];

	function showNextNFT() {
		currentIndex = (currentIndex + 1) % nftData.length;
		const currentNFT = nftData[currentIndex];

		nftCard.style.transform = 'scale(1.1)';
		nftCard.style.opacity = 0;

		setTimeout(() => {
			nftCard.style.transform = 'scale(1)';
			nftCard.style.opacity = 1;
			nftCard.querySelector('.nft-image').src = currentNFT.src;
			nftTitle.innerText = currentNFT.title;
		}, 500);
	}

	setInterval(showNextNFT, 2000); // Ganti gambar setiap 3 detik
});
