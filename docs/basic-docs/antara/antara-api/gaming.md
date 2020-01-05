---
sidebarDepth: 6
---

# Gaming

## Introduction

Welcome to the Antara Gaming SDK documentation. This module-based software is programmed in C++ 17 and is designed for high-speed runtime execution.

::: tip

The modules of the Antara Gaming SDK rely on other modules, such as [Oracles](./oracles.html)

:::

## config

The `antara::gaming::config` class provides a function to load customized configuration settings for the Antara Gaming SDK.

### load\_configuration

#### Public Function

The `load_configuration` function loads customizable configuration settings from a path and filename. 

- If the parameter path does not exist the function attempts to create the directories of the given path
- If the configuration does not exist, the function creates a default configuration
- If the path and the name of the file exists, the function loads the configuration contents 

#### Usage Pattern

```
template<typename TConfig>

TConfig antara::gaming::config::load_configuration(std::filesystem::path &&config_path, std::string filename)
```

#### Template Parameters

| Name    | Type | Description                                                                                       |
| ------- | ---- | ------------------------------------------------------------------------------------------------- |
| TConfig | typename | the type of template to load                                                                      |

#### Function Parameters

| Name   | Type | Description                                                                                        |
| ------ | ---- |  ------------------------------------------------------------------------------------------------- |
| config\_path | std::filesystem::path | the path to the directory in which the configuration file is located        |
| filename | std::string | the name of the configuration file                                                        |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TConfig          |template | the template                                                             |

#### :pushpin: Example

```c
auto cfg = config::load_configuration<my_game::config>(std::filesystem::current_path() / "assets/config", "my_game.config.json");
``` 

## core

The `antara::gaming::core` class provides functions and information relevant to
the core Antara Gaming SDK library.

### version

#### Public Function
The `version` function returns the current version of the Antara Gaming SDK.

::: tip

The result of this function can be deduced at compile time.

:::

#### Usage Pattern

```
#include <antara/gaming/core/version.hpp>

constexpr const char *antara::gaming::version()
```

#### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none) | |  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| current version          | const char * | the current version of the Antara Gaming SDK                                                              |

#### :pushpin: Example

```c
#include <iostream>
#include <antara/gaming/core/version.hpp>

void print_version() {
    std::cout << antara::gaming::version() << std::endl;
}
``` 

## ecs::system\_manager

The `antara::gaming::ecs::system_manager` class provides methods to perform tasks such as the manipulation of systems, the addition, deletion, and update of systems, and the deactivation of a system.

### system\_manager

#### Public Function

The primary constructor function.

#### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

system_manager(entt::registry &registry, bool subscribe_to_internal_events = true)
```

#### Destructor

```
~system_manager()
```

#### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| registry | entt::registry | an entity\_registry object |
| subscribe\_to\_internal\_events | bool | whether to subscribe to default system\_manager events |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)          | void  |                                                               |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager mgr{entity_registry};
}
``` 

### receive\_add\_base\_system

#### Public Function

Public member functions.

<!-- The description in the documentation was unclear to me. Can you please provide more information about what "Public member functions" means here? Thx -->

#### Usage Pattern

```
void receive_add_base_system(const ecs::event::add_base_system &evt)
```

#### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| evt | ecs::event::add\_base\_system& | <!-- need a description here --> |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)          | void  |                                                               |

#### :pushpin: Example

<!-- needs an example -->

```c

``` 

### start

#### Public Function

The `start` function informs the system manager instance that the developer's game is initiated and spinning.

::: tip

This function allows for the execution of actions at the end of each frame. For example, an action could be the deletion of a sytem, or the addition of a new system which will continue to receive iterations and updates.

:::

#### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

system_manager_instance.start();
```

#### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none) |  |  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)          | void  |                                                               |

<!-- Does this return something such as a bool value, for successful execution, by chance? -->

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    system_manager.start();
    return 0;
}
``` 

### update

#### Public Function

The `update` function updates a system-manager instance.

The logic of the function is designed to automatically manage the correct order of updates for the different types of systems the developer has added to their system-manager instance.

