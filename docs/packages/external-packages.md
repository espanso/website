---
sidebar_position: 1
title: External Packages
---

As mentioned in the previous section, **Espanso can install packages from multiple sources.**
For most users, the official [Espanso Hub](https://hub.espanso.org/) should be the preferred way
to install new packages, as those have been verified by the 
Espanso Team to guarantee quality and security standards.

That said, **there are times when you might want to install packages from outside the hub.**
For example, you might want to create **private**, company-specific packages to share with 
your collegues, or simply you want to manage your packages intependently from the Hub.

:::tip Call for package creators

If you created a public package that could be useful to others, please consider
submitting it to the [Espanso Hub](https://hub.espanso.org/). 
Not only it's free, but it also greatly helps the project and the community! :)

:::

This guide is divided in two parts, one about **public** alternatives
to the Hub, and one about **private** ones.

## Public alternatives

This section is about _public_ alternatives to the Hub, that is,
other ways in which you can install **public packages** without
relying on the Hub.
If you wish to install private packages instead, please skip to the next section.

### GitHub or GitLab repositories

As long as the repository follows the [Package Specification](../package-specification/) format,
you can install a package from any GitHub and GitLab repository
by specifying the `--git` option.

For example, to install the `dummy-package` from our test [dummy-repository](https://github.com/espanso/dummy-repository),
we can run the following command in a terminal:

```bash
espanso install dummy-package --git https://github.com/espanso/dummy-repository --external
```

### Git repositories

As long as the repository follows the [Package Specification](../package-specification/) format,
you can install a package from any git repository
by specifying the `--git` option.

:::caution `git` command must be installed!

Compared to the previous section where we installed a package from GitHub or GitLab,
**installing from a generic git repository requires the `git` command to being installed**.

The `git` command is not needed on GitHub and GitLab because Espanso uses platform-specific
APIs to download the packages. On the other hand, Espanso uses a `git clone` to fetch
a package from other git repositories.

:::

For example, to install the `dummy-package` from our test [dummy-repository](https://github.com/espanso/dummy-repository),
we can run the following command in a terminal:

```bash
espanso install dummy-package --git https://github.com/espanso/dummy-repository --external
```

## Private alternatives

This section is about _private_ alternatives to the Hub, that is,
ways in which you can install **private packages**.
This is particularly useful in a company environment, where you might
want to share snippets with your team without publishing them on the Hub.

### Git repositories

As long as the repository follows the [Package Specification](../package-specification/) format,
you can install a package from any git repository
by specifying the `--git` option.

:::caution Setting up `git`

With private repositories, Espanso currently relies on the `git` command to fetch the contents
of a private package.
For this reason, make sure the `git` command is installed on the machine (and properly added to the
PATH) and that permissions are set up correctly.

As a rule of thumb, **if you are able to run `git clone <your_repo_url>` on the machine,
then Espanso should install the package correctly**.

:::

For example, to install the `dummy-package` from our test [dummy-repository](https://github.com/espanso/dummy-repository)
(in this case, assuming the repository was private),
we can run the following command in a terminal:

```bash
espanso install dummy-package --git https://github.com/espanso/dummy-repository --external
```
