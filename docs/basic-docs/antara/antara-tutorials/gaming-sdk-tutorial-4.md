# Tutorial: Flappy Bird

Please become familiar with the [Getting Started](../../../basic-docs/antara/antara-tutorials/gaming-sdk-tutorial-0.html) tutorial before beginning this tutorial.

## Introduction

This tutorial guides the reader in creating a simple game of Flappy Bird in relation to Komodo technology.

## Set Up the Executable, Window, and Game Scene

Create a folder called `flappy-bird` for the project, and create a subfolder called `assets` inside.

Within the `assets` folder create a `textures` subfolder for storing the `player.png` image.

Also in the `assets` folder, create another subfolder called `data`, and within this, create two subfolders: `linux` and `osx` to store utility files required to install the game on targeted systems.

#### The Linux Folder

In the `Linux` folder three files are required.  

- komodo_icon.png 
  - (these are the icons of the game) 
- org.antara.gaming.sfml.flappybird.appdata.xml
  - (xml definition for the game) 
- org.antara.gaming.sfml.flappybird.desktop 
  - (desktop file for Linux)

Here is the icon of the game for the tutorials:

<div>

<img src="/flappy-bird-tutorial/komodo_icon.png">

</div>

Here is the xml file:

```xml
<component type="desktop-application">
    <id>org.antara.gaming.sfml.flappybird.desktop</id>
    <metadata_license>MIT</metadata_license>
    <project_license>MIT</project_license>
    <name>flappy-bird</name>
    <summary>flappy-bird tutorial antara gaming sdk</summary>
    <description>
        <p>Written in c++17</p>
    </description>
    <launchable type="desktop-id">org.antara.gaming.sfml.flappybird.desktop</launchable>
    <url type="homepage">https://github.com/KomodoPlatform/antara-gaming-sdk</url>
    <screenshots>
        <screenshot type="default">
            <image>https://www.freedesktop.org/software/appstream/docs/images/scr-examples/geany-good.png</image>
        </screenshot>
    </screenshots>
    <provides>
        <id>org.antara.gaming.sfml.flappybird.desktop</id>
    </provides>
</component>
```

Here is the desktop file:

```
[Desktop Entry]
Type=Application
Name=flappy-bird
Exec=flappy-bird
Icon=komodo_icon
Categories=Game;
```

#### The OSX Folder

The `OSX` folder requires four files.

- kmd_logo.icns
  - (icon osx format of the game) 
- Packaging_CMakeDMGBackground.tif
  - (dmg image background) 
- Packaging_CMakeDMGSetup.scpt
  - (OSX Apple script for the packaging) 
- sfml_flappybird_install.cmake
  - (CMake script for the bundling)

[Click here](/flappy-bird-tutorial/kmd_logo.icns) to download kmd_logo.icns.

[Click here](/flappy-bird-tutorial/Packaging_CMakeDMGBackground.tif) to download Packaging_CMakeDMGBackground.tif.

The AppleScript:

```cmake
on run argv
  set image_name to item 1 of argv

  tell application "Finder"
  tell disk image_name

    -- wait for the image to finish mounting
    set open_attempts to 0
    repeat while open_attempts < 4
      try
        open
          delay 1
          set open_attempts to 5
        close
      on error errStr number errorNumber
        set open_attempts to open_attempts + 1
        delay 10
      end try
    end repeat
    delay 5

    -- open the image the first time and save a DS_Store with just
    -- background and icon setup
    open
      set current view of container window to icon view
      set theViewOptions to the icon view options of container window
      set background picture of theViewOptions to file ".background:background.tif"
      set arrangement of theViewOptions to not arranged
      set icon size of theViewOptions to 128
      delay 5
    close

    -- next setup the position of the app and Applications symlink
    -- plus hide all the window decorationPackaging_CMakeDMGBackground.tif
    open
      update without registering applications
      tell container window
        set sidebar width to 0
        set statusbar visible to false
        set toolbar visible to false
        set the bounds to { 400, 100, 900, 465 }
        set position of item "flappy-bird.app" to { 133, 200 }
        set position of item "Applications" to { 378, 200 }
      end tell
      update without registering applications
      delay 5
    close

    -- one last open and close to verify that everything looks correct
    open
      delay 5
    close

  end tell
  delay 1
end tell
end run
```

The CMake script:

```cmake
if (APPLE)
    set_target_properties(${PROJECT_NAME} PROPERTIES
            MACOSX_BUNDLE_BUNDLE_NAME "${PROJECT_NAME}"
            RESOURCE data/osx/${PROJECT_NAME}.icns
            MACOSX_BUNDLE_ICON_FILE ${PROJECT_NAME}
            MACOSX_BUNDLE_SHORT_VERSION_STRING 0.0.1
            MACOSX_BUNDLE_LONG_VERSION_STRING 0.0.1
            MACOSX_BUNDLE_INFO_PLIST "${PROJECT_SOURCE_DIR}/cmake/MacOSXBundleInfo.plist.in")
    add_custom_command(TARGET ${PROJECT_NAME}
            POST_BUILD COMMAND
            ${CMAKE_INSTALL_NAME_TOOL} -add_rpath "@executable_path/../Frameworks/"
            $<TARGET_FILE:${PROJECT_NAME}>)
endif ()

if (APPLE)
    install(TARGETS ${PROJECT_NAME}
            BUNDLE DESTINATION . COMPONENT Runtime
            RUNTIME DESTINATION bin COMPONENT Runtime
            )

    # Note Mac specific extension .app
    set(APPS "\${CMAKE_INSTALL_PREFIX}/${PROJECT_NAME}.app")

    # Directories to look for dependencies
    set(DIRS ${CMAKE_BINARY_DIR})

    install(CODE "include(BundleUtilities)
    fixup_bundle(\"${APPS}\" \"\" \"${DIRS}\")")

    set(CPACK_GENERATOR "DRAGNDROP")
    set(CPACK_DMG_DS_STORE_SETUP_SCRIPT "${CMAKE_CURRENT_SOURCE_DIR}/data/osx/Packaging_CMakeDMGSetup.scpt")
    set(CPACK_DMG_BACKGROUND_IMAGE "${CMAKE_CURRENT_SOURCE_DIR}/data/osx/Packaging_CMakeDMGBackground.tif")
    set(CPACK_PACKAGE_NAME "${PROJECT_NAME}")
    include(CPack)
endif ()
```

#### Other Build Files

In the `flappy-bird` directory, create a text file and save it as `CMakeLists.txt`.

This file has the following items: the name of the project, the creation of the executable, a link to the SDK, moving of the assets, the C++ standard that will be used, and any extra modules required.

Below is the `CMakeLists.txt` file.

```cmake
if (${CMAKE_SOURCE_DIR} STREQUAL ${CMAKE_BINARY_DIR})
    message(FATAL_ERROR "Prevented in-tree build. Please create a build directory outside of the source code and call cmake from there")
endif ()

##! Minimum version of the CMake.
cmake_minimum_required(VERSION 3.14)

##! C++ Standard needed by the SDK is 17
set(CMAKE_CXX_STANDARD 17)

##! The Project title -- flappy-bird.
project(flappy-bird DESCRIPTION "An awesome flappy-bird" LANGUAGES CXX VERSION 1.0.0)

##! The SDK need's clang as main compiler.
if (NOT "${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
    if (NOT "${CMAKE_CXX_COMPILER_ID}" STREQUAL "AppleClang")
        message(FATAL_ERROR "Only Clang is supported (minimum LLVM 8.0)")
    endif()
endif ()

##! Inform the SDK if the machine is on Linux
if (${CMAKE_SYSTEM_NAME} STREQUAL "Linux")
    set(LINUX TRUE)
endif ()

##! Include the module from CMake for fetching dependencies
include(FetchContent)

##! Declare information about the dependance to fetch.
FetchContent_Declare(
        antara-gaming-sdk
        URL https://github.com/KomodoPlatform/antara-gaming-sdk/archive/master.zip
)

##! Set extra modules from the SDK to use -- the SFML module here
set(USE_SFML_ANTARA_WRAPPER ON)

##! Fetch the dependence
FetchContent_MakeAvailable(antara-gaming-sdk)

##! Calling this macros provided by the sdk will, if the local machine runs Apple, init the environment for this OS (std::filesystem).
init_antara_env()

##! Get basis assets (default fonts, etc)
get_resources_basics_assets(${CMAKE_CURRENT_SOURCE_DIR})

##! Osx bundle icon
set(ICON)
configure_icon_osx(data/osx/kmd_logo.icns ICON kmd_logo.icns)

##! Create the executable with the project name
add_executable(${PROJECT_NAME} MACOSX_BUNDLE ${ICON} flappy-bird.cpp)

##! Linux assets
magic_game_app_image_generation("${CMAKE_CURRENT_SOURCE_DIR}/data/linux"
        "org.antara.gaming.sfml.flappybird.desktop"
        "org.antara.gaming.sfml.flappybirds.appdata.xml"
        "komodo_icon.png"
        flappy-bird
        AntaraFlappyBirdAppDir
        ${CMAKE_CURRENT_SOURCE_DIR}/assets
        )

##! Setting output directory
set_target_properties(${PROJECT_NAME}
        PROPERTIES
        RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin/"
        )

##! Link the SDK modules to use to the executable
target_link_libraries(${PROJECT_NAME} PUBLIC antara::world antara::sfml antara::collisions)

##! Move the assets
if (WIN32)
    file(COPY assets DESTINATION ${CMAKE_BINARY_DIR}/bin/)
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

if (APPLE)
    file(COPY assets DESTINATION ${CMAKE_BINARY_DIR}/bin/${PROJECT_NAME}.app/Contents/Resources)
endif()
```

Create the input file for the application containing an empty main function (as below) and save the file as `flappy-bird.cpp`.

```cpp
int main() {
    return 0;
}
```

The project tree should now be as follows. 

```
./flappy-bird
├── assets
│  ├── config
│  │  └── game.config.maker.json
│  └── textures
│     └── player.png
│  └── fonts
│     └── sansation.ttf
├── CMakeLists.txt
├── data
│  ├── linux
│  │  ├── komodo_icon.png
│  │  ├── org.antara.gaming.sfml.flappybird.appdata.xml
│  │  └── org.antara.gaming.sfml.flappybird.desktop
│  └── osx
│     ├── kmd_logo.icns
│     ├── Packaging_CMakeDMGBackground.tif
│     ├── Packaging_CMakeDMGSetup.scpt
│     └── sfml_flappybird_install.cmake
└── flappy-bird.cpp
```

## Create a Game World

To create a world representing the world of the game, start by including the following header file.

```cpp
#include <antara/gaming/world/world.app.hpp>
```

Add a basic structure named `flappy_bird_world`.

This inherits from the `antara::gaming::world::app` class.

Use the namespace `antara::gaming` and `std::string_literals` for convenience.

Declare the new object in the body of the main function. Replace its return value with the return value of the game, as returned by the `run` function of the `class world::app`.

The following is the result.

```cpp
#include <antara/gaming/world/world.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept = default;
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```

#### Initiating the Graphics 

To compile and execute the program at this point would result only in an infinite loop.

Adding the graphics side of the application requires two modules: `antara::gaming::sfml::graphic_system` and `antara::gaming::sfml::input::system`. These have the following headers, respectively: `#include <antara/gaming/sfml/graphic.system.hpp>` and `#include <antara/gaming/sfml/input.system.hpp>`.

In the body of the constructor of the class `flappy_bird_world` load the graphic system and initialize the input system with the window from the graphic system.

```cpp
// Game entry point
flappy_bird_world() noexcept {
    // Load the graphical system
    auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

    // Load the input system with the window from the graphical system
    system_manager_.create_system<sfml::input_system>(graphic_system.get_window());
}
```

Compiling and running now creates a black window, which can be closed by pressing the close button on the window bar.

<div>

<img src="/flappy-bird-tutorial/black_window.png">

</div>

#### Create a Game Scene

To create a game scene using the scene manager include the header file `#include <antara/gaming/scenes/scene.manager.hpp>` and load the scene's manager system into the system manager.

```cpp
// Game entry point
struct flappy_bird_world : world::app {
    //! the game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();
    }
};
```

Create the `game_scene` class that inherits from the `base_scene` class. This class is the entry point of the game scene.

The concrete class must override several functions such as `update`, and `scene_name`.

Leave the `update` function empty for the time being.

The `scene_name` function returns the name of the scene.

```cpp
// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry) noexcept : base_scene(registry) {
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
    }
};
```

Load the game scene into the `scene_manager` using the `change_scene` member function.

```cpp
struct flappy_bird_world : world::app
{
    //! The game entry point
    flappy_bird_world() noexcept
    {
        //! Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        //! Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        //! Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};
```

The sprite for the bird requires the `sfml::resources_system`. Include the header file `#include <antara/gaming/sfml/resources.manager.hpp>` and load this in the world constructor.

```cpp
// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};
```

Compiling the game at this time still produces a black window, but this is now the game scene.

<div>

<img src="/flappy-bird-tutorial/black_window.png">

</div>

::: tip Note 

The scene system is a useful method to organize multiple screens of the game: **introduction scene**, **game scene**, **end-of-game scene**, etc.

:::

Here is the code at this stage of the tutorial.

```cpp
#include <random>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/sfml/resources.manager.hpp>
#include <antara/gaming/world/world.app.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry) noexcept : base_scene(registry) {
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
    }
};

// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```

## Create the Pipes

The following steps add the pipes that kill the Flappy Bird whenenver they touch each other. In the image below, note the two pipes that have a gap between them. This is a `column`.

<div>

<img src="/flappy-bird-tutorial/fb_column.png">

</div>

#### Create the Structs

Begin by developing the constant values. Keep these in a struct.

Observe the following example.

```cpp
// Constants
struct flappy_bird_constants {
    // Pipes
    const float gap_height{265.f};
    const float column_start_distance{700.f};
    const float column_min{0.2f};
    const float column_max{0.8f};
    const float column_thickness{100.f};
    const float column_distance{400.f};
    const std::size_t column_count{6};
    const float pipe_cap_extra_width{10.f};
    const float pipe_cap_height{50.f};
    const graphics::color pipe_color{92, 181, 61};
    const graphics::outline_color pipe_outline_color{2.0f, graphics::color{76, 47, 61}};
};
```

Add this to the `registry` in the `game_scene` constructor.

```cpp
// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry) noexcept : base_scene(registry) {
        // Set the constants that will be used in the program
        registry.set<flappy_bird_constants>();
    }
```

Create a struct to represent a single `pipe`. Instead of using a sprite, create graphics with basic shapes.

For example, a pipe has two parts: the `body` and the `cap`. The body is the long part of the pipe with a cap sitting at the tip. Both are green-rectangle entities, but with different sizes. 

Also, prepare a `destroy` function to destroy `body` and `cap` entities.

```cpp
// A Flappy Bird column which has two pipes
struct pipe {
    entt::entity body{entt::null};
    entt::entity cap{entt::null};

    // Destroy pipe
    void destroy(entt::registry &registry) {
        registry.destroy(body);
        registry.destroy(cap);
    }
};
```

Two of these pipes together are called a `column`. 

Make another struct which uses the `struct pipe`. 

In this struct, one instance of the `pipe` is the `top_pipe`, the other is the `bottom_pipe`.

Call the `destroy` function again, but this time the `destroy` function also has an entity parameter which will be the `column` entity itself.

```cpp
// Column is made of two pipes
struct column {
    // Entities representing the Flappy Bird pipes
    pipe top_pipe{entt::null};
    pipe bottom_pipe{entt::null};

    // Destroy pipes and this column
    void destroy(entt::registry &registry, entt::entity entity) {
        top_pipe.destroy(registry);
        bottom_pipe.destroy(registry);
        registry.destroy(entity);
    }
};
```

#### Create the Pipe Functions

The first function returns a random number. This randomly positions the gap between the pipes. Use `std::random_device`, `std::mt19937`,  and `std::uniform_real_distribution<float>` to this effect.

```cpp
// Random number generator
namespace {
    std::random_device rd;  // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    float random_float(float lower, float higher) {
        std::uniform_real_distribution<float> dist(lower, higher);
        return dist(gen);
    }
}
```

Tag each entity with the `game_scene` name.

Dynamic entities require a `dynamic` tag. This makes queries to dynamic entities easier when destroying entities at game reset. 

Since the tagging is repeated frequently, create a function to manage the tagging process. Adding this helper function to a namespace is convenient.

```cpp
namespace {
    void tag_game_scene(entt::registry &registry, entt::entity entity, bool dynamic = false) {
        // Tag game scene
        registry.assign<entt::tag<"game_scene"_hs>>(entity);

        // Tag dynamic
        if(dynamic) registry.assign<entt::tag<"dynamic"_hs>>(entity);
    }
}
```

The creation of the pipes requires another function to obtain a random starting position for the gap. This informs the logic of the place to start and end the top pipe, to include the gap, and then start and end the bottom pipe.

This function uses a few constants, such as `column_min` and `column_max`. 

`column_min` is for the top limit, `0.2` of the canvas height. 

`column_max` is for the bottom limit, `0.8` of the canvas height. Subtract `gap_height` from the `bottom_limit`, as this is the starting position (top position) of the gap. 

Once the limits are established, the function returns a random float value between the limits, using the random function defined previously. 

Add this function to the same namespace.

