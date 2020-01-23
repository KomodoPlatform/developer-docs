# Tutorial: Getting Started

## Introduction

This tutorial covers the installation and initiation of the Antara Gaming Software Development Kit (SDK).

#### Prerequisites


- [CMake](https://cmake.org/download/) 
  - Requires at least version 3.14 or greater 
- [clang-8 or higher](https://clang.llvm.org/get_started.html)
  - Windows Antara Gaming SDK supports both clang and clang-cl 
- (optional) [Emscripten](https://emscripten.org/docs/getting_started/downloads.html)
  - (Install the latest web version) 
- (optional) [Visual Studio 2019](https://docs.microsoft.com/en-us/visualstudio/install/install-visual-studio?view=vs-2019) 
- (optional) [Clang VS Toolset](https://docs.microsoft.com/en-us/cpp/build/clang-support-msbuild?view=vs-2019)
  - (installable through Visual Studio installer)

## Getting Started

The following instructions create an installation of the Antara Gaming SDK that is useful for development and testing purposes.

<!-- I see this comment here, but there's no "deployment" section 

See deployment for notes on how to deploy the project on a live system.

--> 

### Build

Execute the following commands in the terminal to build the project.

```bash
mkdir build ## bash or powershell
cd build ## bash or powershell

## Release or Debug are available
cmake -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_COMPILER=your_path_to_your_clang++ ../ #Linux / Osx
cmake -DCMAKE_BUILD_TYPE=Debug -G "Visual Studio 16 2019" -A x64 -T "ClangCl" -DCMAKE_CXX_COMPILER="C:/Program Files/LLVM/bin/clang-cl.exe" ../ #Windows

## We can even use Ninja for Windows / Linux / OSX
## On Windows you may want to open x64 Visual Studio Terminal Prompt for using Ninja
cmake -G Ninja -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_COMPILER=path_to_clang++ -DCMAKE_C_COMPILER=path_to_clang ../

## Build (Debug / Release available)
cmake --build . --config Debug
```

There are also additional options with the CMake that allows to activate certain features of the SDK:


### CMake Options

(Please use the scroll bar at the bottom of the table to view all table cells.)

| Name | Description | How to enable it | Notes |
| ---- | ----------- | ---------------- | ----- |
| `USE_SFML_ANTARA_WRAPPER` | Enable the SFML module of the SDK | `-DUSE_SFML_ANTARA_WRAPPER=ON` | Requires SFML dependencies on Linux |
| `USE_IMGUI_ANTARA_WRAPPER` | Enable the IMGUI Support for the SDK | `-DUSE_IMGUI_ANTARA_WRAPPER=ON` | |
| `ENABLE_BLOCKCHAIN_MODULES` | Enable the Blockchain modules for the SDK (need additional dependencies) | `-DENABLE_BLOCKCHAIN_MODULES=ON` | |
| `ANTARA_BUILD_DOCS` | Enable the build of the documentation for the SDK | `-DANTARA_BUILD_DOCS=ON` | Require Sphinx And Doxygen |
| `USE_LUA_ANTARA_WRAPPER` | Enable the lua module for the SDK | `-DUSE_LUA_ANTARA_WRAPPER=ON` | |
| `USE_ASAN` | Enable the Address Sanitizer for the Unit tests of the SDK | `-DUSE_ASAN=ON` | Cannot be mixed with `USE_TSAN` and `USE_UBSAN` |
| `USE_UBSAN` | Enable the Undefined Behavior Sanitizer for the Unit tests of the SDK | `-DUSE_UBSAN=ON` | Cannot be mixed with `USE_TSAN` and `USE_ASAN` |
| `USE_TSAN` | Enable the Undefined Behavior Sanitizer for the Unit tests of the SDK | `-DUSE_TSAN=ON` | Cannot be mixed with `USE_UBSAN` and `USE_ASAN` |
| `BUILD_WITH_APPIMAGE` | Enable the AppImage auto-generation on Linux for bundle an executable builded with the SDK | `-DBUILD_WITH_APPIMAGE=ON` | Work’s only on Linux.  |
| `ENABLE_HTML_COMPILATION` | Enable the HTML Compilation on Emscripten for an executable builded with the SDK | `-DENABLE_HTML_COMPILATION=ON` | Work’s only on Emscripten  |
| `COVERAGE_CLION_TOOLS` | Enable the Coverage inside CLion IDE  | `-DCOVERAGE_CLION_TOOLS=ON` | Work’s only with CLion IDE and Require `ENABLE_COVERAGE` |
| `ANTARA_BUILD_EXAMPLES` | Enable the example of the SDK.  | `-DANTARA_BUILD_EXAMPLES=ON` | Some examples need mix of options such as `USE_SFML_ANTARA_WRAPPER + ANTARA_BUILD_EXAMPLES` |
| `ANTARA_BUILD_UNIT_TESTS` | Enable the unit tests of the SDK.  | `-DANTARA_BUILD_UNIT_TESTS=ON` | Some examples need mix of options such as `USE_LUA_ANTARA_WRAPPER + ANTARA_BUILD_UNIT_TESTS` |
| `USE_BOX2D_ANTARA_WRAPPER` | Enable the Box2D modules of the SDK.  | `-DUSE_BOX2D_ANTARA_WRAPPER=ON` ||
| `ENABLE_COVERAGE` | Enable the coverage macros for the SDK.  | `-DENABLE_COVERAGE=ON` ||

### Initiating the Project

Installation is not necessary.

Simply use the CMake `fetch_content` command to use the project.

<!-- The language above seems like the concept is not yet fully explained, but I don't understand the topic well enough to correct. -->


## Running Tests

(This section assumes that the reader has compiled the Antara Gaming SDK with the option to perform unit tests enabled.)

Unit tests are located in the following folders.

- Linux/OSX: `bin/unit_tests`
- Windows: `bin/unit_tests/%CMAKE_BUILD_TYPE%`

## Deployment

<!-- Looks like this section is not yet written? -->

(This section is still in development.)

## Quick Example

#### CMakeLists.txt
Create a basic `CMakeLists.txt`. This allows the SDK to compile source code.

<!-- Is this placed in the root directory of the project? -->

```cpp
##! Uncomment those lines if you use the gaming sdk as an external project
#if (${CMAKE_SYSTEM_NAME} STREQUAL "Linux")
#    set(LINUX TRUE)
#endif ()

#include(FetchContent)

#FetchContent_Declare(
#        antara-gaming-sdk
#        URL https://github.com/KomodoPlatform/antara-gaming-sdk/archive/master.zip
#)

#FetchContent_MakeAvailable(antara-gaming-sdk)
#init_apple_env()

add_executable(quick_and_dirty quick_and_dirty.cpp)
target_link_libraries(quick_and_dirty PUBLIC antara::world)
```

#### A Cpp File with Necessary Primitives

Create a cpp file with the primitives necessary to launch the intended game.

```cpp
#include <iostream>
#include <antara/gaming/core/safe.refl.hpp>
#include <antara/gaming/world/world.app.hpp>

class example_system final : public antara::gaming::ecs::post_update_system<example_system>
{
public:
    example_system(entt::registry& entity_registry) noexcept : system(entity_registry)
    {
        //! Here you can initialize your system, adding entities etc
    }

    void update() noexcept final
    {
        //! Your game logic here
        nb_iteration += 1;
        std::cout << "nb_iteration: " << nb_iteration << "\n";
        if (nb_iteration == 10ull) {
            std::cout << "Maximum iteration reached, leaving game now\n";
            this->dispatcher_.trigger<antara::gaming::event::quit_game>(0);
        }
    }

private:
    std::size_t nb_iteration{0ull};
};

REFL_AUTO(type(example_system));

class my_world_example : public antara::gaming::world::app
{
public:
    my_world_example() noexcept
    {
        this->system_manager_.create_system<example_system>(); //! Here we load our system to use it.
    }
};

int main()
{
    my_world_example world;
    return world.run();
}
``` 

## SDK Components

- [doctest](https://github.com/onqtam/doctest) 
  - The fastest feature-rich C++11/14/17/20 single-header testing framework for unit tests and TDD [http://bit.ly/doctest-docs](http://bit.ly/doctest-docs) (MIT) 
- [doom-st](https://github.com/doom/strong_type)
  - C++ implementation of strong types (MIT) 
- [doom-meta](https://github.com/doom/meta)
  - Several metaprogramming utilities in C++ (MIT) 
- [loguru](https://github.com/emilk/loguru)
  - A lightweight C++ logging library (Public Domain) 
- [fmt](https://github.com/fmtlib/fmt)
  - A modern formatting library [https://fmt.dev](https://fmt.dev) (MIT) 
- [nlohmann-json](https://github.com/nlohmann/json)
  - JSON for Modern C++ [https://nlohmann.github.io/json/](https://nlohmann.github.io/json/) (MIT) 
- [EnTT](https://github.com/skypjack/entt)
  - Gaming meets modern C++
  - A fast and reliable entity-component system (ECS) (MIT) 
- [refl-cpp](https://github.com/veselink1/refl-cpp)
  - A compile-time reflection library for modern C++ (MIT)
- [range-v3](https://github.com/ericniebler/range-v3)
  - Range library for C++14/17/20
  - Basis for C++20’s `std::ranges` (Boost Software License) 
- [expected](https://github.com/TartanLlama/expected)
  - C++11/14/17 `std::expected` with functional-style extensions
  - [https://tl.tartanllama.xyz](https://tl.tartanllama.xyz) (CC0 1.0 Universal) 
- [ImGui](https://github.com/ocornut/imgui) (optional) 
  - Dear ImGui: Bloat-free Immediate Mode Graphical User interface for C++ with minimal dependencies (MIT) 
- [ImGui-SFML](https://github.com/eliasdaler/imgui-sfml) (optional) 
  - ImGui binding for use with SFML (MIT) 
- [SFML](https://github.com/SFML/SFML) (optional) 
  - Simple and Fast Multimedia Library
  - [http://www.sfml-dev.org/](http://www.sfml-dev.org/) 
- [reproc](https://github.com/DaanDeMeyer/reproc) (optional) 
  - Cross-platform (C99/C++11) process library (MIT) 
- [lua](https://github.com/lua/lua) (optional) 
  - The Lua repo, as seen by the Lua team. (MIT) 
- [sol2](https://github.com/ThePhD/sol2) (optional) 
  - Sol3 (sol2 v3.0)
  - a C++ <-> Lua API wrapper with advanced features and top notch performance
  - [http://sol2.rtfd.io/](http://sol2.rtfd.io/) (MIT) 
- [restclient-cpp](https://github.com/mrtazz/restclient-cpp) (optional) 
  - C++ client for making HTTP/REST requests
  - [http://code.mrtazz.com/restclient-cpp/](http://code.mrtazz.com/restclient-cpp/) (MIT) 
- [box2D](https://github.com/erincatto/Box2D) (optional) 
  - Box2D is a 2D physics engine for games
  - [http://box2d.org](http://box2d.org) (ZLib)

