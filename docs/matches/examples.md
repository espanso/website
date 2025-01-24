---
sidebar_position: 7
title: Examples
---

In this section, we collected some examples of what is possible with Espanso,
so that you can both learn new techniques and take inspiration for your own
use-cases.

:::tip

If you have an example that would benefit others, feel free to suggest the addition on GitHub! :)

:::

### EspansoEdit

A comprehensive collection of example snippets is included with  the [EspansoEdit](../../tools/#espansoedit) editor, and can also be seen online at its [website](https://ee.qqv.com.au/usage/cookbook).

### Populating a Form's choice control with the result of a shell command

The following example shows how you could use the output of a shell command
to populate a form's choice/list control. In this case, the match 
can be used to implement a rudimentary file-picker:

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

### Regex for categorizing your matches

Sometimes it's hard to remember all triggers, so it's extremely useful to use regex triggers.
As an example let's say you want to structure your matches as:

- Code snippets
  - Python
  - JavaScript
- Contacts
  - Name
  - Email

So in your base.yml file you can do:

```yaml
  - regex: "(code|cd) (all|py) (all|pr)" # Code Category - Python Subcategory - Print
    replace: "print(\"Hello World\")"

  - regex: "(code|cd) (all|py) (all|fn)" # Code Category - Python Subcategory - Function
    replace: "def myPythonFunction():"

  - regex: "(code|cd) (all|js) (all|fn)" # Code Category - Javascript Subcategory - Function
    replace: "function main(){}"

  - regex: "(contact|ct) (all|n) (all|jj)" # Contact Category - Name Subcategory - John Jacobs
    replace: "John Jacobs"
  
  - regex: "(contact|ct) (all|n) (all|js)" # Contact Category - Name Subcategory - John Stuart
    replace: "John Stuart"
  
  - regex: "(contact|ct) (all|e) (all|jj)" # Contact Category - Email Subcategory - John Jacobs
    replace: "john.jacobs@example.com"
```
This way you can type "code py all" when you know you want a python snippet, but don't remember which ones you have.

You can also use a label so it's even more organized on the search bar. I usually use the trigger at the end of the label, so I can remember next time. Like this:

```yaml
  - regex: "(code|cd) (all|py) (all|pr)" # Code Category - Python Subcategory - Print
    label: "Code - Python - Print - 'cd py pr'"
    replace: "print(\"Hello World\")"
```

Observations: 
- You can also just use the "search bar + label" instead of "regex + match disambiguation" to categorize. But I find easier to use regex so I can incrementally learn my triggers (also I don't need to press Alt + Space to open the search bar).
- I don't use spaces in regex so I avoid accidental triggers, and I also prefer abbreviations. So instead of "code py all" I use "cdpyaa".


### A list of all match options 
may be found in the [Espanso repo](https://github.com/espanso/espanso/blob/master/espanso-config/src/matches/group/loader/yaml/parse.rs#L59-L137).