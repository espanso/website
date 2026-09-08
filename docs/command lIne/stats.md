---
title: Statistics
sidebar_label: Statistics
sidebar_position: 2
---

Espanso v2.4.0 introduces statistics tracking of your most frequently used triggers. Check out `espanso stats -h` for details.

### Usage examples:
```bash
espanso stats                    # View all statistics
espanso stats --period today     # Today's stats
espanso stats --count 20         # Top 20 triggers
espanso stats --grep ':td%'      # Filter by pattern
espanso stats --json             # JSON output

espanso stats clear              # Clear database
espanso stats prune --days 180   # Remove old records
```

### Configuration:

Statistics are disabled by default. To enable, insert:
```yaml
stats:
  enabled: true
```
into your `config/default.yml` configuration file.