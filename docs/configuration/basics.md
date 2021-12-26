---
sidebar_position: 0
title: Configuration Basics
sidebar_label: Basics
---

At its core, **Espanso uses YAML files to manage its configuration**. 
This has many advantages, such as the ability to easily sync your
configurations between machines using [Git](https://git-scm.com/) or cloud services
such as [Dropbox](https://www.dropbox.com/) or [Google Drive](https://www.google.com/drive/).

:::tip What about a GUI?

We are currently evaluating the best option to create an _optional_ GUI on top of
the regular file-based experience, which should greatly simplify basic use-cases.
If you are interested, make sure to [follow me on Twitter](https://twitter.com/terzi_federico)
to stay updated about the latest news!

:::

## Structure

All Espanso's configurations reside in a folder called `espanso`, whose location varies based on your operating system.

A quick way to find the path to your configuration folder is by running the following command inside a terminal:

```
espanso path
```

:::tip Default locations

If you can't run the previous command for whatever reason, these are the default directories in 
which Espanso creates its configuration, based on the operating system:

* **Linux**: `$XDG_CONFIG_HOME/espanso` (e.g. `/home/user/.config/espanso`)
* **macOS**: `$HOME/Library/Application Support/espanso` (e.g. `/Users/user/Library/Application Support/espanso`)
* **Windows**: `{FOLDERID_RoamingAppData}\espanso` (e.g. `C:\Users\user\AppData\Roaming\espanso`)

Keep in mind that these locations might be different in your case, especially if you are coming from a legacy version.

:::

By default, the `espanso` directory contains a few files and directories, structured as follows:

```
config/
  default.yml
match/
  base.yml
```

As you can see, we have two folders at the top level, `config` and `match`, each containing some YAML files.
The rationale behind them is explained in the following sections.

### The `config` directory

The `config` directory defines _HOW_ Espanso should perform its expansions and behave.
By changing the YAML files contained in this folder, you can tune all the Espanso's options,
such as expansion speed, UI shortcuts and many other settings.

You can think of these YAML files as _profiles_. Each of these files defines
a configuration, as well as the conditions that must be satisfied for the configuration to be active.
Only one configuration can be active at any given time.

The most important configuration contained in the `config` directory is the `default.yml` file,
which **defines the _default_ configuration that should be used when none of the others is active**,
as well as acting as the "base" profile from which the others derive.

This mechanism becomes useful when you need to customize how Espanso behaves in a
particular application. For example, you might want to disable Espanso when using Word, or 
slow it down when inside Chrome. 
For more information, please check out the [App-specific configurations](../app-specific-configurations)
section.

**If you only need Espanso for basic use-cases, the `default.yml` file is where you should tune
the various options**.

### The `match` directory

The `match` directory defines _WHAT_ Espanso should do. 
It contains all the snippet definitions (aka. _matches_), as well as global variables.

**If you only need Espanso for basic use-cases, the `base.yml` file is where you should
put all your snippets**.

If you are interested, the `match` folder is explained in-depth in the [Organizing matches](../../matches/organizing-matches)
section.

## Editing CLI shortcut

Espanso ships with the `edit` subcommand, which makes editing configuration files more convenient. Let's see how it works:

If you open a terminal and type:

```
espanso edit
```

the default system editor (Notepad on Windows and Nano on Unix systems) will be spawned to edit the `match/base.yml` file.

### Customizing the editor

If you want to use another editor, you can change the `EDITOR` (or `VISUAL`)
environment variable to the path of your desired editor, such as:

```
EDITOR=/usr/bin/vim
```

### Editing other configuration files 

If you invoke `espanso edit` without further arguments, it will open the `match/base.yml` file. 
But what if you want to edit other files located in the `match` or `config` directories,
you can do so by specifying the relative path.

For example, if you want to edit the `match/emails.yml` file, you can run:

```
espanso edit match/emails.yml 
```

or if you want to edit the `config/default.yml` file, you can run:

```
espanso edit config/default.yml
```
