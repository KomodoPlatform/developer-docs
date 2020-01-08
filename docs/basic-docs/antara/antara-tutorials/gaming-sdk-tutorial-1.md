# Tutorial: Antara Gaming Systems

## Introduction

This tutorial presents the process of creating a gaming system using the Antara Gaming SDK.

This tutorial assumes that the reader desires to create a system for a project that has a root directory outside of the Antara Gaming SDK directory. (An "external game project.")

## Prerequisites

Please read the [Getting Started](./gaming-sdk-tutorial-0.html) tutorial before beginning this tutorial.

Please also review the [ecs documentation](./gaming.html) section of the API documentation, to gain a brief introduction to the essential concepts of this tutorial.

## Create Initial Files

Create a `CMakeLists.txt` file.

```cpp
if (${CMAKE_SOURCE_DIR} STREQUAL ${CMAKE_BINARY_DIR})
    message(FATAL_ERROR "Prevented in-tree build. Please create a build directory outside of the source code and call cmake from there")
endif ()

cmake_minimum_required(VERSION 3.14)

set(CMAKE_CXX_STANDARD 17)

project(my_game_project DESCRIPTION "my_game_description" LANGUAGES CXX)

if (NOT "${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
    message(FATAL_ERROR "Only Clang is supported (minimum LLVM 8.0)")
endif ()

if (${CMAKE_SYSTEM_NAME} STREQUAL "Linux")
    set(LINUX TRUE)
endif ()

include(FetchContent)

FetchContent_Declare(
        antara-gaming-sdk
        URL https://github.com/KomodoPlatform/antara-gaming-sdk/archive/master.zip
)

FetchContent_MakeAvailable(antara-gaming-sdk)
init_apple_env()

add_executable(${PROJECT_NAME} my_example_system.cpp)
target_link_libraries(${PROJECT_NAME} PUBLIC antara::world)
```

As indicated in the `CMakeLists.txt` file, the project also needs a `C++` file named `my_example_system.cpp` with the following contents.

```cpp
#include <antara/gaming/world/world.app.hpp>

using namespace antara::gaming;

class my_world : public world::app
{
public:
    my_world() noexcept
    {

    }
};

int main()
{
    my_world world;
    return world.run();
}
```

## Build the Project

The project is now ready for the `build` process.

::: tip

In the following video, the actions are performed on an OSX setup. Please refer to the [Getting Started Tutorial](./gaming.html) for more information about other operating systems. 

:::

<embed>
    <script id="asciicast-RuOAzT29eEl51cOrsnX1yEFyo" src="https://asciinema.org/a/RuOAzT29eEl51cOrsnX1yEFyo.js" async data-speed="3" data-size="small"></script>
</embed>

## Create a System

Between the `using namespace` statement and the definition of the class `my_world`, create a system class that is defined as a `pre_update_system`.

```cpp
class pre_concrete_system final : public ecs::pre_update_system<pre_concrete_system>
{
public:
    //! Here the constructor can take other additional arguments but the first two are mandatory
    pre_concrete_system(entt::registry &registry) noexcept : system(registry)
    {

    }

    void update() noexcept final
    {
        //! Empty for the moment
    }

    ~pre_concrete_system() noexcept final = default;
};
```

Place the cursor at the body of the constructor of the class `my_world`.

In order to load the system, use the function [create_system](../../../basic-docs/antara/antara-api/gaming.html#create-system) of the `system_manager` class.

```cpp
my_world() noexcept
{
    //! Here there is no need to add any parameters for the constructor
    //! because the mandatory parameters are forwarded by default
    this->system_manager_.create_system<pre_concrete_system>();
}
```

## Add a Quit Game Event

Currently, the source code creates in an infinite loop, as the system is running inside the game loop.

Use the [dispatcher](https://github.com/skypjack/entt/wiki/Crash-Course:-events,-signals-and-everything-in-between#event-dispatcher) to stop the system.

Add source code that emits a `quit_game event` that the game world will catch and stop the gaming loop.

Create a `counter` as a private field of the system and increment the counter each time the update function is called. At `10` iterations, emit an event to leave the game.

```cpp
class pre_concrete_system final : public antara::gaming::ecs::pre_update_system<pre_concrete_system>
{
public:
    //! Here the constructor can take other additional arguments, but the first two are mandatory
    pre_concrete_system(entt::registry &registry) noexcept : system(registry)
    {

    }

    void update() noexcept final
    {
        std::cout << "nb_iteration: " << (++nb_iteration) << "\n";
        if (nb_iteration == 10u) {
            this->dispatcher_.trigger<antara::gaming::event::quit_game>(0);
        }
    }

    ~pre_concrete_system() noexcept final = default;
private:
    std::size_t nb_iteration{0u};
};

REFL_AUTO(type(pre_concrete_system)) //! This line is very important, it's give a static reflection name function to your system, otherwise you will not compile.
```

::: tip

Don't forget to add `#include <iostream>` at the top of the file.

:::

## Test the Gaming System

The game should now compile, and when executed, iterate `10` times and close.

#### Full Code Sample

```cpp
#include <iostream>
#include <antara/gaming/world/world.app.hpp>

using namespace antara::gaming;

class pre_concrete_system final : public ecs::pre_update_system<pre_concrete_system>
{
public:
    //! Here the constructor can take other additional arguments but the first two are mandatory
    pre_concrete_system(entt::registry &registry) noexcept : system(registry)
    {

    }

    void update() noexcept final
    {
        std::cout << "nb_iteration: " << (++nb_iteration) << "\n";
        if (nb_iteration == 10u) {
            this->dispatcher_.trigger<antara::gaming::event::quit_game>(0);
        }
    }

    ~pre_concrete_system() noexcept final = default;
private:
    std::size_t nb_iteration{0u};
};

REFL_AUTO(type(pre_concrete_system))

class my_world : public world::app
{
public:
    my_world() noexcept
    {
        //! Here there is no need to add any parameters for the constructor
        //! because the mandatory parameters are forwarded by default
        this->system_manager_.create_system<pre_concrete_system>();
    }
};

int main()
{
    my_world world;
    return world.run();
}
``` 
