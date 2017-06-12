#!/bin/bash

rm -R  ../../../_sites/mars.wtf/www/dist/sculpture/ 
mkdir ../../../_sites/mars.wtf/www/dist/sculpture
cp -r dist ../../../_sites/mars.wtf/www/dist/sculpture
mv ../../../_sites/mars.wtf/www/dist/sculpture/dist ../../../_sites/mars.wtf/www/sculpture2
rm -R  ../../../_sites/mars.wtf/www/dist/sculpture/ 
mv ../../../_sites/mars.wtf/www/sculpture2 ../../../_sites/mars.wtf/www/dist/sculpture
rm -R  ../../../_sites/mars.wtf/www/sculpture/ 

cp -r dist/assets/json ../../../_sites/mars.wtf/www-assets/assets/