#!/bin/zsh
cp index.html ./dist/index.html
echo "<script>" >> ./dist/index.html
cat dist/shared.js >> ./dist/index.html
cat dist/index.js >> ./dist/index.html
echo "</script>" >> ./dist/index.html
echo "<style>" >> ./dist/index.html
cat dist/index.css >> ./dist/index.html
echo "</style>" >> ./dist/index.html