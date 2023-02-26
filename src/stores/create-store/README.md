# CreateStore

Use this function to create a store. By helping of closures we create a simple store management system.

## Arguments

| Name         | Type   |        Description         | Required | Default |
| ------------ | ------ | :------------------------: | -------- | ------- |
| initialState | object | initial state of our state | Yes      | -       |

## Returns

| Name        | Type               |                                    Description                                    |
| ----------- | ------------------ | :-------------------------------------------------------------------------------: |
| getState    | function           |                        returns current state of our store                         |
| setState    | object \| function |                          sets current state of our store                          |
| useSelector | function           | get selected state of our store. this function should be used with our components |
| resetState  | function           |                 reset current state of our store to initialState                  |
