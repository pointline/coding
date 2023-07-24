(function () {
  // 定义歌词每行的高度
  const lrcRowHeight = 40;

  const doms = {
    audio: document.querySelector('audio'),
    container: document.querySelector('.container'),
    lrcContainer: document.querySelector('#lrc-box')
  }
  const containerHeight = doms.container.clientHeight;

  /**
   * 解析歌词
   * @param {String} lrcStr
   * @returns
   */
  function parseLrc(lrcStr) {
    const splitArr = lrcStr.split('\n')
    const lrcArr = []
    for (let index = 0; index < splitArr.length; index++) {
      const lrcRowStr = splitArr[index];
      const lrcRowSplit = lrcRowStr.split(']')

      const formatTime = parseTime(lrcRowSplit[0].slice(1))
      const lrcObj = {
        time: formatTime,
        text: lrcRowSplit[1]
      }

      lrcArr.push(lrcObj)
    }

    return lrcArr
  }

  /**
   * 格式化事件
   * @param {String} timeStr
   * @returns
   */
  function parseTime(timeStr) {
    const timeSplit = timeStr.split(':')

    return +timeSplit[0] * 60 + +timeSplit[1]
  }

  /**
   * 渲染歌词
   * @param {Array} lrcArr
   */
  function renderLrc(lrcArr) {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < lrcArr.length; index++) {
      const lrcItem = lrcArr[index];
      const el = document.createElement('li')
      el.textContent = lrcItem.text;
      fragment.appendChild(el);
    }

    doms.lrcContainer.appendChild(fragment)
  }

  /**
   * 根据audio播放时间寻找到当前对应歌词
   * @param {Array} lrcArr
   * @returns
   */
  function findIndexByLrc(lrcArr) {
    const currentTime = doms.audio.currentTime;
    for (let index = 0; index < lrcArr.length; index++) {
      const lrcItem = lrcArr[index];

      if (currentTime < lrcItem.time) {
        return index - 1
      }
    }

    return lrcArr.length - 1;
  }

  // 解析歌词
  const parseLrcResult = parseLrc(lrc)
  // 渲染歌词
  renderLrc(parseLrcResult)

  /**
   * audio每次更新，回调更新歌词滚动距离
   */
  function setOffset() {
    const index = findIndexByLrc(parseLrcResult)
    // 每次滚动的距离
    let offsetHeight = index * lrcRowHeight - lrcRowHeight * 4;

    // 留4行间距，超过4行才滚动
    if (offsetHeight > 0) {
      doms.lrcContainer.style.transform = `translateY(-${offsetHeight}px)`;
    }

    const lrcRowItems = doms.lrcContainer.children;
    let li = doms.lrcContainer.querySelector('.active');
    if (li) {
      // 先删除active
      li.classList.remove('active')
    }

    li = lrcRowItems[index]
    if (li) {
      // 寻找到当前节点，设置active
      li.classList.add('active')
    }
  }


  // audio更新时，触发回调
  doms.audio.addEventListener('timeupdate', setOffset)
})()