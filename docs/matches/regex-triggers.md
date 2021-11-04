---
sidebar_position: 4
title: Regex triggers
---

Regex triggers are a powerful alternative to regular ones, with a few extra features:

* They let you define triggers using a full-blown _regex syntax_, enabling
use-cases that would be inconvenient or even impossible with regular triggers.
* They accept _named groups_, which can be used to convenientely pass arguments
to expansions or external scripts.

:::tip Before starting

This tutorial assumes you already know the basics of Regular expressions.
If you don't, these resources can be a good starting point:
* https://regexone.com/
* https://www.regular-expressions.info/

:::

## Basics

Before diving into the advanced topics, let's recap some of the basics.
Let's say we want to create a match that gets expanded to `Hello!` every time
we write `:greet2`.

With regular triggers, you could do the following:

```yaml
  - trigger: ":greet2"
    replace: "Hello!"
```

After a while, you decide to extend the previous match to
all single-digits, such as `:greet1`, `:greet2`, `:greet3`, etc.

With regular triggers, your only option would be to list all the possible ones:

```yaml
  - triggers:
      - ":greet1"
      - ":greet2"
      - ":greet3"
      - ":greet4"
      - ":greet5"
      - ":greet6"
      - ":greet7"
      - ":greet8"
      - ":greet9"
      - ":greet0"
    replace: "Hello!"
```

As you can see, this approach hardly scales with multiple variations.

On the other hand, Regex triggers let you define the previous match very concisely:

```yaml
  - regex: ":greet\\d"
    replace: "Hello!"
```

With this match, every time you write `:greet1` or `:greet7`, you'll get `Hello!`

:::caution Escaping regexes

As you can see from the previous example, we had to write `:greet\\d` instead of `:greet\d`.
That's because we need to escape backslashes for it to be valid YAML.

:::

Although this example showed an interesting use-case for regex triggers,
it was only the tip of the iceberg.
Regex triggers really start to shine when used to create _dynamic triggers_,
which are explained in the next section.

## Arguments

The most significant difference between regular triggers and regex ones is that the latter can be _dynamic_.
For example, the following trigger would only match with `:greet(John)`

```yaml
  - trigger: ":greet(John)"
    replace: "Hi John!"
```

whereas we could define a regex trigger to match all names:

```yaml
  - regex: ":greet\\(.*\\)"
    replace: "Hi John!"
```

The previous match works with any name. For example, both `:greet(Bob)` and `:greet(Mark)`
cause an expansion.
Unfortunately, the match will always output `Hi John!`, even when you specify other names.

To solve the problem, you'll need to use **named groups**, a really powerful regex feature
that integrates well with Espanso. Let's refactor the previous example to use named groups:

```yaml
  - regex: ":greet\\((?P<person>.*)\\)"
    replace: "Hi {{person}}!"
```

If you now type `:greet(Bob)`, you'll see `Hi Bob!` appear!

The key part is the `(?P<person>.*)` block in the middle, which "captures" the text
contained between the two outer parenthesis (the ones we escaped), inside the `person`
group.

The powerful thing is that **Espanso automatically converts named groups into variables**, 
so that you can use them in replacements and scripts.

:::caution Named group syntax

Although regular expressions are supported by most programming languages, their syntax can slightly vary 
 between implementations. Espanso uses the [regex](https://docs.rs/regex/1.5.4/regex/)
library, which requires you to specify named groups as follows:

```
(?P<name>exp)
```

TLDR: Make sure to specify that `P`, otherwise named groups won't work!

:::

Keep in mind that you don't have to enclose your arguments within parenthesis, as that
was only a matter of style. For example, you could also rewrite the previous example as:

```yaml
  - regex: "greet(?P<person>.*)\\."
    replace: "Hi {{person}}!"
```

Which would expand to `Hi Mark!` every time you write `greetMark.`. As you can see,
you can go crazy with it!

## Advanced examples

As explained in the previous section, Espanso automatically converts named groups into variables.
This makes it possible to use the value of a named group inside scripts and shell commands, among other things.

In the next example, we are going to use the `expr` command line utility to create a
match that calculates and expands the sum between two numbers dynamically.


```yaml
  - regex: "=sum\\((?P<num1>.*?),(?P<num2>.*?)\\)"
    replace: "{{result}}"
    vars:
      - name: result
        type: shell
        params:
          cmd: "expr $ESPANSO_NUM1 + $ESPANSO_NUM2"
```

If you now type `=sum(3,4)`, Espanso will expand it to `7`!

In a nutshell, the two numbers are captured inside the `num1` and `num2` named groups,
which in turn are converted to Espanso variables.
As with all variables, you can use them inside the `shell` extension by reading
the appropriate environment variables. In this case we are passing them
to the `expr` command.

If you want to know more about the variable injection logic, please read the [Advanced topics](../advanced-topics) section.

:::caution windows users

The `expr` command is not available by default on Windows, so the previous example might not
work on that platform. You can still apply the concepts to other commands/scripts.

:::

## When NOT to use Regex triggers

TODO
- Note on performance/ When NOT to use regex triggers

## Limitations

- 30 char limit / Rust regex syntax slightly different
