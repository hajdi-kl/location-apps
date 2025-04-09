# AngularMonorepo

## Run tasks

## Webapp

```sh
nx serve ionicapp-weather
```
Graph:
```sh
nx show project ionicapp-weather
```

## API
```sh
export WEATHER_API_KEY={key}
NX_SKIP_NX_CACHE=true
nx serve api-openweather
```
Example: Add controllers:
```sh
nx g @nx/nest:controller apps/api-openweather/src/app/weather
```
Disable NxConsole VSCode extension if you get "nx Daemon is not running"


## Libraries
Example: Adding libs with:
```sh
nx g @nx/angular:library libs/<name>
```

## NX
```sh
nx reset
```
```sh
nx daemon start
```

## Cap

```sh
cd apps/ionicapp-weather
npx cap add android
npx cap add ios
ifconfig
# copy IPv4 to API_URL in shared\config\index.ts
nx build ionicapp-weather
# npx cap sync
nx run ionicapp-weather:sync:android
nx run ionicapp-weather:open:android
```
