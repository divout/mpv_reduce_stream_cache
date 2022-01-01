var options = {
    replay_stream_shortcut: "'",
    records_folder: '/tmp/',
}

mp.options.read_options(options, "stream_replay")

var replay_stream = function() {
    var streamer_file = options['records_folder'] + mp.get_property('media-title') + '.mp4'
    var command = 'mpv --profile=stream --start=-5 ' + streamer_file
    mp.osd_message(command)
    mp.utils.subprocess({args: ['/bin/sh', '-c', command]})
}

if (mp.get_opt('enable-stream-cache-reduction') === 'true') {
    mp.add_key_binding(options['replay_stream_shortcut'], "replay_stream", replay_stream)
}
