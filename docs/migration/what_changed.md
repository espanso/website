---
title: What changed in v2
sidebar_position: 2
---

Although the v2 strives to be backward compatible, the configuration format has slightly changed. 
Luckily, Espanso comes with an automatic migration tool that makes the switch almost painless.

Before diving into the tool, we are going to explore the main configuration changes.

## TLDR

If you don't really care about an in-depth explanation, here are the main takeaways:

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

## New configuration format

If you are coming from the legacy version, the concept of `default.yml` file will be familiar to you.
That file represents the "main" configuration, or in other words, the one that applies to all
applications by default. For example, the following `default.yml` defines a snippet that replaces `:espanso`
with `Hi there!` and forces Espanso to always use the `Clipboard` backend.

```yml title="$CONFIG/default.yml"
backend: Clipboard

matches:
  - trigger: ":espanso"
    replace: "Hi there!"
```

If you wanted to use a different configuration, or a different set of matches, on a specific application, 
you would have defined an [App-specific configuration](/docs/configuration/#application-specific-configurations).
These files are defined in the `$CONFIG/user` directory and are very similar in structure to the `default.yml`, 
with the only exception being they define a _filter_.

For example, the following configuration is activated only while using Chrome. It increases the injection delay
while also defining a new snippet `:test`.

```yml title="$CONFIG/user/chrome.yml"
filter_exec: "chrome.exe"

inject_delay: 100

matches:
  - trigger: ":test"
    replace: "Works only on chrome!"
```

Moreover, the legacy version supported a clumsy mechanism to split the configuration over multiple files by using
the `parent` option.

### Problems

The legacy format, while working for simple use-cases, had some severe limitations. For instance, it was difficult to share
snippets between app-specific configs or selectively disable some snippets.

Some common use-cases that were difficult (or impossible) to achieve in the previous version:

* Define a set of code snippets and enable them while using `VSCode` and `IntelliJ Idea`, but not while using other apps.
* Disable the `all-emojis` package while coding on `VSCode`.

The new configuration format solves all these problems.

### Splitting responsibilities

TODO: talk about split between match and config files
TODO: explain _underscored.yml and normal.yml filename resolution
TODO: explain imports, include and excludes





### Automatic migration

![Migration wizard](/img/migration-wizard.png)

TODO: also explain cli tool