```cpp
// Returns a random gap start position Y
float get_random_gap_start_pos(const entt::registry &registry) {
    // Retrieve constants
    const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
    const auto constants = registry.ctx<flappy_bird_constants>();

    float top_limit = canvas_height * constants.column_min;
    float bottom_limit = canvas_height * constants.column_max - constants.gap_height;

    return random_float(top_limit, bottom_limit);
}
```

#### Construct the Pipes

The `create_pipe` function has `bool is_top, float pos_x, float gap_start_pos_y` parameters. 

`is_top` indicates if this is the top pipe or the bottom. 

`pos_x` is the horizontal position of the pipe.

`gap_start_pos_y` is the vertical start position of the gap, for example, the bottom edge of the top pipe.

Retrieve `canvas_height` and the constants.

```cpp
// Retrieve constants
const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
const auto constants = registry.ctx<flappy_bird_constants>();
```

Recall that the pipe is comprised of two parts: the body and the cap. 

Construct the body first. This is a rectangle, and therefore needs a center position and size.

To avoid complicated math, set the center of the rectangle at the screen edge.

Half of the pipe will be out of the view, but this visual optimization may be ignored for the purposes of this example tutorial.

The `X` value is `pos_x`, and the `Y` value is at the top of the screen, `0`, for the top pipe.

For the bottom pipe, the `Y` value is at the bottom edge of the screen, which is `canvas_height`.

```cpp
// PIPE BODY
// Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};
```

Body size however, is trickier. Size `X` is the column thickness, but size `Y` is different depending on whether the pipe in question is at the top or bottom of the screen.

For the top pipe, the start of the gap `gap_start_pos_y` should be the bottom of the rectangle. Half size is `gap_start_pos_y`, as the center of the rectangle is at 0. Full size is `gap_start_pos_y \* 2.0f`.

For the bottom pipe, the top of the rectangle is the end of the gap, `gap_start_pos_y + gap_height`. Half size is `canvas_height - (gap_start_pos_y + gap_height)`. Double this value for the full size: `(canvas_height - (gap_start_pos_y + constants.gap_height)) \* 2.0f`.

```cpp
// Size X is the column thickness,
// Size Y is the important part.
// If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
//  Half size is gap_start_pos_y, since the center of the rectangle is 0.
// If this is the bottom pipe, the top of the rectangle is located at gap_start_pos_y + gap_height
//  Half size is canvas_height - (gap_start_pos_y + gap_height)
// Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
math::vec2f body_size{constants.column_thickness,
                        is_top ?
                        gap_start_pos_y * 2.0f :
                        (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};
```

To construct the rectangle entity, use the blueprint function `geometry::blueprint_rectangle` and feed `pipe_color` and `pipe_outline_color` (which includes line thickness information).

```cpp
auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos, constants.pipe_outline_color);
```

#### Construct the Cap of the Pipe

The size of the cap is `column_thickness` plus `pipe_cap_extra_width`, as the cap is visually similar to the popular pipe design from Super Mario Brothers.

The height is pre-defined as `pipe_cap_height`.

```cpp
// PIPE CAP
// Prepare the pipe cap
// The size of the cap is defined in constants
math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};
```

The cap position is trickier. The `X` position is the same as the body, `body_pos.x()`, since the cap is centered. However, the `Y` position changes depending on whether the cap is for the top or bottom.

If the cap is at the top, the bottom line of the cap is alligned with bottom of the body, or start of the gap, as this is the same line.

Use the start of the gap minus half of the cap height, because the position is the center of the rectangle. This is defined as `gap_start_pos_y - constants.pipe_cap_height \* 0.5f`.

For the the bottom cap, the bottom of the gap is the same line as the top of the cap. The bottom of the gap is the gap start position plus the gap height: `gap_start_pos_y + constants.gap_height`. Add half of the pipe height again to the shift the pipe down, since the position is the center of the cap and the top of the cap must be alligned with the top of the body.

```cpp
// Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
// or start of the gap, use the start of the gap minus half of the cap height
transform::position_2d cap_pos{body_pos.x(),
                                is_top ?
                                gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
};
```

To construct the rectangle entity, use the blueprint function `geometry::blueprint_rectangle` and feed `pipe_color` and `pipe_outline_color` once again, with the color set to the same color as the body.

```cpp
auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos, constants.pipe_outline_color);
```

Define the draw order to make the cap appear in front of the body. Use `graphics::layer`. The higher value is the front, the lower is the back. Set `cap` as `layer<4>` and `body` as `layer<3>`.

```cpp
// Set layers, cap should be in front of body
registry.assign<graphics::layer<4>>(cap);
registry.assign<graphics::layer<3>>(body);
```

Tag both entities as `game_scene` and `dynamic` with the `tag_game_scene` function defined earlier. Return both inside `{ }` to automatically construct a `struct pipe`.

```cpp
tag_game_scene(registry, cap, true);
tag_game_scene(registry, body, true);

// Construct a pipe with the body and cap, and return it
return {body, cap};
```

The completed function appears as follows.

```cpp
// Factory for pipes. This requires information about whether the pipe is a top pipe, and the position x of the column, and the starting gap position Y
pipe create_pipe(entt::registry &registry, bool is_top, float pos_x, float gap_start_pos_y) {
    // Retrieve constants
    const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
    const auto constants = registry.ctx<flappy_bird_constants>();

    // PIPE BODY
    // Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
    transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};

    // Size X is the column thickness,
    // Size Y is the important part.
    // If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
    //  Half size is gap_start_pos_y since the center of the rectangle is at 0
    // If this is the bottom pipe, the top of the rectangle is at gap_start_pos_y + gap_height
    //  Half size is canvas_height - (gap_start_pos_y + gap_height)
    // Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
    math::vec2f body_size{constants.column_thickness,
                          is_top ?
                          gap_start_pos_y * 2.0f :
                          (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};

    auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos,
                                              constants.pipe_outline_color);

    // PIPE CAP
    // Prepare the pipe cap
    // Size of the cap is defined in constants
    math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};

    // Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
    // or start of the gap, use the start of the gap minus half of the cap height
    transform::position_2d cap_pos{body_pos.x(),
                                   is_top ?
                                   gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                   gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
    };

    // Construct the cap
    auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos,
                                             constants.pipe_outline_color);

    // Set layers, cap should be in front of body
    registry.assign<graphics::layer<4>>(cap);
    registry.assign<graphics::layer<3>>(body);
    tag_game_scene(registry, cap, true);
    tag_game_scene(registry, body, true);

    // Construct a pipe with body and cap and return it
    return {body, cap};
}
```

#### Create a Pipe

Use this functionality to build a full column (two pipes and a gap).

Make the function `void create_column(entt::registry &registry, float pos_x)` with a single parameter `pos_x` for the `X` position of the column.

Start by creating an empty entity.

```cpp
// Create a fresh entity for a new column
auto entity_column = registry.create();
```

Obtain a random vertical position for the start of the gap with the function created earlier, `get_random_gap_start_pos`.

```cpp
// Get a random gap start position Y, between pipes
float gap_start_pos_y = get_random_gap_start_pos(registry);
```

Create `top_pipe` and `bottom_pipe` with the `create_pipe` function. The only parameter that varies is the `is_top` boolean  — true for the `top_pipe` and false for `bottom_pipe`.

```cpp
// Create pipes, is_top variable is false for bottom one
auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);
```

Construct a `struct column` with these two, tag it with `column` name, then use the `tag_game_scene` function to tag it with `game_scene` and `dynamic`.

```cpp
// Make a column from these two pipes and mark it as "column"
registry.assign<column>(entity_column, top_pipe, bottom_pipe);
registry.assign<entt::tag<"column"_hs>>(entity_column);
tag_game_scene(registry, entity_column, true);
```

The completed function appears as follows.

```cpp
// Factory to create single column
void create_column(entt::registry &registry, float pos_x) noexcept {
    // Create a fresh entity for a new column
    auto entity_column = registry.create();

    // Get a random gap start position Y, between pipes
    float gap_start_pos_y = get_random_gap_start_pos(registry);

    // Create pipes, is_top variable is false for bottom one
    auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
    auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);

    // Make a column from these two pipes and mark it as "column"
    registry.assign<column>(entity_column, top_pipe, bottom_pipe);
    registry.assign<entt::tag<"column"_hs>>(entity_column);
    tag_game_scene(registry, entity_column, true);
}
```

Create a `create_columns` function to reuse this functionality.

Begin by retrieving the constants.

```cpp
// Retrieve constants
const auto constants = registry.ctx<flappy_bird_constants>();
```

Columns move towards the starting position of Flappy Bird from a distance. This animation requires a `column_start_distance` variable to add the offset. The animation also requires an additional `constants.column_thickness \* 2.0f` value to make sure the columns are out of the screen if `column_start_distance` is set as `canvas_width`.

```cpp
// Spawn columns far away
const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;
```

Use the `create_column` function in a `for loop` to create more columns. For count, use the `column_count` constant. To add distance between every column use the counter `i` which increments by one, and multiply `i` with `column_distance` to put each column further than the previous column. Add the `column_pos_offset` offset, also.

The loop appears as follows.

```cpp
// Create the columns
for (std::size_t i = 0; i < constants.column_count; ++i) {
    // Horizontal position (X) increases for every column, keeping the distance
    float pos_x = column_pos_offset + i * constants.column_distance;

    create_column(registry, pos_x);
}
```

The completed function appears as follows.

```cpp
// Factory for creating a Flappy Bird columns
void create_columns(entt::registry &registry) noexcept {
    // Retrieve constants
    const auto constants = registry.ctx<flappy_bird_constants>();

    // Spawn columns out of the screen, out of the canvas
    const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;

    // Create the columns
    for (std::size_t i = 0; i < constants.column_count; ++i) {
        // Horizontal position (X) increases for every column, keeping the distance
        float pos_x = column_pos_offset + i * constants.column_distance;

        create_column(registry, pos_x);
    }
}
```

Call this `create_columns` function at initialization. 

#### Dynamic Objects

Make an initialization function for dynamic objects.

```cpp
// Initialize dynamic objects, this function is called at start and resets
void init_dynamic_objects(entt::registry &registry) {
    create_columns(registry);
}
```

Call this in the `game_scene` constructor.

```cpp
game_scene(entt::registry &registry) noexcept : base_scene(registry) {
    // Set the constants that will be used in the program
    registry.set<flappy_bird_constants>();

    // Create everything
    init_dynamic_objects(registry);
}
```

The result is as follows.

<div>

<img src="/flappy-bird-tutorial/fb_column.png">

</div>

Here is the code up to this point in the tutorial.

```cpp
#include <random>
#include <antara/gaming/graphics/component.layer.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/sfml/resources.manager.hpp>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/graphics/component.sprite.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

// Constants
struct flappy_bird_constants {
    // Pipes
    const float gap_height{265.f};
    const float column_start_distance{700.f};
    const float column_min{0.2f};
    const float column_max{0.8f};
    const float column_thickness{100.f};
    const float column_distance{400.f};
    const std::size_t column_count{6};
    const float pipe_cap_extra_width{10.f};
    const float pipe_cap_height{50.f};
    const graphics::color pipe_color{92, 181, 61};
    const graphics::outline_color pipe_outline_color{2.0f, graphics::color{76, 47, 61}};
};

// Random number generator
namespace {
    std::random_device rd;  // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    float random_float(float lower, float higher) {
        std::uniform_real_distribution<float> dist(lower, higher);
        return dist(gen);
    }
}

// A Flappy Bird column which has two pipes
struct pipe {
    entt::entity body{entt::null};
    entt::entity cap{entt::null};

    // Destroy pipe
    void destroy(entt::registry &registry) {
        registry.destroy(body);
        registry.destroy(cap);
    }
};

// Column is made of two pipes
struct column {
    // Entities representing the Flappy Bird pipes
    pipe top_pipe{entt::null};
    pipe bottom_pipe{entt::null};

    // Destroy pipes and this column
    void destroy(entt::registry &registry, entt::entity entity) {
        top_pipe.destroy(registry);
        bottom_pipe.destroy(registry);
        registry.destroy(entity);
    }
};

// Logic functions
namespace {
    void tag_game_scene(entt::registry &registry, entt::entity entity, bool dynamic = false) {
        // Tag game scene
        registry.assign<entt::tag<"game_scene"_hs>>(entity);

        // Tag dynamic
        if(dynamic) registry.assign<entt::tag<"dynamic"_hs>>(entity);
    }

    // Returns a random gap start position Y
    float get_random_gap_start_pos(const entt::registry &registry) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        float top_limit = canvas_height * constants.column_min;
        float bottom_limit = canvas_height * constants.column_max - constants.gap_height;

        return random_float(top_limit, bottom_limit);
    }
}

// Factory functions
namespace {
    // Factory for pipes. This requires information about whether the pipe is a top pipe, and the position x of the column, and the starting gap position Y
    pipe create_pipe(entt::registry &registry, bool is_top, float pos_x, float gap_start_pos_y) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        // PIPE BODY
        // Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
        transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};

        // Size X is the column thickness,
        // Size Y is the important part.
        // If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
        //  Half size is gap_start_pos_y since the center of the rectangle is at 0
        // If this is the bottom pipe, the top of the rectangle is at gap_start_pos_y + gap_height
        //  Half size is canvas_height - (gap_start_pos_y + gap_height)
        // Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
        math::vec2f body_size{constants.column_thickness,
                              is_top ?
                              gap_start_pos_y * 2.0f :
                              (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};

        auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos,
                                                  constants.pipe_outline_color);

        // PIPE CAP
        // Prepare the pipe cap
        // Size of the cap is defined in constants
        math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};

        // Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
        // or start of the gap, use the start of the gap minus half of the cap height
        transform::position_2d cap_pos{body_pos.x(),
                                       is_top ?
                                       gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                       gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
        };

        // Construct the cap
        auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos,
                                                 constants.pipe_outline_color);

        // Set layers, cap should be in front of body
        registry.assign<graphics::layer<4>>(cap);
        registry.assign<graphics::layer<3>>(body);
        tag_game_scene(registry, cap, true);
        tag_game_scene(registry, body, true);

        // Construct a pipe with body and cap and return it
        return {body, cap};
    }

    // Factory to create single column
    void create_column(entt::registry &registry, float pos_x) noexcept {
        // Create a fresh entity for a new column
        auto entity_column = registry.create();

        // Get a random gap start position Y, between pipes
        float gap_start_pos_y = get_random_gap_start_pos(registry);

        // Create pipes, is_top variable is false for bottom one
        auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
        auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);

        // Make a column from these two pipes and mark it as "column"
        registry.assign<column>(entity_column, top_pipe, bottom_pipe);
        registry.assign<entt::tag<"column"_hs>>(entity_column);
        tag_game_scene(registry, entity_column, true);
    }

    // Factory for creating a Flappy Bird columns
    void create_columns(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Spawn columns out of the screen, out of the canvas
        const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;

        // Create the columns
        for (std::size_t i = 0; i < constants.column_count; ++i) {
            // Horizontal position (X) increases for every column, keeping the distance
            float pos_x = column_pos_offset + i * constants.column_distance;

            create_column(registry, pos_x);
        }
    }
}

// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry) noexcept : base_scene(registry) {
        // Set the constants that will be used in the program
        registry.set<flappy_bird_constants>();

        // Create everything
        init_dynamic_objects(registry);
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
    }

    // Initialize dynamic objects, this function is called at start and resets
    void init_dynamic_objects(entt::registry &registry) {
        create_columns(registry);
    }
};

// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```

## The Creation of the Background

Beautify the background by adding sky, ground, and grass.

The following is the objective.

<div>

<img src="/flappy-bird-tutorial/fb_background.png">

</div>

#### Create the Sky

Add the constants to the `struct flappy_bird_constants` thickness and colors.

```cpp
// Background
const float ground_thickness{100.0f};
const float grass_thickness{20.0f};
const graphics::color background_color{82, 189, 199};
const graphics::color ground_color{220, 209, 143};
const graphics::color grass_color{132, 227, 90};
const graphics::outline_color grass_outline_color{2.0f, graphics::color{76, 47, 61}};
```

Make a function called `create_background`.

Retrieve the constants and canvas size:

```cpp
// Retrieve constants
const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
const auto constants = registry.ctx<flappy_bird_constants>();
```

Create the sky as a simple blue rectangle.

The position is the center of the canvas.

```cpp
// The sky is the whole canvas, so the position is in the middle of the canvas
transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};
```

Set the size of the rectangle to the whole canvas (other visual elements will appear in the foreground).

```cpp
// The size is the full canvas
math::vec2f size{canvas_width, canvas_height};
```

Use the `geometry::blueprint_rectangle` blueprint again and use `background_color` from defined constants.

```cpp
auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
```

Set the sky rectangle to appear at `layer<1>` and tag the rectangle with `game_scene`.

```cpp
registry.assign<graphics::layer<1>>(sky);
tag_game_scene(registry, sky);
```

The following is the entire sky creation snippet.

```cpp
// Create Sky
{
    // The sky is the whole canvas, so the position is in the middle of the canvas
    transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};

    // The size is the full canvas
    math::vec2f size{canvas_width, canvas_height};

    auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
    registry.assign<graphics::layer<1>>(sky);
    tag_game_scene(registry, sky);
}
```

#### Create the Grass

Now we do the same thing, but for grass. X position is middle of the canvas, Y position is canvas height minus ground thickness because grass grows above the ground!

```cpp
// The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
// Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};
```

Size `Y` is constant `grass_thickness` and Size `X` is full `canvas_width` plus the outline thickness, to hide the left and right edges of the ground.