- If the developer's logic has not loaded any systems into the system\_manager instance the function returns `0`
- If the developer's logic marks a system for deletion, the function deletes the system is automatically at the end of the current loop tick
- If the developer's logic adds a system through an `ecs::event::add_base_system` event, the function automatically adds the system at the end of the current loop tick

#### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

std::size\_t nb\_systems\_updated = system\_manager.update();
```

#### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none) |  |  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| number of systems updated          | std::size\_t  | the number of systems updated                                                               |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    system_manager.start();
    // ... add 5 differents systems here
    std::size_t nb_systems_updated = system_manager.update();
    if (nb_systems_updated != 5) {
        std::cerr << "Expect 5 system updates from system_manager.update(), but received only " << nb_systems_updated << std::endl;
    }
    return 0;
}
``` 

### update\_systems

#### Public Function

The `update_systems` function updates specific systems in a system\_manager instance.

The [update](#update) (listed above) function calls this `update_systems` function multiple times each time the `update` function executes. 

The `update_systems` function is useful when the developer wishes to manually perform an update of a specific system.

#### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

std::size\_t nb\_systems\_updated = system\_manager.update();
```

#### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none) |  |  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| number of systems updated          | std::size\_t  | the number of systems updated                                                               |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    system_manager.start();
    // ... add 5 differents systems here
    std::size_t nb_systems_updated = system_manager.update();
    if (nb_systems_updated != 5) {
        std::cerr << "Expect 5 system updates from system_manager.update(), but received only " << nb_systems_updated << std::endl;
    }
    return 0;
}
``` 

### get\_system | 1

#### Public Function

The `get_system` function uses a template parameter to return a reference to a system.  

#### Usage Pattern

```
template<typename TSystem>
const TSystem &get_system() const 
```

#### Function and Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | (determined by the developer)  | the TSystem type represents any type of valid template, as designed by the developer   |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TSystem | &TSystem  | a reference to the template chosen by the developer                                                               |

#### :pushpin: Example

<!-- Need an example here -->

```c

``` 

### get\_system | 2 

#### Public Function

An overloaded version of the `get_system` function above.

This overloaded function accepts different parameters.

#### Usage Pattern

```
template<typename TSystem>

TSystem &get_system()
```

#### Function and Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | (determined by the developer)  | the TSystem type represents any type of valid template, as designed by the developer   |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TSystem | &TSystem  | a reference to the template chosen by the developer                                                               |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    system_manager.start();
    // ... added 2 differents systems here (render_system, and a log_system)
    auto& render_system = system_manager.get_system<game::render_system>();

    const auto& log_system = system_manager.get_system<game::log_system>();
    return 0;
}
``` 

### get\_systems | 1

#### Public Function

The `get_systems` function accepts multiple template parameters and returns multiple systems.

This function recursively calls the [get\_system](#get_system) function. Based on the logic of the different kinds of systems requested, this function updates the indicated systems in the correct order.

#### Usage Pattern

```
template<typename ...TSystems>
std::tuple<std::add_lvalue_reference_t<TSystems>...> get_systems()
```

#### Function and Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | std::tuple\<std::add\_lvalue\_reference\_t\<TSystems\>  | a tuple containing multiple TSystems templates   |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TSystems | std::tuple\<std::add\_lvalue\_reference\_t\<TSystems\>  | a reference to the template chosen by the developer                                                               |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    system_manager.start();
    // ... added 2 differents systems here (render_system, and a log_system)
    auto& render_system = system_manager.get_system<game::render_system>();

    const auto& log_system = system_manager.get_system<game::log_system>();
    return 0;
}
``` 

### get\_systems | 2

#### Public Function

