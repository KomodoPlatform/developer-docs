---
sidebarDepth: 3
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

::: tip

The logic of the function is designed to automatically manage the correct order of updates for the different types of systems the developer has added to their system-manager instance.

:::

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
    // ... add 5 differents systems here
    std::size_t nb_systems_updated = system_manager.update();
    if (nb_systems_updated != 5) {
        std::cerr << "Expect 5 system updates from system_manager.update(), but received only " << nb_systems_updated << std::endl;
    }
    return 0;
}
``` 

