echo "Version type?"
read version_type
npm version $version_type
npm publish
git push