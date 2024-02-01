import type NodeCG from '@nodecg/types';
import type { PlaybackReplicant } from '../types/schemas';
import { Router } from 'express';

module.exports = function (nodecg: NodeCG.ServerAPI) {
	// generate variables
	const playingRep = nodecg.Replicant<PlaybackReplicant>("playback")
	const router: Router = nodecg.Router();
	let timer: NodeJS.Timeout;
	//init replicant
	playingRep.value = {
		state : 0,
		title : "",
		artist: "",
		album : ""
	};
	//router
    router.post("/", (req, res) => {
        //POSTを待ち受ける
        const { state, title, artist, album  } = req.body;
		//stateが0-2の範囲に入ってるか確認
		const stateSafety = (() => {
			switch(state){
				case "0":
					return 0;
				case "1":
					return 1;
				case "2":
					return 2;
				default:
					return -1;
			}
		})();
		//stateとtitleが最低限必要
        if ( stateSafety !== -1 && typeof title === "string") {
            res.send('{result: "ok", error: null}');
            //タイマークリア
            clearTimeout(timer);
            //repに代入
            playingRep.value = {
                state: stateSafety,
                title,
                artist,
                album
            };
            //15分タイマーセット
            timer = setTimeout(() =>{
                playingRep.value = {
                    state : 0,
                    title : "",
                    artist: "",
                    album : ""
                };
            }, 900000)
        } else {
            //エラーを返す
            res.send('{result: "ng", "error": "Invaild type"}');
        }
    });
    nodecg.mount("/playback", router);
};
