# WebRTC-Crash-Course

Tutorial link: https://youtu.be/8I2axE6j204

## Cloning and starting project
1. git clone https://github.com/divanov11/WebRTC-Crash-Course
2. cd WebRTC-Crash-Course
3. Create an account on agora.io
4. Create agora apora app and copy app ID
5. Update APP_ID on line 1 in main.js


### coding
- coding starts at 12min07sec
- html+css ends at 19min49sec

### test
- open index.html with live-server in vscode

### display camera to page
```js
const init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia();
    document.getElementById('user-1').srcObject = localStream;
}
```