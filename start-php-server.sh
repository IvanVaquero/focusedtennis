#!/bin/bash

# Start PHP development server for FocusedTennis API
# This script starts a PHP server on port 8000 to serve the API endpoints

echo "Starting PHP development server for FocusedTennis API..."
echo "Server will be available at: http://localhost:8000"
echo "API endpoints will be at: http://localhost:8000/php/api/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start PHP server from project root, serving the php directory
cd "$(dirname "$0")"
php -S localhost:8000 -t .

echo "PHP server stopped."
