#include <emscripten.h>

extern "C" {
    // A simple function to add two numbers
    EMSCRIPTEN_KEEPALIVE
    int add(int a, int b) {
        return a + b;
    }
}
