#/bin/sh
# Requires Closure Compiler Application
# https://developers.google.com/closure/compiler/docs/gettingstarted_app

# --compilation_level ADVANCED_OPTIMIZATIONS 

SCRIPTS=("turn" "zoom" "scissor")
SCRIPTS_LEN=${#SCRIPTS[@]}
SCRIPTS_COMMENT="/* turn.js 4.1.1 | Copyright (c) 2012 Emmanuel Garcia - 2019 Raffaele Morganti | turnjs.com | turnjs.com/license.txt */"

echo -e "${SCRIPTS_COMMENT}\n" > comment.js

for (( i=0; i<${SCRIPTS_LEN}; i++ ));
do

	java -jar "compiler.jar" --js ${SCRIPTS[$i]}.js > ${SCRIPTS[$i]}.closure.js

	cat comment.js ${SCRIPTS[$i]}.closure.js  > ${SCRIPTS[$i]}.min.js 

	rm ${SCRIPTS[$i]}.closure.js

	m=$(ls -la ${SCRIPTS[$i]}.min.js | awk '{ print $5}')
	gzip -nfc --best ${SCRIPTS[$i]}.min.js > ${SCRIPTS[$i]}.min.js.gz
	g=$(ls -la ${SCRIPTS[$i]}.min.js.gz | awk '{ print $5}')
	echo " ${SCRIPTS[$i]}.js: $m bytes minified, $g bytes gzipped"

	rm ${SCRIPTS[$i]}.min.js.gz

	if [ "--test" == "$1" ]; then
		rm ${SCRIPTS[$i]}.min.js
	fi

done

rm comment.js