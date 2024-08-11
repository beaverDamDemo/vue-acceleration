# old lesson name is vue-lesson-03

# if it doesn't work, try running

```
nvm use v14
```

### Compiles and hot-reloads for development

```
likely you ll need to run npm install
npm run start:dev
```

### Also compiles and hot-reloads for development

```
vue serve
```

## to quickly deploy to vue-acceleration-dist

```
run npm run build
clone vue-acceleration-dist repository
copy files generated in /dist (or /docs) in vue-acceleration and paste-overwrite them in vue-acceleration-dist in /docs folder
```

## how add a new engine?

set max rpm e.g. 4000
in torque add points in this case
[100, 100, 100, 100, 100] which will set 0 rpm, 1000 rpm, 2000 rpm, 3000 rpm and 4000 rpm.
