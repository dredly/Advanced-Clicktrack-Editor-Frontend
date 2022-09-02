#!/bin/bash
gnome-terminal \
    --tab --title="Audio Backend" --command="bash -c 'cd ../Advanced-Clicktrack-Audio-Backend; ./rebuild.sh; $SHELL'" \
    --tab --title="User Backend" --command="bash -c 'cd ../Advanced-Clicktrack-User-Backend; npm run dev; $SHELL'" \
    --tab --title="Frontend" --command="bash -c 'npm start; $SHELL'" \
    --tab --title="Cypress" --command="bash -c 'cypress open; $SHELL'" \