An overloaded version of the [get\_systems](#get_systems) function.

::: tip

This function is marked as [nodiscard.](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)

:::

#### Usage Pattern

```
template<typename ...TSystems>
std::tuple<std::add_lvalue_reference_t<std::add_const_t<TSystems>>...> get_systems() const
```

#### Function and Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| tuple of TSystems | std::tuple\<std::add\_lvalue\_reference\_t\<std::add\_const\_t\<TSystems\>\>...\>  | a tuple containing multiple TSystems templates types  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| tuple of TSystems | std::tuple\<std::add\_lvalue\_reference\_t\<std::add\_const\_t\<TSystems\>\>...\>  | a tuple containing multiple references to TSystems templates   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    // ... added differents systems here
    // Called from a const context
    auto &&[system_foo, system_bar] = system_manager.get_systems<system_foo, system_bar>();

    // Called from a non const context
    auto&&[system_foo_nc, system_bar_nc] = system_manager.get_systems<system_foo, system_bar>();

    // Get it as a tuple
    auto tuple_systems = system_manager.get_systems<system_foo, system_bar>();
    return 0;
}
``` 

### has\_system 

#### Public Function

The `has_system` function verifies whether or not a system is already registered in the [system\_manager](#system_manager).

#### Usage Pattern

```
template<typename TSystem>
bool has_system() const
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | (determined by the developer) | the system that needs to be verified |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated system is registered in the system manager instance   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.has_system<my_game::render_system>();
    if (!result) {
        // Oh no, i don't have a rendering system.
    }
    return 0;
}
``` 

### has\_systems | 1

#### Public Function

The `has_systems` function verifies whether or not a list of systems is already registered in the [system\_manager](#system_manager).

This function recursively calls the [has\_system](#has_system) function.

::: tip

This function is marked as [nodiscard.](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)

:::

#### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| list of TSystems | template\<typename ...TSystems\> | the list of systems that needs to be verified |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated systems are registered in the system manager instance   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
    if (!result) {
        // Oh no, atleast one of the systems is not present
    }
    return 0;
}
``` 

### has\_systems | 2

#### Public Function

