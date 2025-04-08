# AngularMonorepo

## Run tasks

## Webapp

```sh
nx serve ionicapp-weather
```
Ionic:
```sh
nx build ionicapp-weather
```
```sh
nx run ionicapp-weather:sync:android
```
```sh
nx run ionicapp-weather:open:android
```
Example:
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


## Libraries
Example: Adding libs with:
```sh
nx g @nx/angular:library libs/<name>
```
