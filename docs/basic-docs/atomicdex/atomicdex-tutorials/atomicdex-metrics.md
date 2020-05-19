# DEX Metrics

MarketMaker 2.0 (MM2) collects metrics such as incoming/outgoing traffic that can demonstrate to the user what is happening during the MM2 session.

The metrics can be:
- Recorded to a log file at a specified frequency
- Requested using AtomicDEX API in JSON format
- Visualized using Prometheus and Grafana

## Setting Up the Log Recording

By default, the collected metrics are recorded to log file every 5 minutes. The time interval can be set at the start of the MarketMaker 2.0.

To do set the interval to 2 minutes, initiate MM2 with the additional argument `\"metrics\":120`

Example:

```bash
stdbuf -oL ./mm2 "{\"gui\":\"MM2GUI\",\"netid\":9999, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"YOUR_PASSPHRASE_HERE\", \"rpc_password\":\"YOUR_PASSWORD_HERE\", \"metrics\":120}" &
```

If you need to prohibit record the metrics to log file, set the `metrics` argument to 0.

Example:

```bash
stdbuf -oL ./mm2 "{\"gui\":\"MM2GUI\",\"netid\":9999, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"YOUR_PASSPHRASE_HERE\", \"rpc_password\":\"YOUR_PASSWORD_HERE\", \"metrics\":0}" &
```

## API calling

To request the metrics snapshot, execute the following command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"metrics\"}"
```

You should get a similar response:

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

MarketMaker 2.0 supports integration with Prometheus. It allows users to configure pretty dashboard using built-in prometheus [graph](https://prometheus.io/docs/prometheus/latest/getting_started/#using-the-expression-browser) or an external [Grafana](https://prometheus.io/docs/visualization/grafana/).

Prometheus scrapes metrics using an HTTP pull model. In order to provide Prometheus with the ability to scrapes the metrics at `localhost:9001`, initiate MM2 with the additional argument `\"prometheusport\":9001`

Also you can specify username and password to enforce basic auth for the Prometheus. To do that, add one more argument `\"prometheus_credentials\":\"PROM_USERNAME:PROM_PASSWORD\"`.
Note that the argument is NOT necessary.

Replace PROM_USERNAME and PROM_PASSWORD with your actual Prometheus username and password.

Note that the username and password should be separated by `:`

Example:

```bash
stdbuf -oL ./mm2 "{\"gui\":\"MM2GUI\",\"netid\":9999, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"YOUR_PASSPHRASE_HERE\", \"rpc_password\":\"YOUR_PASSWORD_HERE\", \"prometheusport\":9001, \"prometheus_credentials\":\"PROM_USERNAME:PROM_PASSWORD\"}" &
```

### Configuring Prometheus to monitor MarketMaker 2.0

Save the following basic Prometheus configuration as a file named `prometheus.yml`:

```yaml
global:
  scrape_interval: 10s

scrape_configs:
  - job_name: 'MarketMaker2'

    basic_auth:
      username: 'PROM_USERNAME'
      password: "PROM_PASSWORD"

    static_configs:
      - targets: ['0.0.0.0:9001']
```

Replace PROM_USERNAME and PROM_PASSWORD with your actual Prometheus username and password.

To learn more about creating Prometheus configuration file, [read this documentation.](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)

### Starting Prometheus and Grafana

The next step is start the Prometheus and Grafana.

To make it easy, we are going to use standard Prometheus and Grafana docker containers running together using `docker-compose`.
Save the following compose file as a file named `docker-compose.yml`:

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

After that execute the command to start the containers:

```bash
docker-compose up
```

### Using the graphing interface

To use Prometheus's built-in graph expressions, navigate to http://localhost:9090/graph and use the "Graph" tab.

To use Grafana, navigate to http://localhost:3000 and log in using default credentials: `admin` / `admin`.
For more information see the [Prometheus guide.](https://prometheus.io/docs/visualization/grafana/#using) 
