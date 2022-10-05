#!/bin/bash

# ----------------------------------------------------
# Provide your own environment variables
# PlATFORM_NAME in the form of https://<platform>.jamespot.pro
# MODULE_NAME in the form of EXT-<module name> as defined in the platform (Administration > Développeur > Modules)
# MODULE_KEY as defined in the platform (Administration > Développeur > Modules)
# ----------------------------------------------------

export PLATFORM_NAME=k2018-1.jamespot.pro
export MODULE_NAME=EXT-react
export MODULE_KEY=azertyuiop

rm -rf ../dist
mkdir -p ../dist/js/jamespot-react-extensions

cp preview_100x60.jpg ../dist
cp theme.info ../dist
cp -r ../build/* ../dist/js/jamespot-react-extensions

find ../dist/js -type f -exec sed -i -e 's#/react-extensions/#/themes/EXT-reactjs/js/jamespot-react-extensions/#g' {} \;

cd ../dist
zip -q -r theme.zip * -x "*/.svn/*" -x "*/.DS_Store"

# Bundle will be available at : 
# https://yourplatform.jamespot.pro/themes/EXT-reactjs/js/jamespot-react-extensions/app.bundle.js


curl -s --location -g --request POST "https://$PLATFORM_NAME/api/api.php" \
--header "X-Com-Jamespot-Module-Name: $MODULE_NAME" \
--header "X-Com-Jamespot-Module-Key: $MODULE_KEY" \
--form 'v="2.0"' \
--form 'o="global"' \
--form 'f="customTheme"' \
--form 'theme_zip=@"../dist/theme.zip"' | jq .


