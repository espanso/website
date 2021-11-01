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

TODO


- Example with greet John
- (caution) Rust syntax with named groups 

## Advanced examples

- Example with sum (using them with scripts)

## When NOT to use Regex triggers

- Note on performance/ When NOT to use regex triggers

## Limitations

- 30 char limit / Rust regex syntax slightly different
