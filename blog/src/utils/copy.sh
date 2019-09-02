#!/bin/sh
cd /d/NodeJS_blog_mooc/Selfblog-NodeJS/blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log