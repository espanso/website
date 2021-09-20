---
title: Install on Linux
layout: docs
---

### Find the right version

To use Espanso on Linux, you first need to determine whether your system is running a X11 or Wayland desktop environment.
If you are unsure, please open a terminal and run the following command:

```bash
echo $XDG_SESSION_TYPE
```

> If the above command doesn't output anything, please try [with this method](https://unix.stackexchange.com/a/325972).

Now that you know your desktop environment, you can either follow the [X11](#install-on-x11) or [Wayland](#install-on-wayland) installation instructions.

### Install on X11

> The preferred method to use Espanso on X11-based systems is the AppImage. If for whatever reason you don't like this option, you can also compile espanso from sources by following the [compilation instructions](https://github.com/federico-terzi/espanso/blob/dev-1.x/Compilation.md).

To install the Espanso's AppImage, open a terminal and follow these steps:

```bash
# Create the $HOME/opt destination folder
mkdir -p ~/opt

# Download the AppImage inside it
wget -O ~/opt/Espanso.AppImage https://github.com/federico-terzi/espanso/releases/latest/download/Espanso-X11.AppImage

# Make it executable
chmod u+x ~/opt/Espanso.AppImage

# Create the "espanso" command alias
sudo ~/opt/Espanso.AppImage env-path register
```

From now on, you should have the `espanso` command available in the terminal (you can verify by running `espanso --version`).

At this point, you are ready to use espanso by registering it first as a Systemd service and then starting it with:

```bash
# Register espanso as a systemd service (required only once)
espanso register

# Start espanso
espanso start
```

> If you don't want to use espanso as a Systemd service, you can also start it in unmanaged mode with `espanso start --unmanaged`. Keep in mind that Espanso will not start automatically when running in unmanaged mode, so you will need to do so manually.

You are now ready to read the [Getting Started](../../get-started) tutorial!

### Install on Wayland

> Wayland support is currently experimental, therefore some features might be missing or not working well yet. If you encounter any strange behavior, please [open an issue on GitHub](https://github.com/federico-terzi/espanso/issues).

TODO