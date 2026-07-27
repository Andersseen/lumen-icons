# Security Policy

## Supported versions

`lumen-icons` follows semantic versioning. Security fixes land on the latest minor release.

| Version | Supported |
| ------- | --------- |
| 0.2.x   | ✅        |
| < 0.2   | ❌        |

## Reporting a vulnerability

**Please do not open a public issue for security reports.**

Report privately through [GitHub Security Advisories](https://github.com/Andersseen/lumen-icons/security/advisories/new), or email <andriipap01@gmail.com>.

Please include:

- what the issue is and how it can be triggered,
- the affected version,
- a reproduction if you have one.

You can expect an acknowledgement within a few days. Once a fix is ready, it is released and the advisory is published with credit to you, unless you prefer to stay anonymous.

## Scope

This is a client-side icon library: it ships standalone Angular components containing inline SVG and scoped CSS, with no network calls, no runtime dependencies beyond `@angular/core` and `@angular/common`, and `sideEffects: false`.

The most relevant concerns are therefore:

- malicious or unexpected markup reaching the published package through the icon generator or the build,
- supply-chain issues in the release pipeline,
- vulnerabilities in the demo site at [lumen-icons.andersseen.dev](https://lumen-icons.andersseen.dev).

Reports about dependencies of the demo app that cannot affect the published package are still welcome, but are treated as lower severity.
