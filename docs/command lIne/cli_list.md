---
title: Command-line reference
sidebar_label: Command-line reference
sidebar_position: 2
---

:::tip Note:

The
```
FLAGS:
    -h, --help       Prints help information
    -v               Sets the level of verbosity
    -V, --version    Prints version information
```
and
```
SUBCOMMAND:
    help          Prints this message or the help of the given subcommand(s)
```
work at any level and have largely been omitted below.

:::
# espanso
```
USAGE:
    espanso [FLAGS] [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -v               Sets the level of verbosity
    -V, --version    Prints version information

SUBCOMMANDS:
    cmd           Send a command to the espanso daemon.
    edit          Shortcut to open the default text editor to edit config files
    env-path      Add or remove the 'espanso' command from the PATH
    help          Prints this message or the help of the given subcommand(s)
    install       Install a package
    log           Print the daemon logs.
    match         List and execute matches from the CLI
    package       package-management commands
    path          Prints all the espanso directory paths to easily locate configuration and matches.
    restart       Restart the espanso service
    service       A collection of commands to manage the espanso service (for example, 
                  enabling auto-start on system boot).
    start         Start espanso as a service
    status        Check if the espanso daemon is running or not.
    stop          Stop espanso service
    uninstall     Remove a package
    workaround    A collection of workarounds to solve some common problems.
```
## cmd
Send a command to the espanso daemon.
```
USAGE:
    espanso cmd [SUBCOMMAND]

SUBCOMMANDS:
    disable    Disable expansions.
    enable     Enable expansions.
    search     Open the espanso search bar.
    toggle     Enable/Disable expansions.
```
## edit
Shortcut to open the default text editor to edit config files
```
USAGE:
    espanso edit [target_file]

ARGS:
    <target_file>   Defaults to "match/base.yml". 
        It contains the relative path of the file you want to edit, such as 'config/default.yml' or 'match/base.yml'. 
        For convenience, you can also specify the name directly and espanso will figure out the path. For example, specifying 'email' is equivalent to 'match/email.yml'.
```
## env-path
Add or remove the `espanso` command from the PATH
```
USAGE:
    espanso env-path [FLAGS] [SUBCOMMAND]

ADDITIONAL FLAGS:
    --prompt     macOS only: Prompt for permissions if the operation requires elevated privileges.

SUBCOMMANDS:
    register      Add 'espanso' command to PATH
    unregister    Remove 'espanso' command from PATH
```
## install
Install a package
```
USAGE:
    espanso install [FLAGS] [OPTIONS] [package_name]

FLAGS:
    -e, --external          Allow installing packages from non-verified repositories.
        --force             Overwrite the package if already installed
        --refresh-index     Request a fresh copy of the Espanso Hub package index instead of using the cached version.
        --use-native-git    If specified, espanso will use the 'git' command instead of trying direct methods.

OPTIONS:
        --git <git>                  Git repository from which espanso should install the package.
        --git-branch <git-branch>    Force espanso to search for the package on a specific git branch
        --version <version>          Force a particular version to be installed instead of the latest available.

ARGS:
    <package_name>    Package name
```
## match
List and execute matches from the CLI
```
USAGE:
    espanso match [SUBCOMMAND]

SUBCOMMANDS:
    exec    Triggers the expansion of a match
    list    Print matches to standard output
```
### exec
Triggers the expansion of a match
```
USAGE:
    espanso match exec [OPTIONS]

OPTIONS:
        --arg <arg>...         Specify also an argument for the expansion, following the --arg 'name=value' format. 
                               You can specify multiple args.
    -t, --trigger <trigger>    The trigger of the match to be expanded
```
### list
Print matches to standard output
```
USAGE:
    espanso match list [FLAGS] [OPTIONS]

FLAGS:
    -j, --json                 Output matches to the JSON format
    -t, --only-triggers        Print only triggers without replacement
    -n, --preserve-newlines    Preserve newlines when printing replacements. Does nothing when using JSON format.

OPTIONS:
        --class <class>
        --exec <exec>
        --title <title>   
        Only return matches that would be active with the given class, exec or title. 
        This is relevant if you want to list matches only active inside an app-specific config.
```
## package
Package-management commands
```
USAGE:
    espanso package [SUBCOMMAND]

SUBCOMMANDS:
    install      Install a package
    list         List all installed packages
    uninstall    Remove a package
    update       Update a package. 
                 If 'all' is passed as package name, attempts to update all packages.
```
### install
Install a package
```
USAGE:
    espanso package install [FLAGS] [OPTIONS] [package_name]

FLAGS:
    -e, --external          Allow installing packages from non-verified repositories.
        --force             Overwrite the package if already installed
        --refresh-index     Request a fresh copy of the Espanso Hub package index instead of using the cached version.
        --use-native-git    If specified, espanso will use the 'git' command instead of trying direct methods.

OPTIONS:
        --git <git>                  Git repository from which espanso should install the package.
        --git-branch <git-branch>    Force espanso to search for the package on a specific git branch
        --version <version>          Force a particular version to be installed instead of the latest available.

ARGS:
    <package_name>    Package name
```
### uninstall
Remove a package
```
USAGE:
    espanso package uninstall [package_name]

ARGS:
    <package_name>    Package name
```
### update
Update a package. If 'all' is passed as package name, attempts to update all packages.
```
USAGE:
    espanso package update [package_name]

ARGS:
    <package_name>    Package name or 'all'
```
## path
Prints all the espanso directory paths to easily locate configuration and matches.
```
USAGE:
    espanso path [SUBCOMMAND]

SUBCOMMANDS:
    base        Print the default match file path.
    config      Print the current config folder path.
    default     Print the default configuration file path.
    packages    Print the current packages folder path.
    runtime     Print the current runtime folder path.
```
## restart
Restart the espanso service
```
USAGE:
    espanso restart [FLAGS]

ADDITIONAL FLAGS:
        --unmanaged    Run espanso as an unmanaged service (avoid system manager)
```
## service
A collection of commands to manage the Linux espanso service (for example, enabling auto-start on system boot).
```
USAGE:
    espanso service [SUBCOMMAND]

SUBCOMMANDS:
    check         Check if espanso is registered as a system service
    register      Register espanso as a system service
    restart       Restart the espanso service
    start         Start espanso as a service
    status        Check if the espanso daemon is running or not.
    stop          Stop espanso service
    unregister    Unregister espanso from system services
```
### restart
Restart the espanso service
```
USAGE:
    espanso service restart [FLAGS]

ADDITIONAL FLAGS:
        --unmanaged    Run espanso as an unmanaged service (avoid system manager)
```
### start
Start espanso as a service
```
USAGE:
    espanso service start [FLAGS]

ADDITIONAL FLAGS:
        --unmanaged    Run espanso as an unmanaged service (avoid system manager)
```
## start
Start espanso as a service
```
USAGE:
    espanso start [FLAGS]

ADDITIONAL FLAGS:
        --unmanaged    Run espanso as an unmanaged service (avoid system manager)
```
## uninstall
Remove a package
```
USAGE:
    espanso uninstall [package_name]

ARGS:
    <package_name>    Package name
```
## workaround
A collection of workarounds to solve some common problems.
```
USAGE:
    espanso workaround [SUBCOMMAND]

SUBCOMMANDS:
    secure-input    Attempt to disable secure input by automating the common steps.
```
