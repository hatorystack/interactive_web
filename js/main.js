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
  }

  function scrollLoop() {
    preScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      preScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > preScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    }

    if (yOffset < preScrollHeight) {
      if (currentScene === 0) return; //Avoid being negativenumber due to browser bounce effects (on mobile)
      currentScene--;
    }

    console.log(yOffset, currentScene);
  }

  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  setLayout();
})();
