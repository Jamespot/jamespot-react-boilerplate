# build script

Ces scripts build les différents projets dans le bonne ordre.

[./build-default.sh](./build-deafult-npm7)
[./build-after-install-npm7.sh](./build-after-install-npm7)
[./build-with-npm6-hack.sh](./build-with-npm6-hack)

En prod le script *build-after-install-npm7* est utilisé pour généré les app.bundle.js (core + extension)

En local si vous avez *npm7* vous pouvez utiliser le script *build-default*.

Si vous êtes sur *npm6*, le script *build-with-npm6-hack* permet de passer le but en supprimant le package-lock.json
