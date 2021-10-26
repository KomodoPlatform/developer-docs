# DEX Metrics

AtomicDEX API 2.0 collects data metrics that allow interested users to view the history of events of an AtomicDEX API session. For example, metrics recorded by the AtomicDEX API include incoming and outgoing traffic.

The metrics can be:

- Recorded to a log file at a specified frequency
- Requested using AtomicDEX API in JSON format
- Visualized using Prometheus and Grafana

## Setting Up the Log Recording

By default, the collected metrics are recorded to a log file every five minutes. 

A custom time interval can be set during the initiation of the AtomicDEX API 2.0 software.

For example, to set the interval to two minutes, initiate AtomicDEX API with the additional argument `\"metrics\":120`, as follows.

:::tip

Note that in the examples below, the you will need to change the text to reflect your own password and passphrase.

:::

Example:

```bash
stdbuf -oL ./mm2 "{\"gui\":\"Docs_Walkthru\",\"netid\":7777, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"YOUR_PASSPHRASE_HERE\", \"rpc_password\":\"YOUR_PASSWORD_HERE\", \"metrics\":120}" &
```

To prohibit the recording of metrics to the log file, set the `metrics` argument to 0.

Example:

```bash
stdbuf -oL ./mm2 "{\"gui\":\"Docs_Walkthru\",\"netid\":7777, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"YOUR_PASSPHRASE_HERE\", \"rpc_password\":\"YOUR_PASSWORD_HERE\", \"metrics\":0}" &
```

## API Calling

Execute the following command to request a metrics snapshot.

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"metrics\"}"
```

The response should be similar to the following.

```json
{
  "metrics": [
    {
      "key": "rpc_client.traffic.out",
      "labels": { "coin": "RICK", "client": "electrum" },
      "type": "counter",
      "value": 92
    },
    {
      "key": "rpc_client.traffic.in",
      "labels": { "coin": "RICK", "client": "electrum" },
      "type": "counter",
      "value": 125
    }
  ]
}
```

## Prometheus Integration

AtomicDEX API 2.0 supports integration with Prometheus. This software allows users to setup automated scraping of metrics at regular intervals and enables sophisticated queries on the stored [timeseries](https://en.wikipedia.org/wiki/Time_series) data. It also allows users to configure an elegant dashboard using built-in [graphs,](https://prometheus.io/docs/prometheus/latest/getting_started/#using-the-expression-browser) or to export data for graphical processing using [Grafana](https://prometheus.io/docs/visualization/grafana/).

Prometheus scrapes metrics using an HTTP pull model.

To provide Prometheus with the ability to scrape the metrics at [localhost:9001](localhost:9001), initiate AtomicDEX API with the following additional argument:

```
\"prometheusport\":9001
```

You may optionally specify the username and password for Prometheus to enforce basic authorization security. For this effect, add one more argument as follows:

```
\"prometheus_credentials\":\"PROM_USERNAME:PROM_PASSWORD\"
```

Note that this additional argument is NOT necessary.

Replace PROM_USERNAME and PROM_PASSWORD with your actual Prometheus username and password.

Note that the username and password should be separated by `:`.

Example:

```bash
stdbuf -oL ./mm2 "{\"gui\":\"Docs_Walkthru\",\"netid\":7777, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"YOUR_PASSPHRASE_HERE\", \"rpc_password\":\"YOUR_PASSWORD_HERE\", \"prometheusport\":9001, \"prometheus_credentials\":\"PROM_USERNAME:PROM_PASSWORD\"}" &
```

### Configuring Prometheus to monitor the AtomicDEX API

The following basic Prometheus configuration file, named `prometheus.yml`, can simplify the process of connecting Prometheus to the AtomicDEX API.

```yaml
global:
  scrape_interval: 10s

scrape_configs:
  - job_name: 'AtomicDEX_API'

    basic_auth:
      username: 'PROM_USERNAME'
      password: "PROM_PASSWORD"

    static_configs:
      - targets: ['0.0.0.0:9001']
```

Replace PROM_USERNAME and PROM_PASSWORD with your actual Prometheus username and password.

To learn more about creating a Prometheus configuration file, [read this documentation.](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)

### Starting Prometheus and Grafana

A simple way to initiate Prometheus and Grafana is to have the standard Prometheus and Grafana docker containers run together using `docker-compose`.

Name the following compose file as `docker-compose.yml`.

```yaml
version: "3.1"
volumes:
  prometheus:
  grafana:
services:
  grafana:
    image: grafana/grafana:latest
    depends_on:
      - prometheus
    ports:
      - '3000:3000'
    network_mode: "host"
    volumes:
      - grafana:/var/lib/grafana
    restart: always
  prometheus:
    image: prom/prometheus:latest
    ports:
      - '9090:9090'
    network_mode: "host"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus:/prometheus
    restart: always
```

Use the following command to start both containers.

```bash
docker-compose up
```

### Using the graphing interface

#### Prometheus

Once the docker containers are up and running, navigate to [http://localhost:9090/graph](http://localhost:9090/graph) and use the `Graph` tab to use Prometheus's built-in graph expressions.

To visualize one of the available metrics, click on the dropdown menu highlighted in the following picture, select a metric and then click execute.

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/prom-metric-selection.png">

</div>

The graphical representation of the metric can be viewed in the `Graph` tab.

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/prom-graph-example.png">

</div>

More graphs can be added to the same page using the "Add Graph" button available.

#### Grafana

Grafana can access data scraped by Prometheus and it can analyze, transform and display it in a variety of ways. For more information see the [Prometheus guide.](https://prometheus.io/docs/visualization/grafana/#using)

To use Grafana, navigate to [http://localhost:3000](http://localhost:3000) and log in using the default credentials: `admin` / `admin`. When offered to set a new password, do so and remember it.

Next, navigate to [http://localhost:3000/dashboards](http://localhost:3000/dashboards) and click on the `New Dashboard` button

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/grafana-new-dashboard.png">

</div>

Next, click the `Add Panel` button

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/grafana-add-panel.png">

</div>

In the next screen, select `Prometheus` as the provider from the drop down menu in the `Query` tab. 

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/grafana-select-prometheus.png">

</div>

Click the `Metrics` menu and select one of the available options. These should be the same ones available directly in the Graphs tab of Prometheus: [http://localhost:9090/graph](http://localhost:9090/graph).

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/grafana-select-metric.png">

</div>

Optionally, follow the hint to add `rate` in the previous screen by clicking `Fix by adding rate()`. This results in the following screen.

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/grafana-rate-applied.png">

</div>

Click the `Save` button and set a name for the dashboard.

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/grafana-save-panel.png">

</div>

Now you have a Grafana dashboard with a panel that shows a graph of the `rpc_client_traffic_in`.

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/grafana-dashboard.png">

</div>
