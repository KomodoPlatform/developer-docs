---
sidebarDepth: 4
---

# Gaming

## Introduction

Welcome to the Antara Gaming SDK documentation. This module-based software is programmed in C++ 17 and is designed for high-speed runtime execution.

::: tip

The modules of the Antara Gaming SDK rely on other modules, such as [Oracles](./oracles.html)

:::

## antara::gaming::config

The `antara::gaming::config` class provides a function to load customized configuration settings for the Antara Gaming SDK.

### load\_configuration

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

## antara::gaming::core

The `antara::gaming::core` class provides functions and information relevant to
the core Antara Gaming SDK library.

### version

The `version` function returns the current version of the Antara Gaming SDK.

::: tip

The result of this function can be deduced at compile time.

:::

#### Usage Pattern

```
#include <antara/gaming/core/version.hpp>

constexpr const char *antara::gaming::version()
```

### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none) | |  |

### Response

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

## antara::gaming::ecs::system\_manager

The `antara::gaming::ecs::system_manager` class provides methods to perform tasks such as the manipulation of systems, the addition, deletion, and update of systems, and the deactivation of a system.

### Public Functions

#### system\_manager

The primary constructor function.

##### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

system_manager(entt::registry &registry, bool subscribe_to_internal_events = true)
```

##### Destructor

```
~system_manager()
```

##### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| registry | entt::registry | an entity\_registry object |
| subscribe\_to\_internal\_events | bool | whether to subscribe to default system\_manager events |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)          | void  |                                                               |

##### :pushpin: Example

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

#### receive\_add\_base\_system

Public member functions.

<!-- The description in the documentation was unclear to me. Can you please provide more information about what "Public member functions" means here? Thx -->

##### Usage Pattern

```
void receive_add_base_system(const ecs::event::add_base_system &evt)
```

##### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| evt | ecs::event::add\_base\_system& | <!-- need a description here --> |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)          | void  |                                                               |

##### :pushpin: Example

<!-- needs an example -->

```c

``` 

#### start

The `start` function informs the system manager instance that the developer's game is initiated and spinning.

::: tip

This function allows for the execution of actions at the end of each frame. For example, an action could be the deletion of a sytem, or the addition of a new system which will continue to receive iterations and updates.

:::

##### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

system_manager_instance.start();
```

##### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none) |  |  |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (none)          | void  |                                                               |

<!-- Does this return something such as a bool value, for successful execution, by chance? -->

##### :pushpin: Example

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

#### update

The `update` function updates a system-manager instance.

The logic of the function is designed to automatically manage the correct order of updates for the different types of systems the developer has added to their system-manager instance.

- If the developer's logic has not loaded any systems into the system\_manager instance the function returns `0`
- If the developer's logic marks a system for deletion, the function deletes the system is automatically at the end of the current loop tick
- If the developer's logic adds a system through an `ecs::event::add_base_system` event, the function automatically adds the system at the end of the current loop tick

##### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

std::size\_t nb\_systems\_updated = system\_manager.update();
```

##### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none) |  |  |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| number of systems updated          | std::size\_t  | the number of systems updated                                                               |

##### :pushpin: Example

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

#### update\_systems

The `update_systems` function updates specific systems in a system\_manager instance.

The [update](#update) (listed above) function calls this `update_systems` function multiple times each time the `update` function executes. 

The `update_systems` function is useful when the developer wishes to manually perform an update of a specific system.

##### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

std::size\_t nb\_systems\_updated = system\_manager.update();
```

##### Function Parameters

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| (none) |  |  |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| number of systems updated          | std::size\_t  | the number of systems updated                                                               |

##### :pushpin: Example

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

#### get\_system | 1

The `get_system` function uses a template parameter to return a reference to a system.


##### Usage Pattern

```
template<typename TSystem>
const TSystem &get_system() const 
```

##### Function and Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | (determined by the developer)  | the TSystem type represents any type of valid template, as designed by the developer   |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TSystem | &TSystem  | a reference to the template chosen by the developer                                                               |

##### :pushpin: Example

<!-- Need an example here -->

```c

``` 

#### get\_system | 2 

