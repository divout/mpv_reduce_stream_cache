// To enable this script run `mpv --script-opts=enable-stream-cache-reduction=true`

var options = {
  enable_faster_speed_over_cache_seconds: 0.6,
  disable_faster_speed_under_cache_seconds: 0.3,
  faster_speed: 1.015,
  toggle_stream_cache_reduction_shortcut: 'a'
}
mp.options.read_options(options, "stream_cache_reduce")

var decide_to_change_speed = function(name, current_cache_seconds) {
  var speed = mp.get_property_native('speed');
  if (current_cache_seconds >= options['enable_faster_speed_over_cache_seconds'] && speed === 1) {
    set_speed(options['faster_speed'])
  } else if (current_cache_seconds <= options['disable_faster_speed_under_cache_seconds'] && speed > 1) {
    set_speed(1)
  }
}

var set_speed = function(speed) {
  mp.set_property('speed', speed)
  mp.osd_message('speed ' + speed)
}

var observe_cache = function() {
  mp.observe_property('demuxer-cache-duration', 'number', decide_to_change_speed)
  mp.osd_message('observing cache')
}

var unobserve_cache = function() {
  mp.unobserve_property(decide_to_change_speed)
  set_speed(1)
  mp.osd_message('not observing cache')
}

var isCacheObserved = false;

var observe_cache_toggle = function() {
  if (isCacheObserved) {
    unobserve_cache()
    isCacheObserved = false
  } else {
    observe_cache()
    isCacheObserved = true
  }
}

if (mp.get_opt('enable-stream-cache-reduction') === 'true') {
  mp.register_event('file-loaded', observe_cache_toggle)
  mp.add_key_binding(options['toggle_stream_cache_reduction_shortcut'], "observe_cache_toggle", observe_cache_toggle)
}
