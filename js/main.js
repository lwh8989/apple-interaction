(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보자 이전에 위치한 스크롤 섹션들의 스트롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.active-0-a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.active-0-b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.active-0-c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.active-0-d')
            },
            value: {
                messageA_opacity: [0, 1]
            }
        }, 
        {
            // 1
            type: 'normal',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++ ) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        // currenScene 상시 적용되도록 설정
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break; // 제어
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
                //console.log('0 play');
                let messageA_opacity_0 = values.messageA_opacity[0];
                let messageA_opacity_1 = values.messageA_opacity[1];
                console.log( calcValues(values.messageA_opacity, currentYOffset) );
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
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`); 
        }

        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) retuen; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`); 
        }

        playAnimation();
    }

    
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset; // pageYOffset = page Y축 스크롤 읽을 수 있음
        scrollLoop();
    });

    // window.addEventListener('DOMcontentLoaded', setLayout); DOMcontentLoaded = html 내에 태그들이 다운되면 바로 실행됨 이미지는 늦게 보여짐
    window.addEventListener('load', setLayout); //load = html에서 이미지 텍스트들 모두 로드 된 다음 화면에 나옴
    window.addEventListener('resize', setLayout);
})();