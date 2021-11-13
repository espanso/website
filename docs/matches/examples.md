---
sidebar_position: 6
title: Examples
---

In this section, we collected some examples of what is possible with Espanso,
so that you can both learn new techniques and take inspiration for your own
use-cases.

:::tip

If you have an example that would benefit others, feel free to suggest the addition on GitHub! :)

:::

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