The `has_systems` function verifies whether or not a list of systems is already registered in the [system\_manager](#system_manager).

#### Usage Pattern

```
template<typename ...TSystems>
bool has_systems() const
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| list of TSystems | template\<typename ...TSystems\> | the list of systems that needs to be verified |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated systems are registered in the system manager instance   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
    if (!result) {
        // Oh no, atleast one of the systems is not present
    }
    return 0;
}
``` 

### has\_systems | 3

#### Public Function

The `has_systems` function verifies whether or not a list of systems is already registered in the [system\_manager](#system_manager).

This function recursively calls the [has\_system](#has_system) function.

::: tip

This function is marked as [nodiscard.](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)

:::

#### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| list of TSystems | templat\<typename ...TSystems\> | the list of systems that needs to be verified |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated systems are registered in the system manager instance   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
    if (!result) {
        // Oh no, atleast one of the systems is not present
    }
    return 0;
}
``` 

### has\_systems | 4

#### Public Function

The `has_systems` function verifies whether or not a list of systems is already registered in the [system\_manager](#system_manager).

This function recursively calls the [has\_system](#has_system) function.

::: tip

This function is marked [nodiscard.](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)

:::

#### Usage Pattern

```
template<typename ...TSystems>
bool has\_systems() const
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| list of TSystems | template\<typename ...TSystem\> | the list of systems that needs to be verified |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated systems are loaded in the system-manager instance   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
    if (!result) {
        // Oh no, atleast one of the systems is not present
    }
    return 0;
}
``` 

### mark\_system

#### Public Function

The`mark_system` function marks a system for destruction at the next tick of the game loop.

#### Usage Pattern

```
template<typename TSystem>
bool mark_system()
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | TSystem | the system to mark for destruction |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the system was successfully marked   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.mark_system<my_game::render>();
    if (!result) {
        // Oh no the system has not been marked.
        // Did you mark a system that is not present in the system_manager ?
    }
    return 0;
}
```

### mark\_systems | 1

#### Public Function

The`mark_systems` function marks a system for destruction at the next tick of the game loop.

#### Usage Pattern

```
template<typename TSystem>
bool mark_system()
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | TSystem | the system to mark for destruction |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the system was successfully marked   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.mark_system<my_game::render>();
    if (!result) {
        // Oh no the system has not been marked.
        // Did you mark a system that is not present in the system_manager ?
    }
    return 0;
}
```

### mark\_systems | 2

#### Public Function

The `mark_systems` function marks a list of systems for destruction at the next tick of the game loop.

This function recursively calls the [mark\_system](#mark_system) function.

::: tip

This system is marked as [nodiscard.](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)

:::

#### Usage Pattern

```
template<typename ...TSystems>
bool mark_systems()
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystems | TSystems | the systems to mark for destruction |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the system was successfully marked   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.mark_system<my_game::render>();
    if (!result) {
        // Oh no the system has not been marked.
        // Did you mark a system that is not present in the system_manager ?
    }
    return 0;
}
```

### enable\_system

#### Public Function

The `enable_system` function enables a system.

#### Usage Pattern

```
template<typename TSystem>
bool enable_system()
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem  | TSystem | the system to enable |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the system was successfully enabled   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.enable_system<my_game::input>();
    if (!result) {
        // Oh no, this system cannot be enabled.
        // Did you enable a system that is not present in the system_manager ?
    }
    return 0;
}
```

### enable\_systems

#### Public Function

The `enable_systems` function enables a list of systems.

This function recursively calls the [enable\_system](#enable_system) function.

#### Usage Pattern

```
template<typename ...TSystems>
bool enable_systems()
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystems  | TSystems | the systems to enable |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the systems were successfully enabled   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.enable_systems<my_game::input, my_game::render>();
    if (!result) {
        // Oh no, atleast one of the requested systems cannot be enabled.
    }
    return 0;
}
```

### disable\_system

#### Public Function

The `disable_system` function disables a system.

A disabled system is ignored during the game loop, but the system is not destroyed.

#### Usage Pattern

```
template<typename TSystem>
bool disable_system()
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem  | TSystem | the system to disable |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the system was successfully disabled   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.disable_system<my_game::input>();
    if (!result) {
        // Oh no the system_manager cannot disable this system.
    }
    return 0;
}
```

### disable\_systems

#### Public Function

The `disable_systems` function disables a list of systems.

This function recursively calls the [disable\_system](#disable_system) function.

#### Usage Pattern

```
template<typename ...TSystems>
bool disable_systems()
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystems  | TSystems | the systems to disable |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the systems were successfully disabled   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};

    bool result = system_manager.disable_systems<my_game::input, my_game::render>();
    if (!result) {
        // Oh no, atleast one of the requested systems cannot be disabled.
    }
    return 0;
}
```

### nb\_systems | 1

#### Public Function

The `nb_systems` function returns the number of systems registered in the system manager.

#### Usage Pattern

```
std::size_t nb_systems() const
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none)  |  |  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| number of systems | std::size\_t  | the number of systems registered   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    // added 2 systems here
    auto nb_systems = system_manager.nb_systems();
    if (nb_systems) {
        // Oh no, was expecting atleast 2 systems.
    }
    return 0;
}
```

### nb\_systems | 2

#### Public Function

The `nb_systems` function is an overloaded version of the `nb_systems` function. This version returns the system number of a certain type to register in the system manager.

#### Usage Pattern

```
std::size_t nb_systems(system_type sys_type) const
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| sys\_type  | system\_type | represents the type of systems  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| number of systems | std::size\_t  | the number of systems of a specified type   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    // added 2 systems of update type here
    auto nb_systems = system_manager.nb_systems(system_type::pre_update);
    if (nb_systems) {
        // Oh no, was expecting atleast 2 systems of pre_update type.
    }
    return 0;
}
```

### create\_system

#### Public Function

The `create_system` function creates a system with the provided argument.

This function is a factory.

#### Usage Pattern

```
template<typename TSystem, typename ...TSystemArgs>
TSystem &create_system(TSystemArgs&&... args)
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem  | TSystem | represents the type of system to create  |
| TSystemArgs  | (logic) | the arguments to create the constructed system  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TSystem | TSystem  | a reference to the created system   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    auto& foo_system = system_manager.create_system<my_system::foo>(); // you can send argument of the foo constructor here.
    foo_system.update();
    return 0;
}
```

### create\_system\_rt

#### Public Function

<!-- Requires documentation -->

#### Usage Pattern

```
template<typename TSystem, typename ...TSystemArgs>
void create_system_rt(TSystemArgs&&... args)
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
|   |  |   |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
|   |  |   |

