'use strict';

//메뉴 이벤트
const $btnGnb = document.querySelector('.header__btn-gnb');
const $nav = document.querySelector('.nav');

$btnGnb.addEventListener('click', function(e){
    document.querySelector('.header').classList.toggle('active');
    $nav.classList.toggle('on');
});

//Top 버튼
const $btnTop = document.querySelector('.footer__btn-top');
$btnTop.addEventListener('click', function(){
    scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});

//modal
const modal = document.querySelector('.modal');

function modalOn(){
    document.querySelector('.modal').classList.add('modal--on');
    document.querySelector('#wrap').classList.add('no-scroll');
}
function modalOff(){
    document.querySelector('.modal').classList.remove('modal--on');
    document.querySelector('#wrap').classList.remove('no-scroll');
}
window.addEventListener('click', (e) => {
    e.target === modal ? modalOff() : false
});