# Controllers

Controllers are route handlers. A controller will be implemented like this:

`Name`(it should be plural) + `Controller`. for example, `Example` controller it should be like this: `ExamplesController`.

The file name should follow the pattern: `name` + `controller.ts`. So for the `Example` it should be like this: `examples.controller.ts`.

## Class implementation

Class methods could contain these:

- `index`: To retrieve the list of records. It should be a `GET` method.
- `create`: To create a new record. It should be a `POST` method.
- `update`: To update a record. It should be a `PUT` or `PATH` method.
- `destroy`: To destroy a record. It should be a `DELETE` method.

All methods first argument is `req` and the second argument is `res`.

```
export class ExamplesController {
  index(req: Request, res: Response): any
  create(req: Request, res: Response): any
  update(req: Request, res: Response): any
  destroy(req: Request, res: Response): any
}
```

## How to use

Import your desired controller inside `src/server/router.ts` and assign a path to your required method.

For example:

```
  app.get("/examples", new ExampleController().index);

```
