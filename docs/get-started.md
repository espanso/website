---
sidebar_position: 2
title: Getting Started
---
In this section, we will cover the basics of espanso to quickly get you started.
Make sure to [install Espanso](/install) before diving into the next sections.

:::info For legacy users

If you are coming from a previous Espanso version (≤ 0.7.3), please read the [Migration](../migration/overview) section
first.

:::

If you followed the installation correctly, Espanso should be running on your computer.
For macOS and Windows users, you should now see the Espanso icon on the status bar:

![Espanso icon on Windows](/img/docs/tray_explain_image_windows.png)
![Espanso icon on macOS](/img/docs/icon_explain_image_macos.png)

Linux users can check if Espanso is running by opening a Terminal and running:

```
espanso status
```

At this point, you are ready to use Espanso! Open any typing application (like Notepad or TextEdit) and
type `:espanso`, you should see `Hi there!` appear. If you don't see it, please read the troubleshooting
section below.

:::info Troubleshooting

If you don't see the Espanso icon on macOS or Windows, or if `espanso status` returned `espanso is not running`
on Linux, it means Espanso is not currently running on your machine.

Firstly, try starting Espanso again:
* **For Windows users**: click Espanso from the Start Menu, or click `START_ESPANSO.bat` for
Portable mode users.
* **For macOS users**: click on the Espanso app again. If you see a security warning, please follow the steps
described in the [macOS installation](../install/mac/#problems-you-may-experience) section.
* **For Linux users**: open a terminal and run `espanso start`

If none of these steps worked, please reinstall Espanso and try again.

:::

## Understanding Matches

In its most basic form, Espanso detects when you type a **keyword** and **replaces** it while you are typing.
These keywords, known as _triggers_, are defined as simple strings. For example, `:date`, `e'`,
`signature` and `>>up` are all valid triggers.

![Espanso replaces a trigger with some other text](/img/docs/new_match_1.png)

The _rule_ that associates a trigger with the replaced text is called **Match** and is a core concept of Espanso.
Matches are very flexible and capable of solving complex tasks. You can learn all about matches in their [documentation](../matches)
page.

![Espanso's Match](/img/docs/new_match_2.png)

Espanso ships with very few built-in matches to give you the maximum flexibility, 
but you can expand its capabilities in two ways: **creating your own custom matches** or **installing packages**. 
Both of these options are introduced below.

:::tip

Although matches are similar to the concept of _snippets_ and _templates_ found in other applications,
they are not limited to text replacements.

Espanso's matches are more general, associating a _cause_ with an _effect_. In their basic form,
the cause is the user typing a keyword and the effect is Espanso inserting the replacement.
But a match could also be triggered with the search bar or a keyboard shortcut*, and the effect
could be inserting an image, executing a custom script and many others.

\* This is not currently supported, but it's on the roadmap.

:::

TODO

<!-- ### Starting espanso

If you followed the installation correctly, 
**espanso will be automatically started** when you power up your computer. There are times, 
however, when you may need to start espanso explicitly.

It's very easy to check if espanso is currently running: if you're using **MacOS** or **Windows**, 
you should see the **icon in the status bar**. If you don't see it, or if you're using **Linux**, 
another way to check it is to **open a terminal** and type:

```bash
espanso status
```

If you see "`espanso is not running`", then you'll need to start espanso manually with the following command:

```bash
espanso start
```

At this point you are ready to use espanso. Open any typing application and type `:espanso`, 
you should see `Hi there!` appear.

If you don't see it, make sure espanso is currently running. You could also try to repeat the installation procedure.

### Understanding Matches

espanso works by **detecting** your keypresses and **replacing** them when they match a specific keyword, called *trigger*.

![How espanso works](/img/docs/match1.png)

The rule that associate the *trigger* with the *replaced text* is called **Match** and is a core concept of espanso.
Matches are very flexible and powerful to solve many tasks. 
You can learn all about Matches in their [documentation](/docs/matches/) page.

![Match](/img/docs/match2.png)

espanso ships with very few built-in Matches to give you the maximum flexibility, but you can expand its capabilities
in two ways: creating your own **custom matches** or **installing packages**. 
Both of these possibilities are introduced below.

### Configuration

espanso uses a **file-based configuration** approach, following the Unix philosophy. All configuration files
reside in the `espanso` directory, whose location depends on the current OS:

* Linux: `$XDG_CONFIG_HOME/espanso` (e.g. `/home/user/.config/espanso`)
* macOS: `$HOME/Library/Preferences/espanso` (e.g. `/Users/user/Library/Preferences/espanso`)
* Windows: `{FOLDERID_RoamingAppData}\espanso` (e.g. `C:\Users\user\AppData\Roaming\espanso`)

A quick way to find the path of your configuration folder is by using the following command:

```bash
espanso path
```

> By default, configuration folder is hidden in most systems. To open it, copy path of your configuration folder and paste it in the address bar (aka path bar) of your file manager/explorer.

While this folder may contain many different files, let's focus on the most important one: `default.yml`.

The `default.yml` file contain the **main espanso configuration** and uses the widely
spread [YAML](https://en.wikipedia.org/wiki/YAML) syntax.
It can be used to change various settings as well as **creating custom matches**.
You can learn all about espanso's configuration by visiting the [documentation](/docs/configuration).

### Creating your own Match

That's enough theory for now, let's start with some action! Let's say you write a lot of emails, and you're
tired of writing the greetings at the end, so you decide to speed up the process.

We will configure espanso so that every time you type `:br`, it will be expanded to:

```bash
Best Regards,
Jon Snow
```

By now you should know that we need to **define a Match**.

With your favourite text editor, open the `espanso/default.yml` file, introduced previously in the 
[Configuration](#configuration) section. You should see something like:

```yml
# espanso configuration file

# This is the default configuration file, change it as you like it
# You can refer to the official documentation:
# https://espanso.org/docs/

# Matches are the substitution rules, when you type the "trigger" string
# it gets replaced by the "replace" string.
matches:
  # Simple text replacement
  - trigger: ":espanso"
    replace: "Hi there!"

...
```

We need to define a new Match, so in the `matches:` section, add the following code:

```yml
  - trigger: ":br"
    replace: "Best Regards,\nJon Snow"
```

**Make sure to include the indentation**, otherwise it won't be valid YAML syntax. You should get something like:

```yml
# espanso configuration file

# This is the default configuration file, change it as you like it
# You can refer to the official documentation:
# https://espanso.org/docs/

# Matches are the substitution rules, when you type the "trigger" string
# it gets replaced by the "replace" string.
matches:
  # Simple text replacement
  - trigger: ":espanso"
    replace: "Hi there!"

  - trigger: ":br"
    replace: "Best Regards,\nJon Snow"

...
```

We're almost there! After every configuration change, **espanso must be restarted**. Recent versions **automatically restart when a file change is detected**, but if you disabled that option, you'll need to do so manually by opening a terminal and typing:

```bash
espanso restart
```

Now try to type `:br` anywhere. If you did everything correctly, you should see `Best Regards` appear!

##### macOS remarks

If are using built-in macOS text replacement (System Preferences > Keyboard > Text - note that these will sync from iDevices if you have iCloud sync enabled), and have any triggers that overlap with espanso (the Replace column in System Preferences), you may find that you get double expansions. Starting your espanso trigger with `/` will prevent macOS text replacement from triggering as well (ex: `/br` instead of `:br`).

#### Quick Editing

If you are comfortable using the terminal to edit your configs, you can also use the much quicker:

```
espanso edit
```

command in the terminal, which spawns an instance of the system-default text editor and automatically restarts espanso on exit.

By default it uses Nano on Unix and Notepad on Windows, but you can customize it as you like. Take a look at [Quick Editing](/docs/configuration/#quick-editing) for more information.

### Understanding Packages

Custom matches are amazing, but sometimes it can be tedious to define Matches for every common operation,
and even more when you want to **share them with other people**.

espanso offers an easy way to **share and reuse matches** with other people, **packages**. In fact,
they are so important that espanso includes a **build-in package manager** and a **store**,
the [espanso hub](https://hub.espanso.org/).

If you are lucky enough, someone might have already written a **package** to include the matches you need!
Otherwise, you can create a package and publish it on the hub, for more information check out the
[Packages](/docs/packages/) documentation.

### Installing a Package

Let's say you want to **add some emojis** to espanso, such that when you type `:ok` it gets expanded to 👍.

A solution would be to install the [Basic Emojis](https://hub.espanso.org/packages/basic-emojis/) package from the
[espanso hub](https://hub.espanso.org/) store. Open a terminal and type:

```bash
espanso install basic-emojis
```

At this point, as we did with custom matches, we need to **restart espanso**. We can do so with the command:

```bash
espanso restart
```

If you now type `:ook` into any text field, you should see 👍👍👍👍 appear!

### Useful shortcuts

Let's conclude this introduction with the most important shortcuts espanso offers, the **toggle shortcut** and the **backspace undo**.

#### Toggle Key

There are times when you may want to **disable espanso to avoid an unwanted expansion**. This can be
easily accomplished by quickly **double pressing the `ALT` key** ( Option on MacOS ). You should then 
see a notification showing "Espanso disabled".

At this point, espanso will be disabled and will not expand any match. To **re-enable** it, double press the `ALT` key again.

**You can disable or change the toggle key**. Take a look at [Customizing the Toggle Key](/docs/configuration/#customizing-the-toggle-key)


#### Backspace Undo

> This feature was introduced in version 0.7.0, so make sure to have an up-to-date version.

It might happen to accidentally trigger an expansion, even though that was not intended. If you immediately press the `BACKSPACE` key after the expansion, the action is reverted and the trigger recovered.

You can also disable this behavior by adding the following line on your `default.yml` file:

```yaml
undo_backspace: false
```

> Note that backspace undo is not available for every match, namely the ones that specify a [Cursor Hint](/docs/matches/#cursor-hints) -->