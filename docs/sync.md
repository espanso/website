---
title: Synchronization
sidebar_position: 8
---

At some point, you might need to synchronize your configuration between devices. 
Luckly, the Espanso file-based configuration makes it easy,
letting you synchronize the config using any Cloud Storage service (such as Dropbox, Google Drive, ecc) or even GitHub!

## Experimental

`espanso start --unmanaged` will pick up user-set environmental variables:
```
ESPANSO_CONFIG_DIR
ESPANSO_PACKAGE_DIR
ESPANSO_RUNTIME_DIR
```
for its Configuration (config & matches), Packages, and Runtime (logs, icons & lock-files etc.) directories.

Alternatively use the associated command-line parameters:
```
--config_dir
--package_dir
--runtime_dir
```

For example: 
```bash
espanso --config_dir /path/to/your/files start --unmanaged
```
For Windows it may be necessary to use an `espanso launcher` command instead.

:::caution
If you're already running Espanso as a service, stop it first with `espanso stop` and `espanso service unregister`.

N.B. The command `espanso path` _won't_ show the new paths.

This method is somewhat experimental so we would welcome discussion on [Discord](https://discord.gg/4QARseMS6k) or [Reddit](https://www.reddit.com/r/espanso/) as to whether this works on your system, and any problems you encounter. It may represent an easier alternative to the following section, however.
:::

## Symlinks

The established method of sharing configurations is documented here, but is more complex.

:::tip

From now on, we'll only mention "Dropbox folder" for brevity, but you can apply the same process for every service.

:::

The general idea, which applies to all operating systems, is the following:

* Move the Espanso configuration folder inside your Dropbox folder (also a subdirectory is perfectly fine)
* Create a **symbolic link** in the original position, pointing to the synced folder.

Before diving in the actual process, you'll need to determine the current Espanso's configuration path
used on your system.
To do so, open a terminal and type:

```
espanso path config
```

The command's output is the configuration path, make sure to note it somewhere as you'll need it later.
From now on, **we'll refer to this path as `$CONFIG`**.

> Note: you do not need the final 'espanso' folder when entering the path. For example if the path returned by `espanso path config` is `/Users/myname/Library/Application Support/espanso` your `$CONFIG` value should be `/Users/myname/Library/Application Support/`

The specific commands are explained in the following sections, depending on your OS.

:::caution Make sure to replace `$CONFIG`!

In the following sections, we'll refer to the current configuration path as `$CONFIG`.
Make sure to replace it with the actual path, determined in the previous section.

For example, if you see this command:

```
mklink /J "$CONFIG" "C:\Users\user\Dropbox\espanso"
```

You should run something like:

```
mklink /J "C:\Users\user\AppData\Roaming\espanso" "C:\Users\user\Dropbox\espanso"
```

:::

:::caution Stop Espanso first

Before running any of the following, stop espanso with:
```yml
espanso stop
```
to prevent it trying to recreate the file structure during the process.

Before running `mklink` or `ln` ensure the `espanso` folder at the end of $CONFIG no longer exists, because it has been moved, or copied and renamed.

:::


### Windows


The first step is moving the `$CONFIG` folder inside your Dropbox directory, for example in:

```
C:\Users\user\Dropbox\espanso
```

Now you need to create a **symbolic link**. Open the Command Prompt and type the following command, making sure you specify the correct paths:

```
mklink /J "$CONFIG" "C:\Users\user\Dropbox\espanso"
```

Now restart Espanso and you should be ready to go!

### macOS

The first step is moving the `$CONFIG` folder inside your Dropbox directory, for example in:

```
$HOME/Dropbox/espanso
```

Now you need to create a **symbolic link**. Open the Terminal and type the following command, making sure you specify the correct paths:

```
ln -s "$HOME/Dropbox/espanso" "$CONFIG"
```

Now restart espanso and you should be ready to go!

### Linux

The first step is moving the `$CONFIG` folder inside your Dropbox directory, for example in:

```
/home/user/Dropbox/espanso
```

Now you need to create a **symbolic link**. Open the Terminal and type the following command, making sure you specify the correct paths:

```
ln -s "/home/user/Dropbox/espanso" "$CONFIG"
```

Now restart espanso and you should be ready to go!
