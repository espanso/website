---
sidebar_position: 4
title: Options
---

In this guide, we are going to discuss the available options to customize Espanso.
The first few sections are about the common parameters you might want to change,
but you'll also find a complete reference at the bottom for the advanced ones.

## Customizing the Toggle Key

If you often need to **quickly enable and disable Espanso** during regular use, you might want to customize
the _Toggle Key_.
When double pressed, the Toggle Key disables Espanso, preventing any expansion.
Double-pressing Alt again will re-enable it. 

:::info Changes in version 2.1.2

Prior to version 2.1.2, Espanso was configured to use the ALT key as `toggle_key` by default.
That was a major source of confusion, as many users accidentally pressed it during
normal use.
For this reason, Espanso now ships with the `toggle_key` _disabled_ by default.

:::

If you'd like to customize the key, simply add the `toggle_key` parameter to your
`$CONFIG/config/default.yml` configuration and set it to one of the available options:

|              |             |               |              |
|--------------|-------------|---------------|--------------|------|
| `CTRL`       | `ALT`       | `SHIFT`       | `META`       | `OFF`
| `LEFT_CTRL`  | `LEFT_ALT`  | `LEFT_SHIFT`  | `LEFT_META`  |
| `RIGHT_CTRL` | `RIGHT_ALT` | `RIGHT_SHIFT` | `RIGHT_META` |

For example, if you want to use the Right Control key to toggle Espanso, you can add the
following to your configuration:

```yaml title="$CONFIG/config/default.yml"
toggle_key: RIGHT_CTRL
```

:::tip About the META key

The `META` option refers to different keys depending on the platform.
For example, on macOS the `META` refers to Command (or CMD),
while on Windows refers to the "Win" key.

In other words, if you'd like to use the CMD key on macOS, you should
specify `META`.

:::

And if you'd rather turn it off, you can do so with:

```yml title="$CONFIG/config/default.yml"
toggle_key: OFF
```

## Customizing the Search bar

The Search bar is one of the most useful features, letting you choose the right snippet 
without having to remember the trigger.

By default, the search bar can be opened in two ways:
* By pressing ALT+Space (Option + Space on macOS)
* By clicking on the status icon and then selecting "Open Search bar" (currently not available on Linux)

If for whatever reason you don't like the default shortcuts, you can customize them as follows:

### Customizing the search shortcut

If you don't like the default Alt+Space shortcut, you can change it by adding the following line
to your `$CONFIG/config/default.yml` file:

```yaml title="$CONFIG/config/default.yml"
search_shortcut: ALT+SHIFT+SPACE
```

As you can see, the shortcut is defined by specifying all keys separated by a plus sign.
These are the supported keys:

`ALT`, `CTRL`, `CMD`, `SHIFT`, `ENTER`, `TAB`, `SPACE`, `META`, `OPTION`, `INSERT`, `DOWN`, `LEFT`, `RIGHT`, `UP`, `END`, `HOME`, `PAGEDOWN`, `PAGEUP`, `F1`, `F2`, `F3`, `F4`, `F5`, `F6`, `F7`, `F8`, `F9`, `F10`, `F11`, `F12`, `F13`, `F14`, `F15`, `F16`, `F17`, `F18`, `F19`, `F20`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `NUMPAD0`, `NUMPAD1`, `NUMPAD2`, `NUMPAD3`, `NUMPAD4`, `NUMPAD5`, `NUMPAD6`, `NUMPAD7`, `NUMPAD8`, `NUMPAD9`

