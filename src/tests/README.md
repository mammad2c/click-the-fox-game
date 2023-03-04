# tests

The `render-component.ts` is an utility to mount the components with all required providers. If in the future a new provider added to the application, we should update it here. For example if we needed `react-query`, then we should come here and update it.

We used `msw` to mock API requests. It is inside the `mocks` folder.