```cpp
// Size X is full canvas but the height is defined in constants
// Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};
```

Use `geometry::blueprint_rectangle` again and assign `layer<3>` to the rectangle, then tag it.

```cpp
auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos, constants.grass_outline_color);
registry.assign<graphics::layer<3>>(grass);
tag_game_scene(registry, grass);
```

Here is the completed grass creation snippet.

```cpp
// Create Grass
{
    // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
    // Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
    transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};

    // Size X is full canvas but the height is defined in constants
    // Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
    math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};

    auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos, constants.grass_outline_color);
    registry.assign<graphics::layer<3>>(grass);
    tag_game_scene(registry, grass);
}
```

#### Create the Ground

The `X` position is the middle of the canvas and the height is the canvas height minus half of the ground thickness (because the position is the center of the rectangle).

Size `X` is the canvas width, size `Y` is the ground thickness.

```cpp
// Create Ground
{
    // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
    // Position Y is at the bottom of the screen, so the height is the full canvas_height minus half of the ground thickness
    transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness * 0.5f};

    // Size X is full canvas but the height is defined in constants
    math::vec2f size{canvas_width, constants.ground_thickness};

    auto ground = geometry::blueprint_rectangle(registry, size, constants.ground_color, pos);
    registry.assign<graphics::layer<3>>(ground);
    tag_game_scene(registry, ground);
}
```

<!-- Sidd: I'm not sure I understood the sentence below correctly. Please correct, if necessary. -->

Notice that there are no tags for any of these `dynamic` objects. They are static and permanent.

The background creation function appears as follows.

```cpp
// Factory for creating a Flappy Bird background
void create_background(entt::registry &registry) noexcept {
    // Retrieve constants
    const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
    const auto constants = registry.ctx<flappy_bird_constants>();

    // Create Sky
    {
        // The sky is the whole canvas, so the position is in the middle of the canvas
        transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};

        // The size is the full canvas
        math::vec2f size{canvas_width, canvas_height};

        auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
        registry.assign<graphics::layer<1>>(sky);
        tag_game_scene(registry, sky);
    }

    // Create Grass
    {
        // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
        // Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
        transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};

        // Size X is full canvas but the height is defined in constants
        // Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
        math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};

        auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos,
                                                   constants.grass_outline_color);
        registry.assign<graphics::layer<3>>(grass);
        tag_game_scene(registry, grass);
    }

    // Create Ground
    {
        // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
        // Position Y is at the bottom of the screen, so the height is the full canvas_height minus half of the ground thickness
        transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness * 0.5f};

        // Size X is full canvas but the height is defined in constants
        math::vec2f size{canvas_width, constants.ground_thickness};

        auto ground = geometry::blueprint_rectangle(registry, size, constants.ground_color, pos);
        registry.assign<graphics::layer<3>>(ground);
        tag_game_scene(registry, ground);
    }
}
```

Call this function inside the `game_scene` constructor.

```cpp
game_scene(entt::registry &registry) noexcept : base_scene(registry) {
    // Set the constants that will be used in the program
    registry.set<flappy_bird_constants>();

    // Create everything
    create_background(registry);
    init_dynamic_objects(registry);
}
```

The result is as follows.

<div>

<img src="/flappy-bird-tutorial/fb_background.png">

</div>

Here is the full code up to this point of the tutorial.

```cpp
#include <random>
#include <antara/gaming/graphics/component.layer.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/sfml/resources.manager.hpp>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/graphics/component.sprite.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

// Constants
struct flappy_bird_constants {
    // Pipes
    const float gap_height{265.f};
    const float column_start_distance{700.f};
    const float column_min{0.2f};
    const float column_max{0.8f};
    const float column_thickness{100.f};
    const float column_distance{400.f};
    const std::size_t column_count{6};
    const float pipe_cap_extra_width{10.f};
    const float pipe_cap_height{50.f};
    const graphics::color pipe_color{92, 181, 61};
    const graphics::outline_color pipe_outline_color{2.0f, graphics::color{76, 47, 61}};

    // Background
    const float ground_thickness{100.0f};
    const float grass_thickness{20.0f};
    const graphics::color background_color{82, 189, 199};
    const graphics::color ground_color{220, 209, 143};
    const graphics::color grass_color{132, 227, 90};
    const graphics::outline_color grass_outline_color{2.0f, graphics::color{76, 47, 61}};
};

// Random number generator
namespace {
    std::random_device rd;  // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    float random_float(float lower, float higher) {
        std::uniform_real_distribution<float> dist(lower, higher);
        return dist(gen);
    }
}

// A Flappy Bird column which has two pipes
struct pipe {
    entt::entity body{entt::null};
    entt::entity cap{entt::null};

    // Destroy pipe
    void destroy(entt::registry &registry) {
        registry.destroy(body);
        registry.destroy(cap);
    }
};

// Column is made of two pipes
struct column {
    // Entities representing the Flappy Bird pipes
    pipe top_pipe{entt::null};
    pipe bottom_pipe{entt::null};

    // Destroy pipes and this column
    void destroy(entt::registry &registry, entt::entity entity) {
        top_pipe.destroy(registry);
        bottom_pipe.destroy(registry);
        registry.destroy(entity);
    }
};

// Logic functions
namespace {
    void tag_game_scene(entt::registry &registry, entt::entity entity, bool dynamic = false) {
        // Tag game scene
        registry.assign<entt::tag<"game_scene"_hs>>(entity);

        // Tag dynamic
        if(dynamic) registry.assign<entt::tag<"dynamic"_hs>>(entity);
    }

    // Returns a random gap start position Y
    float get_random_gap_start_pos(const entt::registry &registry) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        float top_limit = canvas_height * constants.column_min;
        float bottom_limit = canvas_height * constants.column_max - constants.gap_height;

        return random_float(top_limit, bottom_limit);
    }
}

// Factory functions
namespace {
    // Factory for pipes. This requires information about whether the pipe is a top pipe, and the position x of the column, and the starting gap position Y
    pipe create_pipe(entt::registry &registry, bool is_top, float pos_x, float gap_start_pos_y) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        // PIPE BODY
        // Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
        transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};

        // Size X is the column thickness,
        // Size Y is the important part.
        // If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
        //  Half size is gap_start_pos_y since the center of the rectangle is at 0
        // If this is the bottom pipe, the top of the rectangle is at gap_start_pos_y + gap_height
        //  Half size is canvas_height - (gap_start_pos_y + gap_height)
        // Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
        math::vec2f body_size{constants.column_thickness,
                              is_top ?
                              gap_start_pos_y * 2.0f :
                              (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};

        auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos,
                                                  constants.pipe_outline_color);

        // PIPE CAP
        // Prepare the pipe cap
        // Size of the cap is defined in constants
        math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};

        // Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
        // or start of the gap, use the start of the gap minus half of the cap height
        transform::position_2d cap_pos{body_pos.x(),
                                       is_top ?
                                       gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                       gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
        };

        // Construct the cap
        auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos,
                                                 constants.pipe_outline_color);

        // Set layers, cap should be in front of body
        registry.assign<graphics::layer<4>>(cap);
        registry.assign<graphics::layer<3>>(body);
        tag_game_scene(registry, cap, true);
        tag_game_scene(registry, body, true);

        // Construct a pipe with body and cap and return it
        return {body, cap};
    }

    // Factory to create single column
    void create_column(entt::registry &registry, float pos_x) noexcept {
        // Create a fresh entity for a new column
        auto entity_column = registry.create();

        // Get a random gap start position Y, between pipes
        float gap_start_pos_y = get_random_gap_start_pos(registry);

        // Create pipes, is_top variable is false for bottom one
        auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
        auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);

        // Make a column from these two pipes and mark it as "column"
        registry.assign<column>(entity_column, top_pipe, bottom_pipe);
        registry.assign<entt::tag<"column"_hs>>(entity_column);
        tag_game_scene(registry, entity_column, true);
    }

    // Factory for creating a Flappy Bird column
    void create_columns(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Spawn columns out of the screen, out of the canvas
        const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;

        // Create the columns
        for (std::size_t i = 0; i < constants.column_count; ++i) {
            // Horizontal position (X) increases for every column, keeping the distance
            float pos_x = column_pos_offset + i * constants.column_distance;

            create_column(registry, pos_x);
        }
    }

    // Factory for creating a Flappy Bird background
    void create_background(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Create Sky
        {
            // The sky is the whole canvas, so the position is in the middle of the canvas
            transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};

            // The size is the full canvas
            math::vec2f size{canvas_width, canvas_height};

            auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
            registry.assign<graphics::layer<1>>(sky);
            tag_game_scene(registry, sky);
        }

        // Create Grass
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};

            // Size X is full canvas but the height is defined in constants
            // Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
            math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};

            auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos,
                                                       constants.grass_outline_color);
            registry.assign<graphics::layer<3>>(grass);
            tag_game_scene(registry, grass);
        }

        // Create Ground
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the bottom of the screen, so the height is the full canvas_height minus half of the ground thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness * 0.5f};

            // Size X is full canvas but the height is defined in constants
            math::vec2f size{canvas_width, constants.ground_thickness};

            auto ground = geometry::blueprint_rectangle(registry, size, constants.ground_color, pos);
            registry.assign<graphics::layer<3>>(ground);
            tag_game_scene(registry, ground);
        }
    }
}

// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry) noexcept : base_scene(registry) {
        // Set the constants that will be used in the program
        registry.set<flappy_bird_constants>();

        // Create everything
        create_background(registry);
        init_dynamic_objects(registry);
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
    }

    // Initialize dynamic objects, this function is called at start and resets
    void init_dynamic_objects(entt::registry &registry) {
        create_columns(registry);
    }
};

// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_), true);
    }
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```

## Move, Destroy, and Respawn Pipes

To create the illusion of movement, Flappy Bird stays still with respect to the horizontal axis and pipes move to the left. (This eliminates the need for a camera that follows the bird.)

#### Moving the Columns

Define a constant to `flappy_bird_constants` named `scroll_speed`. This is the speed of movement of pipes.

```cpp
const float scroll_speed{200.f};
```

Smooth movement requires a position update at every tick. This requires a `ecs::logic_update_system` value. Call this `column_logic`.

```cpp
// Column Logic System
class column_logic final : public ecs::logic_update_system<column_logic> {
public:
    explicit column_logic(entt::registry &registry) noexcept : system(registry) {
        disable();
    }
```

Make a `move_pipe` function that accepts as a parameter a reference to a `struct pipe` object. Retrieve constants to access the scroll speed.

```cpp
// Move the pipe and return the x position
float move_pipe(entt::registry &registry, pipe &pipe) {
    // Retrieve constants
    const auto constants = registry.ctx<flappy_bird_constants>();
```

To move the pipe the logic needs to to know the pipe's current position. Retrieve the body position of the pipe (cap is also the same, so the body data is enough). 

Pipes move only along the X axis, horizontally. 

```cpp
// Get current position of the pipe
auto pos = registry.get<transform::position_2d>(pipe.body);
```

Calculate the new position `X` by adding `scroll_speed`. Use the `-` operator, because a lower position value moves to the left side. 

Conceptually, this is the same as subtracting from the `X` position to make the pipe move towards the left side. 

Multiply `scroll_speed` with delta time `timer::time_step::get_fixed_delta_time()`, so that the movement occurs over time and the frame changes are smoother. `scroll_speed` is actually the amount of pixels the object moves in `1 second`.

```cpp
// Shift pos X to the left by scroll_speed, but multiply the value by dt, as this occurs many times per second
// Delta time ensures that the movement occurs over time, so that over the course of one second the movement covers scroll_speed pixels
auto new_pos_x = pos.x() - constants.scroll_speed * timer::time_step::get_fixed_delta_time();
```

Update both body and cap positions by replacing entity’s `transform::position_2d`.

```cpp
// Set the new position value
registry.replace<transform::position_2d>(pipe.body, new_pos_x, pos.y());

// Set cap position too
auto cap_pos = registry.get<transform::position_2d>(pipe.cap);
registry.replace<transform::position_2d>(pipe.cap, new_pos_x, cap_pos.y());
```

Return the new position.

```cpp
// Return the information about whether this pipe is out of the screen
return new_pos_x;
```

The completed function is now as follows.

```cpp
// Move the pipe and return the x position
float move_pipe(entt::registry &registry, pipe &pipe) {
    // Retrieve constants
    const auto constants = registry.ctx<flappy_bird_constants>();

    // Get current position of the pipe
    auto pos = registry.get<transform::position_2d>(pipe.body);

    // Shift pos X to the left by scroll_speed, but multiply the value by dt, as this occurs many times per second
    // Delta time ensures that the movement occurs over time, so that over the course of one second the movement covers scroll_speed pixels
    auto new_pos_x = pos.x() - constants.scroll_speed * timer::time_step::get_fixed_delta_time();

    // Set the new position value
    registry.replace<transform::position_2d>(pipe.body, new_pos_x, pos.y());

    // Set cap position too
    auto cap_pos = registry.get<transform::position_2d>(pipe.cap);
    registry.replace<transform::position_2d>(pipe.cap, new_pos_x, cap_pos.y());

    // Return the information about whether this pipe is out of the screen
    return new_pos_x;
}
```

In the update function move all the columns each tick. Those exiting the screen on the left are destroyed. 

A new column is spawned from the right side of the screen and is now the column furthest away from Flappy Bird. 

Create a function that returns the `X` position of the furthest pipe. This function loops over all columns and checks whether the column’s `X` position is higher than the previous maximum.

```cpp
// Find the furthest pipe's position X
float furthest_pipe_position(entt::registry &registry) {
    float furthest = 0.f;

    for (auto entity : registry.view<column>()) {
        auto &col = registry.get<column>(entity);
        float x = entity_registry_.get<transform::position_2d>(col.top_pipe.body).x();
        if (x > furthest) furthest = x;
    }

    return furthest;
}
```

The update function that is called ever tick retrieves constants and all columns, and loops all the columns.

```cpp
// Update, this is called every tick
void update() noexcept final {
    auto &registry = entity_registry_;

    // Retrieve constants
    const auto constants = registry.ctx<flappy_bird_constants>();

    // Loop all columns
    for (auto entity : registry.view<column>()) {
```

Inside the loop retrieve the `struct column` from the column `entt::entity`.

```cpp
auto &col = registry.get<column>(entity);
```

Call the `move_pipe` function twice: one for the top pipe and one for the bottom. They are at the same X position, and this value is returned into the `column_pos_x` value.

```cpp
// Move pipes, and retrieve column position x
float column_pos_x = move_pipe(registry, col.top_pipe);
move_pipe(registry, col.bottom_pipe);
```

#### Destroying a Column Once Out of Screen

The position of the left side of the screen is `0`.

To make sure the column is out of the screen, use the `column_distance` value in the negative. 

For example, assume the value is `-400`. Compare the column’s `X` position against this value whether the column is outside the screen.

```cpp
// Test whether column is out of the screen
if (column_pos_x < -constants.column_distance) {
```

If the column is out of the screen, destroy it and create a new column on the right using the `create_column` function. 

For the new column position use the `furthest_pipe_position` value and add `column_distance` as this spawns further than the last column.

```cpp
// Test whether column is out of the screen
if (column_pos_x < -constants.column_distance) {
    // Remove this column
    col.destroy(registry, entity);

    // Create a new column at far end
    create_column(registry, furthest_pipe_position(registry) + constants.column_distance);
}
```

The completed `update` function is as follows.

```cpp
// Update, this will be called every tick
void update() noexcept final {
    auto &registry = entity_registry_;

    // Retrieve constants
    const auto constants = registry.ctx<flappy_bird_constants>();

    // Loop all columns
    for (auto entity : registry.view<column>()) {
        auto &col = registry.get<column>(entity);

        // Move pipes, and retrieve column position x
        float column_pos_x = move_pipe(registry, col.top_pipe);
        move_pipe(registry, col.bottom_pipe);

        // Test whether column is out of the screen
        if (column_pos_x < -constants.column_distance) {
            // Remove this column
            col.destroy(registry, entity);

            // Create a new column at far end
            create_column(registry, furthest_pipe_position(registry) + constants.column_distance);
        }
    }
}
``` 

Name this logic system after the class.

```cpp
// Name this system
REFL_AUTO (type(column_logic));
```

The `column_logic` class is fully ready.

#### Create the Logic System

To create a logic system, access `ecs::system_manager` inside the `game_scene` and add a member variable to store the reference inside the `game_scene`.

```cpp
// System manager reference
ecs::system_manager &system_manager_;
```

Add a parameter to the constructor that sets this reference.

```cpp
game_scene(entt::registry &registry, ecs::system_manager &system_manager) noexcept : base_scene(registry), system_manager_(system_manager) {
```

Make a function to create logic systems and inside use the `system_manager_`.

```cpp
// Create logic systems
void create_logic_systems() {
    system_manager_.create_system_rt<column_logic>();
}
```

Call this function in the `init_dynamic_objects` function.

```cpp
// Initialize dynamic objects, this function is called at start and resets
void init_dynamic_objects(entt::registry &registry) {
    create_columns(registry);

    // Create logic systems
    create_logic_systems();
}
```

Below is the complete code of the tutorial up to this point.

