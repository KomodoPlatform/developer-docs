from slickrpc import Proxy
import os
import re
import json
import sys
import platform
try:
    import urlparse
except:
    from urllib import parse as urlparse

    def def_credentials(chain):
        rpcport = ''
        operating_system = platform.system()
        if operating_system == 'Darwin':
            data_dir = os.path.join(
                os.environ['HOME'], 'Library', 'Application Support', 'Komodo')
        elif operating_system == 'Linux':
            data_dir = os.path.join(os.environ['HOME'], '.komodo')
        elif operating_system == 'Windows':
            data_dir = os.path.join(os.environ['APPDATA'], 'komodo')
        if chain == 'KMD':
            coin_config_file = os.path.join(data_dir, 'komodo.conf')
        else:
            coin_config_file = os.path.join(
                data_dir, chain, chain + '.conf')
        with open(coin_config_file, 'r') as f:
            for line in f:
                l = line.rstrip()
                if re.search('rpcuser', l):
                    rpcuser = l.replace('rpcuser=', '')
                elif re.search('rpcpassword', l):
                    rpcpassword = l.replace('rpcpassword=', '')
                elif re.search('rpcport', l):
                    rpcport = l.replace('rpcport=', '')
        if len(rpcport) == 0:
            if chain == 'KMD':
                rpcport = 7771
            else:
                print("rpcport not in conf file, exiting")
                print("check " + coin_config_file)
                exit(1)
        return Proxy(conf_file=coin_config_file), rpcport, "http://" + rpcuser + ":" + rpcpassword + "@127.0.0.1:" + str(rpcport)

    komodo, rpcport, service_url = def_credentials("ROGUE")

    def url_to_conf(service_url):
        url = urlparse.urlparse(service_url)
        return dict(rpchost=url.hostname, rpcport=url.port,
                    rpcuser=url.username, rpcpassword=url.password), url

    print(url_to_conf(service_url))

    print(komodo.getblock(komodo.getbestblockhash()))
    toPrint = komodo.cclib(
        'gameinfo', '17', '["64ba05c131cbd9001481bdc4feb196669e654e3c39b115ae1048feb061ac7e64"]')
    print(toPrint)

    def myFun(*argv):
        print(argv)

    myFun([{'txid': 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'vout': 0}], {'address': 0.01})
