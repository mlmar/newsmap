run: # Run development docker build
	cd scripts && ./install.sh
	cd scripts && ./dev.sh

install: # Install npm dependencies
	cd scripts && ./install.sh
	
clean: # Clean up docker containers
	cd scripts && ./clean.sh