```cpp
#include <random>
#include <antara/gaming/graphics/component.layer.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/sfml/resources.manager.hpp>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/graphics/component.sprite.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

// Constants
struct flappy_bird_constants {
    // Pipes
    const float gap_height{265.f};
    const float column_start_distance{700.f};
    const float column_min{0.2f};
    const float column_max{0.8f};
    const float column_thickness{100.f};
    const float column_distance{400.f};
    const std::size_t column_count{6};
    const float pipe_cap_extra_width{10.f};
    const float pipe_cap_height{50.f};
    const graphics::color pipe_color{92, 181, 61};
    const graphics::outline_color pipe_outline_color{2.0f, graphics::color{76, 47, 61}};
    const float scroll_speed{200.f};

    // Background
    const float ground_thickness{100.0f};
    const float grass_thickness{20.0f};
    const graphics::color background_color{82, 189, 199};
    const graphics::color ground_color{220, 209, 143};
    const graphics::color grass_color{132, 227, 90};
    const graphics::outline_color grass_outline_color{2.0f, graphics::color{76, 47, 61}};
};

// Random number generator
namespace {
    std::random_device rd;  // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    float random_float(float lower, float higher) {
        std::uniform_real_distribution<float> dist(lower, higher);
        return dist(gen);
    }
}

// A Flappy Bird column which has two pipes
struct pipe {
    entt::entity body{entt::null};
    entt::entity cap{entt::null};

    // Destroy pipe
    void destroy(entt::registry &registry) {
        registry.destroy(body);
        registry.destroy(cap);
    }
};

// Column is made of two pipes
struct column {
    // Entities representing the Flappy Bird pipes
    pipe top_pipe{entt::null};
    pipe bottom_pipe{entt::null};

    // Destroy pipes and this column
    void destroy(entt::registry &registry, entt::entity entity) {
        top_pipe.destroy(registry);
        bottom_pipe.destroy(registry);
        registry.destroy(entity);
    }
};

// Logic functions
namespace {
    void tag_game_scene(entt::registry &registry, entt::entity entity, bool dynamic = false) {
        // Tag game scene
        registry.assign<entt::tag<"game_scene"_hs>>(entity);

        // Tag dynamic
        if(dynamic) registry.assign<entt::tag<"dynamic"_hs>>(entity);
    }

    // Returns a random gap start position Y
    float get_random_gap_start_pos(const entt::registry &registry) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        float top_limit = canvas_height * constants.column_min;
        float bottom_limit = canvas_height * constants.column_max - constants.gap_height;

        return random_float(top_limit, bottom_limit);
    }
}

// Factory functions
namespace {
    // Factory for pipes. This requires information about whether the pipe is a top pipe, and the position x of the column, and the starting gap position Y
    pipe create_pipe(entt::registry &registry, bool is_top, float pos_x, float gap_start_pos_y) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        // PIPE BODY
        // Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
        transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};

        // Size X is the column thickness,
        // Size Y is the important part.
        // If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
        //  Half size is gap_start_pos_y since the center of the rectangle is at 0
        // If this is the bottom pipe, the top of the rectangle is at gap_start_pos_y + gap_height
        //  Half size is canvas_height - (gap_start_pos_y + gap_height)
        // Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
        math::vec2f body_size{constants.column_thickness,
                              is_top ?
                              gap_start_pos_y * 2.0f :
                              (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};

        auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos,
                                                  constants.pipe_outline_color);

        // PIPE CAP
        // Prepare the pipe cap
        // Size of the cap is defined in constants
        math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};

        // Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
        // or start of the gap, use the start of the gap minus half of the cap height
        transform::position_2d cap_pos{body_pos.x(),
                                       is_top ?
                                       gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                       gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
        };

        // Construct the cap
        auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos,
                                                 constants.pipe_outline_color);

        // Set layers, cap should be in front of body
        registry.assign<graphics::layer<4>>(cap);
        registry.assign<graphics::layer<3>>(body);
        tag_game_scene(registry, cap, true);
        tag_game_scene(registry, body, true);

        // Construct a pipe with body and cap and return it
        return {body, cap};
    }

    // Factory to create single column
    void create_column(entt::registry &registry, float pos_x) noexcept {
        // Create a fresh entity for a new column
        auto entity_column = registry.create();

        // Get a random gap start position Y, between pipes
        float gap_start_pos_y = get_random_gap_start_pos(registry);

        // Create pipes, is_top variable is false for bottom one
        auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
        auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);

        // Make a column from these two pipes and mark it as "column"
        registry.assign<column>(entity_column, top_pipe, bottom_pipe);
        registry.assign<entt::tag<"column"_hs>>(entity_column);
        tag_game_scene(registry, entity_column, true);
    }

    // Factory for creating a Flappy Bird columns
    void create_columns(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Spawn columns out of the screen, out of the canvas
        const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;

        // Create the columns
        for (std::size_t i = 0; i < constants.column_count; ++i) {
            // Horizontal position (X) increases for every column, keeping the distance
            float pos_x = column_pos_offset + i * constants.column_distance;

            create_column(registry, pos_x);
        }
    }

    // Factory for creating a Flappy Bird background
    void create_background(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Create Sky
        {
            // The sky is the whole canvas, so the position is in the middle of the canvas
            transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};

            // The size is the full canvas
            math::vec2f size{canvas_width, canvas_height};

            auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
            registry.assign<graphics::layer<1>>(sky);
            tag_game_scene(registry, sky);
        }

        // Create Grass
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};

            // Size X is full canvas but the height is defined in constants
            // Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
            math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};

            auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos,
                                                       constants.grass_outline_color);
            registry.assign<graphics::layer<3>>(grass);
            tag_game_scene(registry, grass);
        }

        // Create Ground
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the bottom of the screen, so the height is the full canvas_height minus half of the ground thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness * 0.5f};

            // Size X is full canvas but the height is defined in constants
            math::vec2f size{canvas_width, constants.ground_thickness};

            auto ground = geometry::blueprint_rectangle(registry, size, constants.ground_color, pos);
            registry.assign<graphics::layer<3>>(ground);
            tag_game_scene(registry, ground);
        }
    }
}

// Column Logic System
class column_logic final : public ecs::logic_update_system<column_logic> {
public:
    explicit column_logic(entt::registry &registry) noexcept : system(registry) {
        disable();
    }

    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Loop all columns
        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);

            // Move pipes, and retrieve column position x
            float column_pos_x = move_pipe(registry, col.top_pipe);
            move_pipe(registry, col.bottom_pipe);

            // Test whether column is out of the screen
            if (column_pos_x < -constants.column_distance) {
                // Remove this column
                col.destroy(registry, entity);

                // Create a new column at far end
                create_column(registry, furthest_pipe_position(registry) + constants.column_distance);
            }
        }
    }

private:
    // Find the furthest pipe's position X
    float furthest_pipe_position(entt::registry &registry) {
        float furthest = 0.f;

        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);
            float x = entity_registry_.get<transform::position_2d>(col.top_pipe.body).x();
            if (x > furthest) furthest = x;
        }

        return furthest;
    }

    // Move the pipe and return the x position
    float move_pipe(entt::registry &registry, pipe &pipe) {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Get current position of the pipe
        auto pos = registry.get<transform::position_2d>(pipe.body);

        // Shift pos X to the left by scroll_speed, but multiply the value by dt, as this occurs many times per second
        // Delta time ensures that the movement occurs over time, so that over the course of one second the movement covers scroll_speed pixels
        auto new_pos_x = pos.x() - constants.scroll_speed * timer::time_step::get_fixed_delta_time();

        // Set the new position value
        registry.replace<transform::position_2d>(pipe.body, new_pos_x, pos.y());

        // Set cap position too
        auto cap_pos = registry.get<transform::position_2d>(pipe.cap);
        registry.replace<transform::position_2d>(pipe.cap, new_pos_x, cap_pos.y());

        // Return the information about whether this pipe is out of the screen
        return new_pos_x;
    }
};

// Name this system
REFL_AUTO (type(column_logic));

// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry, ecs::system_manager &system_manager) noexcept : base_scene(registry), system_manager_(system_manager) {
        // Set the constants that will be used in the program
        registry.set<flappy_bird_constants>();

        // Create everything
        create_background(registry);
        init_dynamic_objects(registry);
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
    }

    // Initialize dynamic objects, this function is called at start and resets
    void init_dynamic_objects(entt::registry &registry) {
        create_columns(registry);

        // Create logic systems
        create_logic_systems();
    }

    // Create logic systems
    void create_logic_systems() {
        system_manager_.create_system_rt<column_logic>();
    }

    // System manager reference
    ecs::system_manager &system_manager_;
};

// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_, system_manager_), true);
    }
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```

## The Creation of Flappy Bird

Create the Flappy Bird. Instead of using a rectangle as a character, use an image file. This is called a `character sprite`. 

From this point forward in the tutorial, the Flappy Bird is referred to as “player.”

Two constants are required: one for the player position and another one for the image file name.

```cpp
struct flappy_bird_constants {
    // Player
    const std::string player_image_name{"player.png"};
    const float player_pos_x{400.0f};
```

Create a `create_player` function that constructs the player entity and returns it.

Retrieve the constants, as before.

```cpp
// Factory for creating the player
entt::entity create_player(entt::registry &registry) {
    // Retrieve constants
    const auto[_, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
    const auto constants = registry.ctx<flappy_bird_constants>();
```

Use the `graphics::blueprint_sprite`. This requires two parameters: `graphics::sprite` and `transform::position_2d`.

The `graphics::sprite` parameter receives the image path and `transform::position_2d` receives the `player_pos_x` constant as an `X` position and half of the canvas height as the `Y` position.

```cpp
auto entity = graphics::blueprint_sprite(registry,
                                            graphics::sprite{constants.player_image_name.c_str()},
                                            transform::position_2d{constants.player_pos_x, canvas_height * 0.5f});
```

Assign `layer<5>` for the draw order, and provide the tags `player`, `game_scene`, and `dynamic`. 

Return the entity.

```cpp
registry.assign<antara::gaming::graphics::layer<5>>(entity);
registry.assign<entt::tag<"player"_hs>>(entity);
tag_game_scene(registry, entity, true);

return entity;
```

The completed `create_player` function is as follows.

```cpp
// Factory for creating the player
entt::entity create_player(entt::registry &registry) {
    // Retrieve constants
    const auto[_, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
    const auto constants = registry.ctx<flappy_bird_constants>();

    auto entity = graphics::blueprint_sprite(registry,
                                             graphics::sprite{constants.player_image_name.c_str()},
                                             transform::position_2d{constants.player_pos_x, canvas_height * 0.5f});
    registry.assign<antara::gaming::graphics::layer<5>>(entity);
    registry.assign<entt::tag<"player"_hs>>(entity);
    tag_game_scene(registry, entity, true);

    return entity;
}
```

Call this function inside `init_dynamic_objects`.

```cpp
// Initialize dynamic objects, this function is called at start and resets
void init_dynamic_objects(entt::registry &registry) {
    create_columns(registry);

    // Create player
    create_player(registry);

    // Create logic systems
    create_logic_systems();
}
```

Compiling and executing the program now shows the character and moving pipes.

<div>

<img src="/flappy-bird-tutorial/fb_player_creation.png">

</div>

Here is the full code up to this point of the tutorial.

```cpp
#include <random>
#include <antara/gaming/graphics/component.layer.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/sfml/resources.manager.hpp>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/graphics/component.sprite.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

// Constants
struct flappy_bird_constants {
    // Player
    const std::string player_image_name{"player.png"};
    const float player_pos_x{400.0f};

    // Pipes
    const float gap_height{265.f};
    const float column_start_distance{700.f};
    const float column_min{0.2f};
    const float column_max{0.8f};
    const float column_thickness{100.f};
    const float column_distance{400.f};
    const std::size_t column_count{6};
    const float pipe_cap_extra_width{10.f};
    const float pipe_cap_height{50.f};
    const graphics::color pipe_color{92, 181, 61};
    const graphics::outline_color pipe_outline_color{2.0f, graphics::color{76, 47, 61}};
    const float scroll_speed{200.f};

    // Background
    const float ground_thickness{100.0f};
    const float grass_thickness{20.0f};
    const graphics::color background_color{82, 189, 199};
    const graphics::color ground_color{220, 209, 143};
    const graphics::color grass_color{132, 227, 90};
    const graphics::outline_color grass_outline_color{2.0f, graphics::color{76, 47, 61}};
};

// Random number generator
namespace {
    std::random_device rd;  // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    float random_float(float lower, float higher) {
        std::uniform_real_distribution<float> dist(lower, higher);
        return dist(gen);
    }
}

// A Flappy Bird column which has two pipes
struct pipe {
    entt::entity body{entt::null};
    entt::entity cap{entt::null};

    // Destroy pipe
    void destroy(entt::registry &registry) {
        registry.destroy(body);
        registry.destroy(cap);
    }
};

// Column is made of two pipes
struct column {
    // Entities representing the Flappy Bird pipes
    pipe top_pipe{entt::null};
    pipe bottom_pipe{entt::null};

    // Destroy pipes and this column
    void destroy(entt::registry &registry, entt::entity entity) {
        top_pipe.destroy(registry);
        bottom_pipe.destroy(registry);
        registry.destroy(entity);
    }
};

// Logic functions
namespace {
    void tag_game_scene(entt::registry &registry, entt::entity entity, bool dynamic = false) {
        // Tag game scene
        registry.assign<entt::tag<"game_scene"_hs>>(entity);

        // Tag dynamic
        if(dynamic) registry.assign<entt::tag<"dynamic"_hs>>(entity);
    }

    // Returns a random gap start position Y
    float get_random_gap_start_pos(const entt::registry &registry) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        float top_limit = canvas_height * constants.column_min;
        float bottom_limit = canvas_height * constants.column_max - constants.gap_height;

        return random_float(top_limit, bottom_limit);
    }
}

// Factory functions
namespace {
    // Factory for pipes. This requires information about whether the pipe is a top pipe, and the position x of the column, and the starting gap position Y
    pipe create_pipe(entt::registry &registry, bool is_top, float pos_x, float gap_start_pos_y) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        // PIPE BODY
        // Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
        transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};

        // Size X is the column thickness,
        // Size Y is the important part.
        // If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
        //  Half size is gap_start_pos_y since the center of the rectangle is at 0
        // If this is the bottom pipe, the top of the rectangle is at gap_start_pos_y + gap_height
        //  Half size is canvas_height - (gap_start_pos_y + gap_height)
        // Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
        math::vec2f body_size{constants.column_thickness,
                              is_top ?
                              gap_start_pos_y * 2.0f :
                              (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};

        auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos,
                                                  constants.pipe_outline_color);

        // PIPE CAP
        // Prepare the pipe cap
        // Size of the cap is defined in constants
        math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};

        // Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
        // or start of the gap, use the start of the gap minus half of the cap height
        transform::position_2d cap_pos{body_pos.x(),
                                       is_top ?
                                       gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                       gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
        };

        // Construct the cap
        auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos,
                                                 constants.pipe_outline_color);

        // Set layers, cap should be in front of body
        registry.assign<graphics::layer<4>>(cap);
        registry.assign<graphics::layer<3>>(body);
        tag_game_scene(registry, cap, true);
        tag_game_scene(registry, body, true);

        // Construct a pipe with body and cap and return it
        return {body, cap};
    }

    // Factory to create single column
    void create_column(entt::registry &registry, float pos_x) noexcept {
        // Create a fresh entity for a new column
        auto entity_column = registry.create();

        // Get a random gap start position Y, between pipes
        float gap_start_pos_y = get_random_gap_start_pos(registry);

        // Create pipes, is_top variable is false for bottom one
        auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
        auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);

        // Make a column from these two pipes and mark it as "column"
        registry.assign<column>(entity_column, top_pipe, bottom_pipe);
        registry.assign<entt::tag<"column"_hs>>(entity_column);
        tag_game_scene(registry, entity_column, true);
    }

    // Factory for creating a Flappy Bird columns
    void create_columns(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Spawn columns out of the screen, out of the canvas
        const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;

        // Create the columns
        for (std::size_t i = 0; i < constants.column_count; ++i) {
            // Horizontal position (X) increases for every column, keeping the distance
            float pos_x = column_pos_offset + i * constants.column_distance;

            create_column(registry, pos_x);
        }
    }

    // Factory for creating a Flappy Bird background
    void create_background(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Create Sky
        {
            // The sky is the whole canvas, so the position is in the middle of the canvas
            transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};

            // The size is the full canvas
            math::vec2f size{canvas_width, canvas_height};

            auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
            registry.assign<graphics::layer<1>>(sky);
            tag_game_scene(registry, sky);
        }

        // Create Grass
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};

            // Size X is full canvas but the height is defined in constants
            // Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
            math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};

            auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos,
                                                       constants.grass_outline_color);
            registry.assign<graphics::layer<3>>(grass);
            tag_game_scene(registry, grass);
        }

        // Create Ground
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the bottom of the screen, so the height is the full canvas_height minus half of the ground thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness * 0.5f};

            // Size X is full canvas but the height is defined in constants
            math::vec2f size{canvas_width, constants.ground_thickness};

            auto ground = geometry::blueprint_rectangle(registry, size, constants.ground_color, pos);
            registry.assign<graphics::layer<3>>(ground);
            tag_game_scene(registry, ground);
        }
    }

    // Factory for creating the player
    entt::entity create_player(entt::registry &registry) {
        // Retrieve constants
        const auto[_, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        auto entity = graphics::blueprint_sprite(registry,
                                                 graphics::sprite{constants.player_image_name.c_str()},
                                                 transform::position_2d{constants.player_pos_x, canvas_height * 0.5f});
        registry.assign<antara::gaming::graphics::layer<5>>(entity);
        registry.assign<entt::tag<"player"_hs>>(entity);
        tag_game_scene(registry, entity, true);

        return entity;
    }
}

// Column Logic System
class column_logic final : public ecs::logic_update_system<column_logic> {
public:
    explicit column_logic(entt::registry &registry) noexcept : system(registry) {
        disable();
    }

    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Loop all columns
        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);

            // Move pipes, and retrieve column position x
            float column_pos_x = move_pipe(registry, col.top_pipe);
            move_pipe(registry, col.bottom_pipe);

            // Test whether column is out of the screen
            if (column_pos_x < -constants.column_distance) {
                // Remove this column
                col.destroy(registry, entity);

                // Create a new column at far end
                create_column(registry, furthest_pipe_position(registry) + constants.column_distance);
            }
        }
    }

private:
    // Find the furthest pipe's position X
    float furthest_pipe_position(entt::registry &registry) {
        float furthest = 0.f;

        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);
            float x = entity_registry_.get<transform::position_2d>(col.top_pipe.body).x();
            if (x > furthest) furthest = x;
        }

        return furthest;
    }

    // Move the pipe and return the x position
    float move_pipe(entt::registry &registry, pipe &pipe) {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Get current position of the pipe
        auto pos = registry.get<transform::position_2d>(pipe.body);

        // Shift pos X to the left by scroll_speed, but multiply the value by dt, as this occurs many times per second
        // Delta time ensures that the movement occurs over time, so that over the course of one second the movement covers scroll_speed pixels
        auto new_pos_x = pos.x() - constants.scroll_speed * timer::time_step::get_fixed_delta_time();

        // Set the new position value
        registry.replace<transform::position_2d>(pipe.body, new_pos_x, pos.y());

        // Set cap position too
        auto cap_pos = registry.get<transform::position_2d>(pipe.cap);
        registry.replace<transform::position_2d>(pipe.cap, new_pos_x, cap_pos.y());

        // Return the information about whether this pipe is out of the screen
        return new_pos_x;
    }
};

// Name this system
REFL_AUTO (type(column_logic));

// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry, ecs::system_manager &system_manager) noexcept : base_scene(registry), system_manager_(system_manager) {
        // Set the constants that will be used in the program
        registry.set<flappy_bird_constants>();

        // Create everything
        create_background(registry);
        init_dynamic_objects(registry);
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
    }

    // Initialize dynamic objects, this function is called at start and resets
    void init_dynamic_objects(entt::registry &registry) {
        create_columns(registry);

        // Create player
        create_player(registry);

        // Create logic systems
        create_logic_systems();
    }

    // Create logic systems
    void create_logic_systems() {
        system_manager_.create_system_rt<column_logic>();
    }

    // System manager reference
    ecs::system_manager &system_manager_;
};

// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_, system_manager_), true);
    }
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```

