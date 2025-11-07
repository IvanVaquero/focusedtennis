#!/bin/bash
# Deployment script for FocusedTennis to Hostinger
# This script helps prepare files for deployment

set -e

echo "🚀 FocusedTennis Deployment Helper"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Step 1: Building frontend...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend built successfully!${NC}"
else
    echo -e "${RED}❌ Frontend build failed!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📁 Step 2: Creating deployment package...${NC}"

# Create deployment directory
DEPLOY_DIR="focusedtennis-deploy-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy built frontend files
echo "  - Copying frontend files from dist/..."
cp -r dist/* "$DEPLOY_DIR/"

# Copy PHP backend
echo "  - Copying PHP backend..."
mkdir -p "$DEPLOY_DIR/php"
cp -r php/api "$DEPLOY_DIR/php/"
cp -r php/config "$DEPLOY_DIR/php/"
mkdir -p "$DEPLOY_DIR/php/storage"
touch "$DEPLOY_DIR/php/storage/waitlist-verified.jsonl"

# Copy .htaccess files
echo "  - Copying .htaccess files..."
if [ -f "public/.htaccess" ]; then
    cp public/.htaccess "$DEPLOY_DIR/.htaccess"
fi
if [ -f "php/storage/.htaccess" ]; then
    cp php/storage/.htaccess "$DEPLOY_DIR/php/storage/"
fi

echo -e "${GREEN}✅ Deployment package created: $DEPLOY_DIR/${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Upload all files from '$DEPLOY_DIR/' to your Hostinger public_html/ directory"
echo "2. Set permissions on php/storage/ to 755"
echo "3. Set permissions on php/storage/waitlist-verified.jsonl to 644"
echo "4. Test your website at https://fctennispro.com"
echo "5. Test the API at https://fctennispro.com/php/api/check-email.php"
echo ""
echo -e "${GREEN}✅ Deployment package is ready!${NC}"
echo ""
echo "You can now upload the files to Hostinger using:"
echo "  - Hostinger File Manager (recommended for beginners)"
echo "  - FTP/SFTP client like FileZilla"
echo "  - Git deployment (if set up)"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"

