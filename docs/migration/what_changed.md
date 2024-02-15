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

For a deeper walkthrough on the new configuration format, please read the [Configuration changes section](configuration_changes.md).

### New Form's control syntax

In previous versions, you could define Form's controls with the same curly-bracket syntax as variables:

```yaml
  - trigger: ":greet"
    form: |
      Hey {{name}},
      Happy Birthday!
```

Since version 2.1.0-alpha, you'll need to use double square-brackets to define controls instead, such as:

```yaml
  - trigger: ":greet"
    form: |
      Hey [[name]],
      Happy Birthday!
```

This breaking change was needed to support the new variable injection mechanism, for which the
curly-brackets syntax `{{name}}` is reserved.

If you run the automatic migration tool, Espanso will take care of converting the syntax for you.

### Search bar

Espanso now comes with a search bar. You can open it by 
clicking on the Espanso icon > Open Search bar (currently not available on Linux) 
or by pressing `ALT+SPACE` (or `OPTION+SPACE` on macOS).
You can customize the shortcut with this option (you should add them into the `default.yml` file):

```yaml
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

### Toggle key disabled by default

Prior to version 2.1.2, Espanso was configured to use the ALT key as `toggle_key` by default. 
That was a major source of confusion, as many users accidentally pressed it during normal use.
For this reason, Espanso now ships with the toggle_key disabled by default.

If you want to keep using it, you can explicitly specify it in your configuration, 
as [described here](../configuration/options.md#customizing-the-toggle-key).

### New Package system

Espanso v2 ships with a new and improved package system. We are still working out the last details, so
**currently is not possible to install a package from the Espanso Hub**, but we are working
to make this available as soon as possible.

Among the new features, you can now:
* Install a package from private git repositories
* Install a package from GitLab repositories

### Experimental Wayland support

Espanso v2 ships with experimental Wayland support. There are still some rough edges to be solved before
considering the experience stable, but it should be quite usable already.

Please report any bug that you experience on GitHub! :)

### Other changes

* The GUI layer _modulo_ is now built-in into Espanso, and does not require a separate binary.
* Espanso now uses native notifications on Windows.
* New Choice Extension

Espanso v2 ships with many other changes that were not documented in this section yet. We are in the process of rewriting the
docs, so please be patient :)