---
sidebar_position: 1
title: Extensions
---

Extensions are the heart of Espanso's dynamic matches and can be used to 
accomplish complex tasks.

## Date Extension

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

## Choice Extension

:::info New in version 2.1.2

The Choice extension was introduced in version 2.1.2. 

:::

The _Choice extension_ can be used to open a selection dialog, letting you choose 
the right value from a list.
For example, lets consider the following snippet:

```yaml
  - trigger: ":quote"
    replace: "{{output}}"
    vars:
      - name: output
        type: choice
        params:
          values:
            - "Every moment is a fresh beginning."
            - "Everything you can imagine is real."
            - "Whatever you do, do it well."
```


In this case, typing `:quote` will open the Search bar, letting you choose the right
value:

![Choice Extension](/img/docs/choice-extension.png)

:::info Difference with Match Disambiguation

If your goal is to choose between different replacements starting from a single trigger,
you should prefer the built-in [Match Disambiguation](../basics/#match-disambiguation) feature.

In a nutshell, Espanso automatically shows a selection dialog after typing a trigger
that's shared between multiple matches.
For example, the previous example is functionally equivalent to adding these 3 matches:

```yaml
  - trigger: ":quote"
    replace: "Every moment is a fresh beginning."
  - trigger: ":quote"
    replace: "Everything you can imagine is real."
  - trigger: ":quote"
    replace: "Whatever you do, do it well."
```

Because all three matches share the same trigger, Espanso will let you choose the right
one after typing `:quote`.

At this point, you might be wondering why the Choice extension was needed in the first place.
The answer is that for some advanced use-cases (including scripts and other transformations),
having an extension that lets you choose a value comes handy.

:::

### Advanced use with IDs

Using the Choice extension as shown in the previous section is enough for most use-cases,
but it has one significant limitation: the label shown in the list and the final value are the same.

For example, if you select "Every moment is a fresh beginning." from the search bar, the value
of `output` will be "Every moment is a fresh beginning."

For advanced use-cases, you might want to differentiate between the label (the text shown
in the selection dialog), with the actual value of the item:

```yaml
matches:
  - trigger: ":quote"
    replace: "{{output}}"
    vars:
      - name: output
        type: choice
        params:
          values:
            - label: "Every moment is a fresh beginning."
              id: "bar"
            - label: "Everything you can imagine is real."
              id: "foo"
            - label: "Whatever you do, do it well."
              id: "foobar"
```

In this case, typing `:quote` and selecting "Every moment is a fresh beginning" will insert `bar` instead.

## Random Extension

The _Random Extension_ can be used to write non-deterministic replacement texts. In other words, 
you can specify a set of possible expansions for a match and Espanso will choose a random
one, useful to avoid repetitions. 

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


In this case, typing `:quote` will expand randomly to one of the tree quotes.

## Clipboard Extension

The _Clipboard Extension_ enables to include the current clipboard content in a match.

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

## Echo Extension

The _Echo extension_ makes it easy to create variables containing a fixed value. For example:

```yaml
  - trigger: ":greet"
    replace: "Hello {{myname}}"
    vars:
      - name: myname 
        type: echo 
        params:
          echo: "John"
```

In this case, typing `:greet` gets expanded to `Hello John`.

This extension is particularly useful to define common global variables, such as:

```yaml
global_vars:
  - name: myname 
    type: echo 
    params:
      echo: "John"

matches:
  - trigger: ":greet"
    replace: "Hello {{myname}}"
  
  - trigger: ":sig"
    replace: "Best regards, {{myname}}"
```

## Script Extension

There will be tasks for which espanso was not designed for. For those cases, espanso offers the
**Script Extension**, that enables you to call an **external script**, written in **any language**,
 and use its output in a match.

To better understand this feature, let's dive into an example:

We want to use the output of a **Python** script as an expansion. Let's create the `script.py` file,
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

If you now try to type `:pyscript` anywhere, you should see `Hello from python` appear.

You can do the same thing with any programming language, just change the `args` array accordingly.

:::tip script location

The current best-practice when creating Script matches is to create a `scripts` directory in the `espanso` directory
(at the same level of the `match` and `config` directory) and store the scripts there.

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

:::

:::caution a note about performance

Because of the execution time, you should limit yourself to fast-running scripts to avoid
any lag.

:::

### Useful Environment Variables

When triggering the shell command, Espanso also injects a few useful Environment Variables that you can use:

* `CONFIG`: Points to the path of the espanso config directory
* All the values of the previously evaluated match variables. 
For more information, check out the [Variables](../variables) section.

## Shell Extension

The **Shell Extension** is similar to the [Script Extension](#script-extension), but instead of executing
a script, it executes **shell commands**. This offers a lot of flexibility on Unix systems thanks to the
`bash` shell (and thanks to PowerShell/WSL support also on Windows).

Let's say you regularly send your IP address to your coworkers. You can setup a match to fetch your public
IP from [ipify](https://www.ipify.org/).

> Note: this example uses the `curl` command, usually preinstalled on most Unix systems.


```yml
  - trigger: ":ip"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "curl 'https://api.ipify.org'"
```


Now everytime you type `:ip`, it gets expanded to your public
IP address!

### Choosing the Shell

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

### Bash pipes

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


### Trimming the output

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


### Useful Environment Variables

When triggering the shell command, espanso also injects a few useful Environment Variables that you can use:

* `CONFIG`: Points to the path of the espanso config directory
* All the values of the previously evaluated match variables. 
For more information, check out the [Variables](../variables) section.

### Using Linux commands on Windows

As you might have understood from previous sections, Espanso supports the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) through the `shell: wsl` parameter. 
This allows Windows users to execute Linux commands from their machine.

### Debugging

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

## Form Extension

Espanso's Form are implemented as extensions under the hoods, and therefore you can use
them as you would do with any other extension.

![Espanso Form](/img/docs/macform.png)

Besides regular expansions, you can also pass the values inserted inside the 
form to other extensions, such as scripts, opening up a world of possibilities.

For more information, please visit the [Forms section](../forms).