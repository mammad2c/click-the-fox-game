# CreateStore

Use this function to create a store. By helping of closures we create a simple store management system.

## Arguments

| Name         | Type   |        Description         | Required | Default |
| ------------ | ------ | :------------------------: | -------- | ------- |
| initialState | object | initial state of our state | Yes      | -       |

## Returns

| Name        | Type               |                                                         Description                                                         |
| ----------- | ------------------ | :-------------------------------------------------------------------------------------------------------------------------: |
| getState    | function           |                                             Returns current state of our store                                              |
| setState    | object \| function |                                               Sets current state of our store                                               |
| useSelector | function           |                      Get selected state of our store. This function should be used with our components                      |
| resetState  | function           |                                      Reset current state of our store to initialState                                       |
| subscribe   | function           | By this method you can add custom subscribe function to do side-effects. For example you can persist state to local storage |
