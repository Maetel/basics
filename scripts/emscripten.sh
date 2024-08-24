sudo apt-get install cmake
git clone https://github.com/emscripten-core/emsdk.git ~/emsdk
cd ~/emsdk
git pull
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
export PATH=$PATH:$(echo ~/emsdk)
export PATH=$PATH:$(echo ~/emsdk/upstream/emscripten)