#### :pushpin: Example

```c

```

### load\_systems

#### Public Function

The `load_systems` function loads many os systems.

<!-- What does "os" mean above? Operating systems? That would make it operating systems systems? -->

This function recursively calls the [create\_systems](#create_systems) function. 

#### Usage Pattern

```
template<typename ...TSystems, typename ...TArgs>
auto load_systems(TArgs&&... args)
```

#### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystems  | TSystems  | represents a list of systems to load  |

#### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable)  | (tuple)  | a tuple of systems loaded   |

#### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/ecs/system.manager.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    antara::gaming::ecs::system_manager system_manager{entity_registry};
    auto&& [foo_system, bar_system] = system_manager.load_systems<my_system::foo, my_system::bar>();
    foo_system.update();
    bar_system.update();
    return 0;
}
```

### clock

#### Private Type

#### Usage Pattern

```
using clock = std::chrono::steady_clock
```

<!-- I don't understand the content below. -->

    Private typedefs.

    sugar name for an chrono steady clock

### system\_ptr

#### Private Type

#### Usage Pattern

```
using system_ptr = std::unique_ptr<base_system>
```

    sugar name for a pointer to base_system

### system\_array

#### Private Type

#### Usage Pattern

```
using system_array = std::vector<system_ptr>
```

    sugar name for an array of system_ptr

### system\_registry

#### Private Type

#### Usage Pattern

```
using system_registry = std::array<system_array, system_type::size>
```

    sugar name for a multidimensional array of system_array (pre_update, logic_update, post_update)

### systems\_queue

#### Private Type

```
using systems_queue = std::queue<system_ptr>
```

    sugar name for a queue of system pointer to add.

### add\_system_

#### Private Function

#### Usage Pattern

```
base_system &add_system_(system_ptr &&system, system_type sys_type)
```

<!-- Not clear about any of this, just placing here for now in the format. -->

### entity\_registry_

#### Private Data Members

## event::key*

The `antara::gaming::event` class contains functions and other elements that are common in gaming.

### event::key\_pressed

**struct key\_pressed**

The `key_pressed` struct provides functions that execute when a user presses a key.

::: tip

This class is automatically reflected for scripting systems such as Lua, Python.

:::

#### Public Functions

##### key\_pressed | 1

The `key_pressed` function is a constructor that takes arguments to associate a key with logic.

This is the principal constructor for key-press functions.

###### Usage Pattern

```
key_pressed(input::key key_, bool alt_, bool control_, bool shift_, bool system_)
```

###### Template Type 

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| key_  | input::key  | represents the keyboard key currently pressed  |
| alt_  | bool  | true if the alt key on the keyboard is pressed  |
| control_  | bool  | true if the control key on the keyboard is pressed  |
| shift_  | bool  | true if the shift key on the keyboard is pressed  |
| system_  | bool  | true if the system key on the keyboard is pressed  |

###### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)  |   |    |

###### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/event/key.pressed.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    dispatcher.trigger<key_pressed>(input::key::a, false, false, false, false);
}
```

##### key\_pressed | 2

The `key_pressed` function that takes no arguments is the default constructor, provided for scripting-system convenience.

<!-- Is there more information we can provide here? -->

