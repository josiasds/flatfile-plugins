# @flatfile/plugin-xlsx-extractor

## 1.11.1

### Patch Changes

- 69e1a67: This release fixes several issues related to large Excel file extractions. Previously the SheetJS library would quietly fail when attempting to parse large files. This release turns SheetJS's logging and listens for the ERR_STRING_TOO_LONG which indicates the file is too large to parse. When this occurs, the plugin will now throw an error with a message indicating the file is too large.

  Additionally, a bug was fixed where the extraction job was not being immediately acknowledged. This resulted in a message indicating that `no listener has been configured to respond to it`. This has been fixed and the extraction job will now be acknowledged immediately.

  A new `dateNF` option has been added to the plugin. This option allows you to specify the date format that should be used when parsing dates from the Excel file.

  Finally, the default record insertion chunk size has been decreased from 10,000 to 5,000 to reflect the new default chunk size in the Flatfile Platform.

- Updated dependencies [69e1a67]
  - @flatfile/util-extractor@0.5.1

## 1.11.0

### Minor Changes

- 3b25c6a: @flatfile/plugin-delimiter-extractor can now guess the delimiter if one is not provided. Also the header detection logic has been upgraded.
  @flatfile/plugin-xlsx-extractor has updated header detection logic.

  ```

  ```

## 1.10.0

### Minor Changes

- 30981b2: Dependency updates

### Patch Changes

- Updated dependencies [30981b2]
  - @flatfile/util-extractor@0.5.0

## 1.9.2

### Patch Changes

- 7a0073d: Dependency cleanup
- Updated dependencies [7a0073d]
  - @flatfile/util-extractor@0.4.10

## 1.9.1

### Patch Changes

- c39cc51: Fix for xlsx extraction when file contains empty sheets
- Updated dependencies [c39cc51]
  - @flatfile/util-extractor@0.4.9

## 1.9.0

### Minor Changes

- c93b2d9: Improved header detection options.

### Patch Changes

- Updated dependencies [c93b2d9]
  - @flatfile/util-extractor@0.4.8

## 1.8.2

### Patch Changes

- 28820d5: Release to update @flatfile/api dep
- Updated dependencies [28820d5]
- Updated dependencies [edaedf5]
  - @flatfile/util-extractor@0.4.7

## 1.8.1

### Patch Changes

- 59cb901: Export parsers

## 1.8.0

### Minor Changes

- 2aaae2f: Expose `raw` option to display raw data. Default to formatted text.

## 1.7.7

### Patch Changes

- cb25574: Update @flatfile/api dependency
- Updated dependencies [cb25574]
  - @flatfile/util-extractor@0.4.6

## 1.7.6

### Patch Changes

- Updated dependencies [f5cfe69]
  - @flatfile/util-extractor@0.4.5

## 1.7.5

### Patch Changes

- f2b2f59: @flatfile/api dependency updated to latest version
- Updated dependencies [f2b2f59]
  - @flatfile/util-extractor@0.4.4

## 1.7.4

### Patch Changes

- e111565: Update XLSX dependency version

## 1.7.3

### Patch Changes

- Updated dependencies [0195166]
  - @flatfile/util-extractor@0.4.3

## 1.7.2

### Patch Changes

- Updated dependencies [134cf31]
  - @flatfile/util-extractor@0.4.2

## 1.7.1

### Patch Changes

- Updated dependencies [7019e58]
  - @flatfile/util-extractor@0.4.1

## 1.7.0

### Minor Changes

- b399623: Refactor extractors to handle extraction on job:ready, add debug option, fix asyncBatching

### Patch Changes

- Updated dependencies [b399623]
  - @flatfile/util-extractor@0.4.0

## 1.6.0

### Minor Changes

- 447691a: Add configurable batch options

### Patch Changes

- Updated dependencies [447691a]
  - @flatfile/util-extractor@0.3.0

## 1.5.3

### Patch Changes

- @flatfile/util-extractor@0.2.4

## 1.5.2

### Patch Changes

- f5efd60: Update @flatfile/listener dependency
- Updated dependencies [f5efd60]
  - @flatfile/util-extractor@0.2.3

## 1.5.1

### Patch Changes

- @flatfile/util-extractor@0.2.2

## 1.5.0

### Minor Changes

- c0b8d8d: Support duplicate headers with non-unique header keys

## 1.4.0

### Minor Changes

- 6189d31: Fix for ghost rows in Excel files

## 1.3.2

### Patch Changes

- 1cd2f31: Add header row auto-detection
- Updated dependencies [c859a10]
  - @flatfile/util-extractor@0.2.1

## 1.3.1

### Patch Changes

- 4651120: Add @deprecated comment

## 1.3.0

### Minor Changes

- 77b9237: Add backwards compatibility for renamed extractors

## 1.2.0

### Minor Changes

- 2b15b32: Refactor extractors to share a common extractor and use custom parsers. Add .tsv file extractor and a generic delimiter extractor. Add header row detection to the Excel extractor.

### Patch Changes

- Updated dependencies [2b15b32]
  - @flatfile/util-extractor@0.2.0

## 1.1.0

### Minor Changes

- e7e5134: DRYing abstract extractor code

### Patch Changes

- Updated dependencies [e7e5134]
  - @flatfile/plugin-extractor-utils@0.1.0

## 1.0.8

### Patch Changes

- 3656390: Open up the event typing

## 1.0.7

### Patch Changes

- 02b9420: fixes issue with extracting export files

## 1.0.6

### Patch Changes

- c4bf511: console log not error
- 809b95a: new extractor for psv file types and fix to xlsx-extractor

## 1.0.4

### Patch Changes

- 749ebdc: introduce records chunking to xlsx extractor

## 1.0.3

### Patch Changes

- 7fa7925: updating readmes

## 1.0.2

### Patch Changes

- 413251a: Progress Improvements and adds xlsxExtractorPlugin

## 1.0.1

### Patch Changes

- 41261d0: Build tooling refactor

## 1.0.0

### Major Changes

- 7bbc5b4: Initial release of xlsx plugin

## 0.1.0

### Minor Changes

- a377336: Move RecordHook functionality into this package and remove configure dependency.

### Patch Changes

- 41e7f5a: upped the listener version

## 0.0.7

### Patch Changes

- cf6d07e: Fixes a bug where we don't return the promise so we can't wait for the event to complete

## 0.0.6

### Patch Changes

- 01b3e64: Introducing the DXP Configuration Plugin

## 0.0.5

### Patch Changes

- 8ed9bb3: Add four new plugin skeletons; add category metadata to existing

## 0.0.4

### Patch Changes

- ae45695: Update readmes and package info

## 0.0.3

### Patch Changes

- aaf6cc6: README updates

## 0.0.2

### Patch Changes

- 4ca7bb1: New transform plugin and improved documentation

## 0.0.1

### Patch Changes

- fbfaab9: Basic record hook plugin.
