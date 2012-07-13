#/bin/sh
# --compilation_level ADVANCED_OPTIMIZATIONS 

SCRIPTS=("turn" "turn.html4" "zoom" "scissor")
SCRIPTS_LEN=${#SCRIPTS[@]}
SCRIPTS_COMMENT="/* turn.js | Copyright (c) 2012 Emmanuel Garcia | turnjs.com | turnjs.com/license-4.txt */"

for (( i=0; i<${SCRIPTS_LEN}; i++ ));
do

	closure --js ${SCRIPTS[$i]}.js > ${SCRIPTS[$i]}.min.js
	echo -e "${SCRIPTS_COMMENT}\r\n$(cat ${SCRIPTS[$i]}.min.js)" > ${SCRIPTS[$i]}.min.js
	m=$(ls -la ${SCRIPTS[$i]}.min.js | awk '{ print $5}')
	gzip -nfc --best ${SCRIPTS[$i]}.min.js > ${SCRIPTS[$i]}.min.js.gz
	g=$(ls -la ${SCRIPTS[$i]}.min.js.gz | awk '{ print $5}')
	echo " ${SCRIPTS[$i]}.js: $m bytes minified, $g bytes gzipped"

	rm ${SCRIPTS[$i]}.min.js.gz

	if [ "--test" == "$1" ]; then
		rm ${SCRIPTS[$i]}.min.js
	fi

done