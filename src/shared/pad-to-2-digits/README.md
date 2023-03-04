# padTo2Digits

This function takes a number and guarantees it should have 0 at first character if number has one character. It is useful in formatting hours, minutes, seconds.

## Arguments

`num`: `number` or `string`

## Returns

A string of 2 characters.

## Examples

```
padTo2Digits(0) -> "00"
padTo2Digits("08") -> "08"
padTo2Digits(4) -> "04"
padTo2Digits(23) -> "23"
```
