# Installation

## Prerequisites

Any modern browser plus one simple static-file server.

## Python method

From the repository root:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## VS Code method

1. Open the repository folder in VS Code.
2. Install the Live Server extension if desired.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

## Why not double-click `index.html`?

Browsers commonly restrict `fetch()` access to neighboring local CSV/JSON files under the `file://` protocol. A tiny local server avoids that restriction.

## Dependencies

None. There is no package installation step.
