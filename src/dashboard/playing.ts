import type { PlaybackReplicant } from '../types/schemas';


//Rep
const playbackRep = nodecg.Replicant<PlaybackReplicant>('playback');
//Elm
const stateElm = document.getElementById("state");
const titleElm = document.getElementById("title");
const artistElm = document.getElementById("artist");
const albumElm = document.getElementById("album");
if (stateElm !== null && titleElm !== null && artistElm !== null && albumElm !== null){
	NodeCG.waitForReplicants(playbackRep).then(() => {
		playbackRep.on('change', (newVal) => {
			if(newVal !== undefined){
				switch(newVal.state){
					case 0: stateElm.innerText = "stop";		break;
					case 1: stateElm.innerText = "play_arrow";	break;
					case 2:	stateElm.innerText = "pause";     	break;
				}
				titleElm.innerText = newVal.title;
				artistElm.innerText = newVal.artist || "";
				albumElm.innerText = newVal.album || "";
			}
		});
	});
}
