---
title: Uninstalling the legacy version
sidebar_position: 1
---

If you have the legacy Espanso version (0.7.3) installed on your machine, you
will need to uninstall it first to avoid conflicts. This tutorial will guide
through the process, depending on your operating system.

:::info

If you don't have the legacy version installed, feel free to skip to the next
section.

:::

### Uninstalling on Windows

If you've used the official installer to set up Espanso, you can uninstall it by
simply right-clicking on the icon, choose "Uninstall" and then follow the
on-screen instructions.

![Uninstalling on Windows](/img/windows-uninstall-legacy.png)

### Uninstalling on macOS

If you've used Homebrew to install espanso, you can open a terminal and run the
following commands to uninstall it:

```bash
espanso stop
espanso unregister
brew remove espanso
```

Otherwise, if you've used the manual installation method, run these commands:

```
espanso stop
espanso unregister
sudo rm $(which espanso)
```
It may save trouble if you ensure Espanso is removed from the accessibility permissions list _before_ installing the new version.

### Uninstalling on Linux

This step depends on the method you originally used to install Espanso.

First of all, open a terminal and run:

```bash
espanso stop
espanso unregister
```

Then, if you used a package manager to install Espanso, use the appropriate
command. For example, if you installed using Snap, you should run:

```
sudo snap remove espanso
```
