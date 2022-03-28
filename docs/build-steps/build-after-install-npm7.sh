## 0 install npm

npm i npm #v7 

NPM7=../node_modules/.bin/npm

## 1 clone

git clone -b master git@github.com:Jamespot/jamespot-user-api.git
git clone -b master git@github.com:Jamespot/jamespot-react-components.git
git clone -b master git@github.com:Jamespot/jamespot-react-core.git
git clone -b master git@github.com:Jamespot/jamespot-react-extensions.git

## 2 build

cd jamespot-user-api
$NPM7 ci
$NPM7 run build
cd ..

cd jamespot-react-components
$NPM7 ci
$NPM7 run build
cd ..

cd jamespot-react-core
$NPM7 ci
$NPM7 run build
cd ..

cd jamespot-react-extensions
$NPM7 ci
$NPM7 run build
cd ..

## 3 use

echo "🎸🎸🎸🎸"
ls ./jamespot-react-core/build
echo "🛼🛼🛼🛼"
ls ./jamespot-react-extensions/build
