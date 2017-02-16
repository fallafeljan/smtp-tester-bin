# smtp-tester-bin

This is a simple wrapper for running @deitch's
[`smtp-tester`](https://github.com/deitch/smtp-tester) via CLI.

## Usage

The SMTP server is bound to `localhost` by default. You may specify the port
(which defaults to 3025) via the `--port` argument, for example:

```sh
$ smtp-tester --port 3026
```
