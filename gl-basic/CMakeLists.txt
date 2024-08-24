cmake_minimum_required(VERSION 3.10)
project(OpenGLTriangle)

# Set C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Find required packages
find_package(OpenGL REQUIRED)
find_package(GLEW REQUIRED)
find_package(glfw3 REQUIRED)

# Add executable
add_executable(my_triangle main.cpp)

# Link libraries
target_link_libraries(my_triangle PRIVATE OpenGL::GL GLEW::GLEW glfw)
