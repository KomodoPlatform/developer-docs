# Monitor your Komodo Notary Node

When your Komodo Notary Node has been setup, it would be nice to monitor it. Normally I take Zabbix for this, but there is a nicer way then Zabbix. It is called New-Relic. New-Relic is a commercial company, but do offer a free package to monitor your server(s).

So let's grab those until we find a way to monitor the servers in [Discord.](https://komodoplatform.com/discord)

## Signup with New-Relic

Go to [https://newrelic.com/signup](https://newrelic.com/signup) and signup for an account. Verify your email address and log into your account.

## Server Setup

Now we are going to setup your server for it. Remember, this is based on Ubuntu 14.04, but i don't see any problems with 16.04. If so, let me know.

Login as user into your server. If you have setup your server the right way, you can't login with root anymore. When it asks you for your sudo pass, fill in your password

```bash
ssh username@server.com
```

Install repo

```bash
echo 'deb http://apt.newrelic.com/debian/ newrelic non-free' | sudo tee /etc/apt/sources.list.d/newrelic.list
```

Trust the New Relic GPG key

```bash
wget -O- https://download.newrelic.com/548C16BF.gpg | sudo apt-key add -
```

Do an update

```bash
sudo apt-get update
```

Install New Relic

```bash
sudo apt-get install newrelic-sysmond
```

Now go to your New Relic account and go to Account Settings and find there your License key at the right. Right it down somewhere. Now do this

```bash
sudo nrsysmond-config --set license_key=YOUR_LICENSE_KEY
```

And after that we do this

```bash
sudo /etc/init.d/newrelic-sysmond start
```

Now when you go to the Servers tab in your New-Relic account you will see your server coming in. Give it 30 min to let it synchronise with your server.

Install the New Relic app on your phone and log into it. Now you watch your server all day long without logging in.
