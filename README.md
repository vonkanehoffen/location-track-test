# Location Tracking Test

Hasura / GraphQL / URQL / React + Vite / React Native + Expo

[Hasura Console](https://cloud.hasura.io/project/57b9a7ff-0d40-4904-aaaa-1ffe2aa03e85/console/api/api-explorer)

## Get Started

Console:

```
cd web-console
npm i && npm run dev
```

Expo app:

```
cd expo-app
npm i
npm start
```

GraphQL types generated in both. Admin secret in `.env` to auth Hasura introspection then:

```
npm run codegen:watch
```

Also see https://github.com/byCedric/office-marathon

## WIP

- Location tracking works for both platforms on dev builds
- FG service notification on Android displaying
- Works real world on Android
- URQL in task works + plots back on map.
- Attempted offline exchanges + cache for urql

- NEXT: Is URQL offline actually BS, and we'd be better with RQ or some manual object sync?
  https://tkdodo.eu/blog/offline-react-query
  Same deal as urql? Able to use in task? https://github.com/TanStack/query/discussions/4771

In fact:
Keep lat/lon in local storage as primary map display, then just have URQL as background process.

- No need for fancy optimistic updates.
- Other users pins can still be graph web sockets.
- Hasura still cool as backend
- offline still handled - urql will stack up calls.
  ....although maybe we should bin fails and batch? Not for this POC though. Fine to be a bit inefficient.
