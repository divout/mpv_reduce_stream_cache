# Reduce stream cache
Reduces MPV cache for streams by increasing playback speed. It meant to work with Twitch through [Streamlink](https://streamlink.github.io/install.html). I find this setup has a few hundred milliseconds lower latency than the Twitch web player.

## Installation

Copy related folders to your MPV config folder `~/.config/mpv`.

## Script configuration

In `./script-opts/reduce_stream_cache.conf`, you can adjust when to start and stop speeding up the playback. The default configuration is quite aggressive, and it works fine on a wired stable Internet connection. But if you or your streamer have an unstable Internet connection, consider increasing `enable_faster_speed_over_cache_seconds` to prevent often speed changes. Or turn off this script with `a` shortcut.

## Make an MPV profile

MPV has its own `low-latency` profile. But the profile below has lower latency in my setup.

```bash
# ~/.config/mpv/mpv.conf
[stream]
demuxer-lavf-o-add="fflags=+nobuffer+fastseek+flush_packets"
cache=no
deband=no
dither-depth=no
scale=bilinear
cscale=bilinear
dscale=bilinear
scale-antiring=0
cscale-antiring=0
dither-depth=no
correct-downscaling=no
sigmoid-upscaling=no
```

## Start a stream with Streamlink.

```bash
streamlink twitch.tv/twitch \
  best \
  -p "mpv" \
  --player-args="--profile='stream' --script-opts='enable-stream-cache-reduction=true'" \
  --title="stream-twitch" \
  --twitch-low-latency \
  --twitch-disable-ads \
  --ringbuffer-size=256M
```

You can put it in the [gnome extension](https://extensions.gnome.org/extension/1078/twitchlive-panel/) or modify the [play-with-mpv](https://github.com/Thann/play-with-mpv) Chrome extension to your liking.

## Stream replay

If you use the MPV profile that disables cache, you won't be able to seek the video stream. As a workaround, you can record the stream to `/tmp/` and open the recorded video with a shortcut.

```bash
streamlink twitch.tv/twitch \
  best \
  -p "mpv" \
  --player-args="--profile='stream' --script-opts='enable-stream-cache-reduction=true'" \
  --title="stream-twitch" \
  --twitch-low-latency \
  --twitch-disable-ads \
  --ringbuffer-size=256M \
  --record="/tmp/stream-twitch.mp4" \
  --force
```

Then pressing `'` will open the recorded video. See `./script-opts/stream_replay.conf` for configuration.