An overloaded version of the `get_system` function above.

This overloaded function accepts different parameters.

##### Usage Pattern

```
template<typename TSystem>

TSystem &get_system()
```

##### Function and Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | (determined by the developer)  | the TSystem type represents any type of valid template, as designed by the developer   |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TSystem | &TSystem  | a reference to the template chosen by the developer                                                               |

##### :pushpin: Example

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

#### get\_systems | 1

The `get_systems` function accepts multiple template parameters and returns multiple systems.

This function recursively calls the [get\_system](#get_system) function. Based on the logic of the different kinds of systems requested, this function updates the indicated systems in the correct order.

##### Usage Pattern

```
template<typename ...TSystems>
std::tuple<std::add_lvalue_reference_t<TSystems>...> get_systems()
```

##### Function and Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | std::tuple\<std::add\_lvalue\_reference\_t\<TSystems\>  | a tuple containing multiple TSystems templates   |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TSystems | std::tuple\<std::add\_lvalue\_reference\_t\<TSystems\>  | a reference to the template chosen by the developer                                                               |

##### :pushpin: Example

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

#### get\_systems | 2

An overloaded version of the [get\_systems](#get_systems) function.

::: tip

This function is marked as [nodiscard.](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)

:::

##### Usage Pattern

```
template<typename ...TSystems>
std::tuple<std::add_lvalue_reference_t<std::add_const_t<TSystems>>...> get_systems() const
```

##### Function and Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| tuple of TSystems | std::tuple\<std::add\_lvalue\_reference\_t\<std::add\_const\_t\<TSystems\>\>...\>  | a tuple containing multiple TSystems templates types  |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| tuple of TSystems | std::tuple\<std::add\_lvalue\_reference\_t\<std::add\_const\_t\<TSystems\>\>...\>  | a tuple containing multiple references to TSystems templates   |

##### :pushpin: Example

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

#### has\_system 

The `has_system` function verifies whether or not a system is already registered in the [system\_manager](#system_manager).

##### Usage Pattern

```
template<typename TSystem>
bool has_system() const
```

##### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| TSystem | (determined by the developer) | the system that needs to be verified |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated system is registered in the system manager instance   |

##### :pushpin: Example

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

#### has\_systems

The `has_systems` function verifies whether or not a list of systems is already registered in the [system\_manager](#system_manager).

This function recursively calls the [has\_system](#has_system) function.

::: tip

This function is marked as [nodiscard.](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)

:::

##### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
```

##### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| list of TSystems | template\<typename ...TSystems\> | the list of systems that needs to be verified |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated systems are registered in the system manager instance   |

##### :pushpin: Example

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

#### has\_systems

The `has_systems` function verifies whether or not a list of systems is already registered in the [system\_manager](#system_manager).

##### Usage Pattern

```
template<typename ...TSystems>
bool has_systems() const
```

##### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| list of TSystems | template\<typename ...TSystems\> | the list of systems that needs to be verified |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated systems are registered in the system manager instance   |

##### :pushpin: Example

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

#### has\_systems

The `has_systems` function verifies whether or not a list of systems is already registered in the [system\_manager](#system_manager).

This function recursively calls the [has\_system](#has_system) function.

::: tip

This function is marked as [nodiscard.](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)

:::

##### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
```

##### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| list of TSystems | templat\<typename ...TSystems\> | the list of systems that needs to be verified |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated systems are registered in the system manager instance   |

##### :pushpin: Example

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

#### has\_systems

The `has_systems` function verifies whether or not a list of systems is already registered in the [system\_manager](#system_manager).

##### Usage Pattern

```
#include <antara/gaming/ecs/system.manager.hpp>

bool result = system_manager.has_systems<my_game::render_system, my_game::input_systems>();
```

##### Template Type

| Name   | Type | Description                                                                                       |
| ------ | ---- | ------------------------------------------------------------------------------------------------- |
| list of TSystems | template\<typename ...TSystem\> | the list of systems that needs to be verified |

##### Response

| Name            | Type     | Description                                                                                                                      |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| (variable) | bool  | whether or not the indicated systems are registered in the system manager instance   |

##### :pushpin: Example

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
