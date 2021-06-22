(() => {
  let yOffset = 0; // variable to use instead of window.pageYOffset
  let preScrollHeight = 0; // The sum of the height values of the scroll sections located before the current scroll position (yOffset).
  let currentScene = 0; // Currently active(visible in front) scene(scroll-section)

  const sceneInfo = [
    {
      // Scroll 0
      type: 'sticky',
      heightNum: 5, // Set scrollHeight to 5 times by the browser height
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageA: document.querySelector('#scroll-section-0 .main-message.b'),
        messageA: document.querySelector('#scroll-section-0 .main-message.c'),
        messageA: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      // Scroll 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // Scroll 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      // Scroll 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  function setLayout() {
    //Set the height of each scroll section
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function playAnimation() {
    switch (currentScene) {
      case 0:
        console.log('0 play');
        break;
      case 1:
        console.log('1 play');
        break;
      case 2:
        console.log('2 play');
        break;
      case 3:
        console.log('3 play');
        break;
    }
  }

  function scrollLoop() {
    preScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      preScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > preScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < preScrollHeight) {
      if (currentScene === 0) return; //Avoid being negativenumber due to browser bounce effects (on mobile)
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    // console.log(yOffset, currentScene);

    playAnimation();
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  // window.addEventListener('DOMContentLoad', setLayout);
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);

  setLayout();
})();
