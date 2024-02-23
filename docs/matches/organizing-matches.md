---
sidebar_position: 2
title: Organizing matches
---

If you only use a handful of snippets, placing everything in the
`$CONFIG/match/base.yml` file will work perfectly. But as the number of matches
increases, you might find yourself struggling to keep the configuration
manageable.

To solve this problem, **Espanso makes it easy to split your matches across
multiple files.**

## Splitting your matches

Espanso automatically loads all YAML files placed in the `$CONFIG/match`
directory. These files, known as _match sets_, can contain any number of matches
and global variables. To better understand these concepts, let's see an example:

Let's say you would like Espanso to manage your vast collection of email
signatures. While you _could_ define them in the `$CONFIG/match/base.yml` file,
you prefer to keep them separate from your other snippets.

For this reason, you create another file `$CONFIG/match/emails.yml`, with the
following content:

```yml title=$CONFIG/match/emails.yml
matches:
    - trigger: ":sig"
      replace: "Best, John"

    - trigger: ":sig"
      replace: "All the best, John"
```

As soon as the configuration is reloaded, you can start using your `:sig`
snippets right away!

That's possible because **Espanso loads all match sets contained in the
`$CONFIG/match` folder by default \* **. In other words, all YAML files defined
in that directory (and its sub-folders) are loaded and the result is equivalent
to having all matches defined in the `$CONFIG/match/base.yml` file.

:::caution An important exception (\*)

The previous statement has one important exception: **all files starting with an
underscore \_ are NOT loaded automatically**. This rule is necessary to support
some advanced use-cases, such as
[App-specific configurations](../../configuration/app-specific-configurations).

:::

## Imports

For advanced users, Espanso also makes it possible to _import_ a match-set from
a different location. For example, you could define a
`$CONFIG/match/company.yml` file that imports some matches from external
locations:

```yaml title=$CONFIG/match/company.yml
# Import other matches from external locations
imports:
    - "/path/to/other/matchsets.yml"
    - "/path/to/shared/google/drive/matches.yml"

matches:
    - trigger: ":company"
      replace: "This is just a normal trigger I use at my company"
```

In other words, `imports` can be used to load matches from outside your config
directory.

### Using imports to group private match sets (Advanced)

Another less common use-case would be to use `imports` to group some private
match sets (aka match sets that start with an underscore, and thus are not
loaded automatically). This becomes particularly useful for
[App-specific configurations](../../configuration/app-specific-configurations),
where we might want to split matches over multiple files, while making it easy
to _include_ in some apps.

:::tip

This section assumes you already know what
[App-specific configurations](../../configuration/app-specific-configurations)
are. If you don't, you might want to read that section first.

:::

For example, you could define a `$CONFIG/match/_js_snippets.yml` file that
includes some code-snippets for JavaScript and a
`$CONFIG/match/_css_snippets.yml` file that contains some CSS snippets. Because
both files start with an underscore, they are not loaded automatically.

```yaml title=$CONFIG/match/_js_snippets.yml
matches:
    - trigger: ":log"
      replace: "console.log($|$);"
```

```yaml title=$CONFIG/match/_css_snippets.yml
matches:
    - trigger: ":pad"
      replace: "padding: 10px"
```

Then, you could define a `$CONFIG/match/_code_snippets.yml` file that imports
both of them:

```yaml title=$CONFIG/match/_code_snippets.yml
imports:
    - "./_js_snippets.yml"
    - "./_css_snippets.yml"
```

At this point, you can _include_ all your code snippets in an app-specific
configuration:

```yaml title=$CONFIG/config/vscode.yml
filter_title: "Visual Studio Code"

extra_includes:
    - "../match/_code_snippets.yml"
```

Because the `$CONFIG/match/_code_snippets.yml` file imports both JS and CSS
snippets, you will be able to use both of them in VSCode, even though you
haven't included the `$CONFIG/match/_js_snippets.yml` and
`$CONFIG/match/_css_snippets.yml` directly.
