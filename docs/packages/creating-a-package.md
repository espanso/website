---
sidebar_position: 2
title: Creating a Package
---
At some point, you might want to share your snippets with others,
and the best way to do so is by **creating a package!**.
Luckily, **packages are regular match files with some metadata**.
So if you already created some [custom matches](../../matches/basics), then
you have the necessary skills to create a custom package!

In this section, we are going to discuss the different ways in which
you can create a package and share it with other people.
We'll cover how to publish it on the Espanso Hub,
which is the recommended way to share a package publicly,
but we are also going to discuss how to share it privately,
for example with your company's team.

:::tip Prerequisites

This guide assumes you are comfortable working with YAML match files,
`git` and Markdown.
If you are new to these concepts, we suggest these resources:
* [Match Basics](../../matches/basics)
* [Git Basics by GitHub](https://docs.github.com/en/get-started/quickstart/hello-world)
* [Markdown Basics](https://programminghistorian.org/en/lessons/getting-started-with-markdown)

:::

## Package format, in a nutshell

Before diving into the different publishing opportunities,
we'll first need to briefly introduce the structure of a simple package.
The full specification can be found in the [Package Specification](../package-specification)
section.

The simplest possible package is made of 3 files:

* A `package.yml` file, containing the snippets you want to share.
* A `_manifest.yml` file, containing the metadata of the package.
This includes the package's name, author and version, among other things.
* A `README.md` file, containing a description of the package,
written using the [Markdown](https://en.wikipedia.org/wiki/Markdown) syntax.

The package can also include other files, such as a license or additional
match files, but they won't be covered in this example.
If you want to know more, please visit the [Package Specification](../package-specification)
section.

## Publish on the Hub (public)

If you want to make the package publicly available, the
Espanso Hub is the recommended approach.
The Hub itself is hosted on a [GitHub repository](https://github.com/espanso/hub),
which contains all the available packages.
Let's see how you can create your own package.

In this example, we are going to create a new package called `simple-package`.

:::caution About package names

A package name can only contain lowercase letters, numbers and the hypen symbol `-`.

For example, the following are valid names:

* `my-nice-package1234`
* `great-package`

While these are NOT valid names:

* `My Package`
* `my_package`
* `nice@package`

:::

Here are the first steps:

1. Visit the [Hub repository](https://github.com/espanso/hub) and **fork it** on your account.
2. Clone your fork locally using `git`.
3. Now enter the `packages/` directory and copy the contents of the `dummy-package`
directory in a new one, called `simple-package` (this should be equal to your package name).
At this point, you should have the `packages/simple-package` folder.
4. Then, enter the `packages/simple-package/0.1.0` folder, you should find three files there:
`package.yml`, `_manifest.yml` and `README.md`.
5. You are now ready to actually customize your package, as explained below:

### Customizing the manifest 

Edit the `_manifest.yml` file to customize the package metadata:
  * `name` should be the name of your package. It must be equal to the directory name created earlier.
  * `title` is the "read friendly" version of your package name. 
  This can contain all string characters, but it should be relatively short.
  * `description` should contain a short description of your package.
  * `version` contains the version of your package. We suggest to keep it at `0.1.0` for new packages.
  * `author` contains the author name.

There are also other possible fields, please visit the [Package Specification](../package-specification)
if you are interested.

At this point, we should have a `_manifest.yml` similar to this:

```yaml title="_manifest.yml"
name: "simple-package"
title: "Simple Package"
description: A simple package to show how to create your own one!
version: 0.1.0
author: Federico Terzi
```

### Customizing the snippets

Once the metadata is ready, you can move to the `package.yml` file.
That file contains the package snippets, and follow the same  format used
for [regular match files](../../matches/basics).

For example, in our case it could be:

```yaml title="package.yml"
matches:
  - trigger: ":hello"
    replace: "Hello from the Simple Package!"
```

### Customizing the Readme

Finally, you should describe your package and add all the relevant documentation
inside the `README.md` file.
You should write this content using the [Markdown](https://en.wikipedia.org/wiki/Markdown)
syntax.
This content is what will be shown in the package's Hub page.

In our example, that could be something like:

```md title="README.md"
This is a **simple package** and its purpose
is to show how to create new Espanso packages!
```

### Publishing on the Hub

Once your package is ready, we can finally publish it on the Hub, awesome!

After committing your changes and pushing it to your forked version of the Hub,
you'll need to **open a pull request** on the [Espanso Hub repository](https://github.com/espanso/hub).

At that point, the Espanso team will review it and, once verified, your package
will be published!

## Publish on a GIT repository (private or public) 

There are times when sharing a package publicly is not possible,
for example, when you plan to share it with your company's team.

This section quickly goes through the steps needed to set up an
external Git repository to host your Espanso packages.

1. Firstly, **fork** the [espanso-external-repo-template](https://github.com/espanso/espanso-external-repo-template)
on your Git hosting of choice. Keep in mind that:
  * You can keep the fork private.
  * The template itself is not needed, it's just an easier way to get up to speed with the required structure.
2. Then, you are ready to customize the `example-package`.

Start by renaming the folder with the actual package name. 
In this example, we are going to use `simple-package`.

:::caution About package names

A package name can only contain lowercase letters, numbers and the hypen symbol `-`.

For example, the following are valid names:

* `my-nice-package1234`
* `great-package`

While these are NOT valid names:

* `My Package`
* `my_package`
* `nice@package`

:::

After renaming the `example-package` folder to `simple-package`,
you can customize the included files.

### Customizing the manifest 

Edit the `_manifest.yml` file to customize the package metadata:
  * `name` should be the name of your package. It must be equal to the directory name created earlier.
  * `title` is the "read friendly" version of your package name. 
  This can contain all string characters, but it should be relatively short.
  * `description` should contain a short description of your package.
  * `version` contains the version of your package. We suggest to keep it at `0.1.0` for new packages.
  * `author` contains the author name.

There are also other possible fields, please visit the [Package Specification](../package-specification)
if you are interested.

At this point, we should have a `_manifest.yml` similar to this:

```yaml title="_manifest.yml"
name: "simple-package"
title: "Simple Package"
description: A simple package to show how to create your own one!
version: 0.1.0
author: Federico Terzi
```

### Customizing the snippets

Once the metadata is ready, you can move to the `package.yml` file.
That file contains the package snippets, and follow the same  format used
for [regular match files](../../matches/basics).

For example, in our case it could be:

```yaml title="package.yml"
matches:
  - trigger: ":hello"
    replace: "Hello from the Simple Package!"
```

### Customizing the Readme

Finally, you should describe your package and add all the relevant documentation
inside the `README.md` file.
You should write this content using the [Markdown](https://en.wikipedia.org/wiki/Markdown)
syntax.

In our example, that could be something like:

```md title="README.md"
This is a **simple package** and its purpose
is to show how to create new Espanso packages!
```

### Using the External repository

After committing your changes and pushing them to your repository, 
you are ready to use the packages!

For more information about the usage, visit the 
[External packages](../external-packages/#git-repositories-1) section.