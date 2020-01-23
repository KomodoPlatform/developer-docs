# Tutorial: How to do a Tic-Tac-Toe in less than 15 minutes with the gaming SDK ?

Please become familiar with the [Getting Started](../../../basic-docs/antara/antara-tutorials/tic-tac-toe-tutorial-0.html) tutorial before beginning this tutorial.

## Introduction

This tutorial guides the reader in creating a simple game of Tic-Tac-Toe in relation to Komodo technology.

## Set Up the Executable and Window

####  Create a Project Directory

Create a folder called `tic-tac-toe` for the project.

#### Create CMakeLists.txt

Create a text file `CMakeLists.txt` to create and compile the executable.

The `CMakeLists.txt` file contains the following items:

- Name of the project
- Creation of the executable
- Link with the SDK
- C++ standard that will be used
- Any desired extra modules
  - For this tutorial, the extra modules is the `antara::sfml` module provided by the Antara Gaming SDK

Below is an example `CMakeLists.txt` file.

```cpp
if (${CMAKE_SOURCE_DIR} STREQUAL ${CMAKE_BINARY_DIR})
    message(FATAL_ERROR "Prevented in-tree build. Please create a build directory outside of the source code and call cmake from there")
endif ()

##! Minimum version of the CMake.
cmake_minimum_required(VERSION 3.14)

##! C++ Standard needed by the SDK is 17
set(CMAKE_CXX_STANDARD 17)

##! Our Project title, here tic-tac-toe.
project(tic-tac-toe DESCRIPTION "An awesome tic-tac-toe" LANGUAGES CXX)

##! The SDK need's clang as main compiler.
if (NOT "${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
    if (NOT "${CMAKE_CXX_COMPILER_ID}" STREQUAL "AppleClang")
        message(FATAL_ERROR "Only Clang is supported (minimum LLVM 8.0)")
    endif()
endif ()

##! Test whether the setup is on Linux
if (${CMAKE_SYSTEM_NAME} STREQUAL "Linux")
    set(LINUX TRUE)
endif ()

##! Include the module from CMake for fetching dependencies
include(FetchContent)

##! Declare information about the dependance to fetch
FetchContent_Declare(
        antara-gaming-sdk
        URL https://github.com/KomodoPlatform/antara-gaming-sdk/archive/master.zip
)

##! Set extras modules from the SDK
set(USE_SFML_ANTARA_WRAPPER ON)

##! Fetch the dependence
FetchContent_MakeAvailable(antara-gaming-sdk)

##! If using OSX, calling this macro provided by the sdk will initalize the environment (std::filesystem)
init_apple_env()

##! Create the executable with the project name
add_executable(${PROJECT_NAME} tic-tac-toe.cpp)

##! Set output directory
set_target_properties(${PROJECT_NAME}
        PROPERTIES
        RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin/"
        )

##! Link the SDK modules used in the executable
target_link_libraries(${PROJECT_NAME} PUBLIC antara::world antara::sfml)

##! Move DLL
if (WIN32)
    ADD_CUSTOM_COMMAND(TARGET ${PROJECT_NAME} POST_BUILD
            COMMAND ${CMAKE_COMMAND} -E copy_directory "${SFML_BINARY_DIR}/lib" "${CMAKE_BINARY_DIR}/bin/"
            COMMENT "copying dlls …"
            $<TARGET_FILE_DIR:${PROJECT_NAME}>
            )

    ADD_CUSTOM_COMMAND(TARGET ${PROJECT_NAME} POST_BUILD
            COMMAND ${CMAKE_COMMAND} -E copy "${SFML_SOURCE_DIR}/extlibs/bin/x64/openal32.dll" "${CMAKE_BINARY_DIR}/bin/openal32.dll"
            COMMENT "copying dlls …"
            $<TARGET_FILE_DIR:${PROJECT_NAME}>
            )
endif ()
```

#### Create tic-tac-toe.cpp Input File

Create the input file for the application and call it `tic-tac-toe.cpp`.

Add an empty main function:

```cpp
int main()
{
    return 0;
}
```

The project directory tree should now be as follows.

```cpp
./tic-tac-toe
├── CMakeLists.txt
└── tic-tac-toe.cpp
```

#### Test Compilation

Before continuing, ensure that the required dependencies are installed and that the program compiles in its current state. To test compilation, use the build commands available in the [Getting Started](./tic-tac-toe-tutorial-0.html) tutorial. 

