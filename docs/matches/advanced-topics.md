---
sidebar_position: 5
title: Advanced topics
---

TODO:

* Variable injection
* Disabling variable injection with `inject_vars: false`
* More robust injection for shell and script extensions

TODO:

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
