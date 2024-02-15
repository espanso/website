---
title: Synchronization
sidebar_position: 8
---

At some point, you might need to synchronize your configuration between devices.
Luckly, the Espanso file-based configuration makes it easy, letting you
synchronize the config using any Cloud Storage service (such as Dropbox, Google
Drive, ecc) or even GitHub!

:::tip

From now on, we'll only mention "Dropbox folder" for brevity, but you can apply
the same process for every service.

:::

The general idea, which applies to all operating systems, is the following:

-   Move the Espanso configuration folder inside your Dropbox folder (also a
    subdirectory is perfectly fine)
-   Create a **symbolic link** in the original position, pointing to the synced
    folder.

Before diving in the actual process, you'll need to determine the current
Espanso's configuration path used on your system. To do so, open a terminal and
type:

```
espanso path config
```

The command's output is the configuration path, make sure to note it somewhere
as you'll need it later. From now on, **we'll refer to this path as `$CONFIG`**.

The specific commands are explained in the following sections, depending on your
OS.

:::caution Make sure to replace `$CONFIG`!

In the following sections, we'll refer to the current configuration path as
`$CONFIG`. Make sure to replace it with the actual path, determined in the
previous section.

For example, if you see this command:

```
mklink /J "C:\Users\user\Dropbox\espanso" "$CONFIG"
```

You should run something like:

```
mklink /J "C:\Users\user\Dropbox\espanso" "C:\Users\user\AppData\Roaming\espanso"
```

:::

### Windows

The first step is moving the `$CONFIG` folder inside your Dropbox directory, for
example in:

```
C:\Users\user\Dropbox\espanso
```

Now you need to create a **symbolic link**. Open the Command Prompt and type the
following command, making sure you specify the correct paths:

```
mklink /J "C:\Users\user\Dropbox\espanso" "$CONFIG"
```

Now restart Espanso and you should be ready to go!

### macOS

The first step is moving the `$CONFIG` folder inside your Dropbox directory, for
example in:

```
$HOME/Dropbox/espanso
```

Now you need to create a **symbolic link**. Open the Terminal and type the
following command, making sure you specify the correct paths:

> Note: Before running the following command, make sure that there is no folder
> called `espanso` in the `Application Support` folder, as otherwise it will
> create another nested folder `espanso/espanso` (which is wrong).

```
ln -s "$HOME/Dropbox/espanso" "$CONFIG"
```

Now restart espanso and you should be ready to go!

### Linux

The first step is moving the `$CONFIG` folder inside your Dropbox directory, for
example in:

```
/home/user/Dropbox/espanso
```

Now you need to create a **symbolic link**. Open the Terminal and type the
following command, making sure you specify the correct paths:

```
ln -s "/home/user/Dropbox/espanso" "$CONFIG"
```

Now restart espanso and you should be ready to go!
