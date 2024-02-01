# nodecg-playback

![License](https://img.shields.io/github/license/alphaRomeo323/nodecg-playback?label=License)

## TL:DR

nodecg-playback is a [NodeCG](http://github.com/nodecg/nodecg) bundle that open a router `/playback` to POST playback.

## Requipment

[NodeCG](http://github.com/nodecg/nodecg): `^2.0.0`

## Installation

In your terminal, please navigate to your root NodeCG folder. Then execute the command `nodecg install alphaRomeo323/nodecg-playback`.

After that, please change directory to `./bundles/nodecg-playback` and execute the command `npm run build`.

## Usage

Please POST request when you start/stop/pause playing the song to `http://your.nodecg-instance.com/playback/`.

The request must be in the following format:

- `state`: number showing playback status.
  - `0`: Stopped (or not sending data anymore)
  - `1`: Playing
  - `2`: Paused
- `title`: Title of the song playing.
- `artist`: Author of the song.
- `album`: Album name the song is included.

15 minutes after received last request, the bundle try to initialize replicant.

### Reference implementation

I made and published reference implementation as [foobar2000 component](https://github.com/alphaRomeo323/foo_post_playback). (In development... sorry.)

## Replicants

Replicant name is `playback`.

Replicant's value is defined following format:

```ts
export interface PlaybackReplicant {
	/**
	 * 0: Stopped, 1: Playing, 2: Paused
	 */
	state: 0 | 1 | 2;
	title: string;
	artist?: string;
	album?: string;
}
```


## Developing

Use the following commands:

-   `npm run build`: Build the project once.
-   `npm run watch`: Build the project and automatically rebuild on changes.
-   `npm run dev`: Build the project, automatically rebuild on changes, launch the NodeCG server, and automatically restart the NodeCG server on changes.
    -   Only restarts the NodeCG server when server-side (i.e. extension) code changes. Changes to client-side code (i.e. dashboard panels and graphics) will not cause the server to restart, nor will they cause browser tabs to automatically refresh.


