#!/bin/bash
gnome-terminal \
    --tab --title="Audio Backend" -- bash -c "cd ../Advanced-Clicktrack-Audio-Backend; ./rebuild.sh; $SHELL"
gnome-terminal \
    --tab --title="User Backend" -- bash -c "cd ../Advanced-Clicktrack-User-Backend; npm run dev; $SHELL"
gnome-terminal \
    --tab --title="Frontend" -- bash -c "npm start; $SHELL"
gnome-terminal \
    --tab --title="Cypress" -- bash -c "cypress open; $SHELL"