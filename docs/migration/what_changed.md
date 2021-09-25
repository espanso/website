---
title: What changed in v2
sidebar_position: 2
---

Although the v2 strives to be backward compatible, the configuration format has slightly changed. 
Luckily, Espanso comes with an automatic migration tool that makes the switch almost painless.

Before diving into the tool though, we are going to explore the main changes.
### New configuration format

Previously, configurations and matches were defined in the same file (usually the `default.yml` file).
In v2, the two have been split:

* You should now define your matches and global variables in the `$CONFIG/match/base.yml` file.
* Other configuration options (like `toggle_key` or `backend`) should be defined in the `$CONFIG/config/default.yml` file.

For example, this legacy config file:

```yml title="$CONFIG/default.yml"
backend: Clipboard

matches:
  - trigger: ":espanso"
    replace: "Hi there!"
```

would be divided in two separate files:

```yml title="$CONFIG/match/base.yml"
matches:
  - trigger: ":espanso"
    replace: "Hi there!"
```

```yml title="$CONFIG/config/default.yml"
backend: Clipboard
```

Espanso comes with an automatic migration tool, simply launch it and the wizard will ask you to migrate the configurations
automatically.

For a deeper walkthrough on the new configuration format, please read the [Configuration changes section](../configuration_changes).

### Search bar

Espanso now comes with a search bar. You can open it typing `jkj` or by pressing `ALT+SPACE` (or `OPTION+SPACE` on macOS).
You can customize the shortcut with these options (you should add them into the `default.yml` file):

```yaml
search_trigger: "jkj"
search_shortcut: "ALT+SPACE"
```

### Regex triggers

You can now write full-blown regex triggers with named groups:

```yaml
  - regex: ":hi\\((?P<name>.*?)\\)"
    replace: "Hey {{name}}!"
```

The named group name is injected as a variable.

> Only use Regex triggers when necessary, as their performance is significantly slower than
> regular triggers.

> Currently there is a limit of 30-chars in the regex trigger (including the argument) due to performance reasons.
> We are working to make this limit configurable, but we are not yet there.

### Distribution format

Espanso v2 slightly changes the preferred distribution format on some platforms.

#### macOS

Espanso is now a regular App Bundle on macOS, currently available for both Intel and M1 architectures.

#### Linux

Espanso now ships as an AppImage by default for X11 systems. We are still deciding the optimal distribution format for
Wayland systems.

#### Windows

You can now use the official installer or the **Portable** mode to use Espanso on Windows.

### New Package system

Espanso v2 ships with a new and improved package system. We are still working out the last details, so
**currently is not possible to install a package from the Espanso Hub**, but we are working
to make this available as soon as possible.

Among the new features, you can now:
* Install a package from private git repositories
* Install a package from GitLab repositories
### Other changes

Espanso v2 ships with many changes that were not documented in this section yet. We are in the process of rewriting the
docs, so please be patient :)