## Player Input and Character Physics 

To receive input and create character physics begin by including two headers for input, `<antara/gaming/input/virtual.hpp>` and `<antara/gaming/ecs/virtual.input.system.hpp>`.

The logic for this section also requires constants for physics. 

`gravity` is the force which pulls the player down.

`jump_force` is the force which is applied instantly when the user presses the jump button. 

`rotate_speed` is for the rotating animation.

`max_angle` is the rotation limit.

```cpp
const float gravity{2000.f};
const float jump_force{650.f};
const float rotate_speed{100.f};
const float max_angle{60.f};
```

Initialize the virtual input system and add a `jump` action. 

Keyboard keys are: `space`, `w`, `up`.

Mouse buttons are `left` and `right`.

```cpp
// Create virtual input system
system_manager_.create_system<ecs::virtual_input_system>();

// Define the buttons for the jump action
input::virtual_input::create("jump",
                                {input::key::space, input::key::w, input::key::up},
                                {input::mouse_button::left, input::mouse_button::right});
```

Make another `ecs::logic_update_system` object, similar to `column_logic`, but this time for the player.

```cpp
// Player Logic System
class player_logic final : public ecs::logic_update_system<player_logic> {
public:
    player_logic(entt::registry &registry, entt::entity player_) noexcept : system(registry), player_(player_) {
        disable();
    }
```

Keep the player entity as a member. 

There is a 2D vector for movement speed, `math::vec2f`.

```cpp
private:
    entt::entity player_;
    math::vec2f movement_speed_{0.f, 0.f};
```

Make the update function to be called for every tick.

```cpp
// Update, this will be called every tick
void update() noexcept final {
    auto &registry = entity_registry_;

    // Retrieve constants
    const auto constants = registry.ctx<flappy_bird_constants>();

    // Get current position of the player
    auto pos = registry.get<transform::position_2d>(player_);
```

Gravity is acceleration. Instead of adding gravity to the position, add it to the movement speed. Multiply gravity with delta time to spread the change in value over time.

Update `Y` of `movement_speed_` with `Y` plus gravity.

```cpp
// Add gravity to movement speed, multiply with delta time to apply it over time
movement_speed_.set_y(movement_speed_.y() + constants.gravity * timer::time_step::get_fixed_delta_time());
```

For the jump, check if the jump button is tapped.

```cpp
// Check if jump key is tapped
bool jump_key_tapped = input::virtual_input::is_tapped("jump");
```

If the jump button is tapped, set the `Y` value of `movement_speed_` as negative `jump_force`. Using this as a negative value here is effective as it acts as a reversal of the gravitational force.

For this change, directly set the value instead of adding the value to the existing value. The reason for this is that this method prevents the player from spamming the jump button and infinitely speeding up. 

This also solves another problem. If the player is dropping more quickly than the jump button could counter, the method prevents a scenario where pressing the button only slows down the player's rate of descent, but does not reverse it.

```cpp
// If jump is tapped, jump by adding jump force to the movement speed Y
if (jump_key_tapped) movement_speed_.set_y(-constants.jump_force);
```

#### Moving the Player Position

Move the position with the movement speed. Multiplying the position with delta time, as always, to spread the change over time.

```cpp
// Add movement speed to position to make the character move, but apply over time with delta time
pos += movement_speed_ * timer::time_step::get_fixed_delta_time();
```

Currently, the player can jump out of the screen. There must be a limit to the character position.

If position `Y` is equal to or lower than zero, reset both positions and speed `Y` to `0`. This keeps the player inside, no matter how many times jump is pressed.

```cpp
// Do not let player to go out of the screen to top
if (pos.y() <= 0.f) {
    pos.set_y(0.f);
    movement_speed_.set_y(0.f);
}
```

Set the modified position to the player entity.

```cpp
// Set the new position value
registry.replace<transform::position_2d>(player_, pos);
```

#### Apply Rotation

Retrieve the properties of the player, add `rotate_speed` to the `props.rotation`, also apply delta time.

```cpp
// ROTATION
// Retrieve props of the player
auto &props = registry.get<transform::properties>(player_);

// Increase the rotation a little by applying delta time
float new_rotation = props.rotation + constants.rotate_speed * timer::time_step::get_fixed_delta_time();
```

When the player jumps, reset the rotation so that the character is straight again before rotating downwards once more. 

Also, apply a `max_angle` limit to prevent excessive rotation.

```cpp
// If jump button is tapped, reset rotation,
// If rotation is higher than the max angle, set it to max angle
if (jump_key_tapped)
    new_rotation = 0.f;
else if (props.rotation > constants.max_angle)
    new_rotation = constants.max_angle;
```

Set the `transform::properties` to apply the rotation change.

```cpp
// Set the properties
registry.replace<transform::properties>(player_, transform::properties{.rotation = new_rotation});
```

The following is the completed update function.

```cpp
// Update, this will be called every tick
void update() noexcept final {
    auto &registry = entity_registry_;

    // Retrieve constants
    const auto constants = registry.ctx<flappy_bird_constants>();

    // Get current position of the player
    auto pos = registry.get<transform::position_2d>(player_);

    // Add gravity to movement speed, multiply with delta time to apply it over time
    movement_speed_.set_y(movement_speed_.y() + constants.gravity * timer::time_step::get_fixed_delta_time());

    // Check if jump key is tapped
    bool jump_key_tapped = input::virtual_input::is_tapped("jump");

    // If jump is tapped, jump by adding jump force to the movement speed Y
    if (jump_key_tapped) movement_speed_.set_y(-constants.jump_force);

    // Add movement speed to position to make the character move, but apply over time with delta time
    pos += movement_speed_ * timer::time_step::get_fixed_delta_time();

    // Do not let player to go out of the screen to top
    if (pos.y() <= 0.f) {
        pos.set_y(0.f);
        movement_speed_.set_y(0.f);
    }

    // Set the new position value
    registry.replace<transform::position_2d>(player_, pos);

    // ROTATION
    // Retrieve props of the player
    auto &props = registry.get<transform::properties>(player_);

    // Increase the rotation a little by applying delta time
    float new_rotation = props.rotation + constants.rotate_speed * timer::time_step::get_fixed_delta_time();

    // If jump button is tapped, reset rotation,
    // If rotation is higher than the max angle, set it to max angle
    if (jump_key_tapped)
        new_rotation = 0.f;
    else if (props.rotation > constants.max_angle)
        new_rotation = constants.max_angle;

    // Set the properties
    registry.replace<transform::properties>(player_, transform::properties{.rotation = new_rotation});
}
```

Name this logic system after the class.

```cpp
// Name this system
REFL_AUTO (type(player_logic));
```

`player_logic` is ready to be used in the `game_scene`.

In the earlier function, `create_logic_systems` create the `player_logic` function. 

`player_logic` requires the `player` entity as an argument. 

Modify the function as follows.

```cpp
// Create logic systems
void create_logic_systems(entt::entity player) {
    system_manager_.create_system_rt<column_logic>();
    system_manager_.create_system_rt<player_logic>(player);
}
```

When the game is launched the physics is in a paused state. The game begins when the player pressed the jump button.

Make two functions that enable and disable both logic functions.

```cpp
// Pause physics
void pause_physics() {
    system_manager_.disable_systems<column_logic, player_logic>();
}

// Resume physics
void resume_physics() {
    system_manager_.enable_systems<column_logic, player_logic>();
}
```

Use a boolean to indicate whether the player has started playing.

```cpp
// States
bool started_playing_{false};
```

Add a function which resets this state value.

```cpp
// Reset state values
void reset_state_variables() {
    started_playing_ = false;
}
```

In the `init_dynamic_objects` function, feed the `player` entity to the `create_logic_systems` function, pause physics, and reset state variables.

```cpp
// Initialize dynamic objects, this function is called at start and resets
void init_dynamic_objects(entt::registry &registry) {
    create_columns(registry);

    // Create player
    auto player = create_player(registry);

    // Create logic systems
    create_logic_systems(player);

    // Reset state variables
    reset_state_variables();
}
```

Check for a jump button press. This starts the game. 

Check only whether the player has not yet begun to play.

```cpp
// Check if start game is requested at the pause state
void check_start_game_request() {
    // If game is not started yet and jump key is tapped
    if (!started_playing_ && input::virtual_input::is_tapped("jump")) {
        // Game starts, player started playing
        started_playing_ = true;
        resume_physics();
    }
}
```

Call this function in the update function that is called every tick.

```cpp
// Update the game every tick
void update() noexcept final {
    // Check if player requested to start the game
    check_start_game_request();
}
```

Here is the complete code up to this point in the tutorial.

