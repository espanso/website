---
sidebar_position: 5
title: Variables
---

:::tip

The features discussed in this section have been introduced in version 2.1.0-alpha,
so make sure to have an up-to-date version.

:::

Variables are one of the fundamental concepts of dynamic matches.
As we've seen in the [Extensions](../extensions) section, they can
be used to insert the output of an Extension inside a match,
but they can also be combined to produce complex workflows.

In the following sections, we'll discuss some of the advanced features of variables.

## Variable injection

Before introducing the concept of _variable injection_, let's take a step back and
review some basic use-cases we discussed in previous sections.

Take the following match:

```yaml
  - trigger: ":now"
    replace: "It's {{mytime}}"
    vars:
      - name: mytime
        type: date
        params:
          format: "%H:%M"
```

At this point, you should have a basic understanding of what this match is doing.
In particular:
* We define a variable `mytime` of type `date`. This variable will contain
the output of the Date extension when called with `%H:%M` as input format.
* We then take the variable `mytime` and insert it inside the replacement text
by using the `{{mytime}}` syntax.

If we type `:now`, Espanso will expand it to something like `It's 11:23`.

In this example, we defined the variable `mytime` and then inserted its value
inside the replacement text. This action is known as _variable injection_.

### Injecting variables inside variables

In the previous section, we shown how to use variable injection inside 
the replacement text, but **variable injection can also be used inside
other variables**.

TODO:example

* Variable injection
  * Disabling variable injection with `inject_vars: false`
  * Evaluating global variables
    * Imposing an explicit evaluation order
  * Depends on
* More robust injection for shell and script extensions
  * Difference between the two modes (one happens before calling the shell, the other )
  * Example of Python and Node scripts
  * You might need to specify depends_on here
* Advanced: how variables are evaluated
  * Dependency resolution algorithm

:::caution A note for Windows users

The previous example only works on Unix systems (Linux and macOS), because on Windows
you don't have the `rev` command by default. 
That said, these concepts are valid on Windows as well, with a couple of gotchas:




In the previous example, we called `echo $ESPANSO_FORM1_NAME`. That's because in bash-like
shells (which are common on Unix systems), you can read an environment variable by using the `$` operator.

If you try running `echo $ESPANSO_FORM1_NAME` on Windows, you will soon discover that it doesn't work.
That's because on Windows, Espanso uses **PowerShell** by default. With PowerShell, you have to use the `$env:NAME` operator
to read environment variables.
Moreover, Windows also supports the Command Prompt and WSL, and each of them 
uses a different syntax. 

To summarize, here's what you should use on Windows, depending on the shell:
* **On Powershell** use `$env:NAME` to read a variable, like `echo $env:ESPANSO_FORM1_NAME`
* **On Command prompt** use `%NAME%`, like `echo %ESPANSO_FORM1_NAME%`
* **On WSL** use `$NAME`, like `echo $ESPANSO_FORM1_NAME`

:::
