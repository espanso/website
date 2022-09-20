---
sidebar_position: 0
title: Packages Basics
sidebar_label: Basics
---

Packages make it easy to **reuse snippets** created by other people, 
or **share** yours with the world.
Thanks to the official package repository, [Espanso Hub](https://hub.espanso.org),
and the built-in package manager, using them is a breeze.

:::info A new Hub is coming in 2022

We are working hard to build a new and improved [Espanso Hub](https://github.com/espanso/hub)
that will replace the current one.

If you want to stay updated, follow me on [Twitter](https://twitter.com/terzi_federico)
or join the [Subreddit](https://www.reddit.com/r/espanso/).

:::

## Installing a package

Packages can be installed from multiple sources.
For most users, **we recommend installing them from the [Espanso Hub](https://hub.espanso.org/)**,
as those packages have been manually verified by the Espanso team.

For advanced use-cases, you can also install packages from [external sources](../external-packages/).
This section assumes you'll install packages from the Hub, as that's the most common behavior.

After choosing your package of choice on the [Hub](https://hub.espanso.org/), you can install it by opening a terminal
and running:

```bash
espanso install <package_name>
```

with `<package_name>` being the identifier for your desired package.

For example, if you want to install the [lorem](https://hub.espanso.org/lorem) package,
you can do so with:

```bash
espanso install lorem
```

### Installing a specific version

Espanso installs the latest version by default, but you can also install a specific one with:

```bash
espanso install <package_name> --version <package_version>
```

For example:

```bash
espanso install html-utils-package --version 0.1.0
```

### Forcing an installation

By default, Espanso will prevent installing a package if already installed.
However, there are times when you might want to _force_ an installation anyway.

For example, if you locally edited a package to adapt some changes and you would
like to _roll-back_ to the official version, you can do so with the `--force` option:

```bash
espanso install lorem --force
```

This will force Espanso to install the package anyway.

## Uninstalling a package

You can uninstall a package by opening a terminal and running:

```bash
espanso uninstall <package_name>
```

such as:

```bash
espanso uninstall lorem
```

## Listing installed packages

Espanso provides a command to easily check which packages are installed. Open a terminal and run:

```
espanso package list
```

:::tip Where are packages stored?

Under the hoods, packages are nothing more than regular YAML configuration files with some metadata.
In recent Espanso versions, these are stored alongside your YAML matches, under the `packages` directory.

You can find where packages are stored by running the following command in a terminal:

```
espanso path packages
```

:::

## Updating packages

You can update a package by running the following command in a terminal:

```bash
espanso package update <package_name>
```

For example:

```
espanso package update lorem
```

### Updating all packages

You can also update all packages at once by running the following command:

```bash
espanso package update all
```