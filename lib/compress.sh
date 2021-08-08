#/bin/sh
# Requires Closure Compiler Application
# https://developers.google.com/closure/compiler/docs/gettingstarted_app

# --compilation_level ADVANCED_OPTIMIZATIONS 

V4_COMMENT="/* turn.js 4.1.2 | Copyright (c) 2012 Emmanuel Garcia - 2021 Raffaele Morganti | turnjs.com | turnjs.com/license.txt */"
V5_COMMENT="/* turn.js 5-beta0.1 | Copyright (c) */"
V4="turn"
V5="turn5"

echo -e "\n${V4_COMMENT}" > ${V4}.comment.js
echo -e "\n${V5_COMMENT}" > ${V5}.comment.js

java -jar "compiler.jar" --js ${V4}.js > ${V4}.closure.js
java -jar "compiler.jar" --js ${V5}.js > ${V5}.closure.js

cat ${V5}.comment.js ${V5}.closure.js ${V4}.comment.js ${V4}.closure.js > ${V5}.min.js 

rm ${V4}.comment.js
rm ${V5}.comment.js

rm ${V4}.closure.js
rm ${V5}.closure.js