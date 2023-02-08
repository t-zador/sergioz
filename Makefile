dev:
	nodemon -w server server/main.js

thumbs:
	rm -rf docs/thumbs
	cp -r docs/pictures docs/thumbs
	mogrify -resize 300 docs/thumbs/*.JPG
