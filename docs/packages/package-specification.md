---
sidebar_position: 4
title: Package Specification
---

TODO: this section is under construction

In this document, we are going to discuss the format specification 
for Espanso packages and repositories.
If you are trying to create your first package, we suggest reading
the [Creating a Package](../creating-a-package) section first,
as that contains the basic information you'll need for most use-cases.

In the first part, we'll go through the structure of an Espanso package,
starting from a top level view with the included files, all the way 
down to the actual content.
Then, the second part covers the structure a typical package repository.

## Packages format

As we first introduced in the [Creating a package](../creating-a-package) section,
**a package is a combination of YAML match files with some metadata.**

The most basic package _MUST_ contain these 3 files:
* A `package.yml` file, containing the snippets you want to share.
* A `_manifest.yml` file, containing the metadata of the package.
This includes the package's name, author and version, among other things.
* A `README.md` file, containing a description of the package,
written using the [Markdown](https://en.wikipedia.org/wiki/Markdown) syntax.

Optionally, a package can also contain:
* A `LICENSE` file, if you want to publish your package under a different license
than the [default HUB one](https://github.com/espanso/hub/blob/main/LICENSE) (MIT).
* Any number of additional YAML files, which can be used to split the matches across multiple
files, to make them more manageable.

In the following sections, we'll examine them in detail, but first we'll need
to briefly discuss _package names_.

### Package name rules

**A package name can only contain lowercase letters, numbers and the hypen symbol `-`.**

For example, the following are valid names:

* `my-nice-package1234`
* `great-package`

While these are NOT valid names:

* `My Package`
* `my_package`
* `nice@package`

### The `package.yml` file

The `package.yml` file is the entry-point of the package.
It contains the main matches (aka _snippets_) for the current package, and
its format is equivalent to the `$CONFIG/match/base.yml` file, as explained [here](../../matches/basics).

As with regular match files, it can contain matches, global variables and import rules.
A typical `package.yml` file might look like the following:

```yaml title="package.yml"
matches:
  - trigger: ":hello"
    replace: "Hello from package"

  - trigger: ":another"
    replace: "Another snippet from the example package"
```

### The `_manifest.yml` file

The `_manifest.yml` file contains the package _metadata_, including the
package name, author and version.
This file is encoded in the [YAML syntax](https://en.wikipedia.org/wiki/YAML).

A `_manifest.yml` _MUST_ contain these fields:
* `name` should be the name of your package. It must be equal to the directory name containing the package.
* `title` is the "read friendly" version of your package name. 
This can contain all string characters, but it should be relatively short.
* `description` should contain a short description of your package.
* `version` contains the version of your package. We suggest to keep it at `0.1.0` for new packages.
* `author` contains the author name.

Optionally, the manifest can also contain these fields:
* `homepage` should be the link to your package's homepage. This could be a website, a documentation
page or a Git repository.

:::info Note about package versions

As we discussed earlier, the `_manifest.yml` file also contains the package version.
This package version should follow the standard `MAJOR.MINOR.PATCH` format.

When installing or updating a package, Espanso uses the version to determine if an 
update should be performed or not.
For this reason, we suggest increasing the version after an update is made to the package.

If you don't to this, you'll need to use the `--force` option when updating.

:::

### The `README.md` file

The `README.md` file contains a description of the package, formatted
with the [Markdown](https://en.wikipedia.org/wiki/Markdown) syntax.

The main purpose of this file is to describe and document the package.
For example, if your package depends on an external script or command,
this is a good place to mention it.

## Repository format

TODO

* Repository Format
  * Multiple versions format
  * Flat format