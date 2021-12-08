---
sidebar_position: 3
title: Include and Exclude rules
---

In the [App-specific configurations](../app-specific-configurations) section, we discussed
a way to create configurations that change depending on the active application.
These configurations let you tune the way Espanso interacts with specific applications
by providing a series of parameters.

Among them you'll find the `include` and `exclude` rules,
two sets of parameters that let you customize which matches and packages should be used
for a given configuration.

A typical use-case would be to create a set of email templates and **only enable them
inside your email client**, or defining some code-snippets and only enable
them inside your IDEs and Text Editors of choice. 

You might also want to **disable
a package inside a specific application**, for example disabling emojis when
using Slack, which already comes with emojis.

These use-cases are solved by the `include` and `exclude` rules.

### Typical use-case for `include` rules


Let's start with a simple example. We want to create a set of email replies
and only enable when when inside Chrome or Firefox.

We start by defining the snippets inside the `match/_email.yml` file:

```yaml title="$CONFIG/match/_email.yml"
matches:
  - trigger: ":contact"
    replace: |
      Hi,
      Thank you for contacting us!
      Best regards,
      The Support Team
```

:::caution Make sure to include the underscore!

In the previous example, we prefixed the filename with an `_` underscore.
As explained in the [Organizing matches](../../matches/organizing-matches)
section, Espanso automatically loads all YAML files located in the `match` directory,
**except the ones starting with an `_` underscore.**

Therefore, we prefix the `_email.yml` filename with an underscore to
prevent Espanso from loading that YAML file automatically.
If we hadn't done so, Espanso would enable the `email.yml` file for
all applications. Instead, we want to enable it only on Chrome and Firefox.

:::

At this point, we can create an app-specific configuration for Chrome:

```yaml title="$CONFIG/config/chrome.yml"
filter_exec: "chrome"

extra_includes:
  - "../match/_email.yml"
```

Let's discuss it step-by-step:
1. Firstly, we specify the `filter_exec` option to enable this configuration **only** when using
Chrome. Note that this filter might not be working on your platform, check out
the [App-specific configurations](../app-specific-configurations) section for more information
and instructions on finding the right filter.
2. Then, we specify the `extra_includes` rule, passing the relative path to the
snippet file we defined earlier.

The previous configuration should be interpreted as:

> _**Also** include the snippets defined in the `match/_email.yml` file when using Chrome_.

Then, we can do the same for Firefox:

```yaml title="$CONFIG/config/firefox.yml"
filter_exec: "firefox"

extra_includes:
  - "../match/_email.yml"
```

At this point, we'll have the `:contact` snippet ready to be used on Chrome and Firefox!

:::caution Be careful with those filters

In the previous examples, we used some filters to detect Chrome and Firefox.
These have only been tested on Windows, and might not be working on other platforms.
Make sure to read the [Finding the right filters](../app-specific-configurations/#finding-the-right-filters)
section to find suitable ones.

:::

### Excluding a package

Another common use-case is to disable a package when using a specific application.
For example, let's say we want to disable the `all-emojis` package when using Telegram.

You can create an app-specific configuration `config/telegram.yml` as follows:

```yaml title="$CONFIG/config/telegram.yml"
filter_exec: Telegram

extra_excludes:
  - "../match/packages/all-emojis/*"
```

In this example, we defined the `extra_excludes` rule, specifying a glob pattern for the `all-emojis` package.
With this rule, Espanso will **exclude all files defined inside the `all-emojis` package when using Telegram.**

Keep in mind that you are not limited to packages, you can use the `excludes` rules with all match files:

```yaml title="$CONFIG/config/telegram.yml"
filter_exec: Telegram

extra_excludes:
  - "../match/code_snippets.yml"
```

### Difference between `includes` and `extra_includes`

In the previous examples, we used the so-called _extra_ rules, which are used to **extend** the
built-in include and exclude definitions. For example, specifying the following `extra_includes` rule:

```yaml
extra_includes:
  - "../match/_custom.yml"
```

will cause this configuration to _extend_ the default include rules, resulting in the following includes:

```
../match/**/[!_]*.yml
../match/_custom.yml
```

In other words, by specifying `extra_includes` you extend the default includes (`../match/**/[!_]*.yml`).

For many use-cases, this behavior is desirable, but there are times when you might want to redefine
includes without extending them. To do that, you'll need to use the `includes` rule instead of `extra_includes`.

For example, the following app-specific configuration will only load the `match/jokes.yml` snippets
when using Telegram, **ignoring the default definitions**.

```yaml title="$CONFIG/config/telegram.yml"
filter_exec: Telegram

includes:
  - "../match/jokes.yml"
```

The same considerations apply to the `excludes` and `extra_excludes` rules as well.