```cpp
#include <random>
#include <antara/gaming/ecs/virtual.input.system.hpp>
#include <antara/gaming/graphics/component.layer.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/sfml/resources.manager.hpp>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/graphics/component.sprite.hpp>
#include <antara/gaming/input/virtual.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

// Constants
struct flappy_bird_constants {
    // Player
    const std::string player_image_name{"player.png"};
    const float player_pos_x{400.0f};
    const float gravity{2000.f};
    const float jump_force{650.f};
    const float rotate_speed{100.f};
    const float max_angle{60.f};

    // Pipes
    const float gap_height{265.f};
    const float column_start_distance{700.f};
    const float column_min{0.2f};
    const float column_max{0.8f};
    const float column_thickness{100.f};
    const float column_distance{400.f};
    const std::size_t column_count{6};
    const float pipe_cap_extra_width{10.f};
    const float pipe_cap_height{50.f};
    const graphics::color pipe_color{92, 181, 61};
    const graphics::outline_color pipe_outline_color{2.0f, graphics::color{76, 47, 61}};
    const float scroll_speed{200.f};

    // Background
    const float ground_thickness{100.0f};
    const float grass_thickness{20.0f};
    const graphics::color background_color{82, 189, 199};
    const graphics::color ground_color{220, 209, 143};
    const graphics::color grass_color{132, 227, 90};
    const graphics::outline_color grass_outline_color{2.0f, graphics::color{76, 47, 61}};
};

// Random number generator
namespace {
    std::random_device rd;  // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    float random_float(float lower, float higher) {
        std::uniform_real_distribution<float> dist(lower, higher);
        return dist(gen);
    }
}

// A Flappy Bird column which has two pipes
struct pipe {
    entt::entity body{entt::null};
    entt::entity cap{entt::null};

    // Destroy pipe
    void destroy(entt::registry &registry) {
        registry.destroy(body);
        registry.destroy(cap);
    }
};

// Column is made of two pipes
struct column {
    // Entities representing the Flappy Bird pipes
    pipe top_pipe{entt::null};
    pipe bottom_pipe{entt::null};

    // Destroy pipes and this column
    void destroy(entt::registry &registry, entt::entity entity) {
        top_pipe.destroy(registry);
        bottom_pipe.destroy(registry);
        registry.destroy(entity);
    }
};

// Logic functions
namespace {
    void tag_game_scene(entt::registry &registry, entt::entity entity, bool dynamic = false) {
        // Tag game scene
        registry.assign<entt::tag<"game_scene"_hs>>(entity);

        // Tag dynamic
        if(dynamic) registry.assign<entt::tag<"dynamic"_hs>>(entity);
    }

    // Returns a random gap start position Y
    float get_random_gap_start_pos(const entt::registry &registry) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        float top_limit = canvas_height * constants.column_min;
        float bottom_limit = canvas_height * constants.column_max - constants.gap_height;

        return random_float(top_limit, bottom_limit);
    }
}

// Factory functions
namespace {
    // Factory for pipes. This requires information about whether the pipe is a top pipe, and the position x of the column, and the starting gap position Y
    pipe create_pipe(entt::registry &registry, bool is_top, float pos_x, float gap_start_pos_y) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        // PIPE BODY
        // Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
        transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};

        // Size X is the column thickness,
        // Size Y is the important part.
        // If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
        //  Half size is gap_start_pos_y since the center of the rectangle is at 0
        // If this is the bottom pipe, the top of the rectangle is at gap_start_pos_y + gap_height
        //  Half size is canvas_height - (gap_start_pos_y + gap_height)
        // Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
        math::vec2f body_size{constants.column_thickness,
                              is_top ?
                              gap_start_pos_y * 2.0f :
                              (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};

        auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos,
                                                  constants.pipe_outline_color);

        // PIPE CAP
        // Prepare the pipe cap
        // Size of the cap is defined in constants
        math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};

        // Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
        // or start of the gap, use the start of the gap minus half of the cap height
        transform::position_2d cap_pos{body_pos.x(),
                                       is_top ?
                                       gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                       gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
        };

        // Construct the cap
        auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos,
                                                 constants.pipe_outline_color);

        // Set layers, cap should be in front of body
        registry.assign<graphics::layer<4>>(cap);
        registry.assign<graphics::layer<3>>(body);
        tag_game_scene(registry, cap, true);
        tag_game_scene(registry, body, true);

        // Construct a pipe with body and cap and return it
        return {body, cap};
    }

    // Factory to create single column
    void create_column(entt::registry &registry, float pos_x) noexcept {
        // Create a fresh entity for a new column
        auto entity_column = registry.create();

        // Get a random gap start position Y, between pipes
        float gap_start_pos_y = get_random_gap_start_pos(registry);

        // Create pipes, is_top variable is false for bottom one
        auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
        auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);

        // Make a column from these two pipes and mark it as "column"
        registry.assign<column>(entity_column, top_pipe, bottom_pipe);
        registry.assign<entt::tag<"column"_hs>>(entity_column);
        tag_game_scene(registry, entity_column, true);
    }

    // Factory for creating a Flappy Bird columns
    void create_columns(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Spawn columns out of the screen, out of the canvas
        const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;

        // Create the columns
        for (std::size_t i = 0; i < constants.column_count; ++i) {
            // Horizontal position (X) increases for every column, keeping the distance
            float pos_x = column_pos_offset + i * constants.column_distance;

            create_column(registry, pos_x);
        }
    }

    // Factory for creating a Flappy Bird background
    void create_background(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Create Sky
        {
            // The sky is the whole canvas, so the position is in the middle of the canvas
            transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};

            // The size is the full canvas
            math::vec2f size{canvas_width, canvas_height};

            auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
            registry.assign<graphics::layer<1>>(sky);
            tag_game_scene(registry, sky);
        }

        // Create Grass
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};

            // Size X is full canvas but the height is defined in constants
            // Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
            math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};

            auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos,
                                                       constants.grass_outline_color);
            registry.assign<graphics::layer<3>>(grass);
            tag_game_scene(registry, grass);
        }

        // Create Ground
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the bottom of the screen, so the height is the full canvas_height minus half of the ground thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness * 0.5f};

            // Size X is full canvas but the height is defined in constants
            math::vec2f size{canvas_width, constants.ground_thickness};

            auto ground = geometry::blueprint_rectangle(registry, size, constants.ground_color, pos);
            registry.assign<graphics::layer<3>>(ground);
            tag_game_scene(registry, ground);
        }
    }

    // Factory for creating the player
    entt::entity create_player(entt::registry &registry) {
        // Retrieve constants
        const auto[_, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        auto entity = graphics::blueprint_sprite(registry,
                                                 graphics::sprite{constants.player_image_name.c_str()},
                                                 transform::position_2d{constants.player_pos_x, canvas_height * 0.5f});
        registry.assign<antara::gaming::graphics::layer<5>>(entity);
        registry.assign<entt::tag<"player"_hs>>(entity);
        tag_game_scene(registry, entity, true);

        return entity;
    }
}

// Column Logic System
class column_logic final : public ecs::logic_update_system<column_logic> {
public:
    explicit column_logic(entt::registry &registry) noexcept : system(registry) {
        disable();
    }

    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Loop all columns
        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);

            // Move pipes, and retrieve column position x
            float column_pos_x = move_pipe(registry, col.top_pipe);
            move_pipe(registry, col.bottom_pipe);

            // Test whether column is out of the screen
            if (column_pos_x < -constants.column_distance) {
                // Remove this column
                col.destroy(registry, entity);

                // Create a new column at far end
                create_column(registry, furthest_pipe_position(registry) + constants.column_distance);
            }
        }
    }

private:
    // Find the furthest pipe's position X
    float furthest_pipe_position(entt::registry &registry) {
        float furthest = 0.f;

        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);
            float x = entity_registry_.get<transform::position_2d>(col.top_pipe.body).x();
            if (x > furthest) furthest = x;
        }

        return furthest;
    }

    // Move the pipe and return the x position
    float move_pipe(entt::registry &registry, pipe &pipe) {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Get current position of the pipe
        auto pos = registry.get<transform::position_2d>(pipe.body);

        // Shift pos X to the left by scroll_speed, but multiply the value by dt, as this occurs many times per second
        // Delta time ensures that the movement occurs over time, so that over the course of one second the movement covers scroll_speed pixels
        auto new_pos_x = pos.x() - constants.scroll_speed * timer::time_step::get_fixed_delta_time();

        // Set the new position value
        registry.replace<transform::position_2d>(pipe.body, new_pos_x, pos.y());

        // Set cap position too
        auto cap_pos = registry.get<transform::position_2d>(pipe.cap);
        registry.replace<transform::position_2d>(pipe.cap, new_pos_x, cap_pos.y());

        // Return the information about whether this pipe is out of the screen
        return new_pos_x;
    }
};

// Name this system
REFL_AUTO (type(column_logic));

// Player Logic System
class player_logic final : public ecs::logic_update_system<player_logic> {
public:
    player_logic(entt::registry &registry, entt::entity player) noexcept : system(registry), player_(player) {
        disable();
    }

    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Get current position of the player
        auto pos = registry.get<transform::position_2d>(player_);

        // Add gravity to movement speed, multiply with delta time to apply it over time
        movement_speed_.set_y(movement_speed_.y() + constants.gravity * timer::time_step::get_fixed_delta_time());

        // Check if jump key is tapped
        bool jump_key_tapped = input::virtual_input::is_tapped("jump");

        // If jump is tapped, jump by adding jump force to the movement speed Y
        if (jump_key_tapped) movement_speed_.set_y(-constants.jump_force);

        // Add movement speed to position to make the character move, but apply over time with delta time
        pos += movement_speed_ * timer::time_step::get_fixed_delta_time();

        // Do not let player to go out of the screen to top
        if (pos.y() <= 0.f) {
            pos.set_y(0.f);
            movement_speed_.set_y(0.f);
        }

        // Set the new position value
        registry.replace<transform::position_2d>(player_, pos);

        // ROTATION
        // Retrieve props of the player
        auto &props = registry.get<transform::properties>(player_);

        // Increase the rotation a little by applying delta time
        float new_rotation = props.rotation + constants.rotate_speed * timer::time_step::get_fixed_delta_time();

        // If jump button is tapped, reset rotation,
        // If rotation is higher than the max angle, set it to max angle
        if (jump_key_tapped)
            new_rotation = 0.f;
        else if (props.rotation > constants.max_angle)
            new_rotation = constants.max_angle;

        // Set the properties
        registry.replace<transform::properties>(player_, transform::properties{.rotation = new_rotation});
    }

private:
    entt::entity player_;
    math::vec2f movement_speed_{0.f, 0.f};
};

// Name this system
REFL_AUTO (type(player_logic));

// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry, ecs::system_manager &system_manager) noexcept : base_scene(registry), system_manager_(system_manager) {
        // Set the constants that will be used in the program
        registry.set<flappy_bird_constants>();

        // Create everything
        create_background(registry);
        init_dynamic_objects(registry);
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
        // Check if player requested to start the game
        check_start_game_request();
    }

    // Check if start game is requested at the pause state
    void check_start_game_request() {
        // If game is not started yet and jump key is tapped
        if (!started_playing_ && input::virtual_input::is_tapped("jump")) {
            // Game starts, player started playing
            started_playing_ = true;
            resume_physics();
        }
    }

    // Initialize dynamic objects, this function is called at start and resets
    void init_dynamic_objects(entt::registry &registry) {
        create_columns(registry);

        // Create player
        auto player = create_player(registry);

        // Create logic systems
        create_logic_systems(player);

        // Reset state variables
        reset_state_variables();
    }

    // Create logic systems
    void create_logic_systems(entt::entity player) {
        system_manager_.create_system_rt<column_logic>();
        system_manager_.create_system_rt<player_logic>(player);
    }

    // Reset state values
    void reset_state_variables() {
        started_playing_ = false;
    }

    // Pause physics
    void pause_physics() {
        system_manager_.disable_systems<column_logic, player_logic>();
    }

    // Resume physics
    void resume_physics() {
        system_manager_.enable_systems<column_logic, player_logic>();
    }

    // System manager reference
    ecs::system_manager &system_manager_;

    // States
    bool started_playing_{false};
};

// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Create virtual input system
        system_manager_.create_system<ecs::virtual_input_system>();

        // Define the buttons for the jump action
        input::virtual_input::create("jump",
                                     {input::key::space, input::key::w, input::key::up},
                                     {input::mouse_button::left, input::mouse_button::right});

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_, system_manager_), true);
    }
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```

## Collision Between Player and Columns, Death, and Game Reset

The game ends when the player flies into the columns and dies. 

Start by adding the collision system header `<antara/gaming/collisions/basic.collision.system.hpp>`.

Make another logic system, `collision_logic`. The constructor receives the player entity and a reference to the `player_dead` variable, so that the collision result can be reported.

Store both in the class as follows.

```cpp
entt::entity player_;
bool &player_died_;
```

Create the class and constructor.

```cpp
// Collision Logic System
class collision_logic final : public ecs::logic_update_system<collision_logic> {
public:
    collision_logic(entt::registry &registry, entt::entity player_, bool &player_died_) noexcept : system(registry),
                                                                                                player_(player_),
                                                                                                player_died_(player_died_) {}
```

Add a function to check for a collision between the player and the pipes, `check_player_pipe_collision`.

Remember that columns are on `layer<3>`.

Retrieve the columns by using the `view` function, `registry.view<graphics::layer<3>>()`.

Use the `collisions::basic_collision_system::query_rect` function with `player_` and `entity`, which is the pipe. 

If a collision is detected, mark `player_died_` as `true`.

```cpp
// Loop all columns to check collisions between player and the pipes
void check_player_pipe_collision(entt::registry &registry) {
    for (auto entity : registry.view<graphics::layer<3>>()) {
        // Check collision between player and a collidable object
        if (collisions::basic_collision_system::query_rect(registry, player_, entity)) {
            // Mark player died as true
            player_died_ = true;
        }
    }
}
```

Call this function in the `update` function that is called every tick. However, if `player_died_` is `true`, there is no need to check for a collision; simply stop the function.

```cpp
// Update, this will be called every tick
void update() noexcept final {
    auto &registry = entity_registry_;

    // Do not check anything if player is already dead
    if (player_died_) return;

    // Check collision
    check_player_pipe_collision(registry);
}
```

As before, name this system outside of the class.

```cpp
// Name this system
REFL_AUTO (type(collision_logic));
```

The completed class is as follows.

```cpp
// Collision Logic System
class collision_logic final : public ecs::logic_update_system<collision_logic> {
public:
    collision_logic(entt::registry &registry, entt::entity player_, bool &player_died_) noexcept : system(registry),
                                                                                                player_(player_),
                                                                                                player_died_(player_died_) {}
    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Do not check anything if player is already dead
        if (player_died_) return;

        // Check collision
        check_player_pipe_collision(registry);
    }

private:
    // Loop all columns to check collisions between player and the pipes
    void check_player_pipe_collision(entt::registry &registry) {
        for (auto entity : registry.view<graphics::layer<3>>()) {
            // Check collision between player and a collidable object
            if (collisions::basic_collision_system::query_rect(registry, player_, entity)) {
                // Mark player died as true
                player_died_ = true;
            }
        }
    }

    entt::entity player_;
    bool &player_died_;
};

// Name this system
REFL_AUTO (type(collision_logic));
```

Add the class to the game scene.

```cpp
// Create logic systems
void create_logic_systems(entt::entity player) {
    system_manager_.create_system_rt<column_logic>();
    system_manager_.create_system_rt<player_logic>(player);
    system_manager_.create_system_rt<collision_logic>(player, player_died_);
}
```

Add a few more state variables for player death, game over, and reset query.


```cpp
// States
bool started_playing_{false};
bool player_died_{false};
bool game_over_{false};
bool need_reset_{false};
```

Add the needed values for game restart to `reset_state_variables`.

```cpp
// Reset state values
void reset_state_variables() {
    started_playing_ = false;
    player_died_ = false;
    game_over_ = false;
}
```

Since `player_died_` is filled by `collision_logic`, the logic can read the value within this class.

When the value is `true`, mark `game_over_` as `true` and pause physics. This stops the game when the player dies. Mark `player_died_` to `false` here also, so that these functions are not triggered again.

```cpp
// Check if the player died
void check_death() {
    // If the player died, game over, and pause physics
    if (player_died_) {
        player_died_ = false;
        game_over_ = true;
        pause_physics();
    }
}
```

Another function checks for a jump button press after the game is over. 

When the jump button is pressed, the game restarts.

```cpp
// Check if reset is requested at game over state
void check_reset_request() {
    // If game is over, and jump key is pressed, reset game
    if (game_over_ && input::virtual_input::is_tapped("jump")) reset_game();
}
```

Call these two functions in the `update` function.

```cpp
// Update the game every tick
void update() noexcept final {
    // Check if player requested to start the game
    check_start_game_request();

    // Check if the player died
    check_death();

    // Check if player requested reset after death
    check_reset_request();
}
```

Defin the `reset_game` function.

```cpp
// Reset game
void reset_game() {
    // Destroy all dynamic objects
    destroy_dynamic_objects();

    // Queue reset to reinitialize
    this->need_reset_ = true;
}
```

The `reset_game` function destroys dynamic objects. 

To achieve this, retrieve all the dynamic entities with the `dynamic` tag that were set previously, then destroy them using the registry.

For the logic system deletions, mark items for deletion with the function below.

```cpp
// Destroy dynamic objects
void destroy_dynamic_objects() {
    // Retrieve the collection of entities from the game scene
    auto view = entity_registry_.view<entt::tag<"dynamic"_hs>>();

    // Iterate the collection and destroy each entities
    entity_registry_.destroy(view.begin(), view.end());

    // Delete systems
    system_manager_.mark_systems<player_logic, collision_logic>();
}
```

Those systems are deleted after the whole update tick is completed. They should no be reinitialize in `reset_game`. Instead, queue the reset by setting `need_reset_` to `true`, and reinitialize in the `post_update` function, as follows.

```cpp
// Post update
void post_update() noexcept final {
    // If reset is requested
    if (need_reset_) {
        // Reinitialize all these
        init_dynamic_objects(entity_registry_);
        need_reset_ = false;
    }
}
```

Flappy Bird now collides with pipes, dies, and enters the “game over” state. Afterwards, by pressing the jump button, all the dynamic entities and logic systems are destroyed, then reinitialized.

Here is the full code up to this point in the tutorial.

