---
sidebar_position: 2
title: Matches
---

Matches are the espanso's core component and define the substitutions that will take place.

### Static Matches

In their most basic form, **Matches are pairs that associate a *trigger* with a *replaced text***.

For example, we can define a match that will expand every occurrence of `hello` with `world` while we are typing. Using the [YAML](https://en.wikipedia.org/wiki/YAML) syntax, it can be expressed as:

```yml
- trigger: "hello"
  replace: "world"
```

#### Multi-line expansions

To replace the original text with a multi-line expansion, we can either use the `\n` line terminator character, such as:

```yml
- trigger: "hello"
  replace: "line1\nline2"
```
> Notice that when using `\n` as the line terminator character, quotes are needed.

Or values can span multiple lines using  `|` or `>`. Spanning multiple lines using a *Literal Block Scalar* `|` will include the newlines and any trailing spaces. Using a *Folded Block Scalar* `>` will fold newlines to spaces; it’s used to make what would otherwise be a very long line easier to read and edit. In either case the indentation will be ignored. Examples are:


```yml
- trigger: "include newlines"
  replace: |
            exactly as you see
            will appear these three
            lines of poetry
```
```yml
- trigger: "fold newlines"
  replace: >
            this is really a
            single line of text
            despite appearances
```
> Notice how no quotes are needed

There are a number of characters that are special (or reserved) and cannot be used as the first character of an unquoted scalar: ``' "  [] {} > | * & ! % # ` @ ``

These kind of expansions are simple text replacements and are *static*.

### Dynamic Matches

Static matches are suitable for many tasks, but can be problematic when we need an **expansion that changes dynamically**. For those situations, espanso introduces the concepts of **variables** and **extensions**.

**Variables** can be used in the **replace** clause of a Match to include the *output* of a dynamic component, the **extension**. To make things more clear, let's see an example:

We want to create a match that, everytime we type `:now`, it expands it to include the current time, like:

```
It's 11:29
```

Let's add the following match to a configuration file, such as the `default.yml` config.


```yaml
- trigger: ":now"
  replace: "It's {{mytime}}"
  vars:
    - name: mytime
      type: date
      params:
        format: "%H:%M"
```


And restart espanso with:

```
espanso restart
```

At this point, everytime we type `:now`, we should see something like: `It's 09:33`!

Let's analyze the match step by step:

```yml
- trigger: ":now"
```

In the first line we declare the trigger `:now`, that must be typed by the user to expand the match.


```yml
  replace: "It's {{mytime}}"
```


In the second line, we declare the *replace text* as usual, but this time we include the `mytime` **variable**,
that will contain the output of the **extension** used below.


```yml
  vars:
    - name: mytime
      type: date
```


In the next lines, we defined the `mytime` variable as type **date**. The type of a variable defines
the **extension** that will be executed to calculate its value. In this case, we use the [Date Extension](#date-extension).

```yml
      params:
        format: "%H:%M"
```

In the remaining lines we declared the **parameters** used by the extension, in this case the *date format*.

### Global Variables

Introduced in version 0.5.0, *global variables* allow the definition of variables that can be used in all matches. In your `default.yml` file,
you can add:

```yaml
global_vars:
  - name: "global1"
    type: "shell"
    params:
      cmd: "echo global var"
  - name: "greet"
    type: "dummy"
    params:
      echo: "Hey"
```

At this point, you can use `global1` and `greet` in all your matches:


```yaml
- trigger: ":hello"
  replace: "{{greet}} Jon"
```


And typing `:hello` will result in `Hey Jon`.

### Cursor Hints

Let's say you want to use espanso to expand some HTML code snippets, such as:

```yaml
  - trigger: ":div"
    replace: "<div></div>"
```

With this match, any time you type `:div` you get the `<div></div>` expansion, with the cursor at the end.

While being useful, this snippet would have been much more convenient if **the cursor was positioned
between the tags**, such as `<div>|</div>`.

Starting from version 0.3.2, espanso supports **cursor hints**, a way to control the position of the cursor
after the expansion. 

Using them is very simple, just insert `$|$` where you want the cursor to be positioned, in this case:

```yaml
  - trigger: ":div"
    replace: "<div>$|$</div>"
```

If you now type `:div`, you get the `<div></div>` expansion, with the cursor between the tags!

#### Things to keep in mind

* You can only define **one cursor hint** per match. Multiple hints will be ignored. If you need multiple hints, a decent replacement would be to use [Forms](/docs/forms/)
* This feature should be used with care in **multiline** expansions, as it may yield
  **unexpected results** when using it in code editors that support **auto indenting**. 
  This is due to the way the feature is implemented: espanso simulates a series of `left arrow`
  key-presses to position the cursor in the correct position. This works perfectly in single line
  replacements or in non-autoindenting fields, but can be problematic in code editors, as they
  automatically insert indentations that modify the number of required presses in a way
  espanso is not capable to detect.

### Word Triggers

If you ever thought about using espanso as an **autocorrection tool for typos**, you may have experienced
this problem:

Let's say you occasionally type `ther` instead of `there`. Before the introduction of *word triggers*, 
you could have used espanso like this:

```yaml
  - trigger: "ther"
    replace: "there"
```

This would correctly replace `ther` with `there`, but it also has the problem of expanding
`other` into `othere`, making it unusable.

With *word triggers* you can now add the `word: true` property to a match, telling espanso
to only trigger that match if surrounded by *word separators* ( such as *spaces*, *commas* and *newlines*). 
So in this case it becomes:

```yaml
  - trigger: "ther"
    replace: "there"
    word: true
```

At this point, espanso will only expand `ther` into `there` when used as a standalone word.
For instance:

Before | After |
--- | ---
Is ther anyone else? | Is there anyone else? | `ther` is converted to `there`
I have other interests | I have other interests | `other` is left unchanged

### Multiple triggers

Starting from version 0.5.1, espanso supports *multi-trigger* matches, which allows the user to specify multiple triggers to expand the same match.
To use the feature, simply specify a list of triggers in the `triggers` field (instead of `trigger`):

```yml
- triggers: ["hello", "hi"]
  replace: "world"
```

Now typing either `hello` or `hi` will be expanded to `world`.

### Case propagation

Starting from version 0.5.1, espanso supports *case-propagating* matches, which allows the user to expand a match so that the **trigger case style is preserved**.

For example, imagine you want to speedup writing the word `although`. You can define a word match as:

```yml
  - trigger: "alh"
    replace: "although"
    word: true
```

As of now, this trigger will only be able to be expanded to the **lowercase** `although`. If we now add `propagate_case: true` to the match:

```yml
  - trigger: "alh"
    replace: "although"
    propagate_case: true
    word: true
```

we are now able to propagate the case style to the match:
* If you write `alh`, the match will be expanded to `although`. 
* If you write `Alh`, the match will be expanded to `Although`.
* If you write `ALH`, the match will be expanded to `ALTHOUGH`.


### Image Matches

In version 0.4.0, espanso added the possibility to **expand matches into images**. 
This can be useful in many situations, such as when writing emails or chatting.

![Image match example](/img/docs/imagematches.gif)

The syntax is pretty similar to the standard one, except you have to specify `image_path`
instead of `replace`. This will be the path to your image.

```yaml
  - trigger: ":cat"
    image_path: "/path/to/image.png"
```

#### Format remarks

On Windows and macOS, most commonly used formats (such as PNG, JPEG and GIF) should work as expected.
On Linux, **you should generally use PNG** as it's the most compatible.

#### Path convention

While you can use any valid path in the `image_path` field, there are times in which it proves limited.
For example, if you are synchronizing your configuration across different machines, you could have problems
creating the same path on each of them.

In those cases, the best solution is to create a folder into the espanso configuration directory and put all
your images there.
At this point, you can use the `$CONFIG` variable in `image_path` to avoid hard-coding the path. For example:

Create the `images` folder inside the espanso configuration directory (the one which contains the `default.yml` file),
and store all your images there. Let's say I stored the `cat.png` image. We can now create a Match with:

```yaml
  - trigger: ":cat"
    image_path: "$CONFIG/images/cat.png"
```

### Nested Matches

Introduced in version 0.5.0, *nested matches* allow to include the output of a match inside another one.


```yaml
- trigger: ":one"
  replace: "nested"

- trigger: ":nested"
  replace: "This is a {{output}} match"
  vars:
    - name: output
      type: match
      params:
        trigger: ":one"
```


At this point, if you type `:nested` you'll see `This is a nested match appear`.

### Forms

Since version 0.7.0, espanso is capable of creating arbitrarily complex input forms.

![Espanso Form](/img/docs/macform.png)

These open up a world of possibilities, allowing the user to create matches with many arguments, as well as injecting those values into custom Scripts or Shell commands.

For more informations, visit the [Forms section](/docs/forms/).

### Script Extension

There will be tasks for which espanso was not designed for. For those cases, espanso offers the
**Script Extension**, that enables you to call an **external script**, written in **any language**,
 and use its output in a match.

To better understand this feature, let's dive into an example:

We want to expand a match into the output of a **Python** script. Let's create the `script.py` file,
place it anywhere you want and paste the following code:

```python
print("Hello from python")
```

Now take note of the **path** of the script, and add the following match to the espanso configuration:


```yaml
- trigger: ":pyscript"
  replace: "{{output}}"
  vars:
    - name: output
      type: script
      params:
        args:
          - python
          - /path/to/your/script.py
```


As always, restart espanso with `espanso restart`. 
If you now try to type `:pyscript` anywhere, you should see `Hello from python` appear.

You can do the same thing with any programming language, just change the `args` array accordingly.

#### Script Placement

The current best-practice when creating Script matches is to create a `scripts` directory in the `espanso` directory and store the scripts there.

That way, you can use the `%CONFIG%` wildcard to automatically replace the config directory with the correct path, such as:


```yaml
- trigger: ":pyscript"
  replace: "{{output}}"
  vars:
    - name: output
      type: script
      params:
        args:
          - python
          - "%CONFIG%/scripts/script.py"
```


This makes it easier to create matches that work across many machines.

#### A note on performance

Because of the execution time, you should limit yourself to fast-running scripts to avoid
any lag.

#### Useful Environment Variables

When triggering the shell command, espanso also injects a few useful Environment Variables that you can use:

* `CONFIG`: Points to the path of the espanso config directory
* All the values of the previously evaluated match variables. For more information, look at the [Advanced topics](#advanced-topics) section.

### Shell Extension

The **Shell Extension** is similar to the [Script Extension](#script-extension), but instead of executing
a script, it executes **shell commands**. This offers a lot of flexibility on Unix systems thanks to the
`bash` shell (and thanks to WSL support also on Windows).

Let's say you regularly send your IP address to your coworkers. You can setup a match to fetch your public
IP from [ipify](https://www.ipify.org/).

> Note: this example uses the `curl` command, usually preinstalled in most Unix systems.


```yml
- trigger: ":ip"
  replace: "{{output}}"
  vars:
    - name: output
      type: shell
      params:
        cmd: "curl 'https://api.ipify.org'"
```


As always, restart espanso with `espanso restart`. Now everytime you type `:ip`, it gets expanded to your public
IP address!

#### Choosing the Shell

The shell extension supports many different shells out of the box. By default it uses:

* `Powershell` on Windows
* `bash` on Linux
* `sh` on macOS

You can also specify different shells by using the `shell` param. For example, let's say we want to use bash on Windows through the `Windows Subsystem for Linux`. We would use:


```yml
- trigger: ":ip"
  replace: "{{output}}"
  vars:
    - name: output
      type: shell
      params:
        cmd: "curl 'https://api.ipify.org'"
        shell: wsl
```


Other possible values for the `shell` parameter are:

* On Windows: `cmd`, `powershell`, `wsl`
* On macOS: `sh`, `bash`
* On Linux: `sh`, `bash`

#### Bash pipes

This extension also supports bash **pipes** as your shell does, such as:


```yml
- trigger: ":localip"
  replace: "{{output}}"
  vars:
    - name: output
      type: shell
      params:
        cmd: "ip a | grep 'inet 192' | awk '{ print $2 }'"
```


#### Trimming the output

It's very common for commands to have outputs that also spawn a newline at the end. By default a trim option is enabled to remove any 
excess spaces/newlines. You can optionally disable the `trim` option:


```yml
- trigger: ":localip"
  replace: "{{output}}"
  vars:
    - name: output
      type: shell
      params:
        cmd: "ip a | grep 'inet 192' | awk '{ print $2 }'"
        trim: false
```


#### Useful Environment Variables

When triggering the shell command, espanso also injects a few useful Environment Variables that you can use:

* `CONFIG`: Points to the path of the espanso config directory
* All the values of the previously evaluated match variables. For more information, look at the [Advanced topics](#advanced-topics) section.

#### Using Linux commands on Windows

As you might have already understood from previous sections, espanso supports the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) through the `shell: wsl` parameter. This allows Windows users to execute Linux commands from their machine.

#### Debugging

Sometimes it's useful to understand what get's executed exactly, what are the return codes and error messages returned by the command. In order to do that, you can use the `debug: true` option:


```yml
- trigger: ":localip"
  replace: "{{output}}"
  vars:
    - name: output
      type: shell
      params:
        cmd: "ip a | grep 'inet 192' | awk '{ print $2 }'"
        debug: true
```


At this point, after triggering a match, the logs will be populated with useful information. Too see them, use the `espanso log` command.

### Date Extension

The **Date Extension** can be used to include *date* and *time* information in a match. 

The most important aspect to consider when using this extension is the `format` parameter,
that specifies how the date will be rendered. A **list of all the possible options** can be
found in the [official chrono documentation](https://docs.rs/chrono/0.3.1/chrono/format/strftime/index.html).


```yaml
- trigger: ":now"
  replace: "It's {{mytime}}"
  vars:
    - name: mytime
      type: date
      params:
        format: "%H:%M"
```


### Random Extension

Introduced in version 0.4.1, the **Random Extension** can be used to write non-deterministic replacement texts. Said in other words, you can now specify a set of possible expansions for a match, useful to avoid repetitions. 

You can use this feature by declaring a variable of type `random` and then passing a number of `choices` as a parameter:


```yaml
  - trigger: ":quote"
    replace: "{{output}}"
    vars:
      - name: output
        type: random
        params:
          choices:
            - "Every moment is a fresh beginning."
            - "Everything you can imagine is real."
            - "Whatever you do, do it well."
```


In this case, typing `:quote` will expand randomly to one of the three quotes.

### Clipboard Extension

Introduced in version 0.5.1, the **Clipboard Extension** now allows to include the current clipboard content in a match, which can be useful in many situations.

For example, let's imagine you want to create the ultimate HTML link shortcut:


```yaml
  - trigger: ":a"
    replace: "<a href='{{clipboard}}' />$|$</a>"
    vars:
      - name: "clipboard"
        type: "clipboard"
```


If you now copy a link in the clipboard (for example by selecting it and then CTRL+C) and then type `:a`, you'll
see the following replacement appear:

```
<a href='YOUR_COPIED_LINK'></a>
```

### Advanced Topics

Starting from version 0.7.0, most variables can now *use* the value of other (previously declared) variables in their body.

Not all variable types support variable injection, but notably Shell and Script extensions do through the use of ad-hoc environment variables. Take the following example:

Let's say we want to reverse the string produced by the Date Extension:


```yaml
- trigger: ":reversed"
  replace: "Reversed {{myshell}}"
  vars:
    - name: mytime
      type: date
      params:
        format: "%H:%M"
    - name: myshell
      type: shell
      params:
        cmd: "echo $ESPANSO_MYTIME | rev"
```

This match produces the result we expected. If the current time was `11:54`, it produces:


```
Reversed 45:11
```

Let's analyze it step by step:

1. Variable `mytime` is evaluated first (as it's the first declared in the `vars` list).
2. It's output is injected in the `myshell` shell command, in particular through the `$ESPANSO_MYTIME` env variable.
3. The result is piped through the unix `rev` command
4. Finally the output is included in the `replace` text and expanded.

As you might have already guessed, the previous variables are injected in the Shell variable (and the Script extension works in the same way) with the naming `ESPANSO_UPPERCASE-VAR-NAME`.

> Make sure to avoid spaces in the variable names, as they can become problematic in this situation

If you are using **global variables**, you have to be careful in this case, as they are implicitly evaluated before the local ones.

If you need to evaluate a global variable **after** a local one (which might be necessary if you want to inject another variable value inside it), you can do so as follows:


```yaml
# Considering the following global variable
global_vars:
  - name: "reversed"
    type: shell
    params:
      cmd: "echo $ESPANSO_VARNAME | rev"

matches:
  - trigger: ":rev"
    replace: "{{reversed}}"
    vars:
      - name: "varname"
        type: echo
        params:
          echo: "hello"
      - name: "reversed"
        type: "global"
```


The key element here is the `global` type, which tells espanso to evaluate variable `reversed` only at that point, and not before `varname`.
