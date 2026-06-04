#!/bin/bash
# Run this ONCE from your machine (logged in as msimpson215, not cursor bot):
#   cd a1-fence && bash scripts/create-github-repo.sh
set -e
gh repo create msimpson215/a1-fence --public --source=. --remote=origin --push \
  --description "A1 Professional Fence LLC website"
echo "Done: https://github.com/msimpson215/a1-fence"
