# Countdown

Use this component to create a countdown.

## Props

| Props    | Type     |                     Description                      | Required | Default | Example | Output   |
| -------- | -------- | :--------------------------------------------------: | -------- | ------- | ------- | -------- |
| duration | number   |            countdown duration in seconds.            | Yes      | -       | 500     | 00:08:20 |
| canStart | boolean  |         control can countdown start or not.          | No       | `false` | -       | -        |
| onFinish | function | when the countdown riches 0, this function is called | No       | -       | -       | -        |
