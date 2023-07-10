(window.webpackJsonp=window.webpackJsonp||[]).push([[179],{466:function(t,e,a){"use strict";a.r(e);var s=a(10),r=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"how-to-setup-and-use-the-komodo-defi-framework-on-an-aws-ec2-instance"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#how-to-setup-and-use-the-komodo-defi-framework-on-an-aws-ec2-instance"}},[t._v("#")]),t._v(" How to Setup and use the Komodo DeFi Framework on an AWS EC2 instance")]),t._v(" "),e("h2",{attrs:{id:"create-the-komodefi-setup-script"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-the-komodefi-setup-script"}},[t._v("#")]),t._v(" Create the KomoDeFi setup script")]),t._v(" "),e("ul",[e("li",[t._v("Create a file named "),e("code",[t._v("KomoDeFi_setup.txt")])]),t._v(" "),e("li",[t._v("Copy the code below into the file")]),t._v(" "),e("li",[t._v("In the code, find the text, "),e("code",[t._v("SEED_WORDS_PLEASE_REPLACE")]),t._v(", and replace it with custom seed words of your own\n"),e("ul",[e("li",[t._v("These seed words are used to generate new blockchain addresses, and therefore the seed words should be treated like a unique password")])])]),t._v(" "),e("li",[t._v("Find the text, "),e("code",[t._v("RPC_PASS_PLEASE_REPLACE")]),t._v(", and replace this also with a strong password\n"),e("ul",[e("li",[t._v("This is used to authenticate yourself while communicating with the Komodo DeFi Framework")])])])]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token shebang important"}},[t._v("#!/bin/bash")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" update\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-y")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("unzip")]),t._v(" jq "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--silent")]),t._v(" https://api.github.com/repos/KomodoPlatform/atomicDEX-API/releases "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" jq "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-r")]),t._v(" '."),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(".assets"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" select"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(".name "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" endswith"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Linux-Release.zip"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v(".browser_download_url'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" https://raw.githubusercontent.com/KomodoPlatform/coins/master/coins\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("unzip")]),t._v(" *Linux-Release.zip\n./mm2 "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{'),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("netid"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(":7777,"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("gui"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(":"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("aws_cli"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(","),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("passphrase"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(":"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("SEED_WORDS_PLEASE_REPLACE"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(","),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("rpc_password"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(":"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("RPC_PASS_PLEASE_REPLACE"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(","),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("myipaddr"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(":"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("0.0.0.0"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v('}"')]),t._v("\n")])])]),e("h2",{attrs:{id:"install-aws-cli-get-aws-access-credentials"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install-aws-cli-get-aws-access-credentials"}},[t._v("#")]),t._v(" Install AWS CLI , get AWS access credentials")]),t._v(" "),e("h4",{attrs:{id:"installation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" awscli\n")])])]),e("p",[t._v("To obtain access credentials, log in to your AWS account and create an IAM user as described in this linked post "),e("a",{attrs:{href:"https://tntdrive.com/where-do-i-get-my-access-keys.aspx#create-iam-user-and-keys",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://tntdrive.com/where-do-i-get-my-access-keys.aspx#create-iam-user-and-keys."),e("OutboundLink")],1),t._v(" While following the post, make sure to select the policy "),e("code",[t._v("AmazonEC2FullAccess")]),t._v(" instead of "),e("code",[t._v("AmazonS3FullAccess")]),t._v('. Copy the "Access key ID" and "Secret access key" to another location while completing the post\'s instructions; these are necessary later.')]),t._v(" "),e("p",[t._v("Make sure the SSH directory exists.")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-p")]),t._v(" ~/.ssh/\n")])])]),e("h2",{attrs:{id:"create-an-ec2-instance"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-an-ec2-instance"}},[t._v("#")]),t._v(" Create an EC2 Instance")]),t._v(" "),e("p",[t._v("Open a terminal, navigate to the directory where the file "),e("code",[t._v("KomoDeFi_setup.txt")]),t._v(" is located, and issue the following commands.")]),t._v(" "),e("p",[t._v("In the terminal commands below, note that you must first change the texts "),e("code",[t._v("REPLACE_ACCESS_KEY_ID")]),t._v(" and "),e("code",[t._v("REPLACE_SECRET_ACCESS_KEY")]),t._v(' with your "Access key ID" and "Secret access key" obtained during the setup procedure. If necessary, also change the region where the EC2 instance is hosted by changing all instances of '),e("code",[t._v("us-east-1")]),t._v(" in the commands.")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("AWS_ACCESS_KEY_ID")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("REPLACE_ACCESS_KEY_ID\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("AWS_SECRET_ACCESS_KEY")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("REPLACE_SECRET_ACCESS_KEY\naws ec2 create-key-pair "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--region")]),t._v(" us-east-1 --key-name mm2Keypair "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" jq "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-r")]),t._v(" .KeyMaterial "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" ~/.ssh/mm2.pem\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("chmod")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("400")]),t._v(" ~/.ssh/mm2.pem\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("sgID")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("aws ec2 create-security-group "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--region")]),t._v(" us-east-1 --group-name sgMM2 "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--description")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sg-mm2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" jq "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-r")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'.GroupId'")]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v("\naws ec2 authorize-security-group-ingress "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--region")]),t._v(" us-east-1 --group-name sgMM2 "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--protocol")]),t._v(" all "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--cidr")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.0")]),t._v(".0.0/0\naws ec2 run-instances "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--region")]),t._v(" us-east-1 --image-id ami-083d24fb90054e5f0 "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--count")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" --instance-type t3.micro --key-name mm2Keypair --security-group-ids "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sgID")]),t._v(" --user-data file://KomoDeFi_setup.txt\n")])])]),e("p",[t._v('If you see an error similar to the following, click the link that is found in the error. On the page to which your browser is directed click the button "Continue to Subscribe" and then click the button "Accept Terms".')]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("An error occurred "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("OptInRequired"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" when calling the RunInstances operation: In order to use this AWS Marketplace product you need to accept terms and subscribe. To "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("do")]),t._v(" so please visit https://aws.amazon.com/marketplace/pp?sku"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("auhljmclkudu651zy27rih2x2\n")])])]),e("p",[t._v("Wait for the Subscription to be processed and issue the last command again.")]),t._v(" "),e("p",[t._v("Verify that the instance launched successfully by visiting "),e("a",{attrs:{href:"https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceId",target:"_blank",rel:"noopener noreferrer"}},[t._v("this linked page."),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v('From the linked page above, copy the "IPv4 Public IP" of the instance and use it to replace the text '),e("code",[t._v("REPLACE_PUBLIC_IP")]),t._v(" in the following command.")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("nodeIp")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("REPLACE_PUBLIC_IP\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ssh")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-o")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("IdentitiesOnly")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("yes "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-i")]),t._v(" ~/.ssh/mm2.pem admin@"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$nodeIp")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'curl -s --url "http://127.0.0.1:7783" --data "{\\"userpass\\":\\"RPC_PASS_PLEASE_REPLACE\\",\\"method\\":\\"version\\"}"\'')]),t._v("\n")])])]),e("p",[t._v("Edit the command above as necessary to exchange one curl command for another from "),e("a",{attrs:{href:"https://developers.atomicdex.io/basic-docs/atomicdex/atomicdex-api.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("the Komodo DeFi Framework."),e("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=r.exports}}]);