#!/bin/zsh
cp index.html dist/index.html
echo "<script>" >> dist/index.html
cat dist/share.js >> dist/index.html
cat dist/index.js >> dist/index.html
echo "</script>" >> dist/index.html
echo "<style>" >> dist/index.html
cat dist/style.css >> dist/index.html
echo "</style>" >> dist/index.html