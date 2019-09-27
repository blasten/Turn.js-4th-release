#/bin/sh
# Requires Closure Compiler Application
# https://developers.google.com/closure/compiler/docs/gettingstarted_app

# --compilation_level ADVANCED_OPTIMIZATIONS 

SCRIPT="turn5"
BASE_SCRIPT="turn"
SCRIPTS_COMMENT="/* turn.js 5-beta0.0.1 | Copyright (c) */"

echo -e "${SCRIPTS_COMMENT}\n" > comment.js

java -jar "compiler.jar" --js ${SCRIPT}.js > ${SCRIPT}.closure.js

cat comment.js ${SCRIPT}.closure.js ${BASE_SCRIPT}.min.js > ${SCRIPT}.min.js 

rm ${SCRIPT}.closure.js

m=$(ls -la ${SCRIPT}.min.js | awk '{ print $5}')
gzip -nfc --best ${SCRIPT}.min.js > ${SCRIPT}.min.js.gz
g=$(ls -la ${SCRIPT}.min.js.gz | awk '{ print $5}')
echo " ${SCRIPT}.js: $m bytes minified, $g bytes gzipped"

rm ${SCRIPT}.min.js.gz

if [ "--test" == "$1" ]; then
	rm ${SCRIPT}.min.js
fi

rm comment.js