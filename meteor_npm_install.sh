#!/bin/bash
if [ -d /opt/ribenyan/Ribenyan/.demeteorized/bundle/programs/server ]; then
  pushd /opt/ribenyan/Ribenyan/.demeteorized/bundle/programs/server
  meteor npm install fibers@1.0.13
  meteor npm install meteor-promise@0.7.2
  #meteor npm install node-gyp@3.4.0
  #meteor npm install node-pre-gyp@0.6.29
  meteor npm install promise@7.1.1
  meteor npm install semver@4.1.0
  meteor npm install underscore@1.5.2
  meteor npm install source-map-support@https://github.com/meteor/node-source-map-support/tarball/1912478769d76e5df4c365e147f25896aee6375e
  meteor npm install --save bcrypt
  popd
else
  echo "please run demeteorizer"
fi
