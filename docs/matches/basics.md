---
sidebar_position: 0
title: Matches Basics
sidebar_label: Basics
---

Matches are one of the Espanso's core concepts and define the replacements that will take place.

## Static Matches

In their most basic form, **Matches are pairs that associate a *trigger* with a *replacement text***.

For example, we can define a match that will expand every occurrence of `hello` with `world` while we are typing. Using the [YAML](https://en.wikipedia.org/wiki/YAML) syntax, it can be expressed as:

```yml
  - trigger: hello
    replace: world
```

These kind of expansions are simple text replacements and can be considered *static*. [Quote-marks](../quotes) are not necessary for `trigger` or `replace` in simple cases, but some people prefer to use them for consistency.

### Multi-line expansions

To replace the original text with a multi-line expansion, we can either use the `\n` line terminator character, such as:

```yml
  - trigger: hello
    replace: "line1\nline2"
```
> Note that strings using `\n` as the line terminator character, or `\t` for tab-spacing, or beginning with a YAML special character (``' "  [] {} > | * & ! % # ` @ ``), *must* be quoted.

or values can span multiple lines using `|` or `>`. Spanning multiple lines using a *Literal Block Scalar* `|` will include the newlines and any trailing spaces. Using a *Folded Block Scalar* `>` will fold newlines to spaces; it’s used to make what would otherwise be a very long line easier to read and edit. In either case the indentation will be ignored. Examples are:


```yml
  - trigger: include newlines
    replace: |
      exactly as you see
      will appear these three
      lines of poetry
```
```yml
  - trigger: fold newlines
    replace: >
      this is really a
      single line of text
      despite appearances
```

> As you can see, no quotes are needed in these cases.

:::tip

If you want more information about the YAML syntax for multiline strings, please check out this website:
https://yaml-multiline.info/

:::

## Dynamic Matches

Static matches are suitable for many tasks, but can be problematic when we need an **expansion that changes dynamically**. For these situations, Espanso introduces the concepts of **variables** and **extensions**.

**Variables** can be used in the **replace** clause of a Match to include the *output* of a dynamic component, the **extension**. To make things more clear, let's see an example:

We want to create a match that every time we type `:now` gets expanded to include the current time, like:

```
It's 11:29
```

Let's add the following match to your configuration, such as the `match/base.yml` file


```yaml title=$CONFIG/match/base.yml
  - trigger: :now
    replace: It's {{mytime}}
    vars:
      - name: mytime
        type: date
        params:
          format: "%H:%M"
```

After a while, Espanso should pick up the new configuration.

At this point, every time we type `:now`, we should see something like `It's 09:33` appear!

Let's analyze the match step by step:

```yml
  - trigger: :now
```

In the first line we declare the trigger `:now`, that must be typed by the user to expand the match.


```yml
    replace: It's {{mytime}}
```


In the second line, we declare the *replace text* as usual, but this time we include the `mytime` **variable**,
that will contain the output of the **extension** used below.


```yml
    vars:
      - name: mytime
        type: date
```


In the following lines, we defined the `mytime` variable as type **date**. The type of a variable defines
the **extension** that will be executed to calculate its value. 
In this case, we use the [Date Extension](../extensions/#date-extension).

```yml
        params:
          format: "%H:%M"
```

In the remaining lines we declared the **parameters** used by the extension, in this case the *date format*.

> The ":" prefix to triggers is useful to avoid unwanted triggering of expansions during typing, because it is unlikely to occur as a word prefix. It's not required, or may be changed to other character(s) at any position in the `trigger` item.

## Injection mechanism

Espanso follows the `backend` value specified in `default.yml`, the default for which (`auto`) is to use the Inject mechanism for short replacements, and Clipboard for longer ones. 

If expansions aren't working (e.g. no replacements, missing characters, or just "v" appearing), adding the `force_mode: clipboard` or `force_mode: keys` properties to a trigger will override the backend in order to test the two mechanisms.

Once triggers are working, remove the `force_mode:` lines, in favour of a global [configuration](../../configuration/options/#options-reference) change to the `backend` value in `default.yml`, and/or in [app-specific configurations](../../configuration/app-specific-configurations) for individual programs, so that all triggers work in each environment.

## Global Variables

*Global variables* are variables that can be used across multiple matches. 
You can define them above your matches, and they will be available across all 
matches defined in that file and it's children.

For example, if you add the following into your `match/base.yml` file:

```yaml
global_vars:
  - name: greet
    type: echo
    params:
      echo: Hey
```

You can then use `greet` in the following match:


```yaml
  - trigger: :hello
    replace: "{{greet}} Jon"
```


Typing `:hello` will result in `Hey Jon` to be expanded.

## Word Triggers

If you ever considered using Espanso as an **autocorrection tool for typos**, you may have experienced
this problem:

Let's say you occasionally type `ther` instead of `there`. Before the introduction of *word triggers*, 
you could have used espanso like this:

```yaml
  - trigger: ther
    replace: there
```

This would correctly replace `ther` with `there`, but it would also expand
`other` into `othere`, making it unusable.

With *word triggers* you can now add the `word: true` property to a match, telling espanso
to only trigger that match if surrounded by *word separators* ( such as *spaces*, *commas* and *newlines*). 
So in this case it becomes:

```yaml
  - trigger: ther
    replace: there
    word: true
```

At this point, espanso will only expand `ther` into `there` when used as a standalone word.
For instance:

Before | After |
--- | ---
Is ther anyone else? | Is there anyone else? | `ther` is converted to `there`
I have other interests | I have other interests | `other` is left unchanged

The related properties, `left_word: true` and `right_word: true`, ensure a match will only occur at the beginning or end of words respectively, and not in the middle. The latter may also be useful to match words at the beginning of a text field which doesn't express a word separator.

The [configuration option](../../configuration/options/#options-reference) `word_separators` may be used to customise which characters qualify as word separators.

## Special characters

`replace` can inject hex and Unicode characters with strings such as `"\xC4"`, `"\u0105"` and `"\U00000105"`, and combine them with plain text. For example:
```yml
  - trigger: :euro
    replace: "\u20ac"
```
is equivalent to:
```yml
  - trigger: :euro
    replace: €
```

## Case propagation

Espanso also supports *case-propagation*, which makes it possible to expand a match
preserving the trigger casing.

For example, imagine you want to speedup writing the word `although`. You can define a word match as:

```yml
  - trigger: alh
    replace: although
    word: true
```

As of now, this trigger will only be able to be expanded to the **lowercase** `although`. If we now add `propagate_case: true` to the match:

```yml
  - trigger: alh
    replace: although
    propagate_case: true
    word: true
```

we are now able to propagate the case style to the match:
* If you write `alh`, the match will be expanded to `although`. 
* If you write `Alh`, the match will be expanded to `Although`.
* If you write `ALH`, the match will be expanded to `ALTHOUGH`.

:::tip Multi-word capitalization

When using multi-word replacements, the default behavior is to only capitalize the first word.
For example, the following match:

```yaml
  - trigger: ;ols
    replace: ordinary least squares
    propagate_case: true
```

gets expanded to `Ordinary least squares` when typing `;Ols`.

If you want to **capitalize each word**, you can use the `uppercase_style: capitalize_words` option:

```yaml
  - trigger: ;ols
    replace: ordinary least squares
    uppercase_style: capitalize_words
    propagate_case: true
```

In this case, typing `;Ols` gets expanded to `Ordinary Least Squares`.

:::


## Cursor Hints

Let's say you want to use espanso to expand some HTML code snippets, such as:

```yaml
  - trigger: :div
    replace: <div></div>
```

With this match, any time you type `:div` you get the `<div></div>` expansion, with the cursor at the end.

While being useful, this snippet would have been much more convenient if **the cursor was positioned
between the tags**, such as `<div>|</div>`.

To solve this problem, Espanso supports _cursor hints_, a way to control the position of the cursor
after the expansion. 

Using them is very simple, just insert `$|$` where you want the cursor to be positioned, in this case:

```yaml
  - trigger: :div
    replace: <div>$|$</div>
```

If you now type `:div`, you get the `<div></div>` expansion, with the cursor between the tags!

:::caution Things to keep in mind

* You can only define **one cursor hint** per match. Multiple hints will be ignored. If you need multiple hints, a decent replacement would be to use [Forms](#forms).
* This feature should be used with care in **multiline** expansions, as it may yield
  unexpected results when using it in code editors that support **auto indenting**. 
  This is due to the way the feature is implemented: espanso simulates a series of `left arrow`
  key-presses to position the cursor in the correct position. This works perfectly in single line
  replacements or in non-autoindenting fields, but can be problematic in code editors, as they
  automatically insert indentations that modify the number of required presses in a way
  espanso is not capable to detect.

:::

## Match Disambiguation

By defining the following match, Espanso will inject
"Every moment is a fresh beginning." as soon as you type `:quote`

```yaml
  - trigger: :quote
    replace: Every moment is a fresh beginning.
```

This mechanism works as long as you provide a unique trigger to each match, but
what happens if multiple matches share the same trigger?
In such cases, Espanso will use _match disambiguation_ to
let you choose the appropriate one.

For example, let's expand the previous example by adding two more matches
with `:quote` as trigger:

```yaml
  - trigger: :quote
    replace: Every moment is a fresh beginning.
  - trigger: :quote
    replace: Everything you can imagine is real.
  - trigger: :quote
    replace: Whatever you do, do it well.
```

As you can see, all three matches share the same trigger.
If you now type `:quote`, **Espanso will display a selection dialog
to let you choose the desired one**:

![Match disambiguation](/img/docs/match-disambiguation.png)

This feature is particularly useful when multiple choices are needed for the same trigger.
For example, you might define multiple snippets for your signatures and then use match disambiguation
to choose between them:

```yaml
  - trigger: :sig
    replace: |
      Best Regards,
      John
  - trigger: :sig
    replace: |
      All the best,
      John
```

## Search Labels

When using the Search Bar, matches are displayed with 
their replacement text as description by default.
While this works for basic use-cases, the resulting description might
become less intuitive as you start including variables.

For example, given these two matches:

```yaml
  - trigger: :tomorrow
    replace: "{{mytime}}"
    vars:
      - name: mytime
        type: date
        params:
          format: "%v"
          offset: 86400

  - trigger: :yesterday
    replace: "{{mytime}}"
    vars:
      - name: mytime
        type: date
        params:
          format: "%v"
          offset: -86400
```

the Search bar would display them with `{{mytime}}` as description, which might not be very intuitive:

![Matches being displayed in the Search Bar without label](/img/docs/matchwithoutlabel.png)

For this reason, Espanso supports the `label` match field to override the default description,
making the search UI more intuitive. For example, adding the labels to our previous example:

```yaml
  - trigger: :tomorrow
    replace: "{{mytime}}"
    label: Insert tomorrow's date, such as 5-Jan-2022
    vars:
      - name: mytime
        type: date
        params:
          format: "%v"
          offset: 86400

  - trigger: :yesterday
    replace: "{{mytime}}"
    label: Insert yesterday's date, such as 5-Jan-2022
    vars:
      - name: mytime
        type: date
        params:
          format: "%v"
          offset: -86400
```

would be displayed as follows in the Search bar:

![Matches being displayed in the Search Bar with labels](/img/docs/matchwithlabel.png)

Additional words associated with a trigger and available to find using the Search Bar, may be defined with a list following the `search_terms` property, e.g.:
```
  - trigger: :meat
    replace: 🥩
    search_terms:
      - steak
      - t-bone
```

## Multiple triggers

Sometimes it's useful to expand a snippet using various aliases.
Because of this, Espanso supports *multi-trigger* matches, which allows the user to specify multiple triggers to expand the same match.
To use the feature, simply specify a list of triggers in the `triggers` field (instead of `trigger`):

```yml
  - triggers: [hello, hi]
    replace: world
```

Now typing either `hello` or `hi` will be expanded to `world`.

## Rich Text

Rich text can now be specified as markdown and HTML replacements:

```yml
  - trigger: :rich
    markdown: This *text* is **very rich**!

  - trigger: :ric2
    html: |
      <p>
      But <span style="color: #ce181e;"><span style="font-size: x-large;">
      this</span></span> one is <span style="color: #81d41a;"><span
      style="font-family: Arial, sans-serif;">even richer</span></span>!
      </p>
```
The `paragraph: true` option may be added to markdown replacements to avoid injecting a new-line and new paragraph.

## Image Matches

Espanso also supports **expanding matches into images**. 
This can be useful in many situations, such as when writing emails or chatting.

![Image match example](/img/docs/imagematches.gif)

The syntax is pretty similar to the standard one, except you have to specify `image_path`
instead of `replace`. This will be the path to your image.

```yaml
  - trigger: :cat
    image_path: "/path/to/image.png"
```

:::caution Format remarks

On Windows and macOS, the most commonly used formats (such as PNG, JPEG and GIF) should work as expected.
On Linux, **you should generally use PNG** as it's the most compatible.

:::

### Path convention

While you can use any valid path in the `image_path` field, there are times in which it proves limited.
For example, if you are synchronizing your configuration across different machines, you could have problems
creating the same path on each of them.

In those cases, the best solution is to create a folder into the espanso configuration directory and put all
your images there.
At this point, you can use the `$CONFIG` variable in `image_path` to avoid hard-coding the path. For example:

Create the `images` folder inside the espanso configuration directory (the one which contains the `match` and `config`
directories),
and store all your images there. Let's say I stored the `cat.png` image. We can now create a Match with:

```yaml
  - trigger: :cat
    image_path: "$CONFIG/images/cat.png"
```

## Nested Matches

*Nested matches* makes it possible to include the output of a match inside another one.


```yaml
  - trigger: :one
    replace: nested

  - trigger: :nested
    replace: This is a {{output}} match
    vars:
      - name: output
        type: match
        params:
          trigger: :one
```


At this point, if you type `:nested` you'll see `This is a nested match` appear.

## Keyboard Triggers

Espanso can respond to CTRL-key triggers by using their hex-codes (but not ALT- or META-). For example:
```yml
  - trigger: "\x05" # <ctrl-e>
    replace: testing
    force_mode: keys
```
However, CTRL-character combinations are likely to conflict with editor menu shortcuts, and the `force_mode: keys` property may be needed to prevent over-backspacing. A list of the hex-codes may be found at https://ss64.com/ascii.html

## Forms

Espanso is capable of creating arbitrarily complex input forms.

![Espanso Form](/img/docs/macform.png)

These open up a world of possibilities, allowing the user to create matches with many arguments, as well as injecting those values into custom Scripts or Shell commands.

For more information, visit the [Forms section](../forms).
