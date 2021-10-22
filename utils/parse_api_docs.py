#!/usr/bin/env python3
import os
import sys
import json
import urllib.request

userpass="userpass"
REPO = "KomodoPlatform"
BRANCH = "master"

SCRIPT_PATH = os.path.dirname(os.path.realpath(__file__))
BASE_URL = f'https://raw.githubusercontent.com/{REPO}/developer-docs/{BRANCH}/docs/basic-docs/atomicdex'
API_DOCS_PATH = f"{os.path.expanduser('~')}/GITHUB/KP/developer-docs/docs/basic-docs/atomicdex"

legacy_methods_files = ["atomicdex-api.md"]
v2_methods_files = [
	"trade_preimage.md",
	"withdraw.md",
	"add_node_to_version_stat.md",
	"remove_node_from_version_stat.md",
	"start_version_stat_collection.md"
]



for fn in legacy_methods_files:
	url = f"{BASE_URL}/{fn}"
	urllib.request.urlretrieve(url, f"{SCRIPT_PATH}/{fn}")
	reading = False
	reading_command = True
	with open(f"{SCRIPT_PATH}/{fn}", "r") as f:
		# strip everything not within ```
		lines = f.readlines()
		json_bits = ''
		for line in lines:
			if '```' in line:
				if not reading:
					reading = True
				else:
					reading = False
			elif reading and line != '':
				json_bits += line.strip()

	
		json_bits = json_bits.replace(
			'curl --url "http://127.0.0.1:7783" --data ', ''				 
			).replace(
			'curl --url "http://127.0.0.1:7783/" --data ', ''				 
			).replace(
			'""$userpass""', '"userpass"'
			).replace(
			"'$userpass'", "'userpass'"
			).replace(
			"$userpass", "userpass"
			).replace(
			"'{", "{"
			).replace(
			"}'", "}"
			).replace(
			'"{', "{"
			).replace(
			'}"', "}"
			).replace(
			'"[', '['
			).replace(
			']"', ']'
			).replace(
			'\\"', '"'
			).replace(
			',}', '}'
			).replace(
			',]', ']'
			).replace(
			'"\'userpass\'"', '"userpass"'
			).replace(
			'}mm2" : 1{', '}{'
			).replace(
			'}logevents=1txindex=1addressindex=1{', '}{'
			).replace(
			'taker_swap:547] "taker_swap:543] timeout (180.0 > 180.0)"', 'taker_swap:547] taker_swap:543] timeout (180.0 > 180.0)'
			).replace(
			'"lp_swap:1981] utxo:891] rpc_clients:738] JsonRpcError { request: JsonRpcRequest { jsonrpc: "2.0", id: "67", method: "blockchain.transaction.broadcast", params: [String("0400008085202f890182b342c114f806c5325f23f7e78dae5d186221ab502c86302c2c8082fa110f0a00000000d7473044022035791ea5548f87484065c9e1f0bdca9ebc699f2c7f51182c84f360102e32dc3d02200612ed53bca52d9c2568437f087598531534badf26229fe0f652ea72ddf03ca501201b8886b8a2cdb62505699400b694ac20f04d7bd4abd80e1ab154aa8d861fc093004c6b630420c1395db17521031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ac6782012088a9143669eb83a007a3c507448d79f45a9f06ec2f36a888210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0aac68ffffffff01460ec000000000001976a914444f0e1099709ba4d742454a7d98a5c9c162ceab88ac967e395d000000000000000000000000000000")] }, error: Transport("rpc_clients:668] All electrums are currently disconnected") }', '"nothing to see here"'
			).replace(
			'"lp_swap:1888] eth:654] RPC error: Error { code: ServerError(-32010), message: "Transaction with the same hash was already imported.", data: None }', '"nothing to see here"'
			)





		i = 0
		json_bits_list = json_bits.split("}{")
		for bit in json_bits_list:
			if i == 0:
				json_bits_list[i] = bit+"}"
			elif i == len(json_bits_list)-1:
				json_bits_list[i] = "{"+bit
			else:
				json_bits_list[i] = "{"+bit+"}"
			i += 1
		
		i = 0
		j = 0
		sub_bits_list = []
		for bit in json_bits_list:
			#print(bit)
			if "][" in json_bits_list[i]:
				sub_bits_list = json_bits_list[i].split("][")
				for sub_bit in sub_bits_list:
					if j == 0:
						sub_bits_list[j] = sub_bit+"]"
					elif j == len(sub_bits_list)-1:
						sub_bits_list[j] = "["+sub_bit
					else:
						sub_bits_list[j] = "["+sub_bit+"]"
					j += 1

				json_bits_list[i] = None
			i += 1
		json_bits_list += sub_bits_list


		i = 0
		j = 0
		sub_bits_list = []
		for bit in json_bits_list:
			if json_bits_list[i]:
				if "]{" in json_bits_list[i]:
					sub_bits_list = json_bits_list[i].split("]{")

					for sub_bit in sub_bits_list:
						if j == 0:
							sub_bits_list[j] = sub_bit+"]"
						elif j == len(sub_bits_list)-1:
							sub_bits_list[j] = "{"+sub_bit
						else:
							sub_bits_list[j] = "{"+sub_bit+"]"
						j += 1

					json_bits_list[i] = None
			i += 1

		json_bits_list += sub_bits_list


		i = 0
		j = 0
		sub_bits_list = []
		for bit in json_bits_list:
			if json_bits_list[i]:
				if "}[" in json_bits_list[i]:
					sub_bits_list = json_bits_list[i].split("}[")

					for sub_bit in sub_bits_list:
						if j == 0:
							sub_bits_list[j] = sub_bit+"}"
						elif j == len(sub_bits_list)-1:
							sub_bits_list[j] = "["+sub_bit
						else:
							sub_bits_list[j] = "["+sub_bit+"}"
						j += 1

					json_bits_list[i] = None
			i += 1

		json_bits_list += sub_bits_list

		
	with open(f"{SCRIPT_PATH}/parsed_methods_{fn}", "w+") as parsed_methods:
		with open(f"{SCRIPT_PATH}/parsed_responses_{fn}", "w+") as parsed_responses:
			for bit in json_bits_list:
				if bit:
					try:
						if "method" in bit:
							print(json.loads(bit))
							parsed_methods.write(line)
						else:
							parsed_responses.write(line)

					except Exception as e:
						print(e)
						print(bit)
						sys.exit()

	os.remove(f"{SCRIPT_PATH}/{fn}")
