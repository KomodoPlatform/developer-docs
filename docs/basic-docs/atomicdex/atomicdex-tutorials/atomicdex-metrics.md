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
	"metrics": [{
		"type": "gauge",
		"key": "p2p.received_messages.period_in_secs",
		"labels": {},
		"value": 60.0
	}, {
		"type": "gauge",
		"key": "p2p.connected_relays.len",
		"labels": {},
		"value": 4.0
	}, {
		"type": "gauge",
		"key": "orderbook.len",
		"labels": {},
		"value": 0.0
	}, {
		"type": "gauge",
		"key": "p2p.relay_mesh.len",
		"labels": {},
		"value": 2.0
	}, {
		"type": "gauge",
		"key": "p2p.received_messages.count",
		"labels": {},
		"value": 0.0
	}, {
		"type": "gauge",
		"key": "p2p.connected_peers.count",
		"labels": {},
		"value": 4.0
	}, {
		"type": "gauge",
		"key": "orderbook.memory_db",
		"labels": {},
		"value": 297800386624.0
	}]
}
```

## Prometheus Integration

AtomicDEX API 2.0 supports integration with [Prometheus](https://github.com/prometheus/prometheus#install). This software allows users to setup automated scraping of metrics at regular intervals and enables sophisticated queries on the stored [timeseries](https://en.wikipedia.org/wiki/Time_series) data. It also allows users to configure an elegant dashboard using built-in [graphs,](https://prometheus.io/docs/prometheus/latest/getting_started/#using-the-expression-browser) or to export data for graphical processing using [Grafana](https://prometheus.io/docs/visualization/grafana/).

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
        labels:
          group: 'atomicdex'

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

To visualize one of the available metrics, open the metric explorer (next to the execute button), select a metric and then click execute.

<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/prometheus1.png" />

</div>


More graphs can be added to the same page using the "Add Panel" button available.

#### Grafana

Grafana can access data scraped by Prometheus and it can analyze, transform and display it in a variety of ways. For more information see the [Prometheus guide.](https://prometheus.io/docs/visualization/grafana/#using)

To use Grafana, navigate to [http://localhost:3000](http://localhost:3000) and log in using the default credentials: `admin` / `admin`. When offered to set a new password, do so and secure it in an encrypted password manager like [KeePassXC](https://keepassxc.org/).

Next we need to add Prometheus as a data source. Click on the cog icon in the sidebar to open the configuration panel.


<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/graphana1.png" />

</div>


Click the "Add data source" button, and select **Prometheus** from the menu. Set the URL to `http://localhost:9090`, leave other fields as default, and click the "Test and save" button at the bottom of the form.


<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/graphana2.png" />

</div>


Next, navigate to [http://localhost:3000/dashboards](http://localhost:3000/dashboards) and click on the `New Dashboard` button


<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/graphana3.png" />

</div>


Next, click on `Add a new panel` 


<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/graphana4.png" />

</div>


In the next screen, select `Prometheus` as the provider from the drop down menu in the `Query` tab. 


<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/graphana5.png" />

</div>


Click the `Metrics` menu and select one of the available options. These should be the same ones available directly in the Graphs tab of Prometheus: [http://localhost:9090/graph](http://localhost:9090/graph).


<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/graphana6.png" />
  
</div>


Optionally, you can tweak the query options (shown in the image below).


<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/graphana7.png" />

</div>


Once complete, click on "Run queries" to see the data displayed on the graph. If you like, you can also customise the graph, by adding a title, changing the colors, or using a different graph type. Click "Apply in the top right corner) once complete.


<div style="margin: 2rem; text-align: center; width: 80%">

<img src="/metrics/graphana8.png" />

</div>


Add any additional panels as desired, and save them to your dashboard.


<div style="margin: 2rem; text-align: center; width: 80%">
  
<img src="/metrics/graphana9.png" />

</div>

