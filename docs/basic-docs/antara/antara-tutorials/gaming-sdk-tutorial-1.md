# Tutorial: Antara Gaming Systems

If you have not read the getting started part yet, I invite you to do it now for the rest of this tutorial.

If you have not read the ecs module documentation yet, I invite you to do it now to understand what we are doing in this tutorial series.

## How to create your own system step by step ?

### Setup

In this tutorial I will assume that you want to write a system for a project outside the gaming SDK. (An External Game Project)

Firstly we will need a **CMakeLists.txt**:

```
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

As the `CMakeLists.txt` suggests we also need a **C++** files named `my_example_system.cpp` with the following contents:

```
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

And now we can successfully build the setup project that we just made:

> **WARNING**: The project is build on OSX in the following video, if you want to build for your platform please refer to the getting started tutorial

<embed>
    <script id="asciicast-RuOAzT29eEl51cOrsnX1yEFyo" src="https://asciinema.org/a/RuOAzT29eEl51cOrsnX1yEFyo.js" async data-speed="3" data-size="small"></script>
</embed>### Create a system

Let’s create between the `using namespace` statement and the definition of the class `my_world` a system class who will be a `pre_update_system`

```
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

Now we can load this system into our world. Place yourself at the body of the constructor of the class `my_world`.

In order to load the system we will use the function `create_system` of the `system_manager` class.

```
my_world() noexcept
{
    //! Here we don't need to add any parameters for the constructor
    //! because the mandatory parameters are forwarded by default
    this->system_manager_.create_system<pre_concrete_system>();
}
```

Now, if you compile your program and start it, you will realize that you are in an infinite loop, that’s simply mean your system is running inside the game loop.

But do not panic we have a way to stop our system thanks to the [dispatcher](https://github.com/skypjack/entt/wiki/Crash-Course:-events,-signals-and-everything-in-between#event-dispatcher).

We will make sure that after a number of iterations from our system, we will emit a `quit_game event` that will be catched by the world and stop the gaming loop.

To do this we will create a counter as a private field of our system and increment it each time the update function is called, arrived at 10 iterations we will emit an event to leave the game

```
class pre_concrete_system final : public antara::gaming::ecs::pre_update_system<pre_concrete_system>
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

REFL_AUTO(type(pre_concrete_system)) //! This line is very important, it's give a static reflection name function to your system, otherwise you will not compile.
```

**WARNING**: Let’s not forget the inclusion of [iostream](https://en.cppreference.com/w/cpp/header/iostream) header at the top of the file.

Now, if you compile your program and start it you will quit your game after 10 iterations.

Below all the code of this tutorial:

```
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
        //! Here we don't need to add any parameters for the constructor
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

**Congratulations, you have managed to create your own system and add it to your game world !**

