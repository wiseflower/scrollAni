
(() => {
    let = yOffset = 0; //window.pageyOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 높이값의 합
    let currentScene = 0; //현재 활성화된 (눈 앞에 보고 있는) 씬(scroll-section)
    
    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5, //브라우저 높이(디바이스 높이)의 5배로 스크롤 Hiehgt를 세팅 : 특정 숫자로 고정하지 않고 배수로
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
                messageA_opacity: [0, 1]
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            },
        },
        {
            //2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            },
        },
        {
            //3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            },
        }
    ];

    function setLayout(){
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;  // ${변수를 쓸 수 있다.}
        }

        //새로고침을 해도 새로고침 전의 씬에 위치해 있도록 해주는 함수
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {
        
    }


    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene) {
            case 0:
                // console.log('0 play');
                let messageA_opacity_0 = values.messageA_opacity[0];
                let messageA_opacity_1 = values.messageA_opacity[1];
                console.log(calcValues(values.messageA_opacity, currentYOffset));
                break;
            
            case 1:
                // console.log('1 play');
                break;
            
            case 2:
                // console.log('2 play');
                break;
            
            case 3:
                // console.log('3 play');
                break;
        }
    }

    
    function scrollLoop() {
        prevScrollHeight = 0; //prevScrollHeight값 초기화
        for (let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return; //브라우저 바운스에서도 씬넘버 마이너스 되는 일을 없애준다.
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        
        playAnimation();

    }
    
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout); //브라우저 사이즈를 조절하면 setLayout함수를 실행한다
    

})();