```cpp
#include <random>
#include <antara/gaming/ecs/virtual.input.system.hpp>
#include <antara/gaming/collisions/basic.collision.system.hpp>
#include <antara/gaming/graphics/component.layer.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/sfml/resources.manager.hpp>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/graphics/component.sprite.hpp>
#include <antara/gaming/input/virtual.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

// Constants
struct flappy_bird_constants {
    // Player
    const std::string player_image_name{"player.png"};
    const float player_pos_x{400.0f};
    const float gravity{2000.f};
    const float jump_force{650.f};
    const float rotate_speed{100.f};
    const float max_angle{60.f};

    // Pipes
    const float gap_height{265.f};
    const float column_start_distance{700.f};
    const float column_min{0.2f};
    const float column_max{0.8f};
    const float column_thickness{100.f};
    const float column_distance{400.f};
    const std::size_t column_count{6};
    const float pipe_cap_extra_width{10.f};
    const float pipe_cap_height{50.f};
    const graphics::color pipe_color{92, 181, 61};
    const graphics::outline_color pipe_outline_color{2.0f, graphics::color{76, 47, 61}};
    const float scroll_speed{200.f};

    // Background
    const float ground_thickness{100.0f};
    const float grass_thickness{20.0f};
    const graphics::color background_color{82, 189, 199};
    const graphics::color ground_color{220, 209, 143};
    const graphics::color grass_color{132, 227, 90};
    const graphics::outline_color grass_outline_color{2.0f, graphics::color{76, 47, 61}};
};

// Random number generator
namespace {
    std::random_device rd;  // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    float random_float(float lower, float higher) {
        std::uniform_real_distribution<float> dist(lower, higher);
        return dist(gen);
    }
}

// A Flappy Bird column which has two pipes
struct pipe {
    entt::entity body{entt::null};
    entt::entity cap{entt::null};

    // Destroy pipe
    void destroy(entt::registry &registry) {
        registry.destroy(body);
        registry.destroy(cap);
    }
};

// Column is made of two pipes
struct column {
    // Entities representing the Flappy Bird pipes
    pipe top_pipe{entt::null};
    pipe bottom_pipe{entt::null};

    // Destroy pipes and this column
    void destroy(entt::registry &registry, entt::entity entity) {
        top_pipe.destroy(registry);
        bottom_pipe.destroy(registry);
        registry.destroy(entity);
    }
};

// Logic functions
namespace {
    void tag_game_scene(entt::registry &registry, entt::entity entity, bool dynamic = false) {
        // Tag game scene
        registry.assign<entt::tag<"game_scene"_hs>>(entity);

        // Tag dynamic
        if(dynamic) registry.assign<entt::tag<"dynamic"_hs>>(entity);
    }

    // Returns a random gap start position Y
    float get_random_gap_start_pos(const entt::registry &registry) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        float top_limit = canvas_height * constants.column_min;
        float bottom_limit = canvas_height * constants.column_max - constants.gap_height;

        return random_float(top_limit, bottom_limit);
    }
}

// Factory functions
namespace {
    // Factory for pipes. This requires information about whether the pipe is a top pipe, and the position x of the column, and the starting gap position Y
    pipe create_pipe(entt::registry &registry, bool is_top, float pos_x, float gap_start_pos_y) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        // PIPE BODY
        // Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
        transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};

        // Size X is the column thickness,
        // Size Y is the important part.
        // If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
        //  Half size is gap_start_pos_y since the center of the rectangle is at 0
        // If this is the bottom pipe, the top of the rectangle is at gap_start_pos_y + gap_height
        //  Half size is canvas_height - (gap_start_pos_y + gap_height)
        // Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
        math::vec2f body_size{constants.column_thickness,
                              is_top ?
                              gap_start_pos_y * 2.0f :
                              (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};

        auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos,
                                                  constants.pipe_outline_color);

        // PIPE CAP
        // Prepare the pipe cap
        // Size of the cap is defined in constants
        math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};

        // Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
        // or start of the gap, use the start of the gap minus half of the cap height
        transform::position_2d cap_pos{body_pos.x(),
                                       is_top ?
                                       gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                       gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
        };

        // Construct the cap
        auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos,
                                                 constants.pipe_outline_color);

        // Set layers, cap should be in front of body
        registry.assign<graphics::layer<4>>(cap);
        registry.assign<graphics::layer<3>>(body);
        tag_game_scene(registry, cap, true);
        tag_game_scene(registry, body, true);

        // Construct a pipe with body and cap and return it
        return {body, cap};
    }

    // Factory to create single column
    void create_column(entt::registry &registry, float pos_x) noexcept {
        // Create a fresh entity for a new column
        auto entity_column = registry.create();

        // Get a random gap start position Y, between pipes
        float gap_start_pos_y = get_random_gap_start_pos(registry);

        // Create pipes, is_top variable is false for bottom one
        auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
        auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);

        // Make a column from these two pipes and mark it as "column"
        registry.assign<column>(entity_column, top_pipe, bottom_pipe);
        registry.assign<entt::tag<"column"_hs>>(entity_column);
        tag_game_scene(registry, entity_column, true);
    }

    // Factory for creating a Flappy Bird columns
    void create_columns(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Spawn columns out of the screen, out of the canvas
        const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;

        // Create the columns
        for (std::size_t i = 0; i < constants.column_count; ++i) {
            // Horizontal position (X) increases for every column, keeping the distance
            float pos_x = column_pos_offset + i * constants.column_distance;

            create_column(registry, pos_x);
        }
    }

    // Factory for creating a Flappy Bird background
    void create_background(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Create Sky
        {
            // The sky is the whole canvas, so the position is in the middle of the canvas
            transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};

            // The size is the full canvas
            math::vec2f size{canvas_width, canvas_height};

            auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
            registry.assign<graphics::layer<1>>(sky);
            tag_game_scene(registry, sky);
        }

        // Create Grass
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};

            // Size X is full canvas but the height is defined in constants
            // Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
            math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};

            auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos,
                                                       constants.grass_outline_color);
            registry.assign<graphics::layer<3>>(grass);
            tag_game_scene(registry, grass);
        }

        // Create Ground
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the bottom of the screen, so the height is the full canvas_height minus half of the ground thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness * 0.5f};

            // Size X is full canvas but the height is defined in constants
            math::vec2f size{canvas_width, constants.ground_thickness};

            auto ground = geometry::blueprint_rectangle(registry, size, constants.ground_color, pos);
            registry.assign<graphics::layer<3>>(ground);
            tag_game_scene(registry, ground);
        }
    }

    // Factory for creating the player
    entt::entity create_player(entt::registry &registry) {
        // Retrieve constants
        const auto[_, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        auto entity = graphics::blueprint_sprite(registry,
                                                 graphics::sprite{constants.player_image_name.c_str()},
                                                 transform::position_2d{constants.player_pos_x, canvas_height * 0.5f});
        registry.assign<antara::gaming::graphics::layer<5>>(entity);
        registry.assign<entt::tag<"player"_hs>>(entity);
        tag_game_scene(registry, entity, true);

        return entity;
    }
}

// Column Logic System
class column_logic final : public ecs::logic_update_system<column_logic> {
public:
    explicit column_logic(entt::registry &registry) noexcept : system(registry) {
        disable();
    }

    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Loop all columns
        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);

            // Move pipes, and retrieve column position x
            float column_pos_x = move_pipe(registry, col.top_pipe);
            move_pipe(registry, col.bottom_pipe);

            // Test whether column is out of the screen
            if (column_pos_x < -constants.column_distance) {
                // Remove this column
                col.destroy(registry, entity);

                // Create a new column at far end
                create_column(registry, furthest_pipe_position(registry) + constants.column_distance);
            }
        }
    }

private:
    // Find the furthest pipe's position X
    float furthest_pipe_position(entt::registry &registry) {
        float furthest = 0.f;

        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);
            float x = entity_registry_.get<transform::position_2d>(col.top_pipe.body).x();
            if (x > furthest) furthest = x;
        }

        return furthest;
    }

    // Move the pipe and return the x position
    float move_pipe(entt::registry &registry, pipe &pipe) {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Get current position of the pipe
        auto pos = registry.get<transform::position_2d>(pipe.body);

        // Shift pos X to the left by scroll_speed, but multiply the value by dt, as this occurs many times per second
        // Delta time ensures that the movement occurs over time, so that over the course of one second the movement covers scroll_speed pixels
        auto new_pos_x = pos.x() - constants.scroll_speed * timer::time_step::get_fixed_delta_time();

        // Set the new position value
        registry.replace<transform::position_2d>(pipe.body, new_pos_x, pos.y());

        // Set cap position too
        auto cap_pos = registry.get<transform::position_2d>(pipe.cap);
        registry.replace<transform::position_2d>(pipe.cap, new_pos_x, cap_pos.y());

        // Return the information about whether this pipe is out of the screen
        return new_pos_x;
    }
};

// Name this system
REFL_AUTO (type(column_logic));

// Player Logic System
class player_logic final : public ecs::logic_update_system<player_logic> {
public:
    player_logic(entt::registry &registry, entt::entity player) noexcept : system(registry), player_(player) {
        disable();
    }

    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Get current position of the player
        auto pos = registry.get<transform::position_2d>(player_);

        // Add gravity to movement speed, multiply with delta time to apply it over time
        movement_speed_.set_y(movement_speed_.y() + constants.gravity * timer::time_step::get_fixed_delta_time());

        // Check if jump key is tapped
        bool jump_key_tapped = input::virtual_input::is_tapped("jump");

        // If jump is tapped, jump by adding jump force to the movement speed Y
        if (jump_key_tapped) movement_speed_.set_y(-constants.jump_force);

        // Add movement speed to position to make the character move, but apply over time with delta time
        pos += movement_speed_ * timer::time_step::get_fixed_delta_time();

        // Do not let player to go out of the screen to top
        if (pos.y() <= 0.f) {
            pos.set_y(0.f);
            movement_speed_.set_y(0.f);
        }

        // Set the new position value
        registry.replace<transform::position_2d>(player_, pos);

        // ROTATION
        // Retrieve props of the player
        auto &props = registry.get<transform::properties>(player_);

        // Increase the rotation a little by applying delta time
        float new_rotation = props.rotation + constants.rotate_speed * timer::time_step::get_fixed_delta_time();

        // If jump button is tapped, reset rotation,
        // If rotation is higher than the max angle, set it to max angle
        if (jump_key_tapped)
            new_rotation = 0.f;
        else if (props.rotation > constants.max_angle)
            new_rotation = constants.max_angle;

        // Set the properties
        registry.replace<transform::properties>(player_, transform::properties{.rotation = new_rotation});
    }

private:
    entt::entity player_;
    math::vec2f movement_speed_{0.f, 0.f};
};

// Name this system
REFL_AUTO (type(player_logic));

// Collision Logic System
class collision_logic final : public ecs::logic_update_system<collision_logic> {
public:
    collision_logic(entt::registry &registry, entt::entity player, bool &player_died) noexcept : system(registry),
                                                                                                   player_(player),
                                                                                                   player_died_(player_died) {}
    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Do not check anything if player is already dead
        if (player_died_) return;

        // Check collision
        check_player_pipe_collision(registry);
    }

private:
    // Loop all columns to check collisions between player and the pipes
    void check_player_pipe_collision(entt::registry &registry) {
        for (auto entity : registry.view<graphics::layer<3>>()) {
            // Check collision between player and a collidable object
            if (collisions::basic_collision_system::query_rect(registry, player_, entity)) {
                // Mark player died as true
                player_died_ = true;
            }
        }
    }

    entt::entity player_;
    bool &player_died_;
};

// Name this system
REFL_AUTO (type(collision_logic));

// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry, ecs::system_manager &system_manager) noexcept : base_scene(registry),
                                                                                          system_manager_(system_manager) {
        // Set the constants that will be used in the program
        registry.set<flappy_bird_constants>();

        // Create everything
        create_background(registry);
        init_dynamic_objects(registry);
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
        // Check if player requested to start the game
        check_start_game_request();

        // Check if the player died
        check_death();

        // Check if player requested reset after death
        check_reset_request();
    }

    // Check if start game is requested at the pause state
    void check_start_game_request() {
        // If game is not started yet and jump key is tapped
        if (!started_playing_ && input::virtual_input::is_tapped("jump")) {
            // Game starts, player started playing
            started_playing_ = true;
            resume_physics();
        }
    }

    // Check if the player died
    void check_death() {
        // If the player died, game over, and pause physics
        if (player_died_) {
            player_died_ = false;
            game_over_ = true;
            pause_physics();
        }
    }

    // Check if reset is requested at game over state
    void check_reset_request() {
        // If game is over, and jump key is pressed, reset game
        if (game_over_ && input::virtual_input::is_tapped("jump")) reset_game();
    }

    // Initialize dynamic objects, this function is called at start and resets
    void init_dynamic_objects(entt::registry &registry) {
        create_columns(registry);

        // Create player
        auto player = create_player(registry);

        // Create logic systems
        create_logic_systems(player);

        // Reset state variables
        reset_state_variables();
    }

    // Create logic systems
    void create_logic_systems(entt::entity player) {
        system_manager_.create_system_rt<column_logic>();
        system_manager_.create_system_rt<player_logic>(player);
        system_manager_.create_system_rt<collision_logic>(player, player_died_);
    }

    // Reset state values
    void reset_state_variables() {
        started_playing_ = false;
        player_died_ = false;
        game_over_ = false;
    }

    // Pause physics
    void pause_physics() {
        system_manager_.disable_systems<column_logic, player_logic>();
    }

    // Resume physics
    void resume_physics() {
        system_manager_.enable_systems<column_logic, player_logic>();
    }

    // Destroy dynamic objects
    void destroy_dynamic_objects() {
        // Retrieve the collection of entities from the game scene
        auto view = entity_registry_.view<entt::tag<"dynamic"_hs>>();

        // Iterate the collection and destroy each entities
        entity_registry_.destroy(view.begin(), view.end());

        // Delete systems
        system_manager_.mark_systems<player_logic, collision_logic>();
    }

    // Reset game
    void reset_game() {
        // Destroy all dynamic objects
        destroy_dynamic_objects();

        // Queue reset to reinitialize
        this->need_reset_ = true;
    }

    // Post update
    void post_update() noexcept final {
        // If reset is requested
        if (need_reset_) {
            // Reinitialize all these
            init_dynamic_objects(entity_registry_);
            need_reset_ = false;
        }
    }

    // System manager reference
    ecs::system_manager &system_manager_;

    // States
    bool started_playing_{false};
    bool player_died_{false};
    bool game_over_{false};
    bool need_reset_{false};
};

// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Create virtual input system
        system_manager_.create_system<ecs::virtual_input_system>();

        // Define the buttons for the jump action
        input::virtual_input::create("jump",
                                     {input::key::space, input::key::w, input::key::up},
                                     {input::mouse_button::left, input::mouse_button::right});

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_, system_manager_), true);
    }
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```

## Score and UI

Without scores there is no measure of achievement, and no motivation to play again for improvement.

Only one constant is needed: `font_size`.

```cpp
struct flappy_bird_constants {
    // UI
    const unsigned long long font_size{32ull};
```

#### Creating the Score

The score increases by one each time the player passes a column. 

Mark a passed column as `scored`. Put a variable into the `struct column`.

```cpp
// Is score taken from this column
bool scored{false};
```

Define a score struct that has the current score, max score, and UI text.

```cpp
// Score struct, has current value, max record, and the UI text
struct score {
    int value;
    int max_score;
    entt::entity text;
};
```

Make a function which constructs the UI text and places it under logic functions, `namespace`.

```cpp
// Create the UI string
std::string score_ui_text(int score = 0, int best_score = 0) {
    return "Score: "s + std::to_string(score) +
           "\nBest: "s + std::to_string(best_score) +
           "\n\nW / UP / Space / Mouse to FLAP"s;
}
```

Make the `create_score` function that makes an entity.

Retrieve constants and canvas size.

```cpp
// Factory to create score entity
entt::entity create_score(entt::registry &registry) {
    // Retrieve constants
    const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
    const auto constants = registry.ctx<flappy_bird_constants>();
```

#### Create the Text

Create `text_entity` using the `graphics::blueprint_text` function, feed the text `score_ui_text` and `font_size` from `constants`.

```cpp
// Create text
auto text_entity = graphics::blueprint_text(registry, graphics::text{score_ui_text(), constants.font_size},
    transform::position_2d{canvas_width * 0.03f, canvas_height * 0.03f}, graphics::white);
```

Set the layer to `layer<9>`, as the text must be in front of everything. Tag the text as `game_scene`.

```cpp
registry.assign<graphics::layer<9>>(text_entity);
tag_game_scene(registry, text_entity);
```

Create a fresh entity and assign `struct score` to it with `0` score, max record values, and the `text_entity` value. Tag this entity as `high_score` and `game_scene`, then return it.

```cpp
// Create a fresh entity
auto entity = registry.create();

// Create score
registry.assign<score>(entity, 0, 0, text_entity);
registry.assign<entt::tag<"high_score"_hs>>(entity);
tag_game_scene(registry, entity);

return entity;
```

Add a member for the entity in `game_scene`.

```cpp
entt::entity score_entity_;
```

Create the entity inside the `game_scene` constructor using the `create_score` function.

```cpp
game_scene(entt::registry &registry, ecs::system_manager &system_manager) noexcept : base_scene(registry),
                                                                                      system_manager_(system_manager) {
    // Set the constants that will be used in the program
    registry.set<flappy_bird_constants>();

    // Create everything
    score_entity_ = create_score(registry);
    create_background(registry);
    init_dynamic_objects(registry);
}
```

#### Updating the Score

Make the function that updates the score.

This function does two things: increment the score by one and reset the score when the game is reset.

This requires a parameter, `reset`, for information about the reset.

To achieve this, retrieve the `struct score` from the entity. If a reset is requested, set the `value` to zero.

If a reset is not requested, increment the `value` by one, check whether the value is higher than the `max_score`, and update the `max_score` if this is the case.

```cpp
void update_score(entt::registry &registry, entt::entity entity, bool reset = false) {
    score &sc = registry.get<score>(entity);

    // If reset is asked, set score to 0
    if (reset) sc.value = 0;
        // Else, increase the score,
        // Compare it with the max score, and update max score if it's greater
    else if (++sc.value > sc.max_score) sc.max_score = sc.value;
```

Update the `struct score` inside the score entity.

```cpp
// Update the score entity
registry.replace<score>(entity, sc);
```

Update the contents of `graphics::text` with the `score_ui_text` using the new values.

```cpp
// Update the UI text entity with the current values
auto &text = registry.get<graphics::text>(sc.text);
text.contents = score_ui_text(sc.value, sc.max_score);
registry.replace<graphics::text>(sc.text, text);
```

The completed function is as follows.

```cpp
// Update score
void update_score(entt::registry &registry, entt::entity entity, bool reset = false) {
    score &sc = registry.get<score>(entity);

    // If reset is asked, set score to 0
    if (reset) sc.value = 0;
        // Else, increase the score,
        // Compare it with the max score, and update max score if it's greater
    else if (++sc.value > sc.max_score) sc.max_score = sc.value;

    // Update the score entity
    registry.replace<score>(entity, sc);

    // Update the UI text entity with the current values
    auto &text = registry.get<graphics::text>(sc.text);
    text.contents = score_ui_text(sc.value, sc.max_score);
    registry.replace<graphics::text>(sc.text, text);
}
```

The function must be called when the player passes a column. The function needs the score entity. Pass the function to `column_logic` with the constructor.

The first step is to have a class member for entity.

```cpp
entt::entity score_entity_;
```

Then fill this with the constructor.

```cpp
// Column Logic System
class column_logic final : public ecs::logic_update_system<column_logic> {
public:
    explicit column_logic(entt::registry &registry, entt::entity score) noexcept : system(registry),
                                                                                score_entity_(score) {
        disable();
    }
```

Update the creation line also, feeding the score entity.

```cpp
void create_logic_systems(entt::entity player) {
    system_manager_.create_system_rt<column_logic>(score_entity_);
```

Return to the `update` function of this class and, inside the `for` loop that loops through all columns, add the check for the score.

At first the column should be new with the `score` field set to `false`. 

Once the column position is to the left side of the player position (after the player passes), use a simple `<` comparison of the column and the player’s position on the `X` axis.

Inside, call the `update_score` function and mark the column `scored` as `true`.

```cpp
// If this column is not scored and if the player passed this column
if (!col.scored && column_pos_x < constants.player_pos_x) {
    // Increase the score
    update_score(registry, score_entity_);

    // Set column as scored
    col.scored = true;
}
```

#### Reset the Score Value at Game Over

Reset this score value when the game is over and `reset_game` is called. 

Use the `update_score` function to this effect, but this time set the last parameter, `reset`, as `true`.

```cpp
// Reset game
void reset_game() {
    // Destroy all dynamic objects
    destroy_dynamic_objects();

    // Queue reset to reinitialize
    this->need_reset_ = true;

    // Reset current score, but keep the max score
    update_score(entity_registry_, score_entity_, true);
}
```

A visual example of the result.

<div>

<img src="/flappy-bird-tutorial/fb_score.png">

</div>

Here is the full code.