Please see the [key\_pressed | 1](#key-pressed-1) function for more information.

###### Usage Pattern

```
key_pressed()
```

#### Public Members

##### antara::gaming::input::key key

    Fields.

<!-- I don't have enough information/knowledge to edit this portion. What is this section? What do you mean by "Fields" and "key pressed" specifically? -->

    key pressed

##### bool alt = {false}

    is alt pressed at the same time.

##### bool control = {false}

    is ctrl pressed at the same time.

##### bool shift = {false}

    is shift pressed at the same time.

##### bool system = {false}

    is system pressed at the same time.

### event::key\_released

The `antara::gaming::event::key\_released` class provides functions and other elements that associate the release of a key with logic. 

::: tip

This class is automatically reflected for scripting systems such as Lua, Python.

:::

#### Public Functions

##### key\_released

The `key_released` function is a constructor that takes arguments to associate a key with logic.

This is the principal constructor for key-release functions.

###### Usage Pattern

```
key_released(input::key key_, bool alt_, bool control_, bool shift_, bool system_)
```

###### Template Type 

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| key_  | input::key  | represents the keyboard key currently released  |
| alt_  | bool  | true if the alt key on the keyboard is released  |
| control_  | bool  | true if the control key on the keyboard is released  |
| shift_  | bool  | true if the shift key on the keyboard is released  |
| system_  | bool  | true if the system key on the keyboard is released  |

###### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)  |   |    |

###### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/event/key_released.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    dispatcher.trigger<key_released>(input::key::a, false, false, false, false);
}
```

##### key\_released | 2

The `key_released` function that takes no arguments is the default constructor, provided for scripting-system convenience.

Please see the [key\_released | 1](#key-released-1) function for more information.

###### Usage Pattern

```
key_released()
```

#### Public Members

##### input::key key

<!-- Again, I don't understand this content well enough to edit. -->

    Fields.

    key released

bool alt = {false}

    is alt released at the same time.

bool control = {false}

    is ctrl released at the same time.

bool shift = {false}

    is shift released at the same time.

bool system = {false}

    is system released at the same time.

## event::quit\_game

The `antara::gaming::event::quit_game` class provides functions and other methods to quit a game.

### quit\_game

The `quit_game` struct is an event that leaves a game and provides a return value.

::: tip

This class is automatically reflected for scripting systems such as Lua, Python.

:::

#### Public Functions

##### quit\_game | 1 

The `quit_game` function is a constructor that takes arguments and quits the game.

This is the principal constructor for `quit_game` functions.

###### Usage Pattern

```
quit_game(int return_value)
```

###### Template Type 

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| return\_value  | int  | the return value of the program when leaving the game |

###### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| return\_value  | int  | the return value of the program when leaving the game    |

###### :pushpin: Example

```c
#include <entt/entity/registry.hpp>
#include <entt/dispatcher/dispatcher.hpp>
#include <antara/gaming/event/quit_game.hpp>

int main()
{
    entt::registry entity_registry;
    entt::dispatcher& dispatcher{registry.set<entt::dispatcher>()};
    dispatcher.trigger<quit_game>(0);
}
```

##### quit\_game | 2

The `quit_game` function that takes no arguments is the default constructor, provided for scripting-system convenience.

Please see the [quit\_game | 1](#quit-game-1) function for more information.

###### Usage Pattern

```
quit_game()
```

#### Public Members

##### return\_value_

<!-- need more information to edit this part -->

###### Usage Pattern

```
int return_value_
```

    Fields.

    the return value of the program when leaving the game

#### Public Static Attributes

##### invoker\_dispatcher

###### Usage Pattern

```
constexpr const event::invoker_dispatcher<quit_game, int> invoker = {}
```

    Static fields.


## sfml

The `antara::gaming::sfml` class provides functions and other elements for SFML-related (Simple and Fast Multimedia Library) logic purposes.

### sfml::audio\_system

The `antara::gaming::sfml::audio_system` class provides audio-related functions and other elements.

###### Usage Pattern

```
class audio_system : public antara::gaming::ecs::system<audio_system>
```

#### Public Functions

##### audio\_system

<!-- Need a description -->

###### Usage Pattern

```
audio_system(entt::registry &registry)
```

###### Function Parameters 

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| registry  | ent::registry  | the entity\_registry |

###### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| return\_value  | int  | the return value of the program when leaving the game    |

###### :pushpin: Example

<!-- Need an example -->

```c

```

##### update

The `update` function destroys and clears the sounds when they are finished. 

###### Usage Pattern

```
void update()
```

###### Function Parameters 

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none)  |   |  |

###### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)  | void  |  |

###### :pushpin: Example

<!-- Need an example -->

```c

```

### sfml::component\_sound

The `antara::gaming::sfml::component_sound` struct contains sound and the sound's attributes (such as volume).

#### Public Members

##### sound

The `sf::Sound sound` object is the SFML Sound instance and contains the sound data.

<!-- Any other information here? -->


