'use strict';

// canvas
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const canvasParent = document.querySelector('.main__visual-wrap');
canvas.width = canvasParent.getBoundingClientRect().width;
canvas.height = window.innerHeight;

let pcPathX = canvas.width * 0.153;
let moPathX = canvas.width * 0.12;

function pathDrow(x, line){
    context.lineWidth = line;
    context.beginPath();
    context.moveTo(x,0);
    context.lineTo(x,canvas.height);
    context.strokeStyle = '#333';
    context.stroke();
}

if(this.innerWidth > 768){
    for(let i = 0; i<100; i++){
        pathDrow(pcPathX, 1.5);
        pcPathX+= 17;
        if(pcPathX > canvas.width-canvas.width * 0.153){
            break;
        };
    }
}else if(this.innerWidth < 768){
    for(let i = 0; i<100; i++){
        pathDrow(moPathX, 1);
        moPathX+= 13;
        if(moPathX > canvas.width-canvas.width * 0.1){
            break;
        };
    }
}

// main visual text animation
Splitting();

// scroll, contact mouse 이벤트
const $header = document.querySelector('.header');
const $greeting = document.querySelector('.main__greeting');
const $infor = document.querySelector('.infor');
const $contact = document.querySelector('.contact');
const $shadow = document.querySelector('.shadow');
const $word = document.querySelectorAll('.splitting .word');

window.addEventListener('scroll',function(){
    let scrollTop = window.pageYOffset;
    let contactRect = $contact.getBoundingClientRect();
    let contactTop = scrollTop + contactRect.top - (contactRect.height / 1.13);
    // console.log('contactTop',contactTop);

    if(this.innerWidth > 1351){
        if(scrollTop < 320){
            $word[0].style.transform = 'translate('+scrollTop+'px)';
            $word[1].style.transform = 'translateY(-'+scrollTop+'px)';
            $word[2].style.transform = 'translateY(-'+scrollTop+'px)';
            $word[3].style.transform = 'translate(-'+scrollTop+'px';
        }
    }else if(this.innerWidth < 1351 && this.innerWidth > 1150){
        if(scrollTop < 500){
            $word[0].style.transform = 'translateX('+scrollTop+'px)';
            $word[1].style.transform = 'translateX('+scrollTop+'px)';
            $word[2].style.transform = 'translateX('+scrollTop+'px)';
            $word[3].style.transform = 'translateX(-'+scrollTop+'px';
        }
    }else if(this.innerWidth < 1150 && this.innerWidth > 0){
        if(scrollTop < 500){
            $word[0].style.transform = 'translateX('+scrollTop+'px)';
            $word[1].style.transform = 'translateX('+scrollTop+'px)';
            $word[2].style.transform = 'translateX(-'+scrollTop+'px)';
            $word[3].style.transform = 'translateX(-'+scrollTop+'px';
        }
    }
    
    if(scrollTop >= contactTop){
        $contact.classList.add('active');
        $contact.addEventListener('mousemove',function(e){
            let x = e.clientX;
            let y = e.clientY;
            
            $shadow.style.top = y+'px';
            $shadow.style.left = x+'px';
        });
        $infor.classList.add('hide');
    }else{
        $contact.classList.remove('active');
        $infor.classList.remove('hide');
    }

    if(scrollTop >= 50){
        $infor.classList.add('move');
    }else{
        $infor.classList.remove('move');
    }
});

//티스토리 데이터 불러오기
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://www.tistory.com/apis/post/list?access_token=d817a4f414f7099f2acd5e38cb5d5dbf_99e53f1951368a2e2358d19006acbda9&output=json&blogName=chuvable&page=1', true);
xhr.send();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        const response = JSON.parse(xhr.response);
        const list = response.tistory.item.posts;
        const posts = list.filter(function(element){return element.visibility === "20"});
        // console.log(posts);

        let postItem = '';
        for(let i=0; i<posts.length; i++){
            if(i < 9){
                const postDate = posts[i].date.slice(0,10);

                postItem += '<article class="blog__item">'
                +'<a href="'+ posts[i].postUrl +'" target="_blank">'
                +'<h3>'+ posts[i].title +'</h3>'
                +'<p>'+ postDate +'</p>'
                +'</a></article>';
            }
        }
            document.querySelector('.blog__box').innerHTML = postItem;
    }
};