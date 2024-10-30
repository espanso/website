---
title: Community Tools & Plugins
sidebar_position: 15
---

Looking to make your Espanso experience better? Here you'll find just some of the neat stuff our community have made to enhanso your Espanso.

If you'd like your project to be featured here, let us know in the [Discord](https://discord.gg/4QARseMS6k) server.

:::tip

As these projects aren't created, endorsed, or supported by the Espanso team, use them with care, and please report any bugs directly to the relevant project.

:::

## Editing

### EspansoEdit
A freeware Windows editor and utility for Espanso which can be installed or run fully portable from any location - ideal if you are looking for a quick and easy GUI to edit and manage match files. For more information and to download, visit EspansoEdit's [website](https://ee.qqv.com.au/).

Many new and improved [features](https://ee.qqv.com.au/usage/features/) now include:
- Dedicated YML file handling
- Syntax highlighting for keywords, comments and strings
- Code folding of trigger blocks
- Clickable sorted treeview of triggers in the active file
- Clickable list of matches in the current folder
- Menu for match creation
- Easy navigation between key Espanso folders, and a Favorites menu for files and folders
- Browsing and editing of installed Espanso packages
- Handy find function to search for text across match files
- Backup match files to ZIP file
- Dark and light themes, with a choice of 16 palettes

#### Linux + Wine
[EspansoEdit](https://ee.qqv.com.au/usage/agnostic/#wine-on-linux) is very usable in Linux, using Wine, but requires a little manual configuration:

- Download the ZIP file and extract `EspansoEdit.exe` somewhere convenient, like your Espanso base directory
- Open EspansoEdit, which will show an error, but create an `EspansoEdit.ini` file in the same directory. Close `EspansoEdit`.
- Start `winecfg` and open the "Drives" tab. A<u>d</u>d a drive (e.g. `E:`) and set its <u>P</u>ath to `/home/yourname/.config/espanso/`, replacing `yourname` with your Linux login-name. You'll need to type/paste the line as "<u>B</u>rowse" won't navigate to the `.config` folder
- Edit `EspansoEdit.ini`, adding/amending:
```
    ActiveFolder=E:\match
    PkgFolder=E:\match\packages
```
- Restart `EspansoEdit.exe`
- You can adjust the font size for the code and file-lists using the "Screen resolution" slider in `winecfg` "Graphics" tab, and the menu fonts in the "Desktop Integration" tab "Menu Text" It<u>e</u>m


## SnippetShare
The [SnippetShare](https://discord.com/channels/884163483409731584/1013914627886817372) Discord channel has tonnes of useful snippets to check out for inspiration.