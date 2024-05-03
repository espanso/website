---
sidebar_position: 6
title: Quotes
---

## To quote or not to quote

When Espanso was released, the default method of expressing `trigger:` and `replace:` etc. values, was to enclose them in double-quotes. Most people adopted this convention, and many prefer it for consistency. However, it isn't always necessary because the YAML used in Espanso treats most values as strings anyway - even for filepaths or commands containing spaces. You will have seen different methods used in the examples in this documentation.

Whichever convention you adopt (and it's fine to mix them within Espanso files) you will need to be aware of the limitations. It's well worth having familiarity with https://yaml-multiline.info/ which outlines the differences succinctly.

### Double quotes
```yml
  - trigger: ":test"
    replace: "something"
```            
If you use double-quotes, most things will work. However, you will need to escape backslashes (`\\`) in `regex:` triggers, which can make them more difficult to debug. You won't be using them in multiline code, including inline scripts and shell commands. You will also need to escape (`\"`) double-quotes inside strings.

### No quotes
```yml
  - trigger: :test
    replace: something
``` 

Again, most things will work, but you will need to remember the two situations when quotes **are** required. These are when using escape sequences (e.g. `\n`, `\t`, `\u` etc.), and when strings *begin* with YAML reserved indicators (``' "  [] {} > | * & ! % # ` @``). The latter includes the many situations when using an expression like `replace: "{{variable}}"`.

### Single quotes
```yml
  - trigger: ':test'
    replace: 'something'
```

This is possibly the most flexible, as it allows reserved characters and doesn't interfere with regex values. You will have to double-up (`''`) single quotes appearing inside values, and still need to use double-quotes (`"`) around strings containing escape sequences, however.

### Conclusion
As you can see, there is plenty of choice. To avoid difficulties with failing expansions and error messages, it is probably easiest to adopt *one* of the above, but, again, it is fine to mix them, so you *can* change your mind later.