> Not all keyboard combinations have been tested. If you find a combination that's not working, please open
> a bug report on [GitHub](https://github.com/federico-terzi/espanso/issues). Thanks!

You can also disable this shortcut entirely by adding the following line:

```yaml title="$CONFIG/config/default.yml"
search_shortcut: off
```

### Customizing the search trigger

The search bar can also be configured to be shown after typing a trigger.
For example, you might tune it to be displayed after typing `.search` by
adding this option:

```yaml title="$CONFIG/config/default.yml"
search_trigger: ".search"
```

Or disable it entirely with:

```yaml title="$CONFIG/config/default.yml"
search_trigger: off
```

## Hiding the Icon

You can hide the Espanso status icon on macOS and Windows by adding the following option to 
your `$CONFIG/config/default.yml` file:

```yaml title="$CONFIG/config/default.yml"
show_icon: false
```

## Hiding the Notifications

You can hide the notifications by adding the following option to your `$CONFIG/config/default.yml` config:

```yaml title="$CONFIG/config/default.yml"
show_notifications: false
```

## Options reference

Here's a list of all the available options. If the value of the `App-specific` column is `Yes`, then the option
can be used inside an [App-specific configuration](../app-specific-configurations).
Otherwise, the option can only be defined inside the `$CONFIG/config/default.yml` file.

Option | Description | Possible Values | Default | App-Specific 
--- | --- | --- | --- | ---
`backend` |  The mechanism used to perform the injection. Espanso can either inject text by simulating keypresses (`Inject` backend) or by using the clipboard (`Clipboard` backend). Both of them have pros and cons, so the `Auto` backend is used by default to automatically choose the most appropriate one based on the situation. If for whatever reason the `Auto` backend is not appropriate, you can change this option to override it. | `Clipboard`, `Inject` or `Auto` | `Auto` | Yes
`enable` | If false, Espanso will be disabled for the current configuration. This option can be used to selectively disable espanso when using a specific application (by creating an app-specific config). | `true`/`false` | `true` | Yes
`toggle_key` | Defines the key that disables/enables espanso when double pressed | See the [customizing the Toggle Key](#customizing-the-toggle-key) section | OFF | No
`inject_delay` | Number of milliseconds between text injection events. Increase if the target application is missing some characters. | `number` of milliseconds | Between 0 and 1, depending on the platform and application. | Yes
`key_delay` | Number of milliseconds between key injection events. Increase if the target application is missing some key events. For example, increasing might help if the trigger is not deleted completely. | `number` of milliseconds | Between 0 and 1, depending on platform and application | Yes
`clipboard_threshold` | Number of chars after which a match is injected with the clipboard backend instead of the default one. This is done for efficiency reasons, as injecting a long match through separate events becomes slow for long strings. This is only relevant if the backend is set to `Auto` | `number` | 100 | Yes
`paste_shortcut` | Customize the keyboard shortcut used to paste an expansion. This should follow this format: CTRL+SHIFT+V | Keys separated by the `+` plus sign. The available keys are defined [here](https://github.com/federico-terzi/espanso/blob/283b85818b6cc27f1d545337b99effa847b380eb/espanso-inject/src/keys.rs#L237-L323) | Usually `CTRL+V`, but many built-in patches change this behavior | Yes
`search_shortcut` | Hotkey used to show the Search UI | See the [Customizing the Search bar](#customizing-the-search-bar) section | `ALT+Space` | No
`search_trigger` | Trigger used to show the Search UI | See the [Customizing the Search bar](#customizing-the-search-bar) section | `off` | No
`pre_paste_delay` |  Delay (in ms) that espanso should wait to trigger the paste shortcut after copying the content in the clipboard. This is needed because if we trigger a "paste" shortcut before the content is actually copied in the clipboard, the operation will fail. If you see previous contents of the clipboard being inserted instead of the correct replacement, increase this value | `number` of milliseconds | 300 | Yes
`disable_x11_fast_inject` | NOTE: This is only relevant on Linux under X11 environments. Switch to a slower (but sometimes more supported) way of injecting key events based on XTestFakeKeyEvent instead of XSendEvent. From my experiements, disabling fast inject becomes particularly slow when using the Gnome desktop environment. | `true`/`false` | false | Yes
`paste_shortcut_event_delay` | Number of milliseconds between keystrokes when simulating the Paste shortcut. For example: CTRL + (wait 5ms) + V + (wait 5ms) + release V + (wait 5ms) + release CTRL. This is needed as sometimes (for example on macOS), without a delay some keystrokes were not registered correctly. | `number` of milliseconds | 10 | Yes
`auto_restart` | If true, instructs the daemon process to restart the worker (and refresh the configuration) after a configuration file change is detected on disk. | `true`/`false` | `true` | No
`preserve_clipboard` | If true, Espanso will attempt to preserve the previous clipboard content after an expansion has taken place. | `true`/`false` | `true` | No
`restore_clipboard_delay` | The number of milliseconds to wait before restoring the previous clipboard content after an expansion. This is needed as without this delay, sometimes the target application detects the previous clipboard content instead of the expansion content. | `number` of milliseconds | 300 | Yes
`evdev_modifier_delay` | Extra delay to apply when injecting modifiers under the EVDEV backend (Wayland). This is useful on Wayland if espanso is injecting seemingly random cased letters, for example "Hi theRE1" instead of "Hi there!". Increase if necessary, decrease to speed up the injection. | `number` of milliseconds | 10 | Yes (but on Wayland there is currently no support for App-specific configs)
`word_separators` | Chars that when pressed mark the start and end of a word. Examples of this are . or , | An array of strings | `[" ", ",", ".", "?", "!", "\\r", "\\n", 22] | No
`backspace_limit` | How many backspace espanso tracks to correct misspelled keywordsMaximum number of backspace presses espanso keeps track of. For example, this is needed to correctly expand even if typos are typed. | `number` | 5 | No
`apply_patch` | If false, avoid applying the built-in patches to the current config. | `true`/`false` | `true` | Yes
`keyboard_layout` | On Wayland, overrides the auto-detected keyboard configuration (RMLVO) which is used both for the detection and injection process. | An object with fields: `rules`, `model`, `layout`, `variant` and `options` | `{ layout: us }` | No
`undo_backspace` |  When enabled, espanso automatically "reverts" an expansion if the user presses the Backspace key afterwards. This is not available on some platform/configurations | `true`/`false` | `true` | No 
`show_notifications` | If false, disable all notifications | `true`/`false` | `true` | No
`show_icon` | If false, avoid showing the espanso icon on the system's tray bar. Note: currently not working on Linux | `true`/`false` | `true` | No
`x11_use_xclip_backend` | If true, use the `xclip` command to implement the clipboard instead of the built-in native module on X11. You'll need to install the `xclip` command. Enable if the clipboard "get stuck" for some applications on Linux | `true`/`false` | `false` | Yes
`win32_exclude_orphan_events` | If true, filter out keyboard events without an explicit HID device source on Windows. This is needed to filter out the software-generated events, including those from Espanso, but might need to be disabled when using some software-level keyboards. Disabling this option might conflict with the undo feature. | `true`/`false` | `true` | No
`win32_keyboard_layout_cache_interval` | The maximum interval (in milliseconds) for which a keyboard layout can be cached. If switching often between different layouts, you  could lower this amount to avoid the "lost detection" effect described in this issue: https://github.com/federico-terzi/espanso/issues/745 | `number` of milliseconds | 2000 | No