For assistance, please visit the Komodo [Discord.](https://discord.gg/VRtwmR2)

#### Create World

To create a world representing the world of the project game, use the following header file.

```cpp
#include <antara/gaming/world/world.app.hpp>
```

Add a basic structure, `tic_tac_toe_world`. This structure inherits from the `antara::gaming::world::app` class.

Optionally, use the namespace `antara::gaming` to make naming easier.

Declare the new world object in the body of the main function. 

Replace the return value, `return 0`, with the return value of the project game. This is the value that is returned by the `run` function of the `class world::app` object.

The resulting logic should be similar to the following.

```cpp
#include <antara/gaming/world/world.hpp>

using namespace antara::gaming;

struct tic_tac_toe_world : world::app
{
    //! The game entry point
    tic_tac_toe_world() noexcept = default;
};

int main()
{
    tic_tac_toe_world game;
    return game.run();
}
```

At this point, compiling and running the executable creates an infinite loop, and nothing happens.

#### Initiate the Graphics

To initiate the in-game graphics, use the following two modules. 

```cpp
antara::gaming::sfml::graphic_system
antara::gaming::sfml::input::system
```

These modules have the following headers, respectively.

```cpp
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
```

Load the graphic system in the body of the constructor of the `tic_tac_toe_world` class, and initialize the input system with the window from the loaded graphic system.

```cpp
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>

//! For convenience
using namespace antara::gaming;

//! The game world
struct tic_tac_toe_world : world::app
{
    //! The game entry point
    tic_tac_toe_world() noexcept
    {
        //! Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        //! Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());
    }
};

int main()
{
    //! Declare the world
    tic_tac_toe_world game;

    //! Run the game
    return game.run();
}
```

Compile and run the program. A black window should open. 

Close the window by pressing the close button on the window bar.  

<div>

<img src="/tic-tac-toe-tutorial/black_window.png">

</div>

## The Game Scene, The Grid, and Game Constants

This portion of the tutorial creates the logic to draw the grid of Tic-Tac-Toe.

The grid appears as follows.

<div>

<img src="/tic-tac-toe-tutorial/tictactoe.grid.jpg">

</div>

#### Creating the Game Scene

This requires the creation of a game scene using the scene manager. 

Include the header file `#include <antara/gaming/scenes/scene.manager.hpp>` and load the scene's manager system into the system manager.

```cpp
struct tic_tac_toe_world : world::app
{
    //! The game entry point
    tic_tac_toe_world() noexcept
    {
        //! Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        //! Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        //! Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();
    }
};
```

Create the `game_scene` class that inherits from the `base_scene` class. The `game_scene` class will be the entry point of the project's game scene.

The concrete class must override several functions, such as `update`, `scene_name`, and the destructor.

There is no need to use the `update` function, because the game of Tic-Tac-Toe itself does not require an update for each frame. Leave the `update` function empty.

For the `scene_name` function, return the name of the scene.

```cpp
class game_scene final : public scenes::base_scene
{
public:
    game_scene(entt::registry &entity_registry) noexcept : base_scene(entity_registry)
    {}

    //! This function will not be used, because Tic-Tac-Toe doesn't need an update every frame.
    void update() noexcept final
    {}

    //! the scene name
    std::string scene_name() noexcept final
    {
        return "game_scene";
    }

    ~game_scene() noexcept final
    {}
private:
};
```


Load the game scene into the `scene_manager` using the `change_scene` member function.

```cpp
struct tic_tac_toe_world : world::app
{
    //! The game entry point
    tic_tac_toe_world() noexcept
    {
        //! Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        //! Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        //! Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        //! Change scene to game_scene
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};
```

Compiling now still results in the black window, as before, but this time the black window is the game scene.


<div>

<img src="/tic-tac-toe-tutorial/black_window.png">

</div>

::: tip Tip

The scene system is a useful method for organizing multiple screens of the game: **introduction scene**, **game scene**, **end-of-game scene**, etc.

:::

#### Adding Constants

Several constants are essential for the game of Tic-Tac-Toe: `width` and `height` of a cell, the `number` of cells per `line` and the `thickness` of the grid.

For the size of the cells, use the current size of the canvas divided by the number of cells per line. This obtains the size of a cell.

Create a structure, `tic_tac_toe_constants`, that contains these different pieces of information. Save the structure in the entity registry, so that the data is accessible from anywhere in the program.

```cpp
struct tic_tac_toe_constants
{
    tic_tac_toe_constants(std::size_t nb_cells_per_axis_, std::size_t width_, std::size_t height_) noexcept :
            nb_cells_per_axis(nb_cells_per_axis_),
            cell_width(width_ / nb_cells_per_axis),
            cell_height(height_ / nb_cells_per_axis)
    {
    }

    const std::size_t nb_cells_per_axis;
    const std::size_t cell_width;
    const std::size_t cell_height;
    const float grid_thickness{20.0f};
};
```

In the constructor of the gaming scene create the following logic.

```cpp
game_scene(entt::registry &entity_registry) noexcept : base_scene(entity_registry)
{
    //! Retrieve canvas information
    auto[canvas_width, canvas_height] = entity_registry_.ctx<graphics::canvas_2d>().canvas.size.to<math::vec2u>();

    //! Set the constants that will be used in the program
    entity_registry_.set<tic_tac_toe_constants>(3ull, canvas_width, canvas_height);
}
```

To create the entity representing the grid, add in a private member of the `game_scene` class, the `grid_entity_` field, which is of type `entt::entity` and which has the initial value `entt::null`.

```cpp
class game_scene final : public scenes::base_scene
{
public:
    game_scene(entt::registry &entity_registry) noexcept : base_scene(entity_registry)
    {
        //! Retrieve canvas information
        auto[canvas_width, canvas_height] = entity_registry_.ctx<graphics::canvas_2d>().canvas.size.to<math::vec2u>();

        //! Set the constants that will be used in the program
        entity_registry_.set<tic_tac_toe_constants>(3ull, canvas_width, canvas_height);
    }

    //! This function won't be used, because Tic-Tac-Toe doesn't need to update every frame.
    void update() noexcept final
    {}

    //! Return the scene name
    std::string scene_name() noexcept final
    {
        return "game_scene";
    }

    ~game_scene() noexcept final
    {}
private:
    //! The entity which represents the Tic-Tac-Toe grid
    entt::entity grid_entity_{entt::null};
};
```

To initialize this entity, create an anonymous namespace with a function, `create_grid`, which returns an `entt::entity` and takes the parameter `entity registry`.

```cpp
//! Contains all functions which will be used for logic and factory
namespace
{
    //! Factory for creating a Tic-Tac-Toe grid
    entt::entity create_grid(entt::registry &registry) noexcept
    {
        return entt::null;
    }
}
```

Call the function from the game scene constructor and assign the return value to the field `grid_entity_`.

```cpp
game_scene(entt::registry &entity_registry) noexcept : base_scene(entity_registry)
{
    //! Retrieve canvas information
    auto[canvas_width, canvas_height] = entity_registry_.ctx<graphics::canvas_2d>().canvas.size.to<math::vec2u>();

    //! Set the constants that will be used in the program
    entity_registry_.set<tic_tac_toe_constants>(3ull, canvas_width, canvas_height);

    //! Create the grid of the Tic-Tac-Toe
    grid_entity_ = create_grid(entity_registry_);
}
```

#### Begin the create_grid Function and the Destruction of Entities

The following steps create the logic of the `create_grid` function and manage the destruction of the entities of the game scene when leaving the program.

Retrieve the canvas size in order to define the size of the grid.

```cpp
//! Retrieve canvas information
auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
```

Create a new entity named `grid`.

```cpp
//! Entity creation
auto grid_entity = registry.create();
```

To create a visual line in the scene, represent two dots on the screen ("vertices") and join them together.

Each vertex has an `X` position and a `Y` position. 

The connection of two vertices makes a line. 

However, the line thickness by default is only `1 px`. This is not visible when the scene's rendered image is small, due to scaling. Therefore, this scene requires a line that is `20 px` thick.

<div>

<img src="/tic-tac-toe-tutorial/grid_lines.png"> 

</div>

A thick line is essentially a rectangle. Four vertices are required for a rectangle's four corners.

A Tic-Tac-Toe grid requires four vertical lines: two in the middle and two at the screen borders. The grid also requires four horizontal lines, for the same effect.

Therefore, the grid needs `8` lines, and each line is `4` vertices. Thus, `8 \* 4 = 32` vertices are required.

```cpp
//! The vertices
std::vector<geometry::vertex> lines{8 * 4};
```

Additional information required for the grid includes the following.

- `nb_cells` : the number of cells in one axis — `3` in this case

- `cell_width` and `cell_height` : width and height of a cell

- `grid_thickness` : thickness of the line

Retrieve these from the defined constants.

```cpp
//! Retrieve constants information
auto[nb_cells, cell_width, cell_height, grid_thickness] = registry.ctx<tic_tac_toe_constants>();
```

In calculations, use half of the thickness for the internal lines and the full thickness for the outer border of the grid

For clarity and reuse, prepare another constant.

```cpp
const auto half_thickness = grid_thickness * 0.5f;
```

At each loop of the function that draws the grid, define one vertical and one horizontal line.

There are `4` lines in each axis, and therefore the function needs to loop `4` times. In other words, the function needs to loop `nb_cells + 1` times. 

Start the count from `0` as this is used for the starting coordinate. 

There is also a variable `counter` which counts the vertex indexes. This varaible increases by `4 vertices \* 2 lines = 8 vertices` at each iteration.

```cpp
//! The loop to create the grid
for (std::size_t counter = 0, i = 0; i <= nb_cells; ++i, counter += 4 * 2) {
```

The order of the vertices of a rectangle is logically arranged as follows: `Top Left`, `Top Right`, `Bottom Right`, `Bottom Left`. 

Therefore, the next neighbour is always the clockwise neighbour.

<div>

<img src="/tic-tac-toe-tutorial/vertex_order.png"> 

</div>

#### Draw the Vertical Line

Draw the vertical line first and start with the `Top Left` vertex. 

A vertical line is from top to bottom and the `X` position is the same for the top and bottom. The `Y` changes, however.

Calculate the `X` value first. `idx` is currently `0`. Multiply this value with `cell_width`.

The `X` axis grows from left to right, while the `Y` axis grows from top to bottom.

For example, say `cell_width` is `300`. In `4` iterations the `X` values are: `0, 300, 600, 900`.

The left and right vertices of a thick vertical line need to be separate. Therefore, use `- half_thickness` to offset the `X` value a small amount to the left.

The `Y` value for these vertices is `0` because they are located at the top of the screen. 

```cpp
lines[counter + 0].pos = {idx * cell_width - half_thickness, 0.f};
```

The `Top Right` vertex is essentially the same, with the exception of its using `+ half_thickness`; this offsets the `X` value in the opposite direction. `Y` is still `0` because it is still located at the top of the screen.

```cpp
lines[counter + 1].pos = {idx * cell_width + half_thickness, 0.f};
```

For the `Bottom Right` vertex, `X` is the same as the `Top Right` vertex, but the `Y` value is now `canvas_height`, which is the bottom of the screen.

```cpp
lines[counter + 2].pos = {idx * cell_width + half_thickness, canvas_height};
```

For the last vertex, `Bottom Left`, the `Y` value is the same as `Bottom Right`, and the `X` value is using the `- half_thickness` adjustment, to align this `X` value with the left.

```cpp
lines[counter + 3].pos = {idx * cell_width - half_thickness, canvas_height};
```

This completes the vertical line. 

#### Draw a Horizontal Line

Starting at the `Top Left` again, since the line runs from left to right, the `X` value of the left vertex is `0`. The `Y` value changes in a fashion similar to the way the `X` value changed in the vertical line. The four horizontal lines have the `Y` values as: `0, 300, 600, 900`.

Use the `- half_thickness` logic again to calculate `Y`. This shifts the `Y` value of each vertex a small amount to create thickness.

```cpp
lines[counter + 4].pos = {0, idx * cell_height - half_thickness};
```

The `Top Right` vertex, at the far right side, is `canvas_width` pixels away. The `Y` value here is the same as `Top Left`.

```cpp
lines[counter + 5].pos = {canvas_width, idx * cell_height - half_thickness};
```

For the `Bottom Right` vertex, the `X` value stays the same. Add thickness to shift the value towards the bottom.

```cpp
lines[counter + 6].pos = {canvas_width, idx * cell_height + half_thickness};
```

The `X` value of the last vertex, `Bottom Left`, is at the far left, `0`. Shift the `Y` value towards the bottom by adding thickness again.

```cpp
lines[counter + 7].pos = {0, idx * cell_height + half_thickness};
```

Both vertical and horizontal lines are now ready and the loop ends here.

#### Improving the Game Scene Rendering

After the loop, turn the vertices to a quad variable of type `geometry::vertex_array`, which are rectangles. Assign this variable to the `grid_entity`.

```cpp
//! Assign the vertex array to the grid entity
registry.assign<geometry::vertex_array>(grid_entity, lines, geometry::vertex_geometry_type::quads);
```

Tag the grid as `game_scene`.

```cpp
//! Assign the game_scene tag to the grid_entity (_hs means hashed_string)
registry.assign<entt::tag<"game_scene"_hs>>(grid_entity);
```

Set the grid to appear at `layer 0` of the scene and return the prepared grid.

```cpp
//! Draw the grid on the most deep layer, 0
registry.assign<graphics::layer<0>>(grid_entity);

//! Return the fresh entity
return grid_entity;
```

Note that there is a small issue with adding and substracting `half_thickness` for the values at the edges of the screen. Because the top border and left border of the screen are at coordinate `0`, subtracting `half_thickness` makes half of the associated rectangle appear out of the screen. The same effect occurs with the bottom border and the right border. This is not as clean of a solution as the game project requires.

<div>

<img src="/tic-tac-toe-tutorial/border_problem.png">

</div>

To solve this, push the top border down, the left border to the right, the bottom border upwards, and the right border to the left. This keeps the rectangles within the screen.

This shift can be called `offset` as a variable. In the function loop, define `offset` at the beginning.

For any given rectangle, there is no offset by default. Set the offset variables to `0`.

```cpp
auto offset_x = 0.0f;
auto offset_y = 0.0f;
```

If the current rectangle is one of the the first iteration, add the `half_thickness` value to push the rectangles inside. If the current rectangle is one of the last, subtract the `half_thickness` value to pull the rectangles inside.

```cpp
if (i == 0) {
    offset_x += half_thickness;
    offset_y += half_thickness;
}
else if (i == nb_cells) {
    offset_x -= half_thickness;
    offset_y -= half_thickness;
}
```

For the vertical line, use the `offset X` value to push the lines left and right.

```cpp
//! Vertical
lines[counter + 0].pos = {offset_x + idx * cell_width - half_thickness, 0.f};
lines[counter + 1].pos = {offset_x + idx * cell_width + half_thickness, 0.f};
lines[counter + 2].pos = {offset_x + idx * cell_width + half_thickness, canvas_height};
lines[counter + 3].pos = {offset_x + idx * cell_width - half_thickness, canvas_height};
```

For the horizontal line, use the `offset Y` value to push the lines up and down.

```cpp
//! Horizontal
lines[counter + 4].pos = {offset_x + 0,            offset_y + idx * cell_height - half_thickness};
lines[counter + 5].pos = {offset_x + canvas_width, offset_y + idx * cell_height - half_thickness};
lines[counter + 6].pos = {offset_x + canvas_width, offset_y + idx * cell_height + half_thickness};
lines[counter + 7].pos = {offset_x + 0,            offset_y + idx * cell_height + half_thickness};
```

Below is the complete function.

```cpp
//! Contains all the function that will be used for logic and factory
namespace
{
    //! Factory for creating a Tic-Tac-Toe grid
    entt::entity create_grid(entt::registry &registry) noexcept
    {
        //! Retrieve canvas information
        auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;

        //! Entity creation
        auto grid_entity = registry.create();

        //! The vertices
        std::vector<geometry::vertex> lines{8 * 4};

        //! Retrieve constants information
        auto[nb_cells, cell_width, cell_height, grid_thickness] = registry.ctx<tic_tac_toe_constants>();
        const auto half_thickness = grid_thickness * 0.5f;

        //! The loop to create the grid
        for (std::size_t counter = 0, i = 0; i <= nb_cells; ++i, counter += 4 * 2) {

            //! To avoid narrowing conversion
            auto idx = static_cast<float>(i);

            //! First and last ones should be a bit inside, otherwise half of it is out of the screen
            auto offset_x = 0.0f;
            auto offset_y = 0.0f;

            if (i == 0) {
                offset_x += half_thickness;
                offset_y += half_thickness;
            } else if (i == nb_cells) {
                offset_x -= half_thickness;
                offset_y -= half_thickness;
            }

            //! Prepare lines

            //! Vertical
            lines[counter + 0].pos = {offset_x + idx * cell_width - half_thickness, 0.f};
            lines[counter + 1].pos = {offset_x + idx * cell_width + half_thickness, 0.f};
            lines[counter + 2].pos = {offset_x + idx * cell_width + half_thickness, canvas_height};
            lines[counter + 3].pos = {offset_x + idx * cell_width - half_thickness, canvas_height};

            //! Horizontal
            lines[counter + 4].pos = {offset_x + 0, offset_y + idx * cell_height - half_thickness};
            lines[counter + 5].pos = {offset_x + canvas_width, offset_y + idx * cell_height - half_thickness};
            lines[counter + 6].pos = {offset_x + canvas_width, offset_y + idx * cell_height + half_thickness};
            lines[counter + 7].pos = {offset_x + 0, offset_y + idx * cell_height + half_thickness};
        }

        //! Assign the vertex array to the grid entity
        registry.assign<geometry::vertex_array>(grid_entity, lines, geometry::vertex_geometry_type::quads);

        //! Assign the game_scene tag to the grid_entity (_hs means hashed_string)
        registry.assign<entt::tag<"game_scene"_hs>>(grid_entity);

        //! Draw the grid on the most deep layer, here 0
        registry.assign<graphics::layer<0>>(grid_entity);

        //! Return the fresh entity
        return grid_entity;
    }
}
```

#### Create the Destructor Logic

The following content organizes the destruction of the entities in the destructor. This is needed at the time of game reset.

In the destructor, the logic iterates over and destroys all the entities that have the tag of the game scene.

```cpp
~game_scene() noexcept final
{
    //! Retrieve the collection of entities from the game scene
    auto view = entity_registry_.view<entt::tag<"game_scene"_hs>>();

    //! Iterate the collection and destroy each entities
    entity_registry_.destroy(view.begin(), view.end());

    //! Unset the Tic-Tac-Toe constants
    entity_registry_.unset<tic_tac_toe_constants>();
}
```

#### Survey of Current Progress

Compiling and running the program at this point achieves the following result.

<div>

<img src="/tic-tac-toe-tutorial/tictactoe_real_grid.png">

</div>

Here is the created code.

```cpp
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/graphics/component.layer.hpp>

//! For convenience
using namespace antara::gaming;

struct tic_tac_toe_constants
{
    tic_tac_toe_constants(std::size_t nb_cells_per_axis_, std::size_t width_, std::size_t height_) noexcept :
            nb_cells_per_axis(nb_cells_per_axis_),
            cell_width(width_ / nb_cells_per_axis),
            cell_height(height_ / nb_cells_per_axis)
    {
    }

    const std::size_t nb_cells_per_axis;
    const std::size_t cell_width;
    const std::size_t cell_height;
    const float grid_thickness{20.0f};
};

//! Contains all the functions used for logic and factory
namespace
{
    //! Factory for creating a tic-tac-toe grid
    entt::entity create_grid(entt::registry &registry) noexcept
    {
        //! retrieve canvas information
        auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;

        //! entity creation
        auto grid_entity = registry.create();

        //! the vertices
        std::vector<geometry::vertex> lines{8 * 4};

        //! retrieve constants information
        auto[nb_cells, cell_width, cell_height, grid_thickness] = registry.ctx<tic_tac_toe_constants>();
        const auto half_thickness = grid_thickness * 0.5f;

        //! the loop to create the grid
        for (std::size_t counter = 0, i = 0; i <= nb_cells; ++i, counter += 4 * 2) {

            //! to avoid narrowing conversion
            auto idx = static_cast<float>(i);

            //! first and last ones should be a bit inside, otherwise half of it is out of the screen
            auto offset_x = 0.0f;
            auto offset_y = 0.0f;

            if (i == 0) {
                offset_x += half_thickness;
                offset_y += half_thickness;
            } else if (i == nb_cells) {
                offset_x -= half_thickness;
                offset_y -= half_thickness;
            }

            //! prepare lines

            //! vertical
            lines[counter + 0].pos = {offset_x + idx * cell_width - half_thickness, 0.f};
            lines[counter + 1].pos = {offset_x + idx * cell_width + half_thickness, 0.f};
            lines[counter + 2].pos = {offset_x + idx * cell_width + half_thickness, canvas_height};
            lines[counter + 3].pos = {offset_x + idx * cell_width - half_thickness, canvas_height};

            //! horizontal
            lines[counter + 4].pos = {offset_x + 0, offset_y + idx * cell_height - half_thickness};
            lines[counter + 5].pos = {offset_x + canvas_width, offset_y + idx * cell_height - half_thickness};
            lines[counter + 6].pos = {offset_x + canvas_width, offset_y + idx * cell_height + half_thickness};
            lines[counter + 7].pos = {offset_x + 0, offset_y + idx * cell_height + half_thickness};
        }

        //! assign the vertex array to the grid entity
        registry.assign<geometry::vertex_array>(grid_entity, lines, geometry::vertex_geometry_type::quads);

        //! assign the game_scene tag to the grid_entity (_hs means hashed_string)
        registry.assign<entt::tag<"game_scene"_hs>>(grid_entity);

        //! draw the grid on the most deep layer, here 0.
        registry.assign<graphics::layer<0>>(grid_entity);

        //! return the fresh entity
        return grid_entity;
    }
}

class game_scene final : public scenes::base_scene
{
public:
    game_scene(entt::registry &entity_registry) noexcept : base_scene(entity_registry)
    {
        //! retrieve canvas information
        auto[canvas_width, canvas_height] = entity_registry_.ctx<graphics::canvas_2d>().canvas.size.to<math::vec2u>();

        //! set the constants used in the program
        entity_registry_.set<tic_tac_toe_constants>(3ull, canvas_width, canvas_height);

        //! create the grid of tic tac toe
        grid_entity_ = create_grid(entity_registry_);
    }

    //! This function will not be used, because tic tac toe doesn't need an update for every frame
    void update() noexcept final
    {}

    //! the scene name
    std::string scene_name() noexcept final
    {
        return "game_scene";
    }

    ~game_scene() noexcept final
    {
        //! retrieve the collection of entities from the game scene
        auto view = entity_registry_.view<entt::tag<"game_scene"_hs>>();

        //! iterate the collection and destroy each entities
        entity_registry_.destroy(view.begin(), view.end());

        //! unset the tic tac toe constants
        entity_registry_.unset<tic_tac_toe_constants>();
    }

private:
    //! the entity representing the tic-tac-toe grid
    entt::entity grid_entity_{entt::null};
};

//! the game world
struct tic_tac_toe_world : world::app
{
    //! the game entry point
    tic_tac_toe_world() noexcept
    {
        //! load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        //! load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        //! load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        //! change the current_scene to "game_scene" by pushing it
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};

int main()
{
    //! declare the world
    tic_tac_toe_world game;

    //! run the game
    return game.run();
}
```

## Create the Board, the X and O Graphics, and the Game Logic

The game requires a `cell_state` variable to indicate whether the cell is empty, or marked `x` or `y`. 

Use `enum` for this effect.

```cpp
enum cell_state
{
    empty,
    player_x = 1,
    player_y = 2
};
```

#### Create the Board

Create a `3x3` board. Accept the value `3` in a parameter variable named `nb_cells_per_axis`. 

The board is a `vector` of `9` `cell_state` instances and all are marked `empty`.

```cpp
std::vector<cell_state> create_board(std::size_t nb_cells_per_axis)
{
    std::vector<cell_state> board(nb_cells_per_axis * nb_cells_per_axis, cell_state::empty);
    return board;
}
```

#### Display X

The function to display cell states has `row` and `column` parameters.

```cpp
void create_x(entt::registry &entity_registry, std::size_t row, std::size_t column) noexcept
```

Develop the constants that are stored for reuse, such as `nb_cells`, `cell_width`, `cell_height` and `grid_thickness`. Then create other helpful constants as `half_box_side`, `center_x`, `center_y` which is the center position of that specific cell.

```cpp
auto[nb_cells, cell_width, cell_height, grid_thickness] = entity_registry.ctx<tic_tac_toe_constants>();
const auto half_box_side = static_cast<float>(std::fmin(cell_width, cell_height) * 0.25f);
const auto center_x = static_cast<float>(cell_width * 0.5 + column * cell_width);
const auto center_y = static_cast<float>(cell_height * 0.5 + row * cell_height);
```

Make an `X` using two lines. As before, every line is a `quad` which has `4` vertices.

```cpp
auto x_entity = entity_registry.create();
std::vector<geometry::vertex> lines{2 * 4};
```

Every vertex of the `X` has a magenta color. 

```cpp
for (auto &&current_vertex: lines) current_vertex.pixel_color = graphics::magenta;
```

As before, set the position of every single vertex. The order is `Top Left`, `Top Right`, `Bottom Left`, `Bottom Right`.

```cpp
// Top-left to Bottom-right
lines[0].pos = {center_x - half_box_side - half_thickness, center_y - half_box_side};
lines[1].pos = {center_x - half_box_side + half_thickness, center_y - half_box_side};
lines[2].pos = {center_x + half_box_side + half_thickness, center_y + half_box_side};
lines[3].pos = {center_x + half_box_side - half_thickness, center_y + half_box_side};


// Top-right to Bottom-left
lines[4].pos = {center_x + half_box_side - half_thickness, center_y - half_box_side};
lines[5].pos = {center_x + half_box_side + half_thickness, center_y - half_box_side};
lines[6].pos = {center_x - half_box_side + half_thickness, center_y + half_box_side};
lines[7].pos = {center_x - half_box_side - half_thickness, center_y + half_box_side};
```

Create a `geometry::vertex_array`.

```cpp
entity_registry.assign<geometry::vertex_array>(x_entity, lines, geometry::vertex_geometry_type::quads);
```

Assign the `X` entity to `player_x` and `game_scene`. 

Set the layer as `1`. `X` and `O` need to render above the background layer `0`.

```cpp
entity_registry.assign<entt::tag<"game_scene"_hs>>(x_entity);
entity_registry.assign<entt::tag<"player_x"_hs>>(x_entity);
entity_registry.assign<graphics::layer<1>>(x_entity);
```

#### Render O

The process of rendering `O` starts in the same manner as that of `X`.

```cpp
void create_o(entt::registry &entity_registry, std::size_t row, std::size_t column) noexcept
{
    auto constants = entity_registry.ctx<tic_tac_toe_constants>();
    const auto half_box_side = static_cast<float>(std::fmin(constants.cell_width, constants.cell_height) * 0.25f);
    const auto center_x = static_cast<float>(constants.cell_width * 0.5 + column * constants.cell_width);
    const auto center_y = static_cast<float>(constants.cell_height * 0.5 + row * constants.cell_height);
```

To create the `O`, create an entity, assign it as a `geometry::circle`. 

Set the `fill_color` and `outline_color`, and set the entity position to the center of the cell.

```cpp
auto o_entity = geometry::blueprint_circle(entity_registry, half_box_side, graphics::transparent,
        transform::position_2d(center_x, center_y),
        graphics::outline_color(constants.grid_thickness, graphics::cyan));
```

The process of rendering the `O` from this point is the same as that of `X`: assign the object to `game_scene` and set the object to layer `1`.

```cpp
entity_registry.assign<entt::tag<"game_scene"_hs>>(o_entity);
entity_registry.assign<graphics::layer<1>>(o_entity);
```

#### Create a Logic System

Create an `ecs::logic_update_system` called `tic_tac_toe_logic`.

```cpp
class tic_tac_toe_logic final : public ecs::logic_update_system<tic_tac_toe_logic>
{
public:
    ~tic_tac_toe_logic() noexcept final = default;

    void update() noexcept final
    {}
```

::: tip Note

The update function does not perform any actions because Tic-Tac-Toe is a passive game. 

Actual updates occur only when the mouse is clicked. 

:::

Define the `play_turn` function.

```cpp
//! Game logic
void play_turn(std::size_t row, std::size_t column) noexcept
```

Set `index` according to the `row` and `column`.

```cpp
//! Retrieve constants
auto constants = entity_registry_.ctx<tic_tac_toe_constants>();

//! Which cell is clicked ?
std::size_t index = row * constants.nb_cells_per_axis + column;
```

Ensure that `index` is inside the board and the clicked cell is empty. 

If so, set the board as the current `player_turn_`. If this value is `X`, call `create_x` for that cell. Otherwise, call `create_o`. 

Then change the turn to the other player.

```cpp
    //! Cell is available ?
    if (index < board_.size() && board_[index] == cell_state::empty) {

        //! Change state of the cell to the current player
        board_[index] = static_cast<cell_state>(player_turn_);

        //! Create x or o based on the current player
        player_turn_ == x ? create_x(entity_registry_, row, column) : create_o(entity_registry_, row, column);

        //! Switch player
        player_turn_ = (player_turn_ == player::x) ? player::o : player::x;
    }
}
```

Call `play_turn` with the position of the mouse click.

```cpp
void on_mouse_button_pressed(const event::mouse_button_pressed &evt) noexcept
 {
     if (current_game_state_ == running) {
         //! Retrieve game constants.
         auto constants = entity_registry_.ctx<tic_tac_toe_constants>();

         //! Play one turn of the Tic-Tac-Toe
         play_turn(evt.y / constants.cell_height, evt.x / constants.cell_width);
     } else {
         //! Reset the game
     }
 }
```

Assign the `on_mouse_button_pressed` event to the mouse click in the constructor.

```cpp
tic_tac_toe_logic(entt::registry &registry, entt::entity grid_entity, std::vector<cell_state> board) noexcept
        : system(registry), grid_entity_(grid_entity), board_(std::move(board))
{
    //! stateless system
    this->disable();

    //! subscribe to mouse_button event
    this->dispatcher_.sink<event::mouse_button_pressed>().connect<&tic_tac_toe_logic::on_mouse_button_pressed>(
            *this);
}
```

Also in this class are the enums `game_state` and `player`.

```cpp
//! Private enums
enum game_state
{
    running,
    player_x_won = 1,
    player_y_won = 2,
    tie,
    quit
};

enum player
{
    x = 1,
    o = 2
};
```

Also develop the other member variables, such as `grid`, `state board`, `game state` and `player turn`.

```cpp
//! Private members variable
entt::entity grid_entity_{entt::null};
std::vector<cell_state> board_;
game_state current_game_state_{game_state::running};
player player_turn_{player::x};
```

After the class definition and out of the class scope give a name to the system.

```cpp
//! Give a name to the system
REFL_AUTO(type(tic_tac_toe_logic));
```

In the constructor of the `game_scene` create the board and the logic system.

```cpp
//! Create the board of the tic tac toe
auto board = create_board(tictactoe_constants.nb_cells_per_axis);

//! Create the logic game system and give the fresh grid entity and the fresh board.
this->system_manager_.create_system<tic_tac_toe_logic>(grid_entity, board);
```

<div>

<img src="/tic-tac-toe-tutorial/tictactoe_board.png">

</div>

The code up to this point in the tutorial.

```cpp
#include <vector>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/graphics/component.layer.hpp>

//! For convenience
using namespace antara::gaming;

struct tic_tac_toe_constants
{
    tic_tac_toe_constants(std::size_t nb_cells_per_axis_, std::size_t width_, std::size_t height_) noexcept :
            nb_cells_per_axis(nb_cells_per_axis_),
            cell_width(width_ / nb_cells_per_axis),
            cell_height(height_ / nb_cells_per_axis)
    {
    }

    const std::size_t nb_cells_per_axis;
    const std::size_t cell_width;
    const std::size_t cell_height;
    const float grid_thickness{20.0f};
};

enum cell_state
{
    empty,
    player_x = 1,
    player_y = 2
};

//! Contains all the functions used for logic and factory
namespace
{
    //! Factory for creating a tic-tac-toe grid
    entt::entity create_grid(entt::registry &registry) noexcept
    {
        //! retrieve canvas information
        auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;

        //! entity creation
        auto grid_entity = registry.create();

        //! the vertices
        std::vector<geometry::vertex> lines{8 * 4};

        //! retrieve constants information
        auto[nb_cells, cell_width, cell_height, grid_thickness] = registry.ctx<tic_tac_toe_constants>();
        const auto half_thickness = grid_thickness * 0.5f;

        //! the loop to create the grid
        for (std::size_t counter = 0, i = 0; i <= nb_cells; ++i, counter += 4 * 2) {

            //! to avoid narrowing conversion
            auto idx = static_cast<float>(i);

            //! first and last ones should be a bit inside, otherwise half of it is out of the screen
            auto offset_x = 0.0f;
            auto offset_y = 0.0f;

            if (i == 0) {
                offset_x += half_thickness;
                offset_y += half_thickness;
            } else if (i == nb_cells) {
                offset_x -= half_thickness;
                offset_y -= half_thickness;
            }

            //! prepare lines

            //! vertical
            lines[counter + 0].pos = {offset_x + idx * cell_width - half_thickness, 0.f};
            lines[counter + 1].pos = {offset_x + idx * cell_width + half_thickness, 0.f};
            lines[counter + 2].pos = {offset_x + idx * cell_width + half_thickness, canvas_height};
            lines[counter + 3].pos = {offset_x + idx * cell_width - half_thickness, canvas_height};

            //! horizontal
            lines[counter + 4].pos = {offset_x + 0, offset_y + idx * cell_height - half_thickness};
            lines[counter + 5].pos = {offset_x + canvas_width, offset_y + idx * cell_height - half_thickness};
            lines[counter + 6].pos = {offset_x + canvas_width, offset_y + idx * cell_height + half_thickness};
            lines[counter + 7].pos = {offset_x + 0, offset_y + idx * cell_height + half_thickness};
        }

        //! assign the vertex array to the grid entity
        registry.assign<geometry::vertex_array>(grid_entity, lines, geometry::vertex_geometry_type::quads);

        //! assign the game_scene tag to the grid_entity (_hs means hashed_string)
        registry.assign<entt::tag<"game_scene"_hs>>(grid_entity);

        //! Draw the grid on the deepest layer, here 0.
        registry.assign<graphics::layer<0>>(grid_entity);

        //! return the fresh entity
        return grid_entity;
    }

    std::vector<cell_state> create_board(std::size_t nb_cells_per_axis)
    {
        std::vector<cell_state> board(nb_cells_per_axis * nb_cells_per_axis, cell_state::empty);
        return board;
    }

    void create_x(entt::registry &entity_registry, std::size_t row, std::size_t column) noexcept
    {
        auto[nb_cells, cell_width, cell_height, grid_thickness] = entity_registry.ctx<tic_tac_toe_constants>();
        const auto half_box_side = static_cast<float>(std::fmin(cell_width, cell_height) * 0.25f);
        const auto center_x = static_cast<float>(cell_width * 0.5 + column * cell_width);
        const auto center_y = static_cast<float>(cell_height * 0.5 + row * cell_height);

        auto x_entity = entity_registry.create();
        std::vector<geometry::vertex> lines{2 * 4};

        for (auto &&current_vertex: lines) current_vertex.pixel_color = graphics::magenta;

        const auto half_thickness = grid_thickness * 0.5f;

        // Top-left to Bottom-right
        lines[0].pos = {center_x - half_box_side - half_thickness, center_y - half_box_side};
        lines[1].pos = {center_x - half_box_side + half_thickness, center_y - half_box_side};
        lines[2].pos = {center_x + half_box_side + half_thickness, center_y + half_box_side};
        lines[3].pos = {center_x + half_box_side - half_thickness, center_y + half_box_side};


        // Top-right to Bottom-left
        lines[4].pos = {center_x + half_box_side - half_thickness, center_y - half_box_side};
        lines[5].pos = {center_x + half_box_side + half_thickness, center_y - half_box_side};
        lines[6].pos = {center_x - half_box_side + half_thickness, center_y + half_box_side};
        lines[7].pos = {center_x - half_box_side - half_thickness, center_y + half_box_side};

        entity_registry.assign<geometry::vertex_array>(x_entity, lines, geometry::vertex_geometry_type::quads);
        entity_registry.assign<entt::tag<"game_scene"_hs>>(x_entity);
        entity_registry.assign<entt::tag<"player_x"_hs>>(x_entity);
        entity_registry.assign<graphics::layer<1>>(x_entity);
    }

    void create_o(entt::registry &entity_registry, std::size_t row, std::size_t column) noexcept
    {
        auto constants = entity_registry.ctx<tic_tac_toe_constants>();
        const auto half_box_side = static_cast<float>(std::fmin(constants.cell_width, constants.cell_height) * 0.25f);
        const auto center_x = static_cast<float>(constants.cell_width * 0.5 + column * constants.cell_width);
        const auto center_y = static_cast<float>(constants.cell_height * 0.5 + row * constants.cell_height);

        auto o_entity = geometry::blueprint_circle(entity_registry, half_box_side, graphics::transparent,
                transform::position_2d(center_x, center_y),
                graphics::outline_color(constants.grid_thickness, graphics::cyan));

        entity_registry.assign<entt::tag<"game_scene"_hs>>(o_entity);
        entity_registry.assign<graphics::layer<1>>(o_entity);
    }
}

class tic_tac_toe_logic final : public ecs::logic_update_system<tic_tac_toe_logic>
{
public:
    ~tic_tac_toe_logic() noexcept final = default;

    void update() noexcept final
    {}

    void on_mouse_button_pressed(const event::mouse_button_pressed &evt) noexcept
    {
        if (current_game_state_ == running) {
            //! Retrieve game constants.
            auto constants = entity_registry_.ctx<tic_tac_toe_constants>();

            //! Play one turn of the Tic-Tac-Toe
            play_turn(evt.y / constants.cell_height, evt.x / constants.cell_width);
        } else {
            //! Reset the game
        }
    }

    tic_tac_toe_logic(entt::registry &registry, entt::entity grid_entity, std::vector<cell_state> board) noexcept
            : system(registry), grid_entity_(grid_entity), board_(std::move(board))
    {
        //! stateless system
        this->disable();

        //! subscribe to mouse_button event
        this->dispatcher_.sink<event::mouse_button_pressed>().connect<&tic_tac_toe_logic::on_mouse_button_pressed>(
                *this);
    }

private:
    //! Game logic
    void play_turn(std::size_t row, std::size_t column) noexcept
    {
        //! Retrieve constants
        auto constants = entity_registry_.ctx<tic_tac_toe_constants>();

        //! Which cell is clicked ?
        std::size_t index = row * constants.nb_cells_per_axis + column;

        //! Cell is available ?
        if (index < board_.size() && board_[index] == cell_state::empty) {

            //! change state of the cell to the current player
            board_[index] = static_cast<cell_state>(player_turn_);

            //! create x or o based on the current player
            player_turn_ == x ? create_x(entity_registry_, row, column) : create_o(entity_registry_, row, column);

            //! switch player
            player_turn_ = (player_turn_ == player::x) ? player::o : player::x;
        }
    }

private:
    //! Private enums
    enum game_state
    {
        running,
        player_x_won = 1,
        player_y_won = 2,
        tie,
        quit
    };

    enum player
    {
        x = 1,
        o = 2
    };

private:
    //! Private members variable
    entt::entity grid_entity_{entt::null};
    std::vector<cell_state> board_;
    game_state current_game_state_{game_state::running};
    player player_turn_{player::x};
};

//! Provide the system with a name
REFL_AUTO(type(tic_tac_toe_logic));

class game_scene final : public scenes::base_scene
{
public:
    game_scene(entt::registry &entity_registry) noexcept : base_scene(entity_registry)
    {
        //! Retrieve canvas information
        auto[canvas_width, canvas_height] = entity_registry_.ctx<graphics::canvas_2d>().canvas.size.to<math::vec2u>();

        //! Set the constants that will be used in the program
        auto &tictactoe_constants = entity_registry_.set<tic_tac_toe_constants>(3ull, canvas_width, canvas_height);

        //! Create the grid of the tic tac toe
        auto grid_entity = create_grid(entity_registry_);

        //! Create the board of the tic tac toe
        auto board = create_board(tictactoe_constants.nb_cells_per_axis);

        //! Create the logic game system and give the fresh grid entity and the fresh board.
        this->system_manager_.create_system<tic_tac_toe_logic>(grid_entity, board);
    }

    //! This function will not be used, because tic tac toe doesn't need an update every frame.
    void update() noexcept final
    {}


    //! the scene name
    std::string scene_name() noexcept final
    {
        return "game_scene";
    }

    ~game_scene() noexcept final
    {
        //! Retrieve the collection of entities from the game scene
        auto view = entity_registry_.view<entt::tag<"game_scene"_hs>>();

        //! Iterate the collection and destroy each entities
        entity_registry_.destroy(view.begin(), view.end());

        //! Unset the tic tac toe constants
        entity_registry_.unset<tic_tac_toe_constants>();
    }

private:
    ecs::system_manager system_manager_{entity_registry_};
};

//! The game world
struct tic_tac_toe_world : world::app
{
    //! The game entry point
    tic_tac_toe_world() noexcept
    {
        //! Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        //! Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        //! Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        //! Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};

int main()
{
    //! Declare the world
    tic_tac_toe_world game;

    //! Run the game
    return game.run();
}
```

## Win, Tie Conditions, and Resetting the Game

The game requires final conditions, such as `win`, `tie`, and the ability to the reset the game.

#### Create Reset Capabilities

Create a blank `reset_event` struct.

```cpp
struct reset_event
{

};
```

Define the reset event callback. This calls the destructor and then calls the constructor again.

```cpp
//! Callback
void on_reset_event(const reset_event &) noexcept
{
    entt::registry &registry = this->entity_registry_;
    this->~game_scene();
    new(this) game_scene(registry);
}
```

Subscribe to this reset event in the `game_scene` constructor.

```cpp
class game_scene final : public scenes::base_scene
{
public:
    game_scene(entt::registry &entity_registry) noexcept : base_scene(entity_registry)
    {
        //! Subscribe to reset event
        this->dispatcher_.sink<reset_event>().connect<&game_scene::on_reset_event>(*this);
```

Remove this event in the class destructor.

```cpp
~tic_tac_toe_logic() noexcept final
{
    this->dispatcher_.sink<event::mouse_button_pressed>().disconnect(*this);
}
```

Trigger this when the mouse button is pressed and the game state is not `running`.

```cpp
this->dispatcher_.trigger<reset_event>();

---------

void on_mouse_button_pressed(const event::mouse_button_pressed &evt) noexcept
{
    if (current_game_state_ == running) {
        //! Retrieve game constants.
        auto constants = entity_registry_.ctx<tic_tac_toe_constants>();

        //! Play one turn of the Tic-Tac-Toe
        play_turn(evt.y / constants.cell_height, evt.x / constants.cell_width);
    } else {
        //! Reset the game
        this->dispatcher_.trigger<reset_event>();
    }
}
```

#### Create Final Conditions

Define the checks for `win` and `tie` conditions. 

Start with the winning condition. 

Check the current player’s `win` situation. 

In this function, check every cell and count how many are marked as `current player`. Perform this action separately in two variables: `row_count` and `column_count`. If any of these two reach the `nb_cells` value, which is `3`, the player wins and the function returns `true`. 

Count the diagonal lines and check `nb_cells` as before.

If nothing has reached `3`, return `false`.

```cpp
[[nodiscard]] bool did_current_player_win_the_game() const noexcept
{
    std::size_t row_count{0u}, column_count{0u}, diag1_count{0u}, diag2_count{0u};
    auto[nb_cells, cell_width, cell_height, _] = entity_registry_.ctx<tic_tac_toe_constants>();
    for (std::size_t i = 0; i < nb_cells; ++i) {
        for (std::size_t j = 0; j < nb_cells; ++j) {
            //! Check rows
            if (board_[i * nb_cells + j] == static_cast<cell_state>(player_turn_))
                row_count++;

            //! Check columns
            if (board_[j * nb_cells + i] == static_cast<cell_state>(player_turn_))
                column_count++;
        }

        //! Check condition
        if (row_count >= nb_cells || column_count >= nb_cells) {
            return true;
        }

        //! Reset rows and columns
        row_count = 0u, column_count = 0u;

        //! Diag1 count
        if (board_[i * nb_cells + i] == static_cast<cell_state>(player_turn_))
            diag1_count++;

        //! Second diag count
        if (board_[i * nb_cells + nb_cells - i - 1] == static_cast<cell_state>(player_turn_))
            diag2_count++;
    }

    //! Condition
    return diag1_count >= nb_cells || diag2_count >= nb_cells;
}
```

If all the cells are filled and there is no `win` condition, the game is a tie.

```cpp
[[nodiscard]] bool is_tie() const noexcept
{
    return std::count(begin(board_), end(board_), cell_state::empty) == 0;
}
```

#### Set Colors for the Conditions

Use these two conditions to check functions in a larger function that is called later.

```cpp
void check_winning_condition() noexcept
```

Inside this function define a functor `make_screen` that sets the color of the grid.

```cpp
auto make_screen = [this](graphics::color clr_winner,
                            entt::entity entity) {
    auto &array_cmp = this->entity_registry_.get<geometry::vertex_array>(entity);
    for (auto &v : array_cmp.vertices) v.pixel_color = clr_winner;
    entity_registry_.replace<geometry::vertex_array>(entity, array_cmp.vertices, array_cmp.geometry_type);
};
```

Using this functor, make another functor, `make_player_win_screen`, that gives the winner’s color as an argument.

```cpp
auto make_player_win_screen = [this, make_screen](entt::entity entity) {
    auto winning_color = player_turn_ == player::x ? graphics::magenta : graphics::cyan;
    make_screen(winning_color, entity);
};
```

Likewise, create another which feeds a different color when the game is a tie.

```cpp
auto make_tie_screen = [make_screen](entt::entity entity) {
    make_screen(graphics::yellow, entity);
};
```

Check if the current player won the game. If not, check if the game is not a tie.

Set the game state accordingly and call the proper functor.

```cpp
if (did_current_player_win_the_game()) {
    current_game_state_ = static_cast<game_state>(player_turn_);
    make_player_win_screen(grid_entity_);
} else if (is_tie()) {
    current_game_state_ = game_state::tie;
    make_tie_screen(grid_entity_);
}
```

The function `check_winning_condition` now appears as follows.

```cpp
void check_winning_condition() noexcept
{
    auto make_screen = [this](graphics::color clr_winner,
                              entt::entity entity) {
        auto &array_cmp = this->entity_registry_.get<geometry::vertex_array>(entity);
        for (auto &v : array_cmp.vertices) v.pixel_color = clr_winner;
        entity_registry_.replace<geometry::vertex_array>(entity, array_cmp.vertices, array_cmp.geometry_type);
    };

    auto make_player_win_screen = [this, make_screen](entt::entity entity) {
        auto winning_color = player_turn_ == player::x ? graphics::magenta : graphics::cyan;
        make_screen(winning_color, entity);
    };

    auto make_tie_screen = [make_screen](entt::entity entity) {
        make_screen(graphics::yellow, entity);
    };

    if (did_current_player_win_the_game()) {
        current_game_state_ = static_cast<game_state>(player_turn_);
        make_player_win_screen(grid_entity_);
    } else if (is_tie()) {
        current_game_state_ = game_state::tie;
        make_tie_screen(grid_entity_);
    }
}
```

Call this function in the end of `play_turn`.

```cpp
void play_turn(std::size_t row, std::size_t column) noexcept
{
    //! Retrieve constants
    auto constants = entity_registry_.ctx<tic_tac_toe_constants>();

    //! Which cell is clicked ?
    std::size_t index = row * constants.nb_cells_per_axis + column;

    //! Cell is available ?
    if (index < board_.size() && board_[index] == cell_state::empty) {

        //! Change state of the cell to the current player
        board_[index] = static_cast<cell_state>(player_turn_);

        //! Create x or o based on the current player
        player_turn_ == x ? create_x(entity_registry_, row, column) : create_o(entity_registry_, row, column);

        //! Check winning condition
        check_winning_condition();

        //! Switch player
        player_turn_ = (player_turn_ == player::x) ? player::o : player::x;
    }
}
```

The game is now complete.

#### During the Match

<div>

<img src="/tic-tac-toe-tutorial/tictactoe-playing.png">

</div>

#### When Player X Wins

<div>

<img src="/tic-tac-toe-tutorial/tictactoe-x-win.png">

</div>

#### When Player O Wins

<div>

<img src="/tic-tac-toe-tutorial/tictactoe-o-win.png">

</div>

#### A Tie: 

<div>

<img src="/tic-tac-toe-tutorial/tictactoe-tie.png">

</div>

#### The Complete Game Code

```cpp
#include <vector>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/graphics/component.layer.hpp>

//! For convenience
using namespace antara::gaming;

struct tic_tac_toe_constants
{
    tic_tac_toe_constants(std::size_t nb_cells_per_axis_, std::size_t width_, std::size_t height_) noexcept :
            nb_cells_per_axis(nb_cells_per_axis_),
            cell_width(width_ / nb_cells_per_axis),
            cell_height(height_ / nb_cells_per_axis)
    {
    }

    const std::size_t nb_cells_per_axis;
    const std::size_t cell_width;
    const std::size_t cell_height;
    const float grid_thickness{20.0f};
};

enum cell_state
{
    empty,
    player_x = 1,
    player_y = 2
};

struct reset_event
{

};

//! Contains all the functions used for logic and factory
namespace
{
    //! Factory for creating a tic-tac-toe grid
    entt::entity create_grid(entt::registry &registry) noexcept
    {
        //! Retrieve canvas information
        auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;

        //! Entity creation
        auto grid_entity = registry.create();

        //! the vertices
        std::vector<geometry::vertex> lines{8 * 4};

        //! Retrieve constants information
        auto[nb_cells, cell_width, cell_height, grid_thickness] = registry.ctx<tic_tac_toe_constants>();
        const auto half_thickness = grid_thickness * 0.5f;

        //! the loop to create the grid
        for (std::size_t counter = 0, i = 0; i <= nb_cells; ++i, counter += 4 * 2) {

            //! To avoid narrowing conversion
            auto idx = static_cast<float>(i);

            //! First and last ones should be a bit inside, otherwise half of it is out of the screen
            auto offset_x = 0.0f;
            auto offset_y = 0.0f;

            if (i == 0) {
                offset_x += half_thickness;
                offset_y += half_thickness;
            } else if (i == nb_cells) {
                offset_x -= half_thickness;
                offset_y -= half_thickness;
            }

            //! Prepare lines

            //! Vertical
            lines[counter + 0].pos = {offset_x + idx * cell_width - half_thickness, 0.f};
            lines[counter + 1].pos = {offset_x + idx * cell_width + half_thickness, 0.f};
            lines[counter + 2].pos = {offset_x + idx * cell_width + half_thickness, canvas_height};
            lines[counter + 3].pos = {offset_x + idx * cell_width - half_thickness, canvas_height};

            //! Horizontal
            lines[counter + 4].pos = {offset_x + 0, offset_y + idx * cell_height - half_thickness};
            lines[counter + 5].pos = {offset_x + canvas_width, offset_y + idx * cell_height - half_thickness};
            lines[counter + 6].pos = {offset_x + canvas_width, offset_y + idx * cell_height + half_thickness};
            lines[counter + 7].pos = {offset_x + 0, offset_y + idx * cell_height + half_thickness};
        }

        //! Assign the vertex array to the grid entity
        registry.assign<geometry::vertex_array>(grid_entity, lines, geometry::vertex_geometry_type::quads);

        //! Assign the game_scene tag to the grid_entity (_hs means hashed_string)
        registry.assign<entt::tag<"game_scene"_hs>>(grid_entity);

        //! Draw the grid on the deepest layer, here 0.
        registry.assign<graphics::layer<0>>(grid_entity);

        //! give back the fresh entity
        return grid_entity;
    }

    std::vector<cell_state> create_board(std::size_t nb_cells_per_axis)
    {
        std::vector<cell_state> board(nb_cells_per_axis * nb_cells_per_axis, cell_state::empty);
        return board;
    }

    void create_x(entt::registry &entity_registry, std::size_t row, std::size_t column) noexcept
    {
        auto[_, cell_width, cell_height, grid_thickness] = entity_registry.ctx<tic_tac_toe_constants>();
        const auto half_box_side = static_cast<float>(std::fmin(cell_width, cell_height) * 0.25f);
        const auto center_x = static_cast<float>(cell_width * 0.5 + column * cell_width);
        const auto center_y = static_cast<float>(cell_height * 0.5 + row * cell_height);

        auto x_entity = entity_registry.create();
        std::vector<geometry::vertex> lines{2 * 4};

        for (auto &&current_vertex: lines) current_vertex.pixel_color = graphics::magenta;

        const auto half_thickness = grid_thickness * 0.5f;

        // Top-left to Bottom-right
        lines[0].pos = {center_x - half_box_side - half_thickness, center_y - half_box_side};
        lines[1].pos = {center_x - half_box_side + half_thickness, center_y - half_box_side};
        lines[2].pos = {center_x + half_box_side + half_thickness, center_y + half_box_side};
        lines[3].pos = {center_x + half_box_side - half_thickness, center_y + half_box_side};


        // Top-right to Bottom-left
        lines[4].pos = {center_x + half_box_side - half_thickness, center_y - half_box_side};
        lines[5].pos = {center_x + half_box_side + half_thickness, center_y - half_box_side};
        lines[6].pos = {center_x - half_box_side + half_thickness, center_y + half_box_side};
        lines[7].pos = {center_x - half_box_side - half_thickness, center_y + half_box_side};

        entity_registry.assign<geometry::vertex_array>(x_entity, lines, geometry::vertex_geometry_type::quads);
        entity_registry.assign<entt::tag<"game_scene"_hs>>(x_entity);
        entity_registry.assign<entt::tag<"player_x"_hs>>(x_entity);
        entity_registry.assign<graphics::layer<1>>(x_entity);
    }

    void create_o(entt::registry &entity_registry, std::size_t row, std::size_t column) noexcept
    {
        auto constants = entity_registry.ctx<tic_tac_toe_constants>();
        const auto half_box_side = static_cast<float>(std::fmin(constants.cell_width, constants.cell_height) * 0.25f);
        const auto center_x = static_cast<float>(constants.cell_width * 0.5 + column * constants.cell_width);
        const auto center_y = static_cast<float>(constants.cell_height * 0.5 + row * constants.cell_height);

        auto o_entity = geometry::blueprint_circle(entity_registry, half_box_side, graphics::transparent,
                                                   transform::position_2d(center_x, center_y),
                                                   graphics::outline_color(constants.grid_thickness, graphics::cyan));

        entity_registry.assign<entt::tag<"game_scene"_hs>>(o_entity);
        entity_registry.assign<graphics::layer<1>>(o_entity);
    }
}

class tic_tac_toe_logic final : public ecs::logic_update_system<tic_tac_toe_logic>
{
public:

    void update() noexcept final
    {}

    void on_mouse_button_pressed(const event::mouse_button_pressed &evt) noexcept
    {
        if (current_game_state_ == running) {
            //! Retrieve game constants.
            auto constants = entity_registry_.ctx<tic_tac_toe_constants>();

            //! Play one turn of the Tic-Tac-Toe
            play_turn(evt.y / constants.cell_height, evt.x / constants.cell_width);
        } else {
            //! Reset the game
            this->dispatcher_.trigger<reset_event>();
        }
    }

    tic_tac_toe_logic(entt::registry &registry, entt::entity grid_entity, std::vector<cell_state> board) noexcept
            : system(registry), grid_entity_(grid_entity), board_(std::move(board))
    {
        //! Stateless system
        this->disable();

        //! Subscribe to mouse_button event
        this->dispatcher_.sink<event::mouse_button_pressed>().connect<&tic_tac_toe_logic::on_mouse_button_pressed>(
                *this);
    }

    ~tic_tac_toe_logic() noexcept final
    {
        this->dispatcher_.sink<event::mouse_button_pressed>().disconnect(*this);
    }

private:
    //! Game logic
    [[nodiscard]] bool did_current_player_win_the_game() const noexcept
    {
        std::size_t row_count{0u}, column_count{0u}, diag1_count{0u}, diag2_count{0u};
        auto[nb_cells, cell_width, cell_height, _] = entity_registry_.ctx<tic_tac_toe_constants>();
        for (std::size_t i = 0; i < nb_cells; ++i) {
            for (std::size_t j = 0; j < nb_cells; ++j) {
                //! Check rows
                if (board_[i * nb_cells + j] == static_cast<cell_state>(player_turn_))
                    row_count++;

                //! Check columns
                if (board_[j * nb_cells + i] == static_cast<cell_state>(player_turn_))
                    column_count++;
            }

            //! Check condition
            if (row_count >= nb_cells || column_count >= nb_cells) {
                return true;
            }

            //! Reset rows and columns
            row_count = 0u, column_count = 0u;

            //! Diag1 count
            if (board_[i * nb_cells + i] == static_cast<cell_state>(player_turn_))
                diag1_count++;

            //! Second diag count
            if (board_[i * nb_cells + nb_cells - i - 1] == static_cast<cell_state>(player_turn_))
                diag2_count++;
        }

        //! Condition
        return diag1_count >= nb_cells || diag2_count >= nb_cells;
    }

    [[nodiscard]] bool is_tie() const noexcept
    {
        return std::count(begin(board_), end(board_), cell_state::empty) == 0;
    }

    void check_winning_condition() noexcept
    {
        auto make_screen = [this](graphics::color clr_winner,
                                  entt::entity entity) {
            auto &array_cmp = this->entity_registry_.get<geometry::vertex_array>(entity);
            for (auto &v : array_cmp.vertices) v.pixel_color = clr_winner;
            entity_registry_.replace<geometry::vertex_array>(entity, array_cmp.vertices, array_cmp.geometry_type);
        };

        auto make_player_win_screen = [this, make_screen](entt::entity entity) {
            auto winning_color = player_turn_ == player::x ? graphics::magenta : graphics::cyan;
            make_screen(winning_color, entity);
        };

        auto make_tie_screen = [make_screen](entt::entity entity) {
            make_screen(graphics::yellow, entity);
        };

        if (did_current_player_win_the_game()) {
            current_game_state_ = static_cast<game_state>(player_turn_);
            make_player_win_screen(grid_entity_);
        } else if (is_tie()) {
            current_game_state_ = game_state::tie;
            make_tie_screen(grid_entity_);
        }
    }

    void play_turn(std::size_t row, std::size_t column) noexcept
    {
        //! Retrieve constants
        auto constants = entity_registry_.ctx<tic_tac_toe_constants>();

        //! Which cell is clicked ?
        std::size_t index = row * constants.nb_cells_per_axis + column;

        //! Cell is available ?
        if (index < board_.size() && board_[index] == cell_state::empty) {

            //! Change state of the cell to the current player
            board_[index] = static_cast<cell_state>(player_turn_);

            //! Create x or o based on the current player
            player_turn_ == x ? create_x(entity_registry_, row, column) : create_o(entity_registry_, row, column);

            //! Check winning condition
            check_winning_condition();

            //! Switch player
            player_turn_ = (player_turn_ == player::x) ? player::o : player::x;
        }
    }

private:
    //! Private enums
    enum game_state
    {
        running,
        player_x_won = 1,
        player_y_won = 2,
        tie,
        quit
    };

    enum player
    {
        x = 1,
        o = 2
    };

private:
    //! Private members variable
    entt::entity grid_entity_{entt::null};
    std::vector<cell_state> board_;
    game_state current_game_state_{game_state::running};
    player player_turn_{player::x};
};

//! Provide the system with a name
REFL_AUTO(type(tic_tac_toe_logic));

class game_scene final : public scenes::base_scene
{
public:
    game_scene(entt::registry &entity_registry) noexcept : base_scene(entity_registry)
    {
        //! Subscribe to reset event
        this->dispatcher_.sink<reset_event>().connect<&game_scene::on_reset_event>(*this);
        //! Retrieve canvas information
        auto[canvas_width, canvas_height] = entity_registry_.ctx<graphics::canvas_2d>().canvas.size.to<math::vec2u>();

        //! Set the constants that will be used in the program
        auto &tictactoe_constants = entity_registry_.set<tic_tac_toe_constants>(3ull, canvas_width, canvas_height);

        //! Create the grid of the tic tac toe
        auto grid_entity = create_grid(entity_registry_);

        //! Create the board of the tic tac toe
        auto board = create_board(tictactoe_constants.nb_cells_per_axis);

        //! Create the logic game system and give the fresh grid entity and the fresh board.
        this->system_manager_.create_system<tic_tac_toe_logic>(grid_entity, board);
    }

    //! This function will not be used, because tic tac toe doesn't need an update every frame.
    void update() noexcept final
    {}


    //! The scene name
    std::string scene_name() noexcept final
    {
        return "game_scene";
    }

    ~game_scene() noexcept final
    {
        //! Retrieve the collection of entities from the game scene
        auto view = entity_registry_.view<entt::tag<"game_scene"_hs>>();

        //! Iterate the collection and destroy each entities
        entity_registry_.destroy(view.begin(), view.end());

        //! Unset the tic tac toe constants
        entity_registry_.unset<tic_tac_toe_constants>();
    }

    //! Callback
    void on_reset_event(const reset_event &) noexcept
    {
        entt::registry &registry = this->entity_registry_;
        this->~game_scene();
        new(this) game_scene(registry);
    }

private:
    ecs::system_manager system_manager_{entity_registry_};
};

//! The game world
struct tic_tac_toe_world : world::app
{
    //! The game entry point
    tic_tac_toe_world() noexcept
    {
        //! Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        //! Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        //! Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        //! Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};

int main()
{
    //! Declare the world
    tic_tac_toe_world game;

    //! Run the game
    return game.run();
}
```
