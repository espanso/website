---
sidebar_position: 5
title: Variables
---

:::tip

The features discussed in this section have been introduced in version 2.1.0-alpha,
so make sure you are running an up-to-date version.

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

For example, you can use the output of an extension as a parameter for another:

```yaml
  - trigger: ":now"
    replace: "It's {{mytime}}"
    vars:
      - name: shellcmd
        type: shell 
        params:
          cmd: echo "%H:%M" 
      - name: mytime
        type: date
        params:
          format: "{{shellcmd}}"
```

In this case, we first execute the shell command `echo "%H:%M"`, saving its output
`%H:%M` inside the variable `shellcmd`.
We then use this variable as the format parameter for the date extension.

Another common use-case would be to populate a form control with the value
of another extension.
For example, the following match is used to create a basic file picker that
would get expanded to the path of the selected file:

![Espanso Form](/img/docs/formshellexample.png)

```yaml
  - trigger: ":file"
    replace: "{{form1.file}}"
    vars:
      - name: files
        type: shell
        params:
          cmd: "find ~/Documents -maxdepth 1"
      - name: form1
        type: form
        params:
          layout: |
            Select file:
            [[file]]
          fields:
            file:
              type: list
              values: "{{files}}"
```

In this case, we first get the list of files inside the Documents folder by using
the Unix `find` command, saving its output inside the `files` variable.
Then, we use the `files` variable to populate the Form's list's `values` using 
variable injection.

:::caution For Windows users

The previous example might not be working on Windows, because the `find` command
is not supported by default. The same concepts can be applied by changing the shell
command.

:::

:::caution Variable injection only works inside parameters

Espanso only injects variables inside the `params` field, so you can't use
variables in the `name` or `type` fields. For example, you **can't** do the following:

```yaml
    vars:
      - name: {{var}}
        type: {{type}} 
        params:
          format: "%H:%M"
```
:::

### Disabling variable injection

Espanso interprets everything that's surrounded by curly brackets
as a variable injection, but this is not always desirable.
For this reason, Espanso offers two ways to disable this behavior:

#### Disabling variable injection by escaping brackets

You can use backslashes to escape the curly brackets. 
For example, the following match outputs `hello {{var}}` when expanded:

```yaml
  - trigger: ":hello"
    replace: "hello \\{\\{var\\}\\}"
    vars:
      - name: var
        type: echo
        params:
          echo: world
```

:::caution How many backspaces to use?

In the previous example, we escaped `{{var}}` with 4 backslashes `\\{\\{var\\}\\}`,
but that's only because the replace value was surrounded by double quotes `"`.
In those cases, you need to **escape the backslashes** as well.

That's not the case with [multiline YAML strings](https://yaml-multiline.info/),
where escaping the backslashes is not needed. For example, the following 
match is valid:

```yaml
  - trigger: ":hello"
    replace: |
      hello \{\{var\}\}
    vars:
      - name: var
        type: echo
        params:
          echo: world
```

:::

#### Disabling variable injection with the inject_vars option

When using variable injection inside a variable's params, you can also
specify the `inject_vars: false` option to disable the injection.

For example, the following match will expand to `hello {{var}}` when triggered:

```yaml
  - trigger: ":hello"
    replace: "hello {{output}}"
    vars:
      - name: var
        type: echo
        params:
          echo: world
      - name: output
        type: echo
        inject_vars: false
        params: 
          echo: "{{var}}"
```

### Injecting global variables

So far, we've only used variable injection with local variables,
but you can use global ones as well.

Let's start with a simple example:

```yaml
global_vars:
  - name: myname
    type: echo
    params:
      echo: Jon

matches:
  - trigger: ":hello"
    replace: "hello {{myname}}"
```

In this case, typing `:hello` would get expanded to `hello Jon`.
That happens because we first define a global variable `myname`
and then inject it inside the replacement text.

You can also inject global variables inside local variables' parameters:

```yaml
global_vars:
  - name: firstname
    type: echo
    params:
      echo: Jon
  - name: lastname
    type: echo
    params:
      echo: Snow

matches:
  - trigger: ":hello"
    replace: "hello {{fullname}}"
    vars:
      - name: fullname
        type: echo
        params:
          echo: "{{firstname}} {{lastname}}"
```

In this case, typing `:hello` would get expanded to `hello Jon Snow`.
That's possible because we first define two global variables,
`firstname` and `lastname`, and then inject them inside the local variable
`fullname` to put them together.

In fact, you can also inject global variables inside other global variables.
For example, we could slightly refactor the previous example to only use
global variables. The end result is absolutely the same:

```yaml
global_vars:
  - name: firstname
    type: echo
    params:
      echo: Jon
  - name: lastname
    type: echo
    params:
      echo: Snow
  - name: fullname
    type: echo
    params:
      echo: "{{firstname}} {{lastname}}"

matches:
  - trigger: ":hello"
    replace: "hello {{fullname}}"
```

### Changing the evaluation order for global variables

While local variables are executed serially, with the first one
being evaluated before the last one, global variables are less constrained.

Let's discuss this behavior with an example:

```yaml
global_vars:
  - name: three
    type: shell
    params:
      cmd: "echo three"

matches:
  - trigger: ":hello"
    replace: "hello {{one}} {{two}} {{three}}"
    vars:
      - name: one
        type: shell
        params:
          cmd: "echo one"
      - name: two
        type: shell
        params:
          cmd: "echo two"
```

In this case, we have two local variables, `one` and `two`, and a global variable `three`.
We want to answer the question: *in which order are those variables evaluated?*

Perhaps surprisingly, the answer is:
1. `three`
2. `one`
3. `two`

One might expect the global variable `three` to be evaluated after `one` and `two` 
because it's the last one being defined, but that's not how Espanso works.

When evaluating variables, Espanso uses a dependency resolution algorithm based on
constraints. The default constraints are:

* Local variables must be executed sequentially, so `two` **must** be evaluated after `one`.
* If variable A depends on variable B (because variable B has been injected inside A's `params`),
then B **must** be evaluated before A.

Following on our previous example, we don't have any constrait between the global variable `three` and
the two local variables `one` and `two`, so `three` is evaluated in whatever order Espanso prefers.

If you want to _force_ a global variable to be evaluated in a certain order, you'll need to re-define
it as a local variable with `global` type, such as:

```yaml
global_vars:
  - name: three
    type: shell
    params:
      cmd: "echo three"

matches:
  - trigger: ":hello"
    replace: "hello {{one}} {{two}} {{three}}"
    vars:
      - name: one
        type: shell
        params:
          cmd: "echo one"
      - name: two
        type: shell
        params:
          cmd: "echo two"
      - name: three
        type: global
```

In this case, the global variable `three` will be evaluated after `one` and `two` because we've
explicitly specified the evaluation order for it.

#### Understanding the depends_on option

For advanced use-cases, you can also use the `depends_on` option to force a given execution order.
This feature is especially useful if we want to control the order in which global variables are
evaluated. 

In the following example, we are forcing the global variable `two` to being evaluated **after**
the global variable `one` by using the `depends_on` option, which accepts an array of variable
names which should be evaluated beforehands:

```yaml
global_vars:
  - name: one
    type: shell
    params:
      cmd: "echo one"
  - name: two
    type: shell
    depends_on: ["one"]
    params:
      cmd: "echo two"

matches:
  - trigger: ":hello"
    replace: "hello {{one}} {{two}}"
```

### Alternatives to variable injection for Shell and Scripts

TODO

* More robust injection for shell and script extensions
  * Difference between the two modes (one happens before calling the shell, the other )
  * Example of Python and Node scripts
  * You might need to specify depends_on here

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
