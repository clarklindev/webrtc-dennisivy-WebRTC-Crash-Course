let peerConnection;
let localStream;
let remoteStream;



const init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});
    remoteStream = new MediaStream();
    document.getElementById('user-1').srcObject = localStream;
    document.getElementById('user-2').srcObject = remoteStream;
}    

init();



