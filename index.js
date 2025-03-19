let peerConnection;
let localStream;
let remoteStream;

//STUN SERVERS
let servers = {
    iceServers:[
        {
            urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }
    ]
}

//getUserMedia "hey...this is my camera view"
const init = async () => {

    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});
    document.getElementById('user-1').srcObject = localStream;
}    

let handlePeerJoined = async (MemberId) => {
    console.log('a new peer has joined this room:', MemberId);
    client.sendMessageToPeer({text: "Hey!"}, MemberId);
}

const createPeerConnection = async (sdpType) => {
    peerConnection = new RTCPeerConnection(servers);

    //remoteStream has no stream feed yet...
    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;

    //adding all tracks on local stream to peerConnection 
    localStream.getTracks().forEach((track)=>{
        peerConnection.addTrack(track, localStream);
    })

    //@32min06sec - add event Listener for when a peer adds tracks (from other side)
    peerConnection.ontrack = async (event)=>{
        event.streams[0].getTracks().forEach(track=>{
            //remoteStream (...created earlier) is empty -> TODO: add tracks
            remoteStream.addTrack(track);
        })
    }

    //each time icecandidate returned to us
    peerConnection.onicecandidate = async (event)=>{
        if(event.candidate){
            document.getElementById(sdpType).value = JSON.stringify(peerConnection.localDescription);
        }
    }
}

//Peer connection 
let createOffer = async () => {
    await createPeerConnection('offer-sdp');

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    document.getElementById('offer-sdp').value = JSON.stringify(offer);
}

let createAnswer = async () => {
    await createPeerConnection('answer-sdp');

    let offer = document.getElementById('offer-sdp').value;
    if(!offer){
        return alert('retrieve offer from peer first...');
    }
    offer = JSON.parse(offer);
    await peerConnection.setRemoteDescription(offer);

    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
     
    document.getElementById('answer-sdp').value = JSON.stringify(answer);

}

//@41min
let addAnswer = async => {
    let answer = document.getElementById('answer-sdp').value;
    if(!answer) return alert('Retrieve answer from peer first...');

    answer = JSON.parse(answer);
    if(!peerConnection.currentRemoteDescription){
        peerConnection.setRemoteDescription(answer);
    }
}

init();

document.getElementById('create-offer').addEventListener('click', createOffer);
document.getElementById('create-answer').addEventListener('click', createAnswer);
document.getElementById('add-answer').addEventListener('click', addAnswer);