```cpp
#include <random>
#include <antara/gaming/ecs/virtual.input.system.hpp>
#include <antara/gaming/collisions/basic.collision.system.hpp>
#include <antara/gaming/graphics/component.layer.hpp>
#include <antara/gaming/graphics/component.canvas.hpp>
#include <antara/gaming/math/vector.hpp>
#include <antara/gaming/scenes/scene.manager.hpp>
#include <antara/gaming/sfml/graphic.system.hpp>
#include <antara/gaming/sfml/input.system.hpp>
#include <antara/gaming/sfml/resources.manager.hpp>
#include <antara/gaming/world/world.app.hpp>
#include <antara/gaming/graphics/component.sprite.hpp>
#include <antara/gaming/input/virtual.hpp>

// For convenience
using namespace antara::gaming;
using namespace std::string_literals;

// Constants
struct flappy_bird_constants {
    // Player
    const std::string player_image_name{"player.png"};
    const float player_pos_x{400.0f};
    const float gravity{2000.f};
    const float jump_force{650.f};
    const float rotate_speed{100.f};
    const float max_angle{60.f};

    // Pipes
    const float gap_height{265.f};
    const float column_start_distance{700.f};
    const float column_min{0.2f};
    const float column_max{0.8f};
    const float column_thickness{100.f};
    const float column_distance{400.f};
    const std::size_t column_count{6};
    const float pipe_cap_extra_width{10.f};
    const float pipe_cap_height{50.f};
    const graphics::color pipe_color{92, 181, 61};
    const graphics::outline_color pipe_outline_color{2.0f, graphics::color{76, 47, 61}};
    const float scroll_speed{200.f};

    // Background
    const float ground_thickness{100.0f};
    const float grass_thickness{20.0f};
    const graphics::color background_color{82, 189, 199};
    const graphics::color ground_color{220, 209, 143};
    const graphics::color grass_color{132, 227, 90};
    const graphics::outline_color grass_outline_color{2.0f, graphics::color{76, 47, 61}};
};

// Random number generator
namespace {
    std::random_device rd;  // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    float random_float(float lower, float higher) {
        std::uniform_real_distribution<float> dist(lower, higher);
        return dist(gen);
    }
}

// A Flappy Bird column which has two pipes
struct pipe {
    entt::entity body{entt::null};
    entt::entity cap{entt::null};

    // Destroy pipe
    void destroy(entt::registry &registry) {
        registry.destroy(body);
        registry.destroy(cap);
    }
};

// Column is made of two pipes
struct column {
    // Entities representing the Flappy Bird pipes
    pipe top_pipe{entt::null};
    pipe bottom_pipe{entt::null};

    // Destroy pipes and this column
    void destroy(entt::registry &registry, entt::entity entity) {
        top_pipe.destroy(registry);
        bottom_pipe.destroy(registry);
        registry.destroy(entity);
    }
};

// Logic functions
namespace {
    void tag_game_scene(entt::registry &registry, entt::entity entity, bool dynamic = false) {
        // Tag game scene
        registry.assign<entt::tag<"game_scene"_hs>>(entity);

        // Tag dynamic
        if(dynamic) registry.assign<entt::tag<"dynamic"_hs>>(entity);
    }

    // Returns a random gap start position Y
    float get_random_gap_start_pos(const entt::registry &registry) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        float top_limit = canvas_height * constants.column_min;
        float bottom_limit = canvas_height * constants.column_max - constants.gap_height;

        return random_float(top_limit, bottom_limit);
    }
}

// Factory functions
namespace {
    // Factory for pipes. This requires information about whether the pipe is a top pipe, and the position x of the column, and the starting gap position Y
    pipe create_pipe(entt::registry &registry, bool is_top, float pos_x, float gap_start_pos_y) {
        // Retrieve constants
        const auto canvas_height = registry.ctx<graphics::canvas_2d>().canvas.size.y();
        const auto constants = registry.ctx<flappy_bird_constants>();

        // PIPE BODY
        // Top pipe is at Y: 0 and bottom pipe is at canvas_height, bottom of the canvas
        transform::position_2d body_pos{pos_x, is_top ? 0.f : canvas_height};

        // Size X is the column thickness,
        // Size Y is the important part.
        // If this is a top pipe, gap_start_pos_y is the bottom of the rectangle
        //  Half size is gap_start_pos_y since the center of the rectangle is at 0
        // If this is the bottom pipe, the top of the rectangle is at gap_start_pos_y + gap_height
        //  Half size is canvas_height - (gap_start_pos_y + gap_height)
        // Since these are half-sizes, and the position is at the screen border, multiply these sizes by two
        math::vec2f body_size{constants.column_thickness,
                              is_top ?
                              gap_start_pos_y * 2.0f :
                              (canvas_height - (gap_start_pos_y + constants.gap_height)) * 2.0f};

        auto body = geometry::blueprint_rectangle(registry, body_size, constants.pipe_color, body_pos,
                                                  constants.pipe_outline_color);

        // PIPE CAP
        // Prepare the pipe cap
        // Size of the cap is defined in constants
        math::vec2f cap_size{constants.column_thickness + constants.pipe_cap_extra_width, constants.pipe_cap_height};

        // Position X is the same as the body. The bottom of the cap is aligned with the bottom of the body,
        // or start of the gap, use the start of the gap minus half of the cap height
        transform::position_2d cap_pos{body_pos.x(),
                                       is_top ?
                                       gap_start_pos_y - constants.pipe_cap_height * 0.5f :
                                       gap_start_pos_y + constants.gap_height + constants.pipe_cap_height * 0.5f
        };

        // Construct the cap
        auto cap = geometry::blueprint_rectangle(registry, cap_size, constants.pipe_color, cap_pos,
                                                 constants.pipe_outline_color);

        // Set layers, cap should be in front of body
        registry.assign<graphics::layer<4>>(cap);
        registry.assign<graphics::layer<3>>(body);
        tag_game_scene(registry, cap, true);
        tag_game_scene(registry, body, true);

        // Construct a pipe with body and cap and return it
        return {body, cap};
    }

    // Factory to create single column
    void create_column(entt::registry &registry, float pos_x) noexcept {
        // Create a fresh entity for a new column
        auto entity_column = registry.create();

        // Get a random gap start position Y, between pipes
        float gap_start_pos_y = get_random_gap_start_pos(registry);

        // Create pipes, is_top variable is false for bottom one
        auto top_pipe = create_pipe(registry, true, pos_x, gap_start_pos_y);
        auto bottom_pipe = create_pipe(registry, false, pos_x, gap_start_pos_y);

        // Make a column from these two pipes and mark it as "column"
        registry.assign<column>(entity_column, top_pipe, bottom_pipe);
        registry.assign<entt::tag<"column"_hs>>(entity_column);
        tag_game_scene(registry, entity_column, true);
    }

    // Factory for creating a Flappy Bird columns
    void create_columns(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Spawn columns out of the screen, out of the canvas
        const float column_pos_offset = constants.column_start_distance + constants.column_thickness * 2.0f;

        // Create the columns
        for (std::size_t i = 0; i < constants.column_count; ++i) {
            // Horizontal position (X) increases for every column, keeping the distance
            float pos_x = column_pos_offset + i * constants.column_distance;

            create_column(registry, pos_x);
        }
    }

    // Factory for creating a Flappy Bird background
    void create_background(entt::registry &registry) noexcept {
        // Retrieve constants
        const auto[canvas_width, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Create Sky
        {
            // The sky is the whole canvas, so the position is in the middle of the canvas
            transform::position_2d pos{canvas_width * 0.5f, canvas_height * 0.5f};

            // The size is the full canvas
            math::vec2f size{canvas_width, canvas_height};

            auto sky = geometry::blueprint_rectangle(registry, size, constants.background_color, pos);
            registry.assign<graphics::layer<1>>(sky);
            tag_game_scene(registry, sky);
        }

        // Create Grass
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the top of the ground, so the height of the ground is canvas_height minus ground_thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness};

            // Size X is full canvas but the height is defined in constants
            // Make the rectangle longer by adding the thickness of the outline to hide the outline at the sides
            math::vec2f size{canvas_width + constants.grass_outline_color.thickness * 2.0f, constants.grass_thickness};

            auto grass = geometry::blueprint_rectangle(registry, size, constants.grass_color, pos,
                                                       constants.grass_outline_color);
            registry.assign<graphics::layer<3>>(grass);
            tag_game_scene(registry, grass);
        }

        // Create Ground
        {
            // The ground expands to the whole canvas width, so the position is in the center X value of the canvas,
            // Position Y is at the bottom of the screen, so the height is the full canvas_height minus half of the ground thickness
            transform::position_2d pos{canvas_width * 0.5f, canvas_height - constants.ground_thickness * 0.5f};

            // Size X is full canvas but the height is defined in constants
            math::vec2f size{canvas_width, constants.ground_thickness};

            auto ground = geometry::blueprint_rectangle(registry, size, constants.ground_color, pos);
            registry.assign<graphics::layer<3>>(ground);
            tag_game_scene(registry, ground);
        }
    }

    // Factory for creating the player
    entt::entity create_player(entt::registry &registry) {
        // Retrieve constants
        const auto[_, canvas_height] = registry.ctx<graphics::canvas_2d>().canvas.size;
        const auto constants = registry.ctx<flappy_bird_constants>();

        auto entity = graphics::blueprint_sprite(registry,
                                                 graphics::sprite{constants.player_image_name.c_str()},
                                                 transform::position_2d{constants.player_pos_x, canvas_height * 0.5f});
        registry.assign<antara::gaming::graphics::layer<5>>(entity);
        registry.assign<entt::tag<"player"_hs>>(entity);
        tag_game_scene(registry, entity, true);

        return entity;
    }
}

// Column Logic System
class column_logic final : public ecs::logic_update_system<column_logic> {
public:
    explicit column_logic(entt::registry &registry) noexcept : system(registry) {
        disable();
    }

    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Loop all columns
        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);

            // Move pipes, and retrieve column position x
            float column_pos_x = move_pipe(registry, col.top_pipe);
            move_pipe(registry, col.bottom_pipe);

            // Test whether column is out of the screen
            if (column_pos_x < -constants.column_distance) {
                // Remove this column
                col.destroy(registry, entity);

                // Create a new column at far end
                create_column(registry, furthest_pipe_position(registry) + constants.column_distance);
            }
        }
    }

private:
    // Find the furthest pipe's position X
    float furthest_pipe_position(entt::registry &registry) {
        float furthest = 0.f;

        for (auto entity : registry.view<column>()) {
            auto &col = registry.get<column>(entity);
            float x = entity_registry_.get<transform::position_2d>(col.top_pipe.body).x();
            if (x > furthest) furthest = x;
        }

        return furthest;
    }

    // Move the pipe and return the x position
    float move_pipe(entt::registry &registry, pipe &pipe) {
        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Get current position of the pipe
        auto pos = registry.get<transform::position_2d>(pipe.body);

        // Shift pos X to the left by scroll_speed, but multiply the value by dt, as this occurs many times per second
        // Delta time ensures that the movement occurs over time, so that over the course of one second the movement covers scroll_speed pixels
        auto new_pos_x = pos.x() - constants.scroll_speed * timer::time_step::get_fixed_delta_time();

        // Set the new position value
        registry.replace<transform::position_2d>(pipe.body, new_pos_x, pos.y());

        // Set cap position too
        auto cap_pos = registry.get<transform::position_2d>(pipe.cap);
        registry.replace<transform::position_2d>(pipe.cap, new_pos_x, cap_pos.y());

        // Return the information about whether this pipe is out of the screen
        return new_pos_x;
    }
};

// Name this system
REFL_AUTO (type(column_logic));

// Player Logic System
class player_logic final : public ecs::logic_update_system<player_logic> {
public:
    player_logic(entt::registry &registry, entt::entity player) noexcept : system(registry), player_(player) {
        disable();
    }

    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Retrieve constants
        const auto constants = registry.ctx<flappy_bird_constants>();

        // Get current position of the player
        auto pos = registry.get<transform::position_2d>(player_);

        // Add gravity to movement speed, multiply with delta time to apply it over time
        movement_speed_.set_y(movement_speed_.y() + constants.gravity * timer::time_step::get_fixed_delta_time());

        // Check if jump key is tapped
        bool jump_key_tapped = input::virtual_input::is_tapped("jump");

        // If jump is tapped, jump by adding jump force to the movement speed Y
        if (jump_key_tapped) movement_speed_.set_y(-constants.jump_force);

        // Add movement speed to position to make the character move, but apply over time with delta time
        pos += movement_speed_ * timer::time_step::get_fixed_delta_time();

        // Do not let player to go out of the screen to top
        if (pos.y() <= 0.f) {
            pos.set_y(0.f);
            movement_speed_.set_y(0.f);
        }

        // Set the new position value
        registry.replace<transform::position_2d>(player_, pos);

        // ROTATION
        // Retrieve props of the player
        auto &props = registry.get<transform::properties>(player_);

        // Increase the rotation a little by applying delta time
        float new_rotation = props.rotation + constants.rotate_speed * timer::time_step::get_fixed_delta_time();

        // If jump button is tapped, reset rotation,
        // If rotation is higher than the max angle, set it to max angle
        if (jump_key_tapped)
            new_rotation = 0.f;
        else if (props.rotation > constants.max_angle)
            new_rotation = constants.max_angle;

        // Set the properties
        registry.replace<transform::properties>(player_, transform::properties{.rotation = new_rotation});
    }

private:
    entt::entity player_;
    math::vec2f movement_speed_{0.f, 0.f};
};

// Name this system
REFL_AUTO (type(player_logic));

// Collision Logic System
class collision_logic final : public ecs::logic_update_system<collision_logic> {
public:
    collision_logic(entt::registry &registry, entt::entity player, bool &player_died) noexcept : system(registry),
                                                                                                   player_(player),
                                                                                                   player_died_(player_died) {}
    // Update, this will be called every tick
    void update() noexcept final {
        auto &registry = entity_registry_;

        // Do not check anything if player is already dead
        if (player_died_) return;

        // Check collision
        check_player_pipe_collision(registry);
    }

private:
    // Loop all columns to check collisions between player and the pipes
    void check_player_pipe_collision(entt::registry &registry) {
        for (auto entity : registry.view<graphics::layer<3>>()) {
            // Check collision between player and a collidable object
            if (collisions::basic_collision_system::query_rect(registry, player_, entity)) {
                // Mark player died as true
                player_died_ = true;
            }
        }
    }

    entt::entity player_;
    bool &player_died_;
};

// Name this system
REFL_AUTO (type(collision_logic));

// Game Scene
class game_scene final : public scenes::base_scene {
public:
    game_scene(entt::registry &registry, ecs::system_manager &system_manager) noexcept : base_scene(registry),
                                                                                          system_manager_(system_manager) {
        // Set the constants that will be used in the program
        registry.set<flappy_bird_constants>();

        // Create everything
        create_background(registry);
        init_dynamic_objects(registry);
    }

    // Scene name
    std::string scene_name() noexcept final {
        return "game_scene";
    }

private:
    // Update the game every tick
    void update() noexcept final {
        // Check if player requested to start the game
        check_start_game_request();

        // Check if the player died
        check_death();

        // Check if player requested reset after death
        check_reset_request();
    }

    // Check if start game is requested at the pause state
    void check_start_game_request() {
        // If game is not started yet and jump key is tapped
        if (!started_playing_ && input::virtual_input::is_tapped("jump")) {
            // Game starts, player started playing
            started_playing_ = true;
            resume_physics();
        }
    }

    // Check if the player died
    void check_death() {
        // If the player died, game over, and pause physics
        if (player_died_) {
            player_died_ = false;
            game_over_ = true;
            pause_physics();
        }
    }

    // Check if reset is requested at game over state
    void check_reset_request() {
        // If game is over, and jump key is pressed, reset game
        if (game_over_ && input::virtual_input::is_tapped("jump")) reset_game();
    }

    // Initialize dynamic objects, this function is called at start and resets
    void init_dynamic_objects(entt::registry &registry) {
        create_columns(registry);

        // Create player
        auto player = create_player(registry);

        // Create logic systems
        create_logic_systems(player);

        // Reset state variables
        reset_state_variables();
    }

    // Create logic systems
    void create_logic_systems(entt::entity player) {
        system_manager_.create_system_rt<column_logic>();
        system_manager_.create_system_rt<player_logic>(player);
        system_manager_.create_system_rt<collision_logic>(player, player_died_);
    }

    // Reset state values
    void reset_state_variables() {
        started_playing_ = false;
        player_died_ = false;
        game_over_ = false;
    }

    // Pause physics
    void pause_physics() {
        system_manager_.disable_systems<column_logic, player_logic>();
    }

    // Resume physics
    void resume_physics() {
        system_manager_.enable_systems<column_logic, player_logic>();
    }

    // Destroy dynamic objects
    void destroy_dynamic_objects() {
        // Retrieve the collection of entities from the game scene
        auto view = entity_registry_.view<entt::tag<"dynamic"_hs>>();

        // Iterate the collection and destroy each entities
        entity_registry_.destroy(view.begin(), view.end());

        // Delete systems
        system_manager_.mark_systems<player_logic, collision_logic>();
    }

    // Reset game
    void reset_game() {
        // Destroy all dynamic objects
        destroy_dynamic_objects();

        // Queue reset to reinitialize
        this->need_reset_ = true;
    }

    // Post update
    void post_update() noexcept final {
        // If reset is requested
        if (need_reset_) {
            // Reinitialize all these
            init_dynamic_objects(entity_registry_);
            need_reset_ = false;
        }
    }

    // System manager reference
    ecs::system_manager &system_manager_;

    // States
    bool started_playing_{false};
    bool player_died_{false};
    bool game_over_{false};
    bool need_reset_{false};
};

// Game world
struct flappy_bird_world : world::app {
    // Game entry point
    flappy_bird_world() noexcept {
        // Load the graphical system
        auto &graphic_system = system_manager_.create_system<sfml::graphic_system>();

        // Load the resources system
        entity_registry_.set<sfml::resources_system>(entity_registry_);

        // Load the input system with the window from the graphical system
        system_manager_.create_system<sfml::input_system>(graphic_system.get_window());

        // Create virtual input system
        system_manager_.create_system<ecs::virtual_input_system>();

        // Define the buttons for the jump action
        input::virtual_input::create("jump",
                                     {input::key::space, input::key::w, input::key::up},
                                     {input::mouse_button::left, input::mouse_button::right});

        // Load the scenes manager
        auto &scene_manager = system_manager_.create_system<scenes::manager>();

        // Change the current_scene to "game_scene" by pushing it.
        scene_manager.change_scene(std::make_unique<game_scene>(entity_registry_, system_manager_), true);
    }
};

int main() {
    // Declare the world
    flappy_bird_world game;

    // Run the game
    return game.run();
}
```
