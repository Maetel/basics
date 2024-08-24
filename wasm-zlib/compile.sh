rm cpp/build/main.js
rm front/public/main.js
rm front/public/main.wasm

emcc cpp/main.cpp -o cpp/build/main.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_add"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'

cp cpp/build/main.js front/public/main.js
cp cpp/build/main.wasm front/public